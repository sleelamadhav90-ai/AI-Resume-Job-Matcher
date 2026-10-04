import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingCTAProps {
  onStartMatching: () => void;
}

export const LandingCTA: React.FC<LandingCTAProps> = ({ onStartMatching }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#0D3834] text-white relative overflow-hidden text-center">
      
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-semibold tracking-wider uppercase border border-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Intelligent Candidate Matching</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
          STOP SCREENING<br />
          RESUMES BLINDLY.
        </h2>

        <p className="text-base sm:text-xl text-emerald-100/80 leading-relaxed max-w-xl mx-auto font-sans">
          Upload a job description. Upload candidate resumes. Understand who actually matches with verbatim evidence.
        </p>

        <div className="pt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={onStartMatching}
            className="px-9 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0D3834] font-extrabold text-sm inline-flex items-center gap-3 shadow-2xl transition-all cursor-pointer hover:scale-105"
          >
            <span>START MATCHING WORKSPACE</span>
            <ArrowRight className="w-4 h-4 text-[#0D3834]" />
          </button>
        </div>

      </div>
    </section>
  );
};
