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
  Sparkles,
  ExternalLink
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

  // Score tier styling with HireMe AI palette
  const getScoreBadgeClass = (label: ScoreTierLabel) => {
    switch (label) {
      case 'Strong Match':
        return 'text-[#159B72] bg-[#159B72]/10 border-[#159B72]/30';
      case 'Good Match':
        return 'text-[#D92E70] bg-[#FDF2F6] border-[#F04483]/30';
      case 'Moderate Match':
        return 'text-[#D99A27] bg-[#D99A27]/10 border-[#D99A27]/30';
      case 'Weak Match':
      default:
        return 'text-[#747480] bg-[#F7F7F9] border-[#E8E8ED]';
    }
  };

  const candidateYears = match.experienceMatch.candidateYears;
  const requiredYears = match.experienceMatch.requiredYears;

  return (
    <div
      onClick={() => onSelect(profile.id)}
      className={`p-5 rounded-xl border transition-all cursor-pointer bg-white group ${
        isSelected
          ? 'border-[#F04483] ring-2 ring-[#F04483]/15 shadow-sm'
          : 'border-[#E8E8ED] hover:border-[#F04483]/40 hover:shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Rank & Candidate Info */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#19191D] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            #{rank}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#202027] tracking-tight truncate group-hover:text-[#D92E70] transition-colors">
                {profile.name || 'Candidate Name Unavailable'}
              </h3>
              {isShortlisted && (
                <span className="text-[10px] font-semibold text-[#D92E70] bg-[#FDF2F6] border border-[#F04483]/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <BookmarkCheck className="w-3 h-3 text-[#F04483]" /> Shortlisted
                </span>
              )}
            </div>

            {/* Unboxed metadata line with typographic bullet separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#747480] mt-1">
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#747480]" />
                  {profile.email}
                </span>
              )}
              {profile.email && profile.phone && <span aria-hidden="true">·</span>}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#747480]" />
                  {profile.phone}
                </span>
              )}
              {(profile.email || profile.phone) && <span aria-hidden="true">·</span>}
              <span className="text-[#747480] font-mono text-[11px] truncate max-w-[160px]">
                {candidate.fileName}
              </span>
            </div>

            {/* Experience Headline */}
            <div className="flex items-center gap-1.5 text-xs text-[#202027] mt-2">
              <Briefcase className="w-3.5 h-3.5 text-[#747480]" />
              <span className="text-[#747480]">Experience:</span>
              <span className="font-semibold text-[#202027]">
                {candidateYears !== null ? `${candidateYears} years` : 'Unspecified'}
              </span>
              <span className="text-[#747480]">/</span>
              <span className="text-[#747480]">
                {requiredYears !== null ? `${requiredYears} required` : 'None required'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Score, Tier Label & Shortlist Action */}
        <div className="flex items-start sm:items-end flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-[#19191D]">
                {match.totalScore}%
              </span>
              <span className="text-xs text-[#747480] font-medium">Match</span>
            </div>

            {onToggleShortlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleShortlist(profile.id, e);
                }}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#FDF2F6] border-[#F04483]/40 text-[#D92E70]'
                    : 'bg-[#F7F7F9] border-[#E8E8ED] text-[#747480] hover:text-[#D92E70] hover:border-[#F04483]/30'
                }`}
                title={isShortlisted ? 'Remove from shortlist' : 'Shortlist candidate'}
              >
                {isShortlisted ? (
                  <BookmarkCheck className="w-4 h-4 text-[#F04483]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <div className={`text-xs px-2.5 py-0.5 rounded-md border font-semibold ${getScoreBadgeClass(match.label)}`}>
            {match.label}
          </div>
        </div>
      </div>

      {/* Matched vs Missing Skills section */}
      <div className="mt-4 pt-3 border-t border-[#E8E8ED] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-[#747480] font-medium flex items-center gap-1 mb-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#159B72]" />
            Matched Skills ({match.matchedRequiredSkills.length + match.matchedPreferredSkills.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {match.matchedRequiredSkills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-[#159B72]/10 text-[#159B72] border border-[#159B72]/20 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
            {match.matchedPreferredSkills.slice(0, 2).map((skill, i) => (
              <span
                key={`pref-${i}`}
                className="px-2 py-0.5 rounded bg-[#F7F7F9] text-[#202027] border border-[#E8E8ED] text-[11px]"
              >
                {skill} (pref)
              </span>
            ))}
            {match.matchedRequiredSkills.length === 0 && match.matchedPreferredSkills.length === 0 && (
              <span className="text-[#747480] text-[11px]">No direct skill matches</span>
            )}
          </div>
        </div>

        <div>
          <span className="text-[#747480] font-medium flex items-center gap-1 mb-1.5 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D99A27]" />
            Missing Skills ({match.missingRequiredSkills.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {match.missingRequiredSkills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-[#D99A27]/10 text-[#D99A27] border border-[#D99A27]/30 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
            {match.missingRequiredSkills.length === 0 && (
              <span className="text-[#159B72] text-[11px] font-medium">✓ Full required coverage</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer bar with explanation snippet & Match Details link */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F7F7F9] text-xs">
        <p className="text-[#747480] text-[11px] line-clamp-1 flex-1 pr-2">
          {match.explanation}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(profile.id);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#D92E70] hover:text-[#F04483] hover:underline shrink-0 cursor-pointer"
        >
          View Match Details
          <ChevronRight className="w-3.5 h-3.5 text-[#F04483]" />
        </button>
      </div>
    </div>
  );
};
