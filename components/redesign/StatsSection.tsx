import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#171817] text-white border-t border-white/10">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          {/* STAT 1: 100 POINT MATCHING */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
              100
            </div>
            <div className="text-xs font-mono font-bold uppercase text-[#7FAEA7] tracking-wider">
              POINT MATCHING
            </div>
          </div>

          {/* STAT 2: 4 CLAIM VERIFICATION STATES */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
              4
            </div>
            <div className="text-xs font-mono font-bold uppercase text-[#7FAEA7] tracking-wider">
              CLAIM VERIFICATION STATES
            </div>
          </div>

          {/* STAT 3: MULTIPLE RESUME ANALYSIS */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight pt-1">
              MULTIPLE
            </div>
            <div className="text-xs font-mono font-bold uppercase text-[#7FAEA7] tracking-wider">
              RESUME ANALYSIS
            </div>
          </div>

          {/* STAT 4: EVIDENCE BACKED RESULTS */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight pt-1">
              EVIDENCE
            </div>
            <div className="text-xs font-mono font-bold uppercase text-[#7FAEA7] tracking-wider">
              BACKED RESULTS
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
