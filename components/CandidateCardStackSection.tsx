import React from 'react';
import { Sparkles, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export const CandidateCardStackSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Heading & Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
              03 / Candidate Ranking
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#17181A] tracking-tight leading-[1.1]">
              ONE JOB.<br />
              MULTIPLE RESUMES.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17181A] via-[#4338CA] to-[#E83E8C]">
                ONE CLEAR RANKING.
              </span>
            </h2>

            <p className="text-base text-[#6B7280] leading-relaxed">
              HireMe AI evaluates your entire applicant batch instantly, producing a stable, deterministic ranking stack ordered by skill overlap and tenure relevance.
            </p>
          </div>

          {/* RIGHT: Aceternity Card Stack (Overlapping Candidate Cards) */}
          <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center">
            <div className="relative w-full max-w-[540px] h-[400px]">
              
              {/* Card 3 (Bottom Stack) */}
              <div className="absolute top-12 left-12 sm:left-20 w-[360px] sm:w-[420px] bg-[#F3F4F6] rounded-2xl border border-[#D1D5DB] p-6 shadow-md transform rotate-6 opacity-50 pointer-events-none">
                <div className="flex justify-between items-center pb-3">
                  <span className="font-bold text-xs text-[#6B7280]">Candidate 03</span>
                  <span className="font-mono font-bold text-sm text-[#6B7280]">71% Match</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">Junior Developer · Missing required AWS tenure</p>
              </div>

              {/* Card 2 (Middle Stack) */}
              <div className="absolute top-6 left-6 sm:left-10 w-[360px] sm:w-[420px] bg-[#FAFAFA] rounded-2xl border border-[#CBD5E1] p-6 shadow-xl transform rotate-2 opacity-85">
                <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0]">
                  <span className="font-bold text-xs text-[#17181A]">Rahul Sharma</span>
                  <span className="font-mono font-bold text-sm text-[#6366F1]">87% Match</span>
                </div>
                <p className="text-xs text-[#4B5563] mt-2">Strong Java background · Preferred skills review needed</p>
              </div>

              {/* Card 1 (Top Stack - Best Match) */}
              <div className="absolute top-0 left-0 w-[360px] sm:w-[420px] bg-white rounded-2xl border border-[#E5E7EB] p-7 shadow-2xl z-20">
                <div className="flex justify-between items-center pb-4 border-b border-[#F3F4F6]">
                  <div>
                    <span className="font-extrabold text-sm text-[#17181A] block">Jane Doe</span>
                    <span className="text-xs text-[#6B7280]">Senior Full Stack Engineer</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-mono font-black text-sm rounded-lg border border-emerald-200">
                    94% Match
                  </span>
                </div>

                <div className="space-y-3 pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Status</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">BEST MATCH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Required Skills</span>
                    <span className="font-bold text-[#17181A]">5 / 5 Matched</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Experience Tenure</span>
                    <span className="font-bold text-[#17181A]">4.5 Years</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
