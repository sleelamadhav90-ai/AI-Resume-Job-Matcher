import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingCTAProps {
  onStartMatching: () => void;
}

export const LandingCTA: React.FC<LandingCTAProps> = ({ onStartMatching }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#171817] text-white relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 space-y-8">
        
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7FAEA7] bg-white/5 px-3.5 py-1 rounded-full border border-white/10 inline-block">
          HIREME AI MATCHING WORKSPACE
        </span>

        <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight leading-[1.08] text-white uppercase">
          FIND THE RIGHT TALENT.<br />
          UNDERSTAND WHY.
        </h2>

        <p className="text-base sm:text-lg text-[#DDDCD6] leading-relaxed max-w-xl mx-auto font-sans">
          Upload candidate resumes, evaluate against 100-point rubrics, and inspect verbatim evidence in seconds.
        </p>

        <div className="pt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={onStartMatching}
            className="px-9 py-4 rounded-xl bg-[#174C4A] hover:bg-[#123B39] text-white font-black text-sm inline-flex items-center gap-3 shadow-xl transition-all cursor-pointer group"
          >
            <span>TRY HIREME AI NOW</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
