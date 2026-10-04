import React from 'react';
import { Sparkles, FileText, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AsymmetricBentoGrid: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
            05 / Platform Architecture
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#17181A] tracking-tight leading-[1.1]">
            ENGINEERED FOR AUDITABILITY.
          </h2>

          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Every layer of HireMe AI is designed to give recruiters absolute confidence in candidate recommendations.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Large Card: Resume Intelligence (7 cols) */}
          <div className="md:col-span-7 bg-[#F6F7F9] rounded-3xl border border-[#E5E7EB] p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#6366F1] uppercase">01 / Ingestion</span>
              <h3 className="text-2xl font-extrabold font-heading text-[#17181A]">Resume Intelligence</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Extracts skills, experience tenure, projects, and educational degrees from unformatted candidate PDFs without losing structural nuance.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#17181A] font-bold">
                <span>PDF Stream Parsed</span>
                <span className="text-emerald-700">✓ Normalized</span>
              </div>
              <div className="text-[#6B7280] text-[11px]">
                Tokens: Java, Spring Boot, PostgreSQL, AWS Cloud
              </div>
            </div>
          </div>

          {/* Medium Card: Deterministic Matching (5 cols) */}
          <div className="md:col-span-5 bg-[#17181A] text-white rounded-3xl border border-[#17181A] p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">02 / Evaluation</span>
              <h3 className="text-2xl font-extrabold font-heading text-white">Deterministic Matching</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                100-point scoring model evaluating required skills, experience, and education against requisition specs.
              </p>
            </div>

            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 font-mono text-xs flex items-center justify-between">
              <span>Score Engine</span>
              <span className="text-emerald-400 font-bold">100% Deterministic</span>
            </div>
          </div>

          {/* Medium Card: Evidence (5 cols) */}
          <div className="md:col-span-5 bg-[#F6F7F9] rounded-3xl border border-[#E5E7EB] p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#6366F1] uppercase">03 / Explainability</span>
              <h3 className="text-2xl font-extrabold font-heading text-[#17181A]">Verbatim Evidence</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                See exactly why points were awarded with direct quotes extracted from candidate resumes.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E5E7EB] text-xs italic text-[#374151]">
              "Architected and deployed Java Spring Boot microservices..."
            </div>
          </div>

          {/* Small Card: Claim Verification (7 cols) */}
          <div className="md:col-span-7 bg-[#F6F7F9] rounded-3xl border border-[#E5E7EB] p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">04 / Credibility Audit</span>
              <h3 className="text-2xl font-extrabold font-heading text-[#17181A]">4-Tier Claim Verification</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Classifies candidate claims into Supported, Unsupported, Contradictory, or Not Enough Evidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-250">SUPPORTED</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-250">NEEDS REVIEW</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
