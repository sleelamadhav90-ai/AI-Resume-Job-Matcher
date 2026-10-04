import React from 'react';
import { Users, Filter, Sparkles, BookmarkCheck, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface PipelineStage {
  name: string;
  count: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isAI?: boolean;
  isHired?: boolean;
}

const STAGES: PipelineStage[] = [
  { name: 'Applied', count: 42, label: 'New Applicants', icon: Users },
  { name: 'Screened', count: 28, label: 'Resume Parser', icon: Filter },
  { name: 'AI Matched', count: 31, label: 'Deterministic Scoring', icon: Sparkles, isAI: true },
  { name: 'Shortlisted', count: 8, label: 'Candidate Shortlist', icon: BookmarkCheck },
  { name: 'Interview', count: 15, label: 'Technical Assessment', icon: Calendar },
  { name: 'Hired', count: 4, label: 'Offer Accepted', icon: CheckCircle2, isHired: true },
];

export const RecruitmentPipelineFlow: React.FC<{ shortlistedCount?: number }> = ({ shortlistedCount = 8 }) => {
  const dynamicStages = STAGES.map((s) => (s.name === 'Shortlisted' ? { ...s, count: shortlistedCount } : s));

  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 sm:p-8 shadow-2xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-[#202124] font-heading uppercase tracking-wider">
            Connected Recruitment Pipeline
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Deterministic candidate progression from ingestion to placement.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-[#EEF2FF] text-[#6366F1] font-semibold font-mono border border-[#6366F1]/20">
          Live Tracking
        </span>
      </div>

      {/* Connected Line Container */}
      <div className="relative">
        
        {/* Animated Horizontal Continuous Line */}
        <div className="hidden lg:block absolute top-7 left-8 right-8 h-0.5 bg-[#E5E7EB] z-0 overflow-hidden">
          <div className="h-full w-24 bg-gradient-to-r from-transparent via-[#6366F1] to-[#E83E8C] animate-signal-pulse" />
        </div>

        {/* 6 Connected Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {dynamicStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.name}
                className={`p-4 rounded-lg border transition-all ${
                  stage.isAI
                    ? 'bg-[#EEF2FF]/80 border-[#6366F1]/30 shadow-2xs'
                    : stage.isHired
                    ? 'bg-emerald-50/80 border-emerald-200'
                    : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    stage.isAI
                      ? 'bg-[#6366F1] text-white'
                      : stage.isHired
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#F3F4F6] text-[#4B5563]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#9CA3AF]">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-2xl font-bold text-[#202124] font-mono">
                  {stage.count}
                </div>

                <span className={`text-xs font-bold block mt-0.5 ${
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
