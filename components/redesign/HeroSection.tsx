import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Clock, FileText, Check, AlertTriangle } from 'lucide-react';
import { useCountUp } from '../../lib/useCountUp';

interface HeroSectionProps {
  onStartMatching: () => void;
  onSeeHowItWorks?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartMatching, onSeeHowItWorks }) => {
  const matchScore = useCountUp(94, 800, true);

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-[#FAFAFC]">
      {/* Subtle Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#17181A 1px, transparent 1px)`,
          backgroundSize: `24px 24px`,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 55%: Editorial Typography & Value Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Next-Generation Intelligent Recruiting</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold font-heading text-[#111318] tracking-tight leading-[1.05]">
              Discover better candidates.<br />
              Screen intelligently.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-[#0D3834] to-[#0A2E2B]">
                Automate hiring.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#525866] leading-relaxed max-w-xl font-sans pt-1">
              HireMe AI combines AI-powered resume parsing, deterministic 100-point skill matching, and automated candidate workflows so your team can make faster, confident hiring decisions.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartMatching}
                className="px-7 py-3.5 rounded-xl bg-[#0D3834] hover:bg-[#082825] text-white font-bold text-sm inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Try HireMe AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onSeeHowItWorks || onStartMatching}
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#111318] border border-[#E2E4E9] font-semibold text-sm inline-flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#E2E4E9] flex flex-wrap items-center gap-6 text-xs text-[#525866] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Deterministic 100-Pt Rubric</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D3834]" />
                <span>Verbatim Resume Evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>12h+ Saved Weekly</span>
              </div>
            </div>
          </div>

          {/* RIGHT 45%: Product Visualization & Floating Cards (Lever Inspired) */}
          <div className="lg:col-span-6 relative min-h-[500px] sm:min-h-[540px] flex items-center justify-center">
            
            {/* MAIN REALISTIC CANDIDATE PROFILE UI CARD */}
            <div className="relative w-full max-w-[480px] bg-white rounded-3xl border border-[#E2E4E9] shadow-2xl p-6 sm:p-7 z-10 space-y-5">
              
              {/* Profile Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#F0F2F5]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D3834] to-[#14524C] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    SK
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#111318]">Sarah Kim</h3>
                    <p className="text-xs text-[#525866] font-medium">Senior Full Stack Engineer · 8 yrs exp</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold border border-emerald-200/80">
                    SHORTLISTED
                  </span>
                </div>
              </div>

              {/* Match Score & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F6F8FA] border border-[#E2E4E9] space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#717680] block font-semibold">
                    AI Fit Score
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-[#0D3834]">{matchScore}%</span>
                    <span className="text-[11px] font-bold text-emerald-700">Strong Match</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F8FA] border border-[#E2E8F0] space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#717680] block font-semibold">
                    Role Match Status
                  </span>
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>All Must-Haves Met</span>
                  </div>
                </div>
              </div>

              {/* AI Insights & Checks */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#717680] tracking-wider block">
                  Role Requirements Fit
                </span>

                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between text-[#111318]">
                  <span className="flex items-center gap-2 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Java & Spring Boot Microservices</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold">4.5 yrs</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between text-[#111318]">
                  <span className="flex items-center gap-2 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>AWS Cloud Architecture & Postgres</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold">Verified</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between text-[#111318]">
                  <span className="flex items-center gap-2 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Kubernetes Cluster Tenure</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-800 font-bold">Needs Review</span>
                </div>
              </div>

              {/* Skills Progress */}
              <div className="space-y-2 pt-1 border-t border-[#F0F2F5]">
                <div className="flex items-center justify-between text-[11px] font-medium text-[#525866]">
                  <span>Skill Match Breakdown</span>
                  <span className="font-mono text-emerald-700 font-bold">92% Average</span>
                </div>
                <div className="w-full h-2 bg-[#F0F2F5] rounded-full overflow-hidden flex">
                  <div className="w-[95%] h-full bg-[#0D3834] rounded-full" />
                </div>
              </div>

            </div>

            {/* FLOATING CARD 1: Top Right "12h saved this week" (Inspired by Screenshot 2) */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white rounded-2xl border border-[#E2E4E9] p-4 shadow-xl z-20 hidden sm:flex items-center gap-3 animate-bounce-subtle">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-base text-[#111318]">12h</span>
                  <span className="text-xs font-medium text-[#525866]">saved this week</span>
                </div>
                <div className="w-24 h-1.5 bg-emerald-100 rounded-full mt-1 overflow-hidden">
                  <div className="w-[80%] h-full bg-emerald-600 rounded-full" />
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2: Bottom Left "Running on Autopilot" */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-[#0D3834] text-white rounded-2xl p-4 shadow-2xl z-20 hidden sm:block max-w-[220px] text-xs space-y-1.5 border border-emerald-500/30">
              <div className="flex items-center justify-between text-[10px] text-emerald-300 font-mono font-bold uppercase tracking-wider">
                <span>AUTOPILOT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="font-bold text-white text-xs">87% Automated Screening</p>
              <p className="text-[11px] text-emerald-200/80">14 candidate profiles parsed & matched in background</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
