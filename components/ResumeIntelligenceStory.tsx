import React from 'react';
import { FileText, Cpu, CheckCircle2, Award, Clock, Briefcase, ShieldAlert, ArrowRight, Sparkles, UserCheck, Check, Layers } from 'lucide-react';
import { useInView } from '../lib/useInView';

export const ResumeIntelligenceStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB]">
      <div className="space-y-12">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
            01 / Ingestion to Signal
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#202124] tracking-tight leading-[1.12]">
            FROM RESUME<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#6366F1]">
              TO SIGNAL.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
            Messy resumes go in — structured, verified evidence comes out. HireMe AI transforms unformatted PDFs into standardized candidate records ready for deterministic matching.
          </p>
        </div>

        {/* Visual Transformation Flow: RAW RESUMES -> AI EXTRACTION -> STRUCTURED SIGNALS -> DOSSIER */}
        <div
          className={`bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-10 shadow-sm transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 1. LEFT (4 Cols): Compact Real PDF Document Previews */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider">
                  Raw Resume Documents
                </span>
                <span className="text-[10px] font-mono text-[#6366F1] bg-[#EEF2FF] px-2 py-0.5 rounded font-semibold">
                  Batch Ingestion
                </span>
              </div>

              <div className="space-y-2.5">
                {/* PDF 1: Jane Doe */}
                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC] shadow-2xs hover:border-[#6366F1]/40 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#E83E8C]" />
                      <span className="font-bold text-xs text-[#202124]">Jane_Doe_Resume.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] font-mono">4.2 yrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">Java</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">React</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">AWS</span>
                  </div>
                </div>

                {/* PDF 2: Rahul Sharma */}
                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC] shadow-2xs opacity-90">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#6366F1]" />
                      <span className="font-bold text-xs text-[#202124]">Rahul_Sharma_CV.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] font-mono">3.5 yrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">Java</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">Spring Boot</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">SQL</span>
                  </div>
                </div>

                {/* PDF 3: Priya Patel */}
                <div className="p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC] shadow-2xs opacity-80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0D9488]" />
                      <span className="font-bold text-xs text-[#202124]">Priya_Patel_Lead.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] font-mono">5.0 yrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">React</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#374151]">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CENTER (4 Cols): AI Extraction & Emerging Tokens */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E1B4B] to-[#312E81] text-white flex items-center justify-center shadow-md">
                <Cpu className="w-6 h-6 text-[#6366F1] animate-pulse" />
              </div>

              <div>
                <span className="text-xs font-bold font-mono text-[#202124] block uppercase tracking-wider">
                  AI Fact Extraction
                </span>
                <span className="text-[11px] text-[#6B7280]">
                  Zero model hallucination
                </span>
              </div>

              {/* Emerging Extracted Tokens */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[260px]">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 shadow-2xs">
                  ✓ Java
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 shadow-2xs">
                  ✓ Spring Boot
                </span>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-200 shadow-2xs">
                  ✓ 4.2 yrs
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 shadow-2xs">
                  ✓ PostgreSQL
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 shadow-2xs">
                  ✓ AWS Cloud
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200 shadow-2xs">
                  ⚠ Kubernetes
                </span>
              </div>
            </div>

            {/* 3. RIGHT (4 Cols): Structured Signals & 94% Match Ready */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider">
                  Candidate Dossier
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                  Ready
                </span>
              </div>

              <div className="p-5 rounded-lg border border-[#6366F1]/30 bg-[#EEF2FF]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#202124] block">Jane Doe</span>
                    <span className="text-xs text-[#6B7280]">Senior Full Stack Engineer</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black text-xl text-[#6366F1] block leading-none">94%</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Strong Match</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#6366F1]/15 text-xs text-[#374151]">
                  <div className="flex items-center justify-between">
                    <span>Technical Skills:</span>
                    <span className="font-bold text-[#202124]">5 / 5 Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tenure Alignment:</span>
                    <span className="font-bold text-[#202124]">4.2 yrs (Req: 3+ yrs)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Projects & Claims:</span>
                    <span className="font-bold text-emerald-700">Evidence Grounded</span>
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
