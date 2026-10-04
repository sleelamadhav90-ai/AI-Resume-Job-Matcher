import React from 'react';

export const AutomationSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] text-[#18181B] relative overflow-hidden border-t border-b border-[#E5E2DC]">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#174C4A] bg-[#E8F0E6] px-3.5 py-1 rounded-full border border-[#174C4A]/20 inline-block">
            REAL APPLICATION WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#18181B] tracking-tight uppercase leading-tight">
            FROM RESUME<br />TO DECISION.
          </h2>
          <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
            The end-to-end evaluation pipeline that transforms unstructured PDF resumes into deterministic candidate rankings.
          </p>
        </div>

        {/* Real Workflow Horizontal Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          
          {/* Step 1 */}
          <div className="p-6 bg-white border border-[#E5E2DC] rounded-2xl space-y-3.5 relative hover:border-[#174C4A]/30 transition-all hover:-translate-y-1 hover:shadow-xs duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E6] flex items-center justify-center font-mono font-black text-xs text-[#174C4A]">
              01
            </div>
            <h4 className="font-extrabold text-sm text-[#18181B]">Resume PDFs</h4>
            <p className="text-xs text-[#525866] leading-relaxed">
              Batch upload multi-candidate resume files.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white border border-[#E5E2DC] rounded-2xl space-y-3.5 relative hover:border-[#174C4A]/30 transition-all hover:-translate-y-1 hover:shadow-xs duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E6] flex items-center justify-center font-mono font-black text-xs text-[#174C4A]">
              02
            </div>
            <h4 className="font-extrabold text-sm text-[#18181B]">Fact Extraction</h4>
            <p className="text-xs text-[#525866] leading-relaxed">
              Extract skills, tenure, education & claims.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white border border-[#E5E2DC] rounded-2xl space-y-3.5 relative hover:border-[#174C4A]/30 transition-all hover:-translate-y-1 hover:shadow-xs duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E6] flex items-center justify-center font-mono font-black text-xs text-[#174C4A]">
              03
            </div>
            <h4 className="font-extrabold text-sm text-[#18181B]">Requirement Matching</h4>
            <p className="text-xs text-[#525866] leading-relaxed">
              Compare extracted facts against required skills.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 bg-white border border-[#E5E2DC] rounded-2xl space-y-3.5 relative hover:border-[#174C4A]/30 transition-all hover:-translate-y-1 hover:shadow-xs duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E6] flex items-center justify-center font-mono font-black text-xs text-[#174C4A]">
              04
            </div>
            <h4 className="font-extrabold text-sm text-[#18181B]">100-Point Score</h4>
            <p className="text-xs text-[#525866] leading-relaxed">
              Compute deterministic rubric fit percentage.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-6 bg-white border border-[#E5E2DC] rounded-2xl space-y-3.5 relative hover:border-[#174C4A]/30 transition-all hover:-translate-y-1 hover:shadow-xs duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E6] flex items-center justify-center font-mono font-black text-xs text-[#174C4A]">
              05
            </div>
            <h4 className="font-extrabold text-sm text-[#18181B]">Evidence Review</h4>
            <p className="text-xs text-[#525866] leading-relaxed">
              Audit verbatim quotes for every skill claim.
            </p>
          </div>

          {/* Step 6 */}
          <div className="p-6 bg-white border border-[#E5E2DC] rounded-2xl space-y-3.5 relative hover:border-[#174C4A]/30 transition-all hover:-translate-y-1 hover:shadow-xs duration-200">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0E6] flex items-center justify-center font-mono font-black text-xs text-[#174C4A]">
              06
            </div>
            <h4 className="font-extrabold text-sm text-[#18181B]">Ranking</h4>
            <p className="text-xs text-[#525866] leading-relaxed">
              Shortlist top matches with complete confidence.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
