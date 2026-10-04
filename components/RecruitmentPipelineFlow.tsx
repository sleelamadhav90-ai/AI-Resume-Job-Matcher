import React from 'react';
import { Users, Filter, Sparkles, BookmarkCheck, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { useCountUp } from '../lib/useCountUp';

interface PipelineStage {
  name: string;
  targetCount: number;
  label: string;
  isAI?: boolean;
  isHired?: boolean;
}

const STAGES: PipelineStage[] = [
  { name: 'APPLIED', targetCount: 42, label: 'Applications Ingested' },
  { name: 'SCREENED', targetCount: 28, label: 'Resume Parsed' },
  { name: 'AI MATCHED', targetCount: 18, label: 'Deterministic Scoring', isAI: true },
  { name: 'SHORTLISTED', targetCount: 8, label: 'Qualified Candidates' },
  { name: 'INTERVIEW', targetCount: 5, label: 'Technical Screening' },
  { name: 'HIRED', targetCount: 4, label: 'Offers Accepted', isHired: true },
];

export const RecruitmentPipelineFlow: React.FC<{ shortlistedCount?: number }> = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const c1 = useCountUp(42, 600, isInView);
  const c2 = useCountUp(28, 650, isInView);
  const c3 = useCountUp(18, 700, isInView);
  const c4 = useCountUp(8, 750, isInView);
  const c5 = useCountUp(5, 800, isInView);
  const c6 = useCountUp(4, 850, isInView);

  const counts = [c1, c2, c3, c4, c5, c6];

  return (
    <div ref={ref} className="bg-white rounded-xl border border-[#E5E7EB] p-8 sm:p-10 shadow-sm space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
            Hiring Funnel
          </span>
          <h3 className="font-bold text-xl sm:text-2xl text-[#202124] font-heading mt-0.5">
            Connected Recruitment Journey
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-[#EEF2FF] text-[#6366F1] font-semibold font-mono border border-[#6366F1]/20">
          Sequential Progression
        </span>
      </div>

      {/* Dominant Connected Path */}
      <div className="relative pt-4 pb-2">
        
        {/* Continuous Connecting Line */}
        <div className="hidden lg:block absolute top-[52px] left-12 right-12 h-1 bg-[#E5E7EB] z-0">
          <div className="h-full w-32 bg-gradient-to-r from-transparent via-[#6366F1] to-[#E83E8C] animate-signal-pulse" />
        </div>

        {/* 6 Connected Funnel Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          {STAGES.map((stage, idx) => {
            return (
              <div
                key={stage.name}
                className={`p-4 rounded-xl border transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } ${
                  stage.isAI
                    ? 'bg-[#EEF2FF]/90 border-[#6366F1]/40 shadow-xs ring-1 ring-[#6366F1]/20'
                    : stage.isHired
                    ? 'bg-emerald-50/90 border-emerald-300'
                    : 'bg-white border-[#E5E7EB] hover:border-[#CBD5E1]'
                }`}
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${
                    stage.isAI
                      ? 'bg-[#6366F1] ring-4 ring-[#6366F1]/20'
                      : stage.isHired
                      ? 'bg-emerald-600 ring-4 ring-emerald-600/20'
                      : 'bg-[#202124] ring-4 ring-gray-200'
                  }`} />
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-3xl font-black font-mono text-[#202124] tracking-tight">
                  {counts[idx]}
                </div>

                <span className={`text-xs font-bold block mt-1 uppercase tracking-wider ${
                  stage.isAI ? 'text-[#6366F1]' : stage.isHired ? 'text-emerald-800' : 'text-[#202124]'
                }`}>
                  {stage.name}
                </span>

                <span className="text-[11px] text-[#6B7280] block mt-0.5 truncate">
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
