import React, { useState } from "react";
import { ArrowLeft, Check, ChevronRight, Clock3, Gauge, Hash, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import ProgressSteps from "../components/ProgressSteps";
import RoleIcon from "../components/RoleIcon";
import { roles, saveCurrentInterview } from "../data/interviewData";

const experienceOptions = ["Fresher", "0–1 years", "1–3 years", "3–5 years", "5+ years"];

export default function StartInterview() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    roleId: "frontend",
    role: "Frontend Developer",
    experience: "Fresher",
    difficulty: "Medium",
    type: "Mixed",
    questions: 5,
    duration: 15
  });

  const selectedRole = roles.find(r => r.id === config.roleId);

  const next = () => setStep(s => Math.min(4, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const start = () => {
    const interview = {
      ...config,
      id: `interview-${Date.now()}`,
      startedAt: new Date().toISOString(),
      currentQuestion: 0,
      answers: []
    };
    saveCurrentInterview(interview);
    navigate("/interview");
  };

  return (
    <div className="app-shell setup-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-button" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
          <Logo />
          <span className="crumb">/</span>
          <span className="top-title">Start New Interview</span>
        </div>
        <button className="ghost-button">Choose Your Plan</button>
      </header>

      <main className="setup-container">
        <ProgressSteps current={step} />

        <section className="setup-heading">
          <div>
            <p className="eyebrow"><Sparkles size={13} /> AI Interview Setup</p>
            <h1>{step === 1 ? "Select the role you're interviewing for" :
              step === 2 ? "Tell us about your experience" :
              step === 3 ? "Customize your interview" :
              "Ready to start?"}</h1>
            <p className="muted">
              {step === 1 ? "Choose a role to personalize your interview questions." :
               step === 2 ? "We'll adjust the questions to match your experience level." :
               step === 3 ? "Set the difficulty, format and length of your practice interview." :
               "Review your selections before meeting your AI interviewer."}
            </p>
          </div>
        </section>

        {step === 1 && (
          <div className="role-grid">
            {roles.map(role => (
              <button
                key={role.id}
                className={`role-card ${config.roleId === role.id ? "selected" : ""}`}
                onClick={() => setConfig(c => ({ ...c, roleId: role.id, role: role.name }))}
              >
                <span className="role-icon"><RoleIcon name={role.icon} /></span>
                <span className="role-name">{role.name}</span>
                {config.roleId === role.id && <span className="selected-check"><Check size={12} /></span>}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="choice-grid five">
            {experienceOptions.map(option => (
              <button key={option} className={`choice-card ${config.experience === option ? "selected" : ""}`}
                onClick={() => setConfig(c => ({ ...c, experience: option }))}>
                <span className="choice-number">{option === "Fresher" ? "0" : option.replace(" years", "")}</span>
                <strong>{option}</strong>
                <span className="muted">{option === "Fresher" ? "Starting my career" : "Professional experience"}</span>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="preferences-grid">
            <PreferenceGroup title="Difficulty" icon={<Gauge size={17} />} options={["Easy", "Medium", "Hard"]}
              value={config.difficulty} onChange={v => setConfig(c => ({ ...c, difficulty: v }))} />
            <PreferenceGroup title="Interview type" icon={<Sparkles size={17} />} options={["Technical", "Behavioral", "Mixed"]}
              value={config.type} onChange={v => setConfig(c => ({ ...c, type: v }))} />
            <PreferenceGroup title="Questions" icon={<Hash size={17} />} options={[5, 10, 15]}
              value={config.questions} onChange={v => setConfig(c => ({ ...c, questions: Number(v) }))} />
            <PreferenceGroup title="Duration" icon={<Clock3 size={17} />} options={[10, 15, 30]}
              suffix=" min" value={config.duration} onChange={v => setConfig(c => ({ ...c, duration: Number(v) }))} />
          </div>
        )}

        {step === 4 && (
          <div className="summary-layout">
            <div className="summary-card">
              <div className="summary-hero">
                <div className="summary-role-icon"><RoleIcon name={selectedRole?.icon} size={25} /></div>
                <div>
                  <span className="muted">You're preparing for</span>
                  <h2>{config.role}</h2>
                </div>
              </div>
              <div className="summary-items">
                <SummaryItem label="Experience" value={config.experience} />
                <SummaryItem label="Difficulty" value={config.difficulty} />
                <SummaryItem label="Interview Type" value={config.type} />
                <SummaryItem label="Questions" value={`${config.questions} questions`} />
                <SummaryItem label="Duration" value={`${config.duration} minutes`} />
              </div>
            </div>
            <div className="ready-card">
              <div className="ready-orb"><Sparkles size={26} /></div>
              <h3>You're all set</h3>
              <p className="muted">Find a quiet place, take a breath and answer naturally. Your AI interviewer will evaluate your performance.</p>
              <button className="primary-button wide" onClick={start}><Play size={16} fill="currentColor" /> Start Interview</button>
            </div>
          </div>
        )}

        <div className="setup-actions">
          {step > 1 && <button className="secondary-button" onClick={back}><ArrowLeft size={15} /> Back</button>}
          {step < 4 && <button className="primary-button" onClick={next}>Next <ChevronRight size={16} /></button>}
        </div>
      </main>
    </div>
  );
}

function PreferenceGroup({ title, icon, options, value, onChange, suffix = "" }) {
  return (
    <div className="preference-card">
      <h3>{icon} {title}</h3>
      <div className="segmented">
        {options.map(option => (
          <button key={option} className={value === option ? "active" : ""} onClick={() => onChange(option)}>
            {option}{suffix && suffix}
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return <div className="summary-item"><span>{label}</span><strong>{value}</strong></div>;
}
