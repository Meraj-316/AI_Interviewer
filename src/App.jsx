import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import StartInterview from "./pages/StartInterview";
import LiveInterview from "./pages/LiveInterview";
import InterviewResults from "./pages/InterviewResults";
import InterviewHistory from "./pages/InterviewHistory";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/start-interview" replace />} />
      <Route path="/start-interview" element={<StartInterview />} />
      <Route path="/interview" element={<LiveInterview />} />
      <Route path="/interview/results" element={<InterviewResults />} />
      <Route path="/interview/history" element={<InterviewHistory />} />
      <Route path="*" element={<Navigate to="/start-interview" replace />} />
    </Routes>
  );
}
