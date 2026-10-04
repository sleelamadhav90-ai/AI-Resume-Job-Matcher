import React from 'react';
import { useInView } from '../lib/useInView';
import { useCountUp } from '../lib/useCountUp';

export const BigMetricsStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.25 });

  const resumes = useCountUp(247, 750, isInView);
  const matches = useCountUp(86, 750, isInView);
  const shortlist = useCountUp(24, 700, isInView);
  const review = useCountUp(8, 600, isInView);

  return (
    <section ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB]">
      <div className="space-y-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
              02 / Scalable Throughput
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#202124] tracking-tight mt-1">
              PROVEN RECRUITMENT SCALE.
            </h2>
          </div>
          <span className="text-xs text-[#6B7280]">
            Deterministic Matching Matrix
          </span>
        </div>

        {/* Big Numbers with Generous Whitespace */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E7EB]">
          
          <div className="space-y-2">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono text-[#202124] tracking-tight">
              {resumes}
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6B7280] block">
              Resumes
            </span>
            <p className="text-xs text-[#9CA3AF]">
              Analyzed in active requisition pipeline
            </p>
          </div>

          <div className="pt-6 lg:pt-0 lg:pl-10 space-y-2">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono text-[#6366F1] tracking-tight">
              {matches}
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6B7280] block">
              Matches
            </span>
            <p className="text-xs text-emerald-700 font-medium">
              &gt; 80% Deterministic match alignment
            </p>
          </div>

          <div className="pt-6 lg:pt-0 lg:pl-10 space-y-2">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono text-[#202124] tracking-tight">
              {shortlist}
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6B7280] block">
              Shortlist
            </span>
            <p className="text-xs text-[#6B7280]">
              Advanced to interview rounds
            </p>
          </div>

          <div className="pt-6 lg:pt-0 lg:pl-10 space-y-2">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono text-amber-700 tracking-tight">
              {review}
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6B7280] block">
              Review
            </span>
            <p className="text-xs text-amber-700 font-medium">
              Claims requiring recruiter check
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
