import React from 'react';
import { Mail, Phone, ChevronRight, Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CandidateMatchResult } from '../lib/types';

interface CandidateCardProps {
  result: CandidateMatchResult;
  rank: number;
  isSelected?: boolean;
  onSelect: (candidateId: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  result,
  rank,
  isSelected = false,
  onSelect
}) => {
  const { candidate, score, matchedSkills, missingSkills, claimsToVerify } = result;

  // Determine score color accent (neutral professional tone)
  const getScoreBadgeClass = (val: number) => {
    if (val >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (val >= 60) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-amber-700 bg-amber-50 border-amber-200';
  };

  return (
    <div
      onClick={() => onSelect(candidate.id)}
      className={`p-5 rounded-xl border transition-all cursor-pointer bg-white ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
          : 'border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Rank & Candidate Info */}
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-sm shrink-0">
            #{rank}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              {candidate.name || 'Candidate Name Unavailable'}
            </h3>

            {/* Unboxed metadata line with typographic bullet separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
              {candidate.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {candidate.email}
                </span>
              )}
              {candidate.email && candidate.phone && <span aria-hidden="true">·</span>}
              {candidate.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {candidate.phone}
                </span>
              )}
              {(candidate.email || candidate.phone) && <span aria-hidden="true">·</span>}
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[180px]">
                {candidate.fileName}
              </span>
            </div>

            {/* Quick Experience / Education headline */}
            {candidate.experience.length > 0 && (
              <p className="text-xs text-slate-600 mt-2">
                <span className="font-medium text-slate-700">Latest:</span>{' '}
                {candidate.experience[0].role || 'Position'} at {candidate.experience[0].company || 'Company'}
              </p>
            )}
          </div>
        </div>

        {/* Right: Match Score & Action */}
        <div className="flex items-center sm:items-end flex-col gap-2 shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {score.totalScore}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Match</span>
          </div>

          <div
            className={`text-xs px-2 py-0.5 rounded border font-medium ${getScoreBadgeClass(
              score.totalScore
            )}`}
          >
            {score.totalScore >= 80 ? 'Strong Match' : score.totalScore >= 65 ? 'Moderate Match' : 'Potential Match'}
          </div>
        </div>
      </div>

      {/* Score Breakdown preview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Skills (40%)</span>
          <span className="font-semibold text-slate-700">{score.skillsScore}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Experience (25%)</span>
          <span className="font-semibold text-slate-700">{score.experienceScore}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Education (15%)</span>
          <span className="font-semibold text-slate-700">{score.educationScore}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Projects (10%)</span>
          <span className="font-semibold text-slate-700">{score.projectsScore}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Requirements (10%)</span>
          <span className="font-semibold text-slate-700">{score.otherScore}%</span>
        </div>
      </div>

      {/* Quick summary indicators */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {matchedSkills.length} skills matched
          </span>
          {missingSkills.length > 0 && (
            <span className="text-slate-400">
              · {missingSkills.length} missing
            </span>
          )}
          {claimsToVerify.length > 0 && (
            <span className="flex items-center gap-1 text-amber-700">
              · <AlertTriangle className="w-3.5 h-3.5" />
              {claimsToVerify.length} claims to verify
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(candidate.id);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          View Match Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
