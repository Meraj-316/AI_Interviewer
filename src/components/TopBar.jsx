import React from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import Logo from "./Logo";

export default function TopBar({ title, action, onBack = null }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        {onBack && (
          <button className="icon-button" onClick={onBack} aria-label="Back">
            <ArrowLeft size={18} />
          </button>
        )}
        <Logo />
        {title && <><span className="crumb">/</span><span className="top-title">{title}</span></>}
      </div>
      {action || null}
    </header>
  );
}

export function ShareButton({ onClick }) {
  return (
    <button className="secondary-button" onClick={onClick}>
      <Share2 size={15} /> Share
    </button>
  );
}
