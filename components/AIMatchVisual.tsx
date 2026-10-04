import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface AIMatchVisualProps {
  onStartMatching?: () => void;
}

export const AIMatchVisual: React.FC<AIMatchVisualProps> = ({ onStartMatching }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#312E81]/30 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white p-8 sm:p-10 shadow-lg">
      
      {/* Subtle Background Mesh & Light Spot */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366F1]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#E83E8C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left 45%: Editorial Headline & Explanation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#EEF2FF] backdrop-blur-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E83E8C]" />
            <span>Deterministic Candidate Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight leading-tight text-white">
            Understand why the right candidate matches.
          </h2>

          <p className="text-xs sm:text-sm text-[#C7D2FE] leading-relaxed">
            HireMe AI eliminates hallucination by extracting explicit technical tokens, tenure durations, and educational degrees — verified with verbatim resume evidence.
          </p>

          <div className="pt-2 flex items-center gap-3">
            {onStartMatching && (
              <button
                type="button"
                onClick={onStartMatching}
                className="px-5 py-2.5 rounded-md bg-[#E83E8C] hover:bg-[#D62F7B] text-white font-semibold text-xs inline-flex items-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-lg"
              >
                <span>Launch Matching Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-[11px] text-[#94A3B8] font-mono">
              100-Point Scoring Engine
            </span>
          </div>
        </div>

        {/* Right 55%: Connected Node Intelligence System */}
        <div className="lg:col-span-7 relative h-72 flex items-center justify-center">
          
          {/* Animated SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 240" fill="none">
            {/* Base Connector Curves */}
            <path
              d="M 80 120 C 160 120, 180 120, 250 120 C 320 120, 340 120, 420 120"
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 250 120 C 200 70, 160 50, 110 50"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1.5"
            />
            <path
              d="M 250 120 C 200 170, 160 190, 110 190"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1.5"
            />
            <path
              d="M 250 120 C 300 70, 340 50, 390 50"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1.5"
            />
            <path
              d="M 250 120 C 300 170, 340 190, 390 190"
              stroke="rgba(245, 158, 11, 0.4)"
              strokeWidth="1.5"
            />

            {/* Pulsing signal traveling across center line */}
            <circle r="4" fill="#E83E8C">
              <animateMotion
                path="M 80 120 C 160 120, 180 120, 250 120 C 320 120, 340 120, 420 120"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#10B981">
              <animateMotion
                path="M 110 50 C 160 50, 200 70, 250 120 C 300 120, 340 120, 420 120"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Node 1: Left Requisition */}
          <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-[#0F172A]/90 border border-white/15 p-3 rounded-lg shadow-md backdrop-blur-xs text-xs animate-float-1">
            <span className="text-[10px] text-[#94A3B8] font-mono block uppercase">Requirements</span>
            <span className="font-bold text-white text-xs block mt-0.5">Senior Full Stack</span>
            <span className="text-[10px] text-[#C7D2FE]">3+ yrs · Java/React</span>
          </div>

          {/* Floating Sub-Node: Top Left Skill */}
          <div className="absolute left-16 top-4 z-10 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-300 flex items-center gap-1 shadow-sm animate-float-2">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Java + Spring Boot</span>
          </div>

          {/* Floating Sub-Node: Bottom Left Skill */}
          <div className="absolute left-16 bottom-4 z-10 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-300 flex items-center gap-1 shadow-sm animate-float-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>AWS Cloud 4.2 yrs</span>
          </div>

          {/* Node 2: Center AI Matching Core */}
          <div className="relative z-20 bg-gradient-to-br from-[#1E1B4B] to-[#312E81] border-2 border-[#6366F1] p-3.5 rounded-xl shadow-xl text-center min-w-[120px] backdrop-blur-sm">
            <span className="text-[9px] font-bold text-[#E83E8C] uppercase tracking-wider block">
              AI MATCH
            </span>
            <div className="text-2xl font-black text-white font-mono my-0.5">
              94%
            </div>
            <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-900/60 border border-emerald-500/30 inline-block">
              Strong Match
            </span>
          </div>

          {/* Floating Sub-Node: Top Right Verified */}
          <div className="absolute right-16 top-4 z-10 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-300 flex items-center gap-1 shadow-sm animate-float-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>PostgreSQL REST</span>
          </div>

          {/* Floating Sub-Node: Bottom Right Gap Flag */}
          <div className="absolute right-16 bottom-4 z-10 bg-amber-950/80 border border-amber-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 flex items-center gap-1 shadow-sm animate-float-2">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Kubernetes ⚠</span>
          </div>

          {/* Node 3: Right Candidate Profile */}
          <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-[#0F172A]/90 border border-white/15 p-3 rounded-lg shadow-md backdrop-blur-xs text-xs animate-float-2 text-right">
            <span className="text-[10px] text-[#94A3B8] font-mono block uppercase">Candidate Match</span>
            <span className="font-bold text-white text-xs block mt-0.5">Jane Doe</span>
            <span className="text-[10px] text-emerald-400">✓ Verified Evidence</span>
          </div>
        </div>
      </div>
    </div>
  );
};
