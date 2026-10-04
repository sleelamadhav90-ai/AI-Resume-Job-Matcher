import React from 'react';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-[#DDDCD6]">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#174C4A] bg-[#DCEAE6] px-3.5 py-1 rounded-full border border-[#174C4A]/20 inline-block">
            SYSTEM WORKFLOW
          </span>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#171817] tracking-tight uppercase leading-tight">
            TRANSPARENT.<br />EXPLAINABLE PIPELINE.
          </h2>

          <p className="text-sm sm:text-base text-[#686A66]">
            Every candidate flows through a 6-stage deterministic verification process.
          </p>
        </div>

        {/* 6 Clean Connected Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          
          {/* 01 Resume Upload */}
          <div className="bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-5 space-y-3 relative">
            <span className="text-xs font-mono font-extrabold text-[#174C4A] block">01</span>
            <h4 className="font-extrabold text-sm text-[#171817]">Resume Upload</h4>
            <p className="text-xs text-[#686A66] leading-normal">
              Batch processing of unformatted PDF resumes.
            </p>
          </div>

          {/* 02 AI Fact Extraction */}
          <div className="bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-5 space-y-3 relative">
            <span className="text-xs font-mono font-extrabold text-[#174C4A] block">02</span>
            <h4 className="font-extrabold text-sm text-[#171817]">AI Fact Extraction</h4>
            <p className="text-xs text-[#686A66] leading-normal">
              Gemini schema extraction of skills, tenure & claims.
            </p>
          </div>

          {/* 03 Requirement Matching */}
          <div className="bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-5 space-y-3 relative">
            <span className="text-xs font-mono font-extrabold text-[#174C4A] block">03</span>
            <h4 className="font-extrabold text-sm text-[#171817]">Requirement Matching</h4>
            <p className="text-xs text-[#686A66] leading-normal">
              Skill normalization and job requirement mapping.
            </p>
          </div>

          {/* 04 100-Point Scoring */}
          <div className="bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-5 space-y-3 relative">
            <span className="text-xs font-mono font-extrabold text-[#174C4A] block">04</span>
            <h4 className="font-extrabold text-sm text-[#171817]">100-Point Scoring</h4>
            <p className="text-xs text-[#686A66] leading-normal">
              Deterministic rubric scoring (Skills, Exp, Edu).
            </p>
          </div>

          {/* 05 Candidate Ranking */}
          <div className="bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-5 space-y-3 relative">
            <span className="text-xs font-mono font-extrabold text-[#174C4A] block">05</span>
            <h4 className="font-extrabold text-sm text-[#171817]">Candidate Ranking</h4>
            <p className="text-xs text-[#686A66] leading-normal">
              Tier classification & real-time sorting.
            </p>
          </div>

          {/* 06 Evidence Review */}
          <div className="bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-5 space-y-3 relative">
            <span className="text-xs font-mono font-extrabold text-[#174C4A] block">06</span>
            <h4 className="font-extrabold text-sm text-[#171817]">Evidence Review</h4>
            <p className="text-xs text-[#686A66] leading-normal">
              Verbatim quote verification for every candidate claim.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
