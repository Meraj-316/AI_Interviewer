import React from "react";
import * as Icons from "lucide-react";

export default function RoleIcon({ name, size = 20 }) {
  const Icon = Icons[name] || Icons.Sparkles;
  return <Icon size={size} strokeWidth={1.7} />;
}
