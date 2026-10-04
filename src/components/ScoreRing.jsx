import React from "react";

export default function ScoreRing({ score = 0, size = 150 }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="score-svg">
        <circle className="ring-bg" cx="60" cy="60" r={radius} />
        <circle
          className="ring-value"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div className="score-center">
        <strong>{score}%</strong>
        <span>Overall Score</span>
      </div>
    </div>
  );
}
