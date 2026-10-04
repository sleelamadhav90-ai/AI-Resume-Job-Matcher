import React from 'react';
import { FileText, Cpu, CheckCircle2, Award, Clock, Briefcase, ShieldAlert, ArrowDown, Sparkles, UserCheck } from 'lucide-react';
import { useInView } from '../lib/useInView';

export const ResumeIntelligenceStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Large Statement */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
            01 / Ingestion & Parsing
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#202124] tracking-tight leading-[1.12]">
            FROM RESUME<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#6366F1]">
              TO SIGNAL.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed pt-2">
            Upload raw PDF resumes in batches. HireMe AI extracts explicit technical competencies, quantified tenure durations, and educational degrees — standardizing unformatted resumes into verified candidate dossiers.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#202124]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Multi-PDF Ingestion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Fact-Grounded Parsing</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Flow Stream (RESUME -> AI -> CANDIDATE) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm space-y-6">
          
          {/* Step 1: 5 Resume Files */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider block">
                1. Raw Resumes (PDF Batch)
              </span>
              <span className="text-[11px] font-mono text-[#6366F1] bg-[#EEF2FF] px-2 py-0.5 rounded font-semibold">
                Multi-Document Stream
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Resume_01.pdf', 'Resume_02.pdf', 'Resume_03.pdf', 'Resume_04.pdf', 'Resume_05.pdf'].map((doc, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-center space-y-1 transition-all duration-500 ${
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <FileText className="w-4 h-4 text-[#6366F1] mx-auto" />
                  <span className="text-[11px] font-mono text-[#202124] font-medium block truncate">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Central AI Extraction Engine */}
          <div className="flex items-center justify-center">
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#312E81] text-white text-xs font-bold font-mono flex items-center gap-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E83E8C]" />
              <span>AI EXTRACTION ENGINE</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#6366F1]" />
            </div>
          </div>

          {/* Step 2: Extracted Candidate Signals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#6B7280] uppercase tracking-wider block">
                2. Structured Candidate Signals
              </span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                Verified Records
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                className={`p-3 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] space-y-1 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#202124]">
                  <Award className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Technical Skills</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  Java, Spring Boot, React, AWS, PostgreSQL
                </p>
              </div>

              <div
                className={`p-3 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] space-y-1 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#202124]">
                  <Clock className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Verified Tenure</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  4.2 years full-time software engineering
                </p>
              </div>

              <div
                className={`p-3 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB] space-y-1 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#202124]">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Candidate Dossier</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  Ready for 100-pt deterministic evaluation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
