import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AIMatchVisual } from './AIMatchVisual';

interface ScrollStoryHeroProps {
  onStartMatching: () => void;
}

export const ScrollStoryHero: React.FC<ScrollStoryHeroProps> = ({ onStartMatching }) => {
  return (
    <section className="py-12 sm:py-16 space-y-10">
      
      {/* Large Statement with Generous Whitespace */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold uppercase tracking-wider border border-[#6366F1]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Talent Matching</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold font-heading text-[#202124] tracking-tight leading-[1.08]">
          FIND THE RIGHT TALENT.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#E83E8C]">
            UNDERSTAND WHY.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#4B5563] leading-relaxed max-w-2xl font-sans pt-1">
          HireMe AI replaces black-box scoring with deterministic, fact-grounded candidate evaluation. Every match score is proven with verbatim resume evidence.
        </p>
      </div>

      {/* Hero Interactive Visual Canvas */}
      <AIMatchVisual onStartMatching={onStartMatching} />
    </section>
  );
};
