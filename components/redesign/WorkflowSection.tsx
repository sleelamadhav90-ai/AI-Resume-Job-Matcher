import React from 'react';
import { Sparkles, FileText, Cpu, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D3834] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/80 inline-block">
            CONNECTED WORKFLOW
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#0F172A] tracking-tight leading-[1.08]">
            End-To-End Intelligent Pipeline
          </h2>

          <p className="text-base sm:text-lg text-[#64748B]">
            From raw resume PDF upload to verified evidence dossier and hiring decision.
          </p>
        </div>

        {/* Visual Workflow Steps / Animated Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          
          {/* STEP 1 */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 text-center space-y-3 hover:border-[#0D3834] transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3834] text-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">01 / Ingestion</span>
              <h4 className="font-bold text-sm text-[#0F172A] mt-0.5">Resume PDF</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Batch parsing of unformatted resumes
            </p>
          </div>

          {/* STEP 2 */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 text-center space-y-3 hover:border-[#0D3834] transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3834] text-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">02 / Fact Extraction</span>
              <h4 className="font-bold text-sm text-[#0F172A] mt-0.5">AI Fact Extraction</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Google Gemini schema extraction
            </p>
          </div>

          {/* STEP 3 */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 text-center space-y-3 hover:border-[#0D3834] transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3834] text-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">03 / Skill Mapping</span>
              <h4 className="font-bold text-sm text-[#0F172A] mt-0.5">Skill Analysis</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Normalization & tenure verification
            </p>
          </div>

          {/* STEP 4 */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 text-center space-y-3 hover:border-[#0D3834] transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3834] text-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">04 / Evaluation</span>
              <h4 className="font-bold text-sm text-[#0F172A] mt-0.5">100-Pt Rubric</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Deterministic 100-pt fit score
            </p>
          </div>

          {/* STEP 5 */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 text-center space-y-3 hover:border-[#0D3834] transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3834] text-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">05 / Autopilot</span>
              <h4 className="font-bold text-sm text-[#0F172A] mt-0.5">Interview Sync</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Auto-agenda & panel invites
            </p>
          </div>

          {/* STEP 6 */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 text-center space-y-3 hover:border-[#0D3834] transition-all relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3834] text-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">06 / Decision</span>
              <h4 className="font-bold text-sm text-[#0F172A] mt-0.5">Hiring Dossier</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Verbatim evidence & shortlist
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
