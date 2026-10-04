import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, FileText, Check, Quote, ArrowRight } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { useCountUp } from '../lib/useCountUp';

export const EvidenceMatchingStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const score = useCountUp(94, 800, isInView);

  return (
    <section ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB]">
      <div className="space-y-12">
        
        {/* Large Statement */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
            02 / Explainable Evidence
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#202124] tracking-tight leading-[1.12]">
            NOT JUST A SCORE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#6366F1]">
              THE REASON BEHIND IT.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
            Every match score is synthesized through a 100-point deterministic matrix. Recruiters inspect exact resume excerpts, skill alignments, and verified claims before making shortlisting decisions.
          </p>
        </div>

        {/* Visual Evidence Tree System */}
        <div
          className={`bg-white rounded-xl border border-[#E5E7EB] p-8 sm:p-12 shadow-sm space-y-8 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Top Score Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#202124] text-white flex items-center justify-center font-bold text-lg font-mono shadow-md">
                JD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#202124] font-heading">
                    Jane Doe · Match Dossier
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Strong Match
                  </span>
                </div>
                <span className="text-xs text-[#6B7280]">
                  Evaluated for Senior Full Stack Engineer opening
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-[#202124] font-mono">
                {score}%
              </div>
              <span className="text-xs font-bold text-[#6366F1] uppercase tracking-wider block">
                Deterministic Match
              </span>
            </div>
          </div>

          {/* Connected 3-Column Evidence Tree */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Skills Dimension */}
            <div className="p-5 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-bold text-xs uppercase tracking-wider text-[#202124]">
                  1. Required Skills
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  30 / 30 pts
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#374151]">
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Java (Core & Advanced)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Spring Boot & Microservices</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PostgreSQL & REST APIs</span>
                </div>
              </div>
            </div>

            {/* Column 2: Experience Dimension */}
            <div className="p-5 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-bold text-xs uppercase tracking-wider text-[#202124]">
                  2. Experience Tenure
                </span>
                <span className="text-xs font-mono font-bold text-[#202124] bg-gray-100 px-2 py-0.5 rounded">
                  25 / 25 pts
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#374151]">
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4.2 yrs verified software engineering</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exceeds minimum 3+ yrs requirement</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full-time production experience</span>
                </div>
              </div>
            </div>

            {/* Column 3: Projects & Gaps */}
            <div className="p-5 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-bold text-xs uppercase tracking-wider text-[#202124]">
                  3. Projects & Audit Gaps
                </span>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  39 / 45 pts
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#374151]">
                <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High-throughput Fintech Backend</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kubernetes: Needs interview verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verbatim Resume Evidence Excerpt Box */}
          <div className="p-5 rounded-lg bg-[#EEF2FF]/60 border border-[#6366F1]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6366F1]">
              <Quote className="w-4 h-4" />
              <span>Verbatim Resume Evidence</span>
            </div>
            <p className="text-xs sm:text-sm text-[#374151] italic leading-relaxed font-serif">
              "Architected and deployed Java Spring Boot microservices handling over 50,000 requests per minute with PostgreSQL on AWS infrastructure, reducing latency by 32%."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
