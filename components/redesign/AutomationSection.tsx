import React from 'react';

export const AutomationSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#171817] text-white relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7FAEA7] bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
            REAL APPLICATION WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight uppercase leading-tight">
            FROM RESUME<br />TO DECISION.
          </h2>
          <p className="text-sm sm:text-base text-[#DDDCD6] leading-relaxed">
            The end-to-end evaluation pipeline that transforms unstructured PDF resumes into deterministic candidate rankings.
          </p>
        </div>

        {/* Real Workflow Horizontal Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          
          {/* Step 1 */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 relative hover:border-white/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#7FAEA7]">
              01
            </div>
            <h4 className="font-bold text-sm text-white">Resume PDFs</h4>
            <p className="text-xs text-[#DDDCD6] leading-normal">
              Batch upload multi-candidate resume files.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 relative hover:border-white/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#7FAEA7]">
              02
            </div>
            <h4 className="font-bold text-sm text-white">Fact Extraction</h4>
            <p className="text-xs text-[#DDDCD6] leading-normal">
              Extract skills, tenure, education & claims.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 relative hover:border-white/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#7FAEA7]">
              03
            </div>
            <h4 className="font-bold text-sm text-white">Requirement Matching</h4>
            <p className="text-xs text-[#DDDCD6] leading-normal">
              Compare extracted facts against required skills.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 relative hover:border-white/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#7FAEA7]">
              04
            </div>
            <h4 className="font-bold text-sm text-white">100-Point Score</h4>
            <p className="text-xs text-[#DDDCD6] leading-normal">
              Compute deterministic rubric fit percentage.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 relative hover:border-white/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#7FAEA7]">
              05
            </div>
            <h4 className="font-bold text-sm text-white">Evidence Review</h4>
            <p className="text-xs text-[#DDDCD6] leading-normal">
              Audit verbatim quotes for every skill claim.
            </p>
          </div>

          {/* Step 6 */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 relative hover:border-white/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#7FAEA7]">
              06
            </div>
            <h4 className="font-bold text-sm text-white">Ranking</h4>
            <p className="text-xs text-[#DDDCD6] leading-normal">
              Shortlist top matches with complete confidence.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
