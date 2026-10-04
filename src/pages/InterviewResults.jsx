import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Lightbulb, Share2, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import ScoreRing from "../components/ScoreRing";
import { defaultHistory, readHistory, saveHistory } from "../data/interviewData";

export default function InterviewResults() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [tab, setTab] = useState("all");
  const [shared, setShared] = useState(false);

  useEffect(() => {
    let pending = null;
    try { pending = JSON.parse(localStorage.getItem("ai_interviewer_pending_result")); } catch {}
    if (pending) {
      setResult(pending);
      const history = readHistory();
      const exists = history.some(item => item.id === pending.id);
      if (!exists) {
        saveHistory([{ ...pending, score: pending.overallScore, date: formatDate(pending.completedAt), time: formatTime(pending.completedAt) }, ...history]);
      }
      localStorage.removeItem("ai_interviewer_pending_result");
    } else {
      setResult(defaultHistory[0].result ? { ...defaultHistory[0].result, ...defaultHistory[0] } : {
        ...defaultHistory[0],
        overallScore: defaultHistory[0].score,
        technicalKnowledge: 85,
        problemSolving: 80,
        communication: 78,
        codeQuality: 88,
        confidence: 77,
        strengths: ["Good understanding of JavaScript concepts."],
        improvements: ["Work on code optimization and performance."],
        recommendations: ["Practice more DSA problems", "Improve communication skills"]
      });
    }
  }, []);

  const feedback = useMemo(() => {
    if (!result) return [];
    return [
      ...(result.strengths || []).map(text => ({ type: "strength", text })),
      ...(result.improvements || []).map(text => ({ type: "improvement", text }))
    ];
  }, [result]);

  if (!result) return <div className="center-empty">Loading results...</div>;

  const metrics = [
    ["Technical Knowledge", result.technicalKnowledge],
    ["Problem Solving", result.problemSolving],
    ["Communication", result.communication],
    ["Code Quality", result.codeQuality],
    ["Confidence", result.confidence]
  ];

  const shownFeedback = tab === "all" ? feedback :
    feedback.filter(item => tab === "strengths" ? item.type === "strength" : item.type === "improvement");

  const share = async () => {
    const text = `I scored ${result.overallScore}% in my ${result.role} AI interview.`;
    try {
      if (navigator.share) await navigator.share({ title: "AI Interview Result", text });
      else await navigator.clipboard?.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {}
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-button" onClick={() => navigate("/interview/history")}><ArrowLeft size={18} /></button>
          <Logo /><span className="crumb">/</span><span className="top-title">Interview Results</span>
        </div>
        <button className="secondary-button" onClick={share}><Share2 size={15} /> {shared ? "Copied!" : "Share"}</button>
      </header>

      <main className="results-container">
        <section className="result-hero">
          <div className="result-score">
            <ScoreRing score={result.overallScore} size={170} />
            <div>
              <p className="eyebrow"><Sparkles size={13} /> Interview completed</p>
              <h1>Great Job!</h1>
              <p className="muted">You performed better than {Math.max(54, result.overallScore - 4)}% of the users in this role.</p>
            </div>
          </div>
          <div className="metrics">
            {metrics.map(([label, value]) => <Metric key={label} label={label} value={value} />)}
          </div>
        </section>

        <section className="results-grid">
          <div className="feedback-card large">
            <div className="section-heading">
              <div><h2>Detailed Feedback</h2><p className="muted">Understand what went well and where to improve.</p></div>
              <div className="tabs">
                {["all", "strengths", "improvements"].map(t => <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>)}
              </div>
            </div>
            <div className="feedback-list">
              {shownFeedback.map((item, i) => (
                <div className={`feedback-item ${item.type}`} key={`${item.type}-${i}`}>
                  <div className="feedback-icon">{item.type === "strength" ? <CheckCircle2 size={17} /> : <TrendingUp size={17} />}</div>
                  <div><strong>{item.type === "strength" ? "Strength" : "Work on this"}</strong><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="feedback-card">
            <div className="section-heading"><div><h2>Recommendations</h2><p className="muted">Your next steps</p></div><Lightbulb size={18} /></div>
            <div className="recommendations">
              {(result.recommendations || []).map((item, i) => <div key={i}><span>{i + 1}</span>{item}</div>)}
            </div>
            <button className="primary-button wide" onClick={() => navigate("/start-interview")}>Practice Again</button>
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value }) {
  return <div className="metric"><div><span>{label}</span><strong>{value}%</strong></div><div className="metric-bar"><i style={{ width: `${value}%` }} /></div></div>;
}
function formatDate(date) { return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
function formatTime(date) { return new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }); }
