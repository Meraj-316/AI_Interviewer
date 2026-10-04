import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Clock3, Mic, MicOff, PhoneOff, Square, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIAvatar from "../components/AIAvatar";
import Logo from "../components/Logo";
import { getCurrentInterview, questions, saveCurrentInterview } from "../data/interviewData";

export default function LiveInterview() {
  const navigate = useNavigate();
  const [interview, setInterview] = useState(getCurrentInterview());
  const [questionIndex, setQuestionIndex] = useState(interview?.currentQuestion || 0);
  const [recording, setRecording] = useState(false);
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(interview?.answers || []);
  const [micError, setMicError] = useState("");
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const roleQuestions = useMemo(() => {
    const key = interview?.roleId || "frontend";
    return questions[key] || questions.frontend;
  }, [interview]);

  useEffect(() => {
    if (!interview) return;
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [interview]);

  useEffect(() => {
    if (!interview) return;
    const updated = { ...interview, currentQuestion: questionIndex, answers };
    saveCurrentInterview(updated);
  }, [questionIndex, answers]);

  if (!interview) {
    return (
      <div className="center-empty">
        <h2>No interview is active</h2>
        <p className="muted">Start a new interview to enter the live interview room.</p>
        <button className="primary-button" onClick={() => navigate("/start-interview")}>Start New Interview</button>
      </div>
    );
  }

  const question = roleQuestions[questionIndex] || roleQuestions[0];
  const total = roleQuestions.length;
  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const startRecording = async () => {
    setMicError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError("Microphone access is not available in this browser.");
      setRecording(true);
      setListening(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks.current = [];
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = e => e.data.size && chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => stream.getTracks().forEach(track => track.stop());
      mediaRecorder.current.start();
      setRecording(true);
      setListening(true);
    } catch {
      setMicError("Microphone permission was denied. You can still type your answer below.");
      setRecording(true);
      setListening(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current?.state === "recording") mediaRecorder.current.stop();
    setRecording(false);
    setListening(false);
  };

  const saveAnswerAndNext = () => {
    if (recording) stopRecording();
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = {
      question,
      answer: answer.trim(),
      answeredAt: new Date().toISOString()
    };
    setAnswers(nextAnswers);
    setAnswer("");
    if (questionIndex < total - 1) {
      setQuestionIndex(i => i + 1);
    } else {
      finishInterview(nextAnswers);
    }
  };

  const finishInterview = (finalAnswers = answers) => {
    if (recording) stopRecording();
    const result = buildResult(interview, finalAnswers);
    localStorage.setItem("ai_interviewer_pending_result", JSON.stringify(result));
    navigate("/interview/results");
  };

  return (
    <div className="app-shell interview-shell">
      <header className="topbar interview-topbar">
        <div className="topbar-left"><Logo /><span className="live-pill"><i /> LIVE INTERVIEW</span></div>
        <div className="timer"><Clock3 size={15} /> {formattedTime}</div>
        <button className="end-button" onClick={() => finishInterview()}><PhoneOff size={15} /> End Interview</button>
      </header>

      <main className="live-layout">
        <section className="question-panel">
          <div className="question-meta">
            <span>Question {questionIndex + 1} of {total}</span>
            <span className={`difficulty ${interview.difficulty.toLowerCase()}`}>{interview.difficulty}</span>
          </div>

          <div className="question-box">
            <div className="question-tag">INTERVIEWER QUESTION</div>
            <h1>{question}</h1>
            <p className="muted">Think through your answer clearly. You can speak naturally or type your answer below.</p>
          </div>

          <div className={`wave-area ${listening ? "active" : ""}`}>
            <div className="wave-label"><Volume2 size={15} /> {listening ? "AI is listening..." : "Ready when you are"}</div>
            <div className="wave">
              {Array.from({ length: 46 }).map((_, i) => <span key={i} style={{ "--h": `${18 + ((i * 37) % 65)}%` }} />)}
            </div>
            <button className={`mic-button ${recording ? "recording" : ""}`} onClick={recording ? stopRecording : startRecording}>
              {recording ? <Square size={19} fill="currentColor" /> : <Mic size={21} />}
            </button>
            <small>{recording ? "Tap to stop recording" : "Tap to answer by voice"}</small>
          </div>

          {micError && <div className="notice">{micError}</div>}

          <div className="answer-box">
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Or type your answer here..." />
            <button className="primary-button" onClick={saveAnswerAndNext}>
              {questionIndex === total - 1 ? "Finish Interview" : "Next Question"} <ChevronRight size={16} />
            </button>
          </div>

          <div className="question-footer">
            <span><Check size={14} /> Your progress is saved automatically</span>
            <span>{answers.filter(Boolean).length} answered</span>
          </div>
        </section>

        <aside className="interviewer-panel">
          <div className="panel-label">INTERVIEWER (AI)</div>
          <div className="avatar-wrap"><AIAvatar listening={listening} /></div>
          <h2>Alex</h2>
          <span className="ai-status"><i /> {listening ? "Listening" : "Ready"}</span>
          <p>Take your time to think and answer. I'm here to help you.</p>
          <div className="ai-tips">
            <div><span>01</span> Be specific with examples</div>
            <div><span>02</span> Explain your reasoning</div>
            <div><span>03</span> Keep your answer structured</div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function buildResult(interview, answers) {
  const answered = answers.filter(a => a?.answer?.trim()).length;
  const completion = Math.round((answered / Math.max(1, interview.questions || 5)) * 100);
  const overall = Math.max(58, Math.min(94, 65 + Math.round(completion * 0.2)));
  return {
    id: interview.id,
    role: interview.role,
    roleId: interview.roleId,
    experience: interview.experience,
    type: interview.type,
    difficulty: interview.difficulty,
    questions: answers,
    overallScore: overall,
    technicalKnowledge: Math.min(96, overall + 3),
    problemSolving: Math.max(50, overall - 2),
    communication: Math.max(50, overall - 4),
    codeQuality: Math.min(96, overall + 6),
    confidence: Math.max(50, overall - 5),
    strengths: ["Good engagement with the interview questions.", "You attempted to explain your reasoning clearly."],
    improvements: ["Add more concrete examples to strengthen your answers.", "Work on concise, structured explanations."],
    recommendations: ["Practice more role-specific questions", "Review core technical concepts", "Try another mock interview"],
    completedAt: new Date().toISOString()
  };
}
