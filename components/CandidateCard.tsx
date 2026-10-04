import React from 'react';
import {
  Mail,
  Phone,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Bookmark,
  BookmarkCheck,
  ShieldAlert,
  HelpCircle,
  Check
} from 'lucide-react';
import { RankedCandidate, ScoreTierLabel } from '../lib/types';

interface CandidateCardProps {
  candidate: RankedCandidate;
  isSelected?: boolean;
  isShortlisted?: boolean;
  onSelect: (candidateId: string) => void;
  onToggleShortlist?: (candidateId: string, e: React.MouseEvent) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected = false,
  isShortlisted = false,
  onSelect,
  onToggleShortlist,
}) => {
  const { rank, profile, match } = candidate;

  // Score tier styling with clean neutral palette
  const getScoreBadgeClass = (label: ScoreTierLabel) => {
    switch (label) {
      case 'Strong Match':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Good Match':
        return 'text-[#E83E8C] bg-[#FDF2F7] border-[#E83E8C]/20';
      case 'Moderate Match':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Weak Match':
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const candidateYears = match?.experienceMatch?.candidateYears;
  const requiredYears = match?.experienceMatch?.requiredYears;

  const totalRequiredCount =
    (match?.matchedRequiredSkills?.length || 0) + (match?.missingRequiredSkills?.length || 0);
  const matchedRequiredCount = match?.matchedRequiredSkills?.length || 0;
  const missingCount = match?.missingRequiredSkills?.length || 0;

  const unverifiedClaimsCount = (profile?.claimsToVerify || []).filter(
    (c) => c.status !== 'SUPPORTED'
  ).length;

  return (
    <div
      onClick={() => onSelect(profile?.id || candidate.id)}
      className={`p-4 rounded border transition-all cursor-pointer bg-white group ${
        isSelected
          ? 'border-[#E83E8C] ring-2 ring-[#E83E8C]/15 shadow-2xs'
          : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-2xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left: Rank & Candidate Info */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-7 h-7 rounded bg-[#202124] text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
            #{rank}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#202124] tracking-tight truncate group-hover:text-[#E83E8C] transition-colors">
                {profile?.name || 'Candidate Name (Not provided)'}
              </h3>
              {isShortlisted && (
                <span className="text-[10px] font-semibold text-[#E83E8C] bg-[#FDF2F7] border border-[#E83E8C]/20 px-1.5 py-0.2 rounded flex items-center gap-1">
                  <BookmarkCheck className="w-3 h-3 text-[#E83E8C]" /> Shortlisted
                </span>
              )}
            </div>

            {/* Unboxed metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280] mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profile?.email || 'Email not provided'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {profile?.phone || 'Phone not provided'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[11px] truncate max-w-[140px]">
                {candidate.fileName}
              </span>
            </div>

            {/* Recruiter Indicators Line */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#202124] mt-2">
              <span className="font-medium text-[#4B5563]">
                {totalRequiredCount > 0 ? (
                  <span className="text-[#10B981] font-semibold">
                    {matchedRequiredCount}/{totalRequiredCount} required skills matched
                  </span>
                ) : (
                  <span>Skills evaluated</span>
                )}
              </span>

              <span aria-hidden="true" className="text-[#D1D5DB]">·</span>

              <span className="text-[#4B5563]">
                Experience:{' '}
                <span className="font-semibold text-[#202124]">
                  {candidateYears !== null ? `${candidateYears} yrs` : 'Not specified'}
                </span>{' '}
                /{' '}
                <span className="text-[#6B7280]">
                  {requiredYears !== null ? `${requiredYears} yrs required` : 'None required'}
                </span>
              </span>

              {missingCount > 0 ? (
                <>
                  <span aria-hidden="true" className="text-[#D1D5DB]">·</span>
                  <span className="text-amber-800 font-medium">
                    {missingCount} skill{missingCount === 1 ? '' : 's'} missing
                  </span>
                </>
              ) : (
                <>
                  <span aria-hidden="true" className="text-[#D1D5DB]">·</span>
                  <span className="text-emerald-700 font-medium">
                    All required skills met
                  </span>
                </>
              )}

              {unverifiedClaimsCount > 0 && (
                <>
                  <span aria-hidden="true" className="text-[#D1D5DB]">·</span>
                  <span className="text-[#E83E8C] font-semibold text-[11px] flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    Needs verification ({unverifiedClaimsCount})
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Score, Tier Label & Shortlist Action */}
        <div className="flex items-start sm:items-end flex-col gap-1.5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#202124]">
                {match.totalScore}%
              </span>
              <span className="text-xs text-[#6B7280]">Match</span>
            </div>

            {onToggleShortlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleShortlist(profile?.id || candidate.id, e);
                }}
                className={`p-1 rounded border transition-all cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#FDF2F7] border-[#E83E8C]/30 text-[#E83E8C]'
                    : 'bg-white border-[#D1D5DB] text-[#6B7280] hover:text-[#202124]'
                }`}
                title={isShortlisted ? 'Remove from shortlist' : 'Shortlist candidate'}
              >
                {isShortlisted ? (
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#E83E8C]" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getScoreBadgeClass(match.label)}`}>
            {match.label}
          </span>
        </div>
      </div>

      {/* Footer bar with explanation snippet & Match Details link */}
      <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-[#F3F4F6] text-xs">
        <p className="text-[#6B7280] text-[11px] line-clamp-1 flex-1 pr-2">
          {match.explanation}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(profile?.id || candidate.id);
          }}
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#E83E8C] hover:underline shrink-0 cursor-pointer"
        >
          <span>View Match Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
