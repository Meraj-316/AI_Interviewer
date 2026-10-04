import React from "react";

export default function ProgressSteps({ current }) {
  const steps = ["Role", "Experience", "Preferences", "Start"];
  return (
    <div className="steps">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className={`step ${i + 1 <= current ? "active" : ""} ${i + 1 === current ? "current" : ""}`}>
            <span>{i + 1}</span>
            <small>{step}</small>
          </div>
          {i < steps.length - 1 && <div className={`step-line ${i + 1 < current ? "filled" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}
