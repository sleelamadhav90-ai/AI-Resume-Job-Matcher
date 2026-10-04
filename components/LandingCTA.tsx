import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingCTAProps {
  onStartMatching: () => void;
}

export const LandingCTA: React.FC<LandingCTAProps> = ({ onStartMatching }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#17181A] text-white -mx-6 sm:-mx-10 px-6 sm:px-10 relative overflow-hidden">
      
      {/* Subtle Spotlight Glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6366F1]/20 via-[#E83E8C]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#E83E8C]" />
          <span>AI-Powered Talent Matching</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
          STOP SCREENING<br />
          RESUMES BLINDLY.
        </h2>

        <p className="text-base sm:text-xl text-[#9CA3AF] leading-relaxed max-w-xl mx-auto font-sans">
          Upload a job description. Upload the resumes. Understand who actually matches.
        </p>

        <div className="pt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={onStartMatching}
            className="px-8 py-4 rounded-xl bg-white hover:bg-[#F3F4F6] text-[#17181A] font-extrabold text-sm inline-flex items-center gap-3 shadow-2xl transition-all cursor-pointer hover:scale-105"
          >
            <span>START MATCHING</span>
            <ArrowRight className="w-4 h-4 text-[#17181A]" />
          </button>
        </div>

      </div>
    </section>
  );
};
