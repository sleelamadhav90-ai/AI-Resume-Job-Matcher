import React, { useState } from 'react';
import { Sparkles, Check, AlertTriangle, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { useCountUp } from '../lib/useCountUp';

export const EvidenceMatchingStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeStage, setActiveStage] = useState<number>(1);
  const score = useCountUp(94, 700, true);

  return (
    <section ref={ref} className="py-24 sm:py-36 border-t border-[#E5E7EB] bg-[#F6F7F9] -mx-6 sm:-mx-10 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold uppercase tracking-wider border border-[#6366F1]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 / EXPLAINABLE MATCHING STORY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#17181A] tracking-tight leading-[1.08]">
            NOT JUST A SCORE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17181A] via-[#4338CA] to-[#E83E8C]">
              SEE WHY IT MATCHES.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Follow the recruitment pipeline from raw PDF ingestion to verifiable evidence and deterministic scoring.
          </p>
        </div>

        {/* ACETERNITY STICKY SCROLL REVEAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Sticky Narrative Text (Stages 01, 02, 03) */}
          <div className="lg:col-span-5 space-y-24 py-12">
            
            {/* Stage 01 */}
            <div 
              onClick={() => setActiveStage(1)}
              className={`space-y-4 cursor-pointer transition-all p-6 rounded-2xl border ${
                activeStage === 1 
                  ? 'bg-white border-[#17181A] shadow-lg' 
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#17181A] text-white flex items-center justify-center font-mono font-bold text-xs">
                  01
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                  Document Ingestion
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#17181A]">
                READ THE RESUME
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Turn messy PDF resumes into structured candidate signals. HireMe AI normalizes skills, extracts tenure, and maps educational degrees.
              </p>
            </div>

            {/* Stage 02 */}
            <div 
              onClick={() => setActiveStage(2)}
              className={`space-y-4 cursor-pointer transition-all p-6 rounded-2xl border ${
                activeStage === 2 
                  ? 'bg-white border-[#17181A] shadow-lg' 
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#17181A] text-white flex items-center justify-center font-mono font-bold text-xs">
                  02
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                  Deterministic Evaluation
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#17181A]">
                UNDERSTAND THE MATCH
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Every score is tied to the job requirements that produced it. The deterministic engine calculates weighted points transparently without LLM drift.
              </p>
            </div>

            {/* Stage 03 */}
            <div 
              onClick={() => setActiveStage(3)}
              className={`space-y-4 cursor-pointer transition-all p-6 rounded-2xl border ${
                activeStage === 3 
                  ? 'bg-white border-[#17181A] shadow-lg' 
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#17181A] text-white flex items-center justify-center font-mono font-bold text-xs">
                  03
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                  Credibility Audit
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#17181A]">
                VERIFY THE CLAIMS
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Unsupported or contradictory claims don't silently become points. The system flags unverified skills for recruiter screening.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Visual Artwork Canvas */}
          <div className="lg:col-span-7 sticky top-24 min-h-[580px] flex items-center justify-center">
            <div className="w-full max-w-[640px] bg-white rounded-3xl border border-[#E5E7EB] shadow-xl p-8 sm:p-10 relative overflow-hidden">
              
              {/* STAGE 1 VISUAL: READ THE RESUME */}
              {activeStage === 1 && (
                <div className="space-y-6 motion-fade">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                      Stage 01 · Structured Extraction
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold">
                      SUCCESS
                    </span>
                  </div>

                  <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-6 space-y-4">
                    <h4 className="font-extrabold text-sm text-[#17181A]">JANE DOE — RESUME DOSSIER</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-3 bg-white rounded border border-[#E2E8F0]">
                        <span className="text-[#9CA3AF] block uppercase text-[10px]">Extracted Skills</span>
                        <span className="font-bold text-[#17181A] mt-1 block">Java, Spring, React, PG</span>
                      </div>
                      <div className="p-3 bg-white rounded border border-[#E2E8F0]">
                        <span className="text-[#9CA3AF] block uppercase text-[10px]">Tenure</span>
                        <span className="font-bold text-[#17181A] mt-1 block">4.5 Years Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2 VISUAL: UNDERSTAND THE MATCH */}
              {activeStage === 2 && (
                <div className="space-y-6 motion-fade">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                      Stage 02 · Deterministic Comparison
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-[#6366F1] text-[11px] font-mono font-bold">
                      {score}% MATCH
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-[#9CA3AF]">Job Requirements</span>
                      <div className="space-y-1.5 text-xs font-semibold text-[#17181A]">
                        <div>• Java (Required)</div>
                        <div>• Spring Boot (Required)</div>
                        <div>• 3+ yrs experience</div>
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-[#9CA3AF]">Candidate Evidence</span>
                      <div className="space-y-1.5 text-xs font-semibold text-emerald-800">
                        <div>✓ Java Verified</div>
                        <div>✓ Spring Verified</div>
                        <div>✓ 4.5 yrs tenure</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3 VISUAL: VERIFY THE CLAIMS */}
              {activeStage === 3 && (
                <div className="space-y-6 motion-fade">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                      Stage 03 · Credibility Audit
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[11px] font-mono font-bold">
                      AUDIT ACTIVE
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-900 block">Java Spring Boot Experience</span>
                        <span className="text-emerald-700">"Architected microservices..."</span>
                      </div>
                      <span className="px-2 py-1 bg-emerald-600 text-white rounded font-mono font-bold text-[10px]">
                        SUPPORTED
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-amber-900 block">Kubernetes Production Expertise</span>
                        <span className="text-amber-800">No supporting project tenure found</span>
                      </div>
                      <span className="px-2 py-1 bg-amber-600 text-white rounded font-mono font-bold text-[10px]">
                        NEEDS REVIEW
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
