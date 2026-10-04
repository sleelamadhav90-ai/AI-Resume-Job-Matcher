import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, FileText, Check, Quote, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { useCountUp } from '../lib/useCountUp';

export const EvidenceMatchingStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const score = useCountUp(94, 800, isInView);

  return (
    <section ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB]">
      <div className="space-y-12">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
            02 / Explainable Evidence
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#202124] tracking-tight leading-[1.12]">
            NOT JUST A SCORE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#6366F1]">
              THE REASON BEHIND IT.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
            Every candidate score is grounded in verifiable resume facts. Examine exact excerpt evidence, tenure calculations, and flagged claims before human decision-making.
          </p>
        </div>

        {/* Unified Match Dossier Canvas */}
        <div
          className={`bg-white rounded-xl border border-[#E5E7EB] p-8 sm:p-12 shadow-sm space-y-10 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Visual Anchor: 94% STRONG MATCH */}
          <div className="text-center space-y-2 pb-8 border-b border-[#F3F4F6]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280] font-mono">
              Candidate Evaluation
            </span>
            <div className="text-6xl sm:text-7xl font-black text-[#202124] font-mono tracking-tight">
              {score}%
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>STRONG MATCH</span>
            </div>
            <span className="text-xs text-[#6B7280] block">
              Jane Doe · Evaluated for Senior Full Stack Engineer opening
            </span>
          </div>

          {/* 3 Connected Evaluation Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F3F4F6]">
            
            {/* Dimension 1: Skills */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-[#202124]">
                  SKILLS
                </span>
                <span className="font-mono font-bold text-xs text-emerald-700">
                  30 / 30
                </span>
              </div>

              {/* Score Bar */}
              <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '100%' }} />
              </div>

              <div className="space-y-1.5 text-xs text-[#374151] pt-1">
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Java (Core & Advanced)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Spring Boot & Microservices</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PostgreSQL & REST APIs</span>
                </div>
              </div>
            </div>

            {/* Dimension 2: Experience */}
            <div className="pt-6 md:pt-0 md:pl-8 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-[#202124]">
                  EXPERIENCE
                </span>
                <span className="font-mono font-bold text-xs text-[#202124]">
                  25 / 25
                </span>
              </div>

              {/* Score Bar */}
              <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div className="h-full bg-[#202124] rounded-full" style={{ width: '100%' }} />
              </div>

              <div className="space-y-1 text-xs text-[#374151] pt-1">
                <div className="font-bold text-sm text-[#202124]">
                  4.2 yrs verified tenure
                </div>
                <div className="text-xs text-[#6B7280]">
                  Requirement: 3+ yrs (Satisfied)
                </div>
                <div className="text-xs text-emerald-700 font-medium">
                  ✓ Full-time production experience
                </div>
              </div>
            </div>

            {/* Dimension 3: Projects & Gaps */}
            <div className="pt-6 md:pt-0 md:pl-8 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-[#202124]">
                  PROJECTS & AUDIT
                </span>
                <span className="font-mono font-bold text-xs text-[#6366F1]">
                  39 / 45
                </span>
              </div>

              {/* Score Bar */}
              <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '86%' }} />
              </div>

              <div className="space-y-1.5 text-xs text-[#374151] pt-1">
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fintech transaction backend</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kubernetes: Needs interview verification</span>
                </div>
              </div>
            </div>

          </div>

          {/* Evidence as a Reveal Box */}
          <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EEF2FF] text-[#6366F1] text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>EVIDENCE FOUND</span>
              </div>
              <span className="text-xs text-[#6B7280] font-mono">
                SOURCE: Jane Doe — Resume.pdf
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#1E293B] italic leading-relaxed font-serif pl-3 border-l-2 border-[#6366F1]">
              "Architected and deployed Java Spring Boot microservices handling over 50,000 requests per minute with PostgreSQL on AWS infrastructure, reducing latency by 32%."
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-[#6B7280]">
              <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ⚠ KUBERNETES: Flagged for technical interview screening
              </span>
              <span className="text-[#6366F1] font-mono text-[11px]">
                Deterministic Rule Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
