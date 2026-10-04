import React from 'react';
import { Sparkles, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCountUp } from '../../lib/useCountUp';

export const AICandidateMatchingSection: React.FC = () => {
  const score = useCountUp(92, 750, true);

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 55%: Layered Product UI Cards (Recreating Screenshot 2 Layout) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* CARD 1: CANDIDATE PROFILE & AI INSIGHTS (8 cols on desktop) */}
              <div className="sm:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0D3834] text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                    SK
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#0F172A]">Sarah Kim</h3>
                    <p className="text-xs text-[#64748B]">Senior Product Designer · 8 yrs exp</p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-200/60 inline-block">
                    AI Insight
                  </span>

                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Role-specific experience</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6">
                      Led design systems at 2 growth-stage SaaS cos.<br />
                      <span className="text-emerald-700 font-medium">Matches: design system, SaaS, growth stage</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Leadership signal</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6">
                      Managed 4-person team, mentored 2 junior ICs.<br />
                      <span className="text-emerald-700 font-medium">Matches: people management, mentorship</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Salary consideration</span>
                    </div>
                    <p className="text-[11px] text-amber-800 pl-6">
                      Target expectation slightly above band ($160k vs $145k).
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT STACK (5 cols on desktop): Gauge Card & Skill Match Card */}
              <div className="sm:col-span-5 space-y-4 flex flex-col justify-between">
                
                {/* CARD 2: FIT SCORE CIRCULAR GAUGE */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-5 flex items-center justify-around">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Ring SVG */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#0D3834]"
                        strokeDasharray={`${score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black font-mono text-[#0D3834] block leading-none">{score}</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">match</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#0F172A] block">Fit Score</span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Strong Match</span>
                    <span className="text-[10px] text-slate-500 font-mono">100-Pt Rubric</span>
                  </div>
                </div>

                {/* CARD 3: SKILL MATCH PROGRESS BARS */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-5 space-y-3">
                  <span className="text-xs font-bold text-[#0F172A] block">Skill Match</span>

                  <div className="space-y-2 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-700 mb-0.5 font-medium">
                        <span>Design Systems / Java</span>
                        <span className="font-mono font-bold text-[#0D3834]">95%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[95%] h-full bg-[#0D3834] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 mb-0.5 font-medium">
                        <span>Prototyping / Spring Boot</span>
                        <span className="font-mono font-bold text-[#0D3834]">88%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[88%] h-full bg-[#0D3834] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 mb-0.5 font-medium">
                        <span>Cross-functional / SQL</span>
                        <span className="font-mono font-bold text-[#0D3834]">82%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[82%] h-full bg-[#0D3834] rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 mb-0.5 font-medium">
                        <span>Frontend Dev / AWS</span>
                        <span className="font-mono font-bold text-[#0D3834]">78%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[78%] h-full bg-[#0D3834] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT 45%: Editorial Headline & Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-block">
              AI-POWERED INSIGHTS
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0F172A] tracking-tight leading-[1.08]">
              More Clarity,<br />
              Less Guesswork.
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Every AI-powered recommendation comes with context, so you make hiring decisions with confidence. HireMe AI breaks down candidate profiles into verifiable skill tokens, tenure metrics, and audit flags.
            </p>

            <div className="pt-2 space-y-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Verbatim resume excerpts backing every awarded point</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>4-tier credibility auditing to flag unverified claims</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Deterministic scoring engine eliminates AI hallucination drift</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
