import React from 'react';
import { Sparkles, Check, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Users, Award, ChevronRight, FileText } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { Logo } from './Logo';

interface ATSProductShowcaseProps {
  onLaunchMatching: () => void;
  onSelectJob: (jobTitle: string) => void;
}

export const ATSProductShowcase: React.FC<ATSProductShowcaseProps> = ({
  onLaunchMatching,
  onSelectJob,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN (40% / 5 cols): BIG EDITORIAL STATEMENT */}
        {/* ========================================================================= */}
        <div
          className={`lg:col-span-5 space-y-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold font-mono tracking-wider border border-[#6366F1]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / ATS OPERATIONS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold font-heading text-[#202124] tracking-tight leading-[1.04]">
            NOW MAKE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#E83E8C]">
              THE DECISION.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed font-sans max-w-md">
            Everything HireMe AI has analyzed is now organized for human review. Inspect verified claims, audit signals, and deterministic candidate rankings in one unified workspace.
          </p>

          <div className="space-y-2.5 pt-2 text-xs sm:text-sm font-semibold text-[#202124]">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-800">
                AI Analysis Complete
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-800">
                Evidence Verified
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-800">
                Candidates Ranked
              </span>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={onLaunchMatching}
              className="px-6 py-3.5 bg-[#202124] hover:bg-black text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2.5 cursor-pointer transition-all shadow-sm hover:shadow-md hover:translate-x-0.5"
            >
              <span>Launch Matching Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN (60% / 7 cols): LARGE PRODUCT SHOWCASE WITH DEPTH & FLOATING SIGNALS */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 relative">
          
          {/* Depth Layer: Offset Backing Card */}
          <div className="hidden sm:block absolute inset-0 bg-white/60 rounded-2xl border border-[#E2E8F0] shadow-sm transform translate-x-3 -translate-y-3 -rotate-1 pointer-events-none z-0" />

          {/* Main Product Canvas Container */}
          <div
            className={`relative z-10 bg-white rounded-xl border border-[#E5E7EB] shadow-xl overflow-hidden transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Miniature Application Top Bar */}
            <div className="bg-[#FAFBFC] border-b border-[#E5E7EB] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#202124]" />
                  <span className="font-bold text-xs text-[#202124] font-heading">HireMe AI</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#6B7280] font-medium">
                  <span className="text-[#202124] font-semibold">Active Requisitions</span>
                  <span>Candidates</span>
                  <span>Matching</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-[#6B7280]">Real-time Evaluation</span>
              </div>
            </div>

            {/* Showcase Body Content */}
            <div className="p-5 sm:p-6 space-y-6">
              
              {/* Part 1: Active Requisitions Preview */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#6B7280] uppercase tracking-wider">
                    Requisitions
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    4 Active
                  </span>
                </div>

                <div className="space-y-1.5">
                  {/* Job 1: Senior Full Stack Engineer */}
                  <div
                    onClick={() => onSelectJob('Senior Full Stack Engineer')}
                    className="p-2.5 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC] hover:bg-[#F3F4F6] transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#202124] group-hover:text-[#6366F1] transition-colors">
                          Senior Full Stack Engineer
                        </span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      </div>
                      <span className="text-[10px] text-[#6B7280]">Engineering · Hyderabad · 42 candidates</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono font-bold text-xs text-emerald-700">94%</span>
                        <span className="text-[9px] text-[#9CA3AF] block font-mono">Top Match</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Job 2: Lead Frontend Developer */}
                  <div
                    onClick={() => onSelectJob('Lead Frontend Developer')}
                    className="p-2.5 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC] hover:bg-[#F3F4F6] transition-colors flex items-center justify-between cursor-pointer group opacity-90"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#202124] group-hover:text-[#6366F1] transition-colors">
                          Lead Frontend Developer
                        </span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      </div>
                      <span className="text-[10px] text-[#6B7280]">Engineering · Bangalore · 31 candidates</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono font-bold text-xs text-[#6366F1]">89%</span>
                        <span className="text-[9px] text-[#9CA3AF] block font-mono">Top Match</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Candidate Talent Pool Preview */}
              <div className="space-y-2.5 pt-2 border-t border-[#F3F4F6]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#6B7280] uppercase tracking-wider">
                    Candidate Talent Pool
                  </span>
                  <span className="text-[10px] font-mono text-[#6366F1] font-semibold">
                    Evaluated Dossiers
                  </span>
                </div>

                <div className="space-y-1.5">
                  {/* Candidate 1: Jane Doe */}
                  <div className="p-2.5 rounded-lg border-l-2 border-l-emerald-600 border border-[#E5E7EB] bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                        JD
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#202124]">Jane Doe</div>
                        <span className="text-[10px] text-[#6B7280]">Senior Full Stack · 4.2 yrs · Java, Spring Boot, AWS</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-xs text-emerald-700">94%</span>
                      <span className="text-[9px] font-mono uppercase text-emerald-800 block">Strong Match</span>
                    </div>
                  </div>

                  {/* Candidate 2: Rahul Sharma */}
                  <div className="p-2.5 rounded-lg border-l-2 border-l-[#6366F1] border border-[#E5E7EB] bg-white flex items-center justify-between opacity-95">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#202124] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                        RS
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#202124]">Rahul Sharma</div>
                        <span className="text-[10px] text-[#6B7280]">Backend Developer · 3.5 yrs · Java, Spring Boot, SQL</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-xs text-[#6366F1]">88%</span>
                      <span className="text-[9px] font-mono uppercase text-[#6366F1] block">Good Match</span>
                    </div>
                  </div>

                  {/* Candidate 3: Priya Patel */}
                  <div className="p-2.5 rounded-lg border-l-2 border-l-emerald-600 border border-[#E5E7EB] bg-white flex items-center justify-between opacity-90">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#047857] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                        PP
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#202124]">Priya Patel</div>
                        <span className="text-[10px] text-[#6B7280]">Frontend Architect · 5.0 yrs · React, TypeScript</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-xs text-emerald-700">92%</span>
                      <span className="text-[9px] font-mono uppercase text-emerald-800 block">Strong Match</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* FLOATING AI SIGNAL ELEMENTS (Layered around the interface) */}
          {/* ========================================================================= */}
          
          {/* Floating Element 1: Top-Right Match Signal */}
          <div
            className={`hidden sm:flex absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-[#E5E7EB] shadow-lg items-center gap-3 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-black text-xs border border-emerald-200">
              94%
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#202124] block leading-none">
                Deterministic Match
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">
                100-pt rubric verified
              </span>
            </div>
          </div>

          {/* Floating Element 2: Bottom-Right Evidence Verified */}
          <div
            className={`hidden sm:flex absolute -bottom-5 -right-3 z-20 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-[#6366F1]/25 shadow-lg items-center gap-2 text-xs font-semibold text-[#202124] transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <ShieldCheck className="w-4 h-4 text-[#6366F1]" />
            <span>Verbatim Evidence Grounded</span>
          </div>

          {/* Floating Element 3: Bottom-Left Candidates Signal */}
          <div
            className={`hidden sm:flex absolute -bottom-4 -left-4 z-20 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-[#E5E7EB] shadow-lg items-center gap-2 text-xs font-semibold text-[#202124] transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <Users className="w-4 h-4 text-[#202124]" />
            <span className="font-mono text-xs">6 / 6 Evaluated</span>
          </div>

        </div>

      </div>
    </div>
  );
};
