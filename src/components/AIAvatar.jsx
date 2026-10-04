import React from "react";
import { Bot } from "lucide-react";

export default function AIAvatar({ small = false, listening = false }) {
  return (
    <div className={`ai-avatar ${small ? "small" : ""} ${listening ? "listening" : ""}`}>
      <div className="avatar-face">
        <div className="avatar-eyes"><span /><span /></div>
        <div className="avatar-mouth" />
      </div>
      <div className="avatar-glow" />
      {!small && <Bot className="avatar-icon" size={18} />}
    </div>
  );
}
