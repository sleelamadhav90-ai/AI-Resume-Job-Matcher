import React from 'react';
import { Check, ShieldCheck, Quote } from 'lucide-react';
import { useCountUp } from '../../lib/useCountUp';

export const AICandidateMatchingSection: React.FC = () => {
  const score = useCountUp(94, 800, true);

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-[#DDDCD6] overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10">
        
        {/* Section Heading */}
        <div className="max-w-xl space-y-3 mb-12">
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#171817] tracking-tight uppercase">
            MORE CLARITY.<br />
            LESS GUESSWORK.
          </h2>
          <p className="text-sm sm:text-base text-[#686A66]">
            Transparent 100-point rubric breakdown backed by verbatim resume evidence annotations.
          </p>
        </div>

        {/* DOMINANT CANDIDATE MATCHING ARTIFACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Candidate Card (DOMINANT) */}
          <div className="lg:col-span-8 bg-[#F5F3EE] rounded-2xl border border-[#DDDCD6] p-7 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DDDCD6]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#171817] text-white flex items-center justify-center font-bold text-base font-mono">
                    SK
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#171817]">Sarah Kim</h3>
                    <p className="text-xs text-[#686A66] font-medium mt-0.5">Senior Full Stack Engineer · 8+ yrs exp</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-black font-mono text-[#174C4A] leading-none">
                    {score}%
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#174C4A]">
                    100-PT RUBRIC MATCH
                  </span>
                </div>
              </div>

              {/* Skill Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                <div className="p-3.5 bg-white rounded-xl border border-[#DDDCD6] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171817]">
                    <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    <span>Backend Microservices (Java / Spring Boot)</span>
                  </div>
                  <p className="text-[11px] text-[#686A66] pl-6 font-mono">
                    8 yrs experience vs 3 yrs required (100% skill score)
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#DDDCD6] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171817]">
                    <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    <span>Cloud Architecture (AWS)</span>
                  </div>
                  <p className="text-[11px] text-[#686A66] pl-6 font-mono">
                    EC2, S3, RDS, EKS in production systems
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#DDDCD6] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171817]">
                    <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    <span>Relational Database Design (PostgreSQL)</span>
                  </div>
                  <p className="text-[11px] text-[#686A66] pl-6 font-mono">
                    Query optimization and schema migration experience
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#DDDCD6] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171817]">
                    <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    <span>REST APIs & Distributed Systems</span>
                  </div>
                  <p className="text-[11px] text-[#686A66] pl-6 font-mono">
                    High throughput transaction endpoints
                  </p>
                </div>
              </div>
            </div>

            {/* Verbatim Evidence Annotation */}
            <div className="p-4 bg-white rounded-xl border border-[#DDDCD6] space-y-1.5 mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#171817]">
                <Quote className="w-3.5 h-3.5 text-[#174C4A]" />
                <span className="font-mono uppercase text-[10px] tracking-wider text-[#174C4A]">VERBATIM EVIDENCE ANNOTATION</span>
              </div>
              <p className="text-xs text-[#171817] italic bg-[#F5F3EE] p-2.5 rounded border-l-2 border-l-[#174C4A]">
                "Architected Spring Boot microservices processing over 12M daily REST API requests hosted on AWS Elastic Beanstalk & PostgreSQL."
              </p>
            </div>
          </div>

          {/* Side Summary Panel */}
          <div className="lg:col-span-4 bg-[#123B39] text-white rounded-2xl p-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7FAEA7]" />
                <span>EXPLAINABLE AI</span>
              </div>
              <h3 className="text-xl font-bold font-heading leading-snug">
                Every score is grounded in real resume text.
              </h3>
              <p className="text-xs text-[#DDDCD6] leading-relaxed">
                HireMe AI extracts verbatim quotes for every skill claim, giving recruiters complete auditable proof without manual parsing.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-[#DDDCD6]">
              <div className="flex items-center justify-between">
                <span>Rubric Weights:</span>
                <span className="font-bold text-white">Skills 50% / Exp 30% / Edu 20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Confidence Level:</span>
                <span className="font-bold text-[#7FAEA7]">100% Grounded</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
