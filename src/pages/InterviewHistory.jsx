import React, { useMemo, useState } from "react";
import { BarChart3, ChevronRight, Clock3, Filter, History, Search, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { readHistory } from "../data/interviewData";

export default function InterviewHistory() {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [history] = useState(readHistory());

  const roles = ["All Roles", ...Array.from(new Set(history.map(item => item.role)))];

  const filtered = useMemo(() => roleFilter === "All Roles" ? history : history.filter(item => item.role === roleFilter), [history, roleFilter]);
  const average = Math.round(history.reduce((sum, item) => sum + Number(item.score || item.overallScore || 0), 0) / Math.max(1, history.length));
  const excellent = history.filter(x => (x.score || x.overallScore) >= 80).length;
  const good = history.filter(x => (x.score || x.overallScore) >= 60 && (x.score || x.overallScore) < 80).length;
  const averageBand = history.filter(x => (x.score || x.overallScore) >= 40 && (x.score || x.overallScore) < 60).length;

  const openResult = (item) => {
    const result = item.result || {
      ...item,
      overallScore: item.score,
      technicalKnowledge: Math.min(95, item.score + 3),
      problemSolving: Math.max(50, item.score - 2),
      communication: Math.max(50, item.score - 4),
      codeQuality: Math.min(96, item.score + 6),
      confidence: Math.max(50, item.score - 5),
      strengths: ["Strong attempt throughout the interview."],
      improvements: ["Use more concrete examples in future answers."],
      recommendations: ["Practice more role-specific questions", "Review core concepts"]
    };
    localStorage.setItem("ai_interviewer_pending_result", JSON.stringify(result));
    navigate("/interview/results");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left"><Logo /><span className="crumb">/</span><span className="top-title">Interview History</span></div>
        <button className="primary-button" onClick={() => navigate("/start-interview")}>New Interview</button>
      </header>

      <main className="history-container">
        <div className="page-heading-row">
          <div>
            <p className="eyebrow"><History size={13} /> Your progress</p>
            <h1>Interview History</h1>
            <p className="muted">Review your previous interviews and track your improvement over time.</p>
          </div>
          <div className="filter-wrap"><Filter size={15} /><select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>{roles.map(r => <option key={r}>{r}</option>)}</select></div>
        </div>

        <section className="history-stats">
          <Stat icon={<History />} value={history.length} label="Total Interviews" />
          <Stat icon={<Trophy />} value={`${average}%`} label="Average Score" />
          <Stat icon={<Clock3 />} value={`${Math.max(0.5, (history.length * 0.7)).toFixed(1)}h`} label="Hours Practiced" />
          <Stat icon={<BarChart3 />} value={excellent} label="80%+ Scores" />
        </section>

        <section className="history-layout">
          <div className="history-list">
            <div className="list-heading"><h2>Recent Interviews</h2><span>{filtered.length} results</span></div>
            {filtered.map(item => (
              <button className="history-card" key={item.id} onClick={() => openResult(item)}>
                <div className="history-role-icon"><BarChart3 size={18} /></div>
                <div className="history-main">
                  <strong>{item.role}</strong>
                  <span>{item.date} • {item.time}</span>
                  <small>{item.type || "Mixed"} · {item.difficulty || "Medium"}</small>
                </div>
                <div className={`history-score ${scoreClass(item.score || item.overallScore)}`}>{item.score || item.overallScore}%</div>
                <ChevronRight size={17} className="history-arrow" />
              </button>
            ))}
            {!filtered.length && <div className="empty-card">No interviews found for this role.</div>}
          </div>

          <aside className="distribution-card">
            <div className="section-heading"><div><h2>Interview Stats</h2><p className="muted">Score distribution</p></div><Search size={17} /></div>
            <div className="donut" style={{ "--excellent": `${(excellent / Math.max(1, history.length)) * 100}%` }}>
              <div><strong>{history.length}</strong><span>Total</span></div>
            </div>
            <div className="legend">
              <Legend label="Excellent (80–100%)" value={excellent} />
              <Legend label="Good (60–79%)" value={good} />
              <Legend label="Average (40–59%)" value={averageBand} />
              <Legend label="Needs Practice (&lt;40%)" value={Math.max(0, history.length - excellent - good - averageBand)} />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Stat({ icon, value, label }) { return <div className="stat-card"><span className="stat-icon">{icon}</span><div><strong>{value}</strong><small>{label}</small></div></div>; }
function Legend({ label, value }) { return <div className="legend-row"><span><i />{label}</span><strong>{value}</strong></div>; }
function scoreClass(score) { return score >= 80 ? "excellent" : score >= 60 ? "good" : "average"; }
