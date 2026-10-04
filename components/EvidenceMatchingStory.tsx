import React from 'react';
import { Sparkles, Check, AlertTriangle, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { useCountUp } from '../lib/useCountUp';

export const EvidenceMatchingStory: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const score = useCountUp(94, 800, isInView);

  return (
    <section 
      ref={ref} 
      className="py-24 sm:py-36 bg-[#111318] text-white -mx-6 sm:-mx-10 px-6 sm:px-10 overflow-hidden relative border-t border-white/10"
    >
      {/* Editorial Background Ambient Lighting (Subtle warm/tonal highlights, NO cyberpunk neon) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#6366F1]/15 via-[#E83E8C]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Asymmetric Editorial Grid (40% Headline Left, 60% Visual Scene Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* LEFT: Massive Editorial Headline & Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#E83E8C] text-xs font-semibold font-mono tracking-widest border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#E83E8C]" />
              <span>02 / EXPLAINABLE MATCHING</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.05] text-white">
              NOT JUST A SCORE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7D2FE] to-[#F472B6]">
                SEE WHY IT MATCHES.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed font-normal max-w-xl">
              Every recommendation is grounded in explicit job requirements, structured candidate signals, and verbatim evidence extracted directly from the resume.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-6 text-xs font-mono text-[#94A3B8] border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>100% Deterministic Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                <span>Verbatim Resume Excerpts</span>
              </div>
            </div>
          </div>

          {/* RIGHT: One Large Visual Scene (Editorial Feature Artwork) */}
          <div className="lg:col-span-7 relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center">
            
            {/* SCENE CONTAINER */}
            <div className={`relative w-full max-w-[700px] h-[560px] sm:h-[625px] transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>

              {/* LAYER 1: BACK DOCUMENT (Raw Resume / Structured Signals background sheet) */}
              <div className="absolute top-4 left-6 sm:left-12 w-[320px] sm:w-[380px] h-[440px] bg-[#1E2230] rounded-2xl border border-white/10 shadow-2xl p-6 transform -rotate-6 transition-transform duration-500 opacity-60 z-0">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">Raw Candidate Signals</span>
                  <span className="text-[10px] font-mono text-indigo-400">Gemini Extraction</span>
                </div>
                <div className="space-y-4 pt-4 text-xs text-[#94A3B8] font-mono">
                  <div>
                    <p className="text-white font-bold">Skills Ingestion</p>
                    <p className="text-[11px] text-[#64748B]">Normalized across aliases (Java, Spring Boot, PostgreSQL)</p>
                  </div>
                  <div>
                    <p className="text-white font-bold">Experience Tenure</p>
                    <p className="text-[11px] text-[#64748B]">Calculated: 4 years 6 months active professional</p>
                  </div>
                  <div>
                    <p className="text-white font-bold">Education Validation</p>
                    <p className="text-[11px] text-[#64748B]">B.Tech Computer Science (STEM verified)</p>
                  </div>
                </div>
              </div>

              {/* LAYER 2: MAIN RESUME DOCUMENT (Central Tactile Paper Artifact, Rotated -3deg) */}
              <div className="absolute top-10 left-12 sm:left-24 w-[310px] sm:w-[360px] bg-[#FAFAFA] text-[#1E293B] rounded-2xl border border-[#CBD5E1] shadow-2xl p-7 transform -rotate-3 z-10 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="font-extrabold text-base text-[#0F172A] tracking-tight">JANE DOE</h3>
                    <p className="text-xs text-[#475569] font-medium">Senior Full Stack Engineer</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-[10px] font-mono font-bold">
                    PDF
                  </span>
                </div>

                <div className="space-y-4 pt-4 text-xs">
                  <div>
                    <span className="font-bold text-[10px] uppercase font-mono text-[#64748B] tracking-wider block mb-1">Experience</span>
                    <p className="text-[#334155] font-medium">4.5 years · Senior Backend Developer at TechCorp</p>
                  </div>

                  <div>
                    <span className="font-bold text-[10px] uppercase font-mono text-[#64748B] tracking-wider block mb-1">Core Tech Stack</span>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-medium text-[10px]">Java</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-medium text-[10px]">Spring Boot</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-medium text-[10px]">PostgreSQL</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-medium text-[10px]">REST APIs</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-medium text-[10px]">AWS</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-[10px] uppercase font-mono text-[#64748B] tracking-wider block mb-1">Education</span>
                    <p className="text-[#334155]">B.Tech in Computer Science, IIT (2021)</p>
                  </div>
                </div>
              </div>

              {/* LAYER 3: LARGE MATCH SCORE BADGE (Overlapping Top Right) */}
              <div className="absolute top-0 right-4 sm:right-6 bg-[#181B2F] text-white rounded-3xl p-6 border border-white/20 shadow-2xl z-30 transform rotate-2">
                <div className="flex items-center gap-4">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-emerald-400">
                    {score}%
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block">
                      Deterministic Score
                    </span>
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
                      Strong Match
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>All must-haves met</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* LAYER 4: EVIDENCE CALLOUT / ANNOTATION (Overlapping Bottom Right) */}
              <div className="absolute bottom-6 right-2 sm:right-10 bg-white text-[#1E293B] rounded-2xl border border-[#CBD5E1] p-5 shadow-2xl z-30 max-w-[340px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6366F1] bg-[#EEF2FF] px-2.5 py-0.5 rounded">
                    EVIDENCE FOUND
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">Jane_Doe_Resume.pdf</span>
                </div>

                <p className="text-xs text-[#334155] italic leading-relaxed">
                  "Architected and deployed Java Spring Boot microservices handling 50k+ RPM with PostgreSQL..."
                </p>

                <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono font-bold text-emerald-800">
                  <span className="px-2 py-1 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Java
                  </span>
                  <span className="px-2 py-1 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Spring
                  </span>
                  <span className="px-2 py-1 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Postgres
                  </span>
                </div>
              </div>

              {/* LAYER 5: VERIFICATION CALLOUT (Near Left / Middle) */}
              <div className="absolute bottom-16 left-0 sm:left-4 bg-[#1E2230] text-white rounded-xl border border-amber-500/40 p-4 shadow-xl z-30 max-w-[240px] space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>NEEDS REVIEW</span>
                </div>
                <p className="text-[11px] text-[#CBD5E1] leading-snug">
                  Kubernetes expertise listed without explicit production tenure.
                </p>
              </div>

              {/* LAYER 6: SCORING ARTIFACT (Compact Spec Sheet Bottom Left) */}
              <div className="absolute -bottom-6 left-28 bg-[#181B2F]/90 backdrop-blur-md text-white rounded-xl border border-white/10 p-3.5 shadow-xl z-20 font-mono text-[10px] space-y-1 hidden sm:block">
                <div className="flex justify-between font-bold text-white border-b border-white/10 pb-1">
                  <span>100-POINT RUBRIC</span>
                  <span className="text-[#6366F1]">Deterministic</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]"><span>Required Skills (30)</span><span className="text-white font-bold">30</span></div>
                <div className="flex justify-between text-[#94A3B8]"><span>Experience (25)</span><span className="text-white font-bold">25</span></div>
                <div className="flex justify-between text-[#94A3B8]"><span>Education (15)</span><span className="text-white font-bold">15</span></div>
                <div className="flex justify-between text-[#94A3B8]"><span>Projects & Other (30)</span><span className="text-white font-bold">24</span></div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
