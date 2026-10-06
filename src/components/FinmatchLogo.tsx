import React from "react";

export function FinmatchLogo({ className = "w-[180px] h-[40px]" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40" className={className} fill="none">
      <rect x="2" y="4" width="32" height="32" rx="8" fill="#1E3A8A"/>
      <path d="M10 24L15 14L20 20L26 12" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="26" cy="12" r="2.5" fill="#3B82F6"/>
      <path d="M10 27H26" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3"/>
      <text x="42" y="22" fontFamily="'DM Sans', system-ui, sans-serif" fontWeight="800" fontSize="16" fill="#0F172A" letterSpacing="-0.02em">FINMATCH</text>
      <rect x="135" y="10" width="22" height="14" rx="4" fill="#EFF6FF"/>
      <text x="146" y="20.5" fontFamily="'DM Sans', system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#2563EB" textAnchor="middle">AI</text>
      <text x="42" y="32" fontFamily="'DM Sans', system-ui, sans-serif" fontWeight="600" fontSize="8" fill="#64748B" letterSpacing="0.06em">FINANCIAL DECISION SUITE</text>
    </svg>
  );
}
