import React from 'react';
import { Logo } from './Logo';
import { Sparkles, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-20 text-xs text-[#6B7280]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#F3F4F6]">
          
          <div className="space-y-3 md:col-span-2">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-[#4B5563] max-w-sm leading-relaxed">
              HireMe AI delivers deterministic candidate matching and explainable recruitment intelligence, backed by verbatim resume evidence and 100-point rubric scoring.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#202124] uppercase tracking-wider text-[11px] block">
              Core Capabilities
            </span>
            <ul className="space-y-1.5 text-xs text-[#6B7280]">
              <li>Multi-PDF Resume Ingestion</li>
              <li>Deterministic Scoring Matrix</li>
              <li>Verbatim Evidence Extraction</li>
              <li>4-Tier Claim Verification</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#202124] uppercase tracking-wider text-[11px] block">
              ATS Compliance
            </span>
            <ul className="space-y-1.5 text-xs text-[#6B7280]">
              <li>Zero Model Hallucination</li>
              <li>Fact-Grounded Ranking</li>
              <li>Recruiter Audit Logs</li>
              <li>Full Privacy & Security</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#9CA3AF]">
          <span>© 2026 HireMe AI Inc. All rights reserved. Deterministic Candidate Matching Engine.</span>
          <div className="flex items-center gap-4 text-[#6B7280]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Audit Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
