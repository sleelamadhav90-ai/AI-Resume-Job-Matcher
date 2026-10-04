import React from 'react';
import { Sparkles, ArrowRight, Check, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { useCountUp } from '../lib/useCountUp';

interface ScrollStoryHeroProps {
  onStartMatching: () => void;
}

export const ScrollStoryHero: React.FC<ScrollStoryHeroProps> = ({ onStartMatching }) => {
  const score = useCountUp(94, 850, true);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT SIDE: Editorial Typography & Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold uppercase tracking-wider border border-[#6366F1]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Talent Matching</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold font-heading text-[#17181A] tracking-tight leading-[1.06]">
            FIND THE RIGHT<br />
            TALENT.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17181A] via-[#4338CA] to-[#E83E8C]">
              UNDERSTAND WHY.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#6B7280] leading-relaxed max-w-xl font-sans">
            AI-powered resume matching that ranks candidates, explains every match, and flags claims that need review.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartMatching}
              className="px-6 py-3.5 rounded-lg bg-[#17181A] hover:bg-black text-white font-semibold text-sm inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Try HireMe AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onStartMatching}
              className="px-6 py-3.5 rounded-lg bg-white hover:bg-[#F3F4F6] text-[#17181A] border border-[#E5E7EB] font-semibold text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>See how it works</span>
            </button>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-[#6B7280] font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Hallucination Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#6366F1]" />
              <span>Instant PDF Extraction</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Aceternity 3D Layered Resume Card Artifact */}
        <div className="lg:col-span-6 relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center">
          
          <div className="relative w-full max-w-[500px] h-[460px] sm:h-[500px]">
            
            {/* Background Sheet 2 */}
            <div className="absolute top-0 left-6 sm:left-12 w-[340px] sm:w-[400px] h-[420px] bg-[#E5E7EB] rounded-2xl border border-[#D1D5DB] shadow-lg transform -rotate-6 opacity-40 pointer-events-none" />

            {/* Background Sheet 1 */}
            <div className="absolute top-4 left-3 sm:left-6 w-[350px] sm:w-[410px] h-[420px] bg-[#F3F4F6] rounded-2xl border border-[#D1D5DB] shadow-xl transform -rotate-3 opacity-80 pointer-events-none" />

            {/* MAIN RESUME ARTIFACT (Aceternity 3D Card Effect) */}
            <div className="absolute top-8 left-0 w-[360px] sm:w-[420px] bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl p-7 transform hover:rotate-0 transition-all duration-500 z-10">
              <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                <div>
                  <h3 className="font-extrabold text-base text-[#17181A]">JANE DOE</h3>
                  <p className="text-xs text-[#6B7280] font-medium">Software Engineer</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#F3F4F6] text-[#17181A] text-[10px] font-mono font-bold">
                  RESUME.PDF
                </span>
              </div>

              <div className="space-y-4 pt-4 text-xs">
                <div>
                  <span className="font-bold text-[10px] uppercase font-mono text-[#9CA3AF] tracking-wider block mb-1">Experience</span>
                  <p className="text-[#374151] font-medium">Software Engineer — 3 years active professional tenure</p>
                </div>

                <div>
                  <span className="font-bold text-[10px] uppercase font-mono text-[#9CA3AF] tracking-wider block mb-1">Skills Ingested</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#17181A] rounded font-medium text-[10px]">Java</span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#17181A] rounded font-medium text-[10px]">Spring Boot</span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#17181A] rounded font-medium text-[10px]">React</span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#17181A] rounded font-medium text-[10px]">PostgreSQL</span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#17181A] rounded font-medium text-[10px]">AWS</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F3F4F6] space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-[#17181A]">
                    <span className="flex items-center gap-1.5 font-medium"><Check className="w-3.5 h-3.5 text-emerald-600" /> Java</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Required</span>
                  </div>
                  <div className="flex items-center justify-between text-[#17181A]">
                    <span className="flex items-center gap-1.5 font-medium"><Check className="w-3.5 h-3.5 text-emerald-600" /> Spring Boot</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Required</span>
                  </div>
                  <div className="flex items-center justify-between text-[#17181A]">
                    <span className="flex items-center gap-1.5 font-medium"><AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Kubernetes</span>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">Needs Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING MATCH SCORE BADGE (Magic UI Number Ticker) */}
            <div className="absolute -top-4 -right-2 sm:-right-6 bg-[#17181A] text-white rounded-2xl p-5 shadow-2xl z-30 transform rotate-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-emerald-400">
                  {score}%
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] block">
                    Match Score
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    Strong Match
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
