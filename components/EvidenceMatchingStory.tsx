import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, FileText, Check, ArrowRight, ShieldCheck, Award, ChevronRight, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useInView } from '../lib/useInView';

export const EvidenceMatchingStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const [selectedCandidate, setSelectedCandidate] = useState<'jane' | 'rahul' | 'priya'>('jane');

  return (
    <section ref={ref} className="py-16 sm:py-24 border-t border-[#E5E7EB] bg-[#F5F6F8] -mx-6 sm:-mx-10 px-6 sm:px-10">
      <div className="max-w-[1300px] mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold font-mono tracking-wider border border-[#6366F1]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 / EXPLAINABLE MATCHING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#181B2F] tracking-tight leading-[1.08]">
            NOT JUST A SCORE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#181B2F] via-[#4338CA] to-[#6366F1]">
              SEE WHY IT MATCHES.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            HireMe AI ranks candidates against explicit job requirements and shows the verbatim evidence behind every important signal.
          </p>
        </div>

        {/* LARGE APPLICATION-WINDOW MOCKUP (Zoho / Greenhouse Inspired Recruiter Workspace Preview) */}
        <div
          className={`bg-white rounded-xl border border-[#E2E5EA] shadow-xl overflow-hidden transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ maxWidth: '1240px', margin: '0 auto' }}
        >
          
          {/* 1. Application Top Chrome Bar */}
          <div className="bg-[#181B2F] text-white px-5 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-bold font-heading">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E83E8C]" />
                <span>HireMe AI</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[#94A3B8] font-medium">
                <span className="text-white font-semibold">Matching Workspace</span>
                <span>Candidates</span>
                <span>Requisitions</span>
                <span>Audit</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#E2E5EA] bg-white/10 px-2 py-0.5 rounded">
                PRODUCT PREVIEW · DEMO WORKSPACE
              </span>
              <div className="w-6 h-6 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold text-[10px] font-mono">
                AS
              </div>
            </div>
          </div>

          {/* 2. Workspace Subheader / Context Bar */}
          <div className="bg-[#FAFBFC] border-b border-[#E5E7EB] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#6B7280]">
                <span>MATCHING CANDIDATES</span>
                <span>·</span>
                <span className="text-[#181B2F] font-bold">Senior Full Stack Engineer</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-[#181B2F] mt-0.5">
                Engineering · Hyderabad · Hybrid
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded bg-white border border-[#E5E7EB] text-[#374151] font-mono">
                42 candidates
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-[#E5E7EB] text-[#374151]">
                Updated just now
              </span>
            </div>
          </div>

          {/* 3. Three-Column Recruiter Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E5EA]">
            
            {/* COLUMN 1: LEFT - JOB REQUIREMENTS (260px / 3 cols) */}
            <div className="lg:col-span-3 p-6 space-y-6 bg-[#FAFBFC]/50 text-xs">
              <div className="space-y-1 pb-4 border-b border-[#E5E7EB]">
                <span className="text-[10px] font-mono uppercase font-bold text-[#94A3B8] tracking-wider">
                  Requisition Criteria
                </span>
                <h4 className="font-bold text-sm text-[#181B2F]">Job Requirements</h4>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <span className="font-bold text-[#181B2F] uppercase text-[10px] font-mono tracking-wider">
                  Required Skills (Must-Have)
                </span>
                <div className="space-y-1.5 text-[#374151]">
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Java (Spring Boot)</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PostgreSQL Database</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AWS Cloud Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>REST APIs & Microservices</span>
                  </div>
                </div>
              </div>

              {/* Tenure & Education */}
              <div className="space-y-3 pt-2 border-t border-[#E5E7EB]">
                <div>
                  <span className="font-bold text-[#181B2F] uppercase text-[10px] font-mono tracking-wider block mb-1">
                    Experience Threshold
                  </span>
                  <span className="font-mono font-semibold text-[#181B2F]">3+ years professional</span>
                </div>

                <div>
                  <span className="font-bold text-[#181B2F] uppercase text-[10px] font-mono tracking-wider block mb-1">
                    Education
                  </span>
                  <span className="text-[#4B5563]">Bachelor's in CS or STEM field</span>
                </div>
              </div>

              {/* 100 Point Rubric Breakdown (Exact Implementation Weights) */}
              <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] font-mono uppercase text-[#94A3B8]">100-Pt Rubric</span>
                  <span className="font-mono font-bold text-[#6366F1]">Deterministic</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px] text-[#4B5563]">
                  <div className="flex justify-between"><span>Required Skills</span><span className="font-bold text-[#181B2F]">30 pts</span></div>
                  <div className="flex justify-between"><span>Preferred Skills</span><span className="font-bold text-[#181B2F]">10 pts</span></div>
                  <div className="flex justify-between"><span>Experience Tenure</span><span className="font-bold text-[#181B2F]">25 pts</span></div>
                  <div className="flex justify-between"><span>Education Level</span><span className="font-bold text-[#181B2F]">15 pts</span></div>
                  <div className="flex justify-between"><span>Projects</span><span className="font-bold text-[#181B2F]">10 pts</span></div>
                  <div className="flex justify-between"><span>Other Req.</span><span className="font-bold text-[#181B2F]">10 pts</span></div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: CENTER - RANKED CANDIDATES STREAM (5 cols) */}
            <div className="lg:col-span-5 p-6 space-y-4">
              <div className="flex items-baseline justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h4 className="font-bold text-sm text-[#181B2F] font-heading">Matched Candidates</h4>
                  <span className="text-[11px] text-[#6B7280]">6 candidates analyzed</span>
                </div>
                <span className="text-[11px] font-mono text-[#6366F1] font-semibold">Sort: Best Match</span>
              </div>

              {/* Candidate Row 1: Jane Doe (Selected) */}
              <div
                onClick={() => setSelectedCandidate('jane')}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  selectedCandidate === 'jane'
                    ? 'border-[#6366F1] bg-[#EEF2FF]/40 shadow-xs'
                    : 'border-[#E5E7EB] hover:bg-[#FAFBFC]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#94A3B8]">01</span>
                      <h5 className="font-bold text-sm text-[#181B2F]">Jane Doe</h5>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        STRONG MATCH
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Senior Full Stack Engineer · 4.2 yrs · jane.doe@example.com
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-black text-base text-emerald-700">94%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">Java</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">Spring Boot</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">PostgreSQL</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">AWS</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]/60 text-xs">
                  <span className="text-emerald-800 font-medium text-[11px] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>4/4 required skills · 4.2 yrs tenure</span>
                  </span>
                  <span className="font-semibold text-[#6366F1] inline-flex items-center gap-1">
                    <span>View Match</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Candidate Row 2: Rahul Sharma */}
              <div
                onClick={() => setSelectedCandidate('rahul')}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  selectedCandidate === 'rahul'
                    ? 'border-[#6366F1] bg-[#EEF2FF]/40 shadow-xs'
                    : 'border-[#E5E7EB] hover:bg-[#FAFBFC]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#94A3B8]">02</span>
                      <h5 className="font-bold text-sm text-[#181B2F]">Rahul Sharma</h5>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        GOOD MATCH
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Backend Developer · 3.5 yrs · rahul.s@example.com
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-black text-base text-[#6366F1]">88%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">Java</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">Spring Boot</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">REST APIs</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]/60 text-xs">
                  <span className="text-amber-800 font-medium text-[11px] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Kubernetes needs verification</span>
                  </span>
                  <span className="font-semibold text-[#6366F1] inline-flex items-center gap-1">
                    <span>View Match</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Candidate Row 3: Priya Patel */}
              <div
                onClick={() => setSelectedCandidate('priya')}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  selectedCandidate === 'priya'
                    ? 'border-[#6366F1] bg-[#EEF2FF]/40 shadow-xs'
                    : 'border-[#E5E7EB] hover:bg-[#FAFBFC]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#94A3B8]">03</span>
                      <h5 className="font-bold text-sm text-[#181B2F]">Priya Patel</h5>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        REVIEW
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Frontend Architect · 5 yrs · priya.p@example.com
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-black text-base text-amber-700">71%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">React</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">TypeScript</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#374151] text-[10px] font-medium border border-[#CBD5E1]">Next.js</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]/60 text-xs">
                  <span className="text-red-700 font-medium text-[11px] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>Missing Java & Spring Boot</span>
                  </span>
                  <span className="font-semibold text-[#6366F1] inline-flex items-center gap-1">
                    <span>View Match</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

            {/* COLUMN 3: RIGHT - SELECTED CANDIDATE DETAIL & EVIDENCE PANEL (4 cols) */}
            <div className="lg:col-span-4 p-6 space-y-6 bg-[#FAFBFC]/50 text-xs">
              <div className="flex items-start justify-between pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h4 className="font-bold text-base text-[#181B2F] font-heading">
                    {selectedCandidate === 'jane' ? 'Jane Doe' : selectedCandidate === 'rahul' ? 'Rahul Sharma' : 'Priya Patel'}
                  </h4>
                  <span className="text-xs text-[#6B7280]">
                    {selectedCandidate === 'jane' ? 'Senior Full Stack Engineer' : selectedCandidate === 'rahul' ? 'Backend Developer' : 'Frontend Architect'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-xl text-emerald-700">
                    {selectedCandidate === 'jane' ? '94%' : selectedCandidate === 'rahul' ? '88%' : '71%'}
                  </span>
                  <span className="text-[9px] font-mono uppercase font-bold text-[#6B7280] block">
                    {selectedCandidate === 'jane' ? 'Strong Match' : selectedCandidate === 'rahul' ? 'Good Match' : 'Review'}
                  </span>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-2">
                <span className="font-bold text-[#181B2F] uppercase text-[10px] font-mono tracking-wider">
                  Rubric Breakdown
                </span>

                <div className="space-y-1.5 font-mono text-[11px] text-[#374151]">
                  <div className="flex justify-between"><span>Required Skills</span><span className="font-bold text-[#181B2F]">{selectedCandidate === 'jane' ? '30 / 30' : selectedCandidate === 'rahul' ? '24 / 30' : '15 / 30'}</span></div>
                  <div className="flex justify-between"><span>Experience Tenure</span><span className="font-bold text-[#181B2F]">25 / 25</span></div>
                  <div className="flex justify-between"><span>Education Level</span><span className="font-bold text-[#181B2F]">15 / 15</span></div>
                  <div className="flex justify-between"><span>Projects</span><span className="font-bold text-[#181B2F]">{selectedCandidate === 'jane' ? '9 / 10' : '8 / 10'}</span></div>
                  <div className="flex justify-between"><span>Other Requirements</span><span className="font-bold text-[#181B2F]">{selectedCandidate === 'jane' ? '15 / 10' : '10 / 10'}</span></div>
                </div>
              </div>

              {/* Verbatim Evidence Quote */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] font-mono uppercase text-[#6366F1]">
                    Verbatim Resume Evidence
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    Source: {selectedCandidate === 'jane' ? 'Jane_Doe_Resume.pdf' : 'Resume.pdf'}
                  </span>
                </div>

                <p className="text-xs text-[#374151] italic leading-relaxed">
                  "{selectedCandidate === 'jane'
                    ? 'Architected and deployed Java Spring Boot microservices handling over 50,000 requests per minute with PostgreSQL on AWS infrastructure...'
                    : selectedCandidate === 'rahul'
                    ? 'Developed RESTful services in Java and Spring Boot with PostgreSQL relational schema optimization...'
                    : 'Led frontend architecture across React, TypeScript, and Next.js micro-frontends...'}"
                </p>
              </div>

              {/* Claims to Verify / Needs Review */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Requires Recruiter Verification</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-normal">
                  {selectedCandidate === 'jane'
                    ? 'Kubernetes cluster administration listed without explicit production tenure.'
                    : selectedCandidate === 'rahul'
                    ? 'AWS cloud deployment experience self-reported without enterprise scale metrics.'
                    : 'Missing core Java requirement; requires technical evaluation for potential cross-training.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="w-full py-2.5 bg-[#181B2F] hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <span>Open Full Candidate Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Distinctive HireMe AI Feature Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl border border-[#E5E7EB] shadow-2xs max-w-[1240px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold">
              ✦
            </div>
            <div>
              <span className="font-bold text-sm text-[#181B2F] block">EVIDENCE-GROUNDED MATCHING ENGINE</span>
              <span className="text-xs text-[#6B7280]">Scores are generated from verified resume facts and a deterministic 100-point rubric—never black-box LLM hallucinations.</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#6366F1] bg-[#EEF2FF] px-3 py-1.5 rounded-lg border border-[#6366F1]/20">
            100% Deterministic Scoring
          </span>
        </div>

      </div>
    </section>
  );
};
