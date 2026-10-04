import React from 'react';
import { Sparkles, CheckCircle2, BookmarkCheck, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

const SIGNALS = [
  { type: 'match', label: 'Jane Doe', score: '94%', tag: 'Strong Match', initials: 'JD', bg: 'bg-[#202124]' },
  { type: 'skill', label: 'React.js & TypeScript', tag: 'Skills Verified ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { type: 'exp', label: 'AWS Cloud Architecture', tag: '4.2 Yrs Tenure ✓', color: 'text-[#6366F1] bg-[#EEF2FF] border-[#6366F1]/20' },
  { type: 'match', label: 'Priya Patel', score: '92%', tag: 'Shortlisted', initials: 'PP', bg: 'bg-[#6366F1]' },
  { type: 'evidence', label: 'REST APIs & Microservices', tag: 'Resume Evidence Verified', color: 'text-[#374151] bg-[#F9FAFB] border-[#E5E7EB]' },
  { type: 'match', label: 'Rahul Sharma', score: '88%', tag: 'Good Match', initials: 'RS', bg: 'bg-[#0D9488]' },
  { type: 'flag', label: 'Kubernetes Cluster', tag: 'Audit Flag ⚠', color: 'text-amber-800 bg-amber-50 border-amber-200' },
  { type: 'match', label: 'Vikram Mehta', score: '91%', tag: 'DevOps Matched', initials: 'VM', bg: 'bg-[#4F46E5]' },
  // Duplicate for seamless loop
  { type: 'match', label: 'Jane Doe', score: '94%', tag: 'Strong Match', initials: 'JD', bg: 'bg-[#202124]' },
  { type: 'skill', label: 'React.js & TypeScript', tag: 'Skills Verified ✓', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { type: 'exp', label: 'AWS Cloud Architecture', tag: '4.2 Yrs Tenure ✓', color: 'text-[#6366F1] bg-[#EEF2FF] border-[#6366F1]/20' },
  { type: 'match', label: 'Priya Patel', score: '92%', tag: 'Shortlisted', initials: 'PP', bg: 'bg-[#6366F1]' },
  { type: 'evidence', label: 'REST APIs & Microservices', tag: 'Resume Evidence Verified', color: 'text-[#374151] bg-[#F9FAFB] border-[#E5E7EB]' },
  { type: 'match', label: 'Rahul Sharma', score: '88%', tag: 'Good Match', initials: 'RS', bg: 'bg-[#0D9488]' },
  { type: 'flag', label: 'Kubernetes Cluster', tag: 'Audit Flag ⚠', color: 'text-amber-800 bg-amber-50 border-amber-200' },
  { type: 'match', label: 'Vikram Mehta', score: '91%', tag: 'DevOps Matched', initials: 'VM', bg: 'bg-[#4F46E5]' },
];

export const HiringSignalsMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] select-none">
      <div className="animate-marquee-signals flex items-center gap-4 whitespace-nowrap">
        {SIGNALS.map((sig, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white border border-[#E5E7EB] shadow-2xs text-xs"
          >
            {sig.initials ? (
              <div className={`w-5 h-5 rounded-full ${sig.bg} text-white flex items-center justify-center font-bold text-[10px] font-mono`}>
                {sig.initials}
              </div>
            ) : (
              <Zap className="w-3.5 h-3.5 text-[#6366F1]" />
            )}

            <span className="font-semibold text-[#202124]">{sig.label}</span>

            {sig.score && (
              <span className="font-mono font-bold text-[#6366F1]">{sig.score}</span>
            )}

            <span
              className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                sig.color || 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }`}
            >
              {sig.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
