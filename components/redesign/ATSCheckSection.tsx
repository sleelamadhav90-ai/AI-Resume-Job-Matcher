import React from 'react';
import { Check } from 'lucide-react';

export const ATSCheckSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F5F3EE] text-[#171817] border-t border-[#DDDCD6]">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: EDITORIAL RESUME SHEET WITH ANNOTATIONS */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[460px]">
              
              {/* Layered Resume Sheet */}
              <div className="bg-white rounded-2xl border border-[#DDDCD6] shadow-xl p-7 space-y-5">
                
                {/* CONTACT INFORMATION Annotation */}
                <div className="border-b border-[#DDDCD6] pb-4 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-[#171817]">SARAH KIM</h3>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#174C4A] bg-[#DCEAE6] px-2 py-0.5 rounded border border-[#174C4A]/20">
                      CONTACT INFORMATION
                    </span>
                  </div>
                  <p className="text-xs text-[#686A66] font-mono">sarah.kim@example.com · github.com/sarahkim</p>
                </div>

                {/* SKILLS Annotation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#174C4A] bg-[#DCEAE6] px-2 py-0.5 rounded border border-[#174C4A]/20 inline-block">
                    SKILLS
                  </span>
                  <p className="text-xs text-[#171817] font-semibold">
                    Java, Spring Boot, AWS, PostgreSQL, REST APIs, Docker, Kubernetes
                  </p>
                </div>

                {/* EXPERIENCE Annotation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#174C4A] bg-[#DCEAE6] px-2 py-0.5 rounded border border-[#174C4A]/20 inline-block">
                    EXPERIENCE
                  </span>
                  <p className="text-xs text-[#171817]">
                    Senior Backend Engineer @ CloudSystems (2020 – Present) · Led 6-person team building microservices.
                  </p>
                </div>

                {/* EDUCATION Annotation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#174C4A] bg-[#DCEAE6] px-2 py-0.5 rounded border border-[#174C4A]/20 inline-block">
                    EDUCATION
                  </span>
                  <p className="text-xs text-[#171817]">
                    B.S. Computer Science & Engineering
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: Editorial Copy */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#171817] tracking-tight uppercase leading-tight">
              PRECISION<br />FACT EXTRACTION.
            </h2>

            <p className="text-base sm:text-lg text-[#686A66] leading-relaxed">
              HireMe AI evaluates contact information, structured skills, tenure length, education credentials, and candidate claim statements across any PDF resume layout.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-[#171817]">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#28745D]" />
                <span>Deterministic ATS parsability analysis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#28745D]" />
                <span>4-tier candidate claim verification taxonomy</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#28745D]" />
                <span>Zero hallucination verbatim evidence grounding</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
