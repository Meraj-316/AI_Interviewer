import React from "react";
import { Bot } from "lucide-react";

export default function Logo({ compact = false }) {
  return (
    <div className="brand">
      <div className="brand-mark"><Bot size={17} /></div>
      {!compact && <span>AI Interviewer</span>}
    </div>
  );
}
