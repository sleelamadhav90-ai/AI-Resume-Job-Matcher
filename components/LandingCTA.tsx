import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingCTAProps {
  onStartMatching: () => void;
}

export const LandingCTA: React.FC<LandingCTAProps> = ({ onStartMatching }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#0D3834] text-white -mx-6 sm:-mx-10 px-6 sm:px-10 relative overflow-hidden rounded-2xl border border-[#174C4A]">
      
      {/* Subtle Spotlight Glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#174C4A]/40 via-[#00A86B]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#00A86B]" />
          <span>Factual Talent Matching Engine</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
          STOP SCREENING<br />
          RESUMES BLINDLY.
        </h2>

        <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto font-sans">
          Upload a job description. Ingest resumes. Understand exactly who matches, why, and see factual evidence.
        </p>

        <div className="pt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={onStartMatching}
            className="px-8 py-4 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#0D3834] font-extrabold text-xs inline-flex items-center gap-3 shadow-2xl transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span>START MATCHING CONSOLE</span>
            <ArrowRight className="w-4 h-4 text-[#0D3834]" />
          </button>
        </div>

      </div>
    </section>
  );
};
