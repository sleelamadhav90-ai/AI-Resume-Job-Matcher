import React from 'react';
import { useCountUp } from '../../lib/useCountUp';

export const StatsSection: React.FC = () => {
  const stat1 = useCountUp(2, 600, true);
  const stat2 = useCountUp(3, 600, true);
  const stat3 = useCountUp(7, 600, true);
  const stat4 = useCountUp(92, 700, true);

  return (
    <section className="py-24 sm:py-32 bg-[#131416] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 45%: Heading */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.08]">
              Holistic hiring<br />
              experience
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-md pt-2">
              Transform your talent pipeline from manual resume screening to an automated, evidence-grounded hiring operation.
            </p>
          </div>

          {/* RIGHT 55%: Massive Metric Cards with Soft Warm Glows (Recreating Screenshot 1) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            
            {/* STAT 1: 100-Point Match Rubric */}
            <div className="bg-[#1C1D20] rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-end space-y-2 group hover:border-emerald-500/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tighter">
                100-PT
              </div>
              <p className="text-xs text-[#9CA3AF] font-medium leading-tight">
                Deterministic Match Rubric
              </p>
            </div>

            {/* STAT 2: 4-Tier Claims Audit */}
            <div className="bg-[#1C1D20] rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-end space-y-2 group hover:border-amber-500/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-black font-mono text-amber-400 tracking-tighter">
                4-TIER
              </div>
              <p className="text-xs text-[#9CA3AF] font-medium leading-tight">
                Claims Verification Audit
              </p>
            </div>

            {/* STAT 3: 100% Verbatim Evidence */}
            <div className="bg-[#1C1D20] rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-end space-y-2 group hover:border-emerald-500/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/20 via-emerald-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tighter">
                100%
              </div>
              <p className="text-xs text-[#9CA3AF] font-medium leading-tight">
                Verbatim Resume Evidence
              </p>
            </div>

            {/* STAT 4: Multi-Resume Batch Analysis */}
            <div className="bg-[#1C1D20] rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-end space-y-2 group hover:border-emerald-500/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-300 tracking-tighter">
                MULTI
              </div>
              <p className="text-xs text-[#9CA3AF] font-medium leading-tight">
                Resume Batch Parsing
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
