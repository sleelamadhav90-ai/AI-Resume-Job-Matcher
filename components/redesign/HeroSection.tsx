import React from 'react';
import { ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { useCountUp } from '../../lib/useCountUp';

interface HeroSectionProps {
  onStartMatching: () => void;
  onSeeHowItWorks?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartMatching, onSeeHowItWorks }) => {
  const matchScore = useCountUp(94, 800, true);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-[#F5F3EE]">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-black font-heading text-[#171817] tracking-tight leading-[1.05] uppercase">
              FIND THE RIGHT<br />
              TALENT.<br />
              <span className="text-[#174C4A]">UNDERSTAND WHY.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#686A66] leading-relaxed max-w-xl font-sans">
              AI-powered candidate matching that doesn't just rank resumes — it shows you why.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartMatching}
                className="px-7 py-3.5 rounded-xl bg-[#174C4A] hover:bg-[#123B39] text-white font-bold text-sm inline-flex items-center gap-2.5 shadow-sm transition-all cursor-pointer group"
              >
                <span>TRY HIREME AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onSeeHowItWorks || onStartMatching}
                className="px-7 py-3.5 rounded-xl bg-transparent hover:bg-[#F0EEE8] text-[#171817] border border-[#DDDCD6] font-semibold text-sm inline-flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <span>SEE HOW IT WORKS</span>
              </button>
            </div>
          </div>

          {/* RIGHT: ONE DOMINANT CANDIDATE ARTIFACT */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[460px] bg-white rounded-2xl border border-[#DDDCD6] shadow-xl p-7 space-y-6">
              
              {/* Header Info */}
              <div className="flex items-start justify-between pb-5 border-b border-[#DDDCD6]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#171817] text-white flex items-center justify-center font-bold text-lg font-mono">
                    SK
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#171817]">Sarah Kim</h3>
                    <p className="text-xs text-[#686A66] font-medium mt-0.5">Senior Full Stack Engineer</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black font-mono text-[#174C4A] leading-none">
                    {matchScore}%
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#174C4A]">
                    AI FIT SCORE
                  </span>
                </div>
              </div>

              {/* Status Signals */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#DCEAE6]/50 border border-[#28745D]/30 text-xs font-bold text-[#28745D]">
                  <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                  <span>Required skills matched (Java, Spring Boot, AWS)</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#DCEAE6]/50 border border-[#28745D]/30 text-xs font-bold text-[#28745D]">
                  <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                  <span>8+ years experience exceeds role requirements</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FBF4EC] border border-[#B77928]/30 text-xs font-bold text-[#B77928]">
                  <AlertTriangle className="w-4 h-4 text-[#B77928] shrink-0" />
                  <span>Needs review: Docker certification claim pending verification</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
