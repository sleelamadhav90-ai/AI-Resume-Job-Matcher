import React from 'react';
import { FileText, Check, ShieldCheck, ArrowRight } from 'lucide-react';

export const ATSCheckSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] text-[#111318] border-t border-[#E2E8F0]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 space-y-24">
        
        {/* ROW 1: ATS UNDERSTANDING CHECK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Layered Resume Paper Sheets with Pill Overlays (Recreating Screenshot 1) */}
          <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center">
            <div className="relative w-full max-w-[460px] h-[400px]">
              
              {/* Back Sheet */}
              <div className="absolute top-4 left-4 sm:left-8 w-[320px] sm:w-[380px] h-[380px] bg-white rounded-2xl border border-[#CBD5E1] shadow-lg transform -rotate-6 p-6 opacity-70">
                <div className="font-mono text-[10px] text-slate-400 border-b border-slate-100 pb-2 font-bold">
                  JASMINE BELL · RESUME.PDF
                </div>
                <div className="space-y-2 pt-3 text-[10px] text-slate-500 font-mono">
                  <p>PORTFOLIO: lead-design.com/portfolio</p>
                  <p>EXPERIENCE: Associate Producer & Lead Engineer</p>
                </div>
              </div>

              {/* Front Main Sheet */}
              <div className="absolute top-0 left-8 sm:left-14 w-[320px] sm:w-[380px] bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl transform rotate-2 p-7 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">JASMINE BELL</h3>
                    <p className="text-[11px] text-slate-500">Video Editor & Full Stack Engineer</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    JB
                  </div>
                </div>

                <div className="space-y-3 text-[11px] text-slate-600">
                  <div>
                    <span className="font-bold text-[10px] uppercase font-mono text-slate-400 block">Experience</span>
                    <p className="font-medium text-slate-800">10+ years experience producing video & software</p>
                  </div>

                  <div>
                    <span className="font-bold text-[10px] uppercase font-mono text-slate-400 block">Education</span>
                    <p className="text-slate-800">B.S. Computer Science, Animation Technical Track</p>
                  </div>
                </div>
              </div>

              {/* Floating Pill Tag 1 (Contact Information) */}
              <div className="absolute bottom-16 -left-2 sm:left-2 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md z-30 animate-pulse">
                Contact information ✓
              </div>

              {/* Floating Pill Tag 2 (Skills) */}
              <div className="absolute bottom-8 right-8 sm:right-16 bg-purple-100 text-purple-900 border border-purple-300 px-4 py-1.5 rounded-full text-xs font-bold shadow-md z-30">
                Skills Verified ✓
              </div>

            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0F172A] tracking-tight leading-[1.08]">
              Get an ATS<br />
              understanding check
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Part of the candidate match score we assign is based on the parsability rate of the resume. We've reverse-engineered the most popular applicant tracking systems currently used, such as BambooHR, Greenhouse, Lever, SAP SuccessFactors, and Workday, and we look for explicit signs of ATS compatibility.
            </p>

            <p className="text-sm text-[#64748B] leading-relaxed">
              For each resume uploaded, HireMe AI evaluates skills and keywords connected to the job, readable contact information, date formatting, links, file type, and tenure length.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
