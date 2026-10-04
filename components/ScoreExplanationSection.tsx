import React from 'react';
import { useCountUp } from '../lib/useCountUp';

export const ScoreExplanationSection: React.FC = () => {
  const score = useCountUp(94, 800, true);

  return (
    <section className="py-20 sm:py-28 border-t border-[#E5E7EB] bg-[#F6F7F9]">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Typography */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
              04 / Transparent Scoring
            </span>

            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#17181A] tracking-tight leading-[1.08]">
              {score}% isn't a guess.
            </h2>

            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
              HireMe AI scores candidates against explicit job requirements using a transparent 100-point rubric. No mysterious weights or black-box neural approximations.
            </p>
          </div>

          {/* RIGHT: Score Artifact Specification Sheet */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E7EB] shadow-xl p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-[#F3F4F6]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF] block">Deterministic Model</span>
                <h3 className="font-extrabold text-lg text-[#17181A] mt-0.5">100 POINT MATCH RUBRIC</h3>
              </div>
              <div className="text-right">
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#17181A]">{score}</span>
                <span className="text-xs text-[#9CA3AF] block font-mono">/ 100 PTS</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between pb-1.5 font-bold text-[#17181A]">
                  <span>Required Skills</span>
                  <span>30 / 30 PTS</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#17181A] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between pb-1.5 font-bold text-[#17181A]">
                  <span>Experience Tenure</span>
                  <span>25 / 25 PTS</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#17181A] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between pb-1.5 font-bold text-[#17181A]">
                  <span>Education Alignment</span>
                  <span>15 / 15 PTS</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#17181A] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between pb-1.5 font-bold text-[#17181A]">
                  <span>Projects & Portfolio</span>
                  <span>10 / 10 PTS</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#17181A] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between pb-1.5 font-bold text-[#17181A]">
                  <span>Preferred Skills & Domain</span>
                  <span>14 / 20 PTS</span>
                </div>
                <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-[#6366F1] rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
