import React from 'react';
import { Mail, Phone, ChevronRight, CheckCircle2, AlertCircle, Briefcase, Award } from 'lucide-react';
import { RankedCandidate, ScoreTierLabel } from '../lib/types';

interface CandidateCardProps {
  candidate: RankedCandidate;
  isSelected?: boolean;
  onSelect: (candidateId: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected = false,
  onSelect,
}) => {
  const { rank, profile, match } = candidate;

  // Determine score badge styling based on deterministic score label
  const getBadgeStyle = (label: ScoreTierLabel) => {
    switch (label) {
      case 'Strong Match':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Good Match':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Moderate Match':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Weak Match':
      default:
        return 'text-rose-700 bg-rose-50 border-rose-200';
    }
  };

  const candidateYears = match.experienceMatch.candidateYears;
  const requiredYears = match.experienceMatch.requiredYears;

  return (
    <div
      onClick={() => onSelect(profile.id)}
      className={`p-5 rounded-xl border transition-all cursor-pointer bg-white ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
          : 'border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Rank & Candidate Info */}
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm shrink-0">
            #{rank}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 truncate">
              {profile.name || 'Candidate Name Unavailable'}
            </h3>

            {/* Unboxed metadata line with typographic bullet separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {profile.email}
                </span>
              )}
              {profile.email && profile.phone && <span aria-hidden="true">·</span>}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {profile.phone}
                </span>
              )}
              {(profile.email || profile.phone) && <span aria-hidden="true">·</span>}
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[180px]">
                {candidate.fileName}
              </span>
            </div>

            {/* Experience headline */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Experience:</span>
              <span className="font-semibold text-slate-800">
                {candidateYears !== null ? `${candidateYears} years` : 'Unspecified'}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">
                {requiredYears !== null ? `${requiredYears} required` : 'None required'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Score & Tier Label */}
        <div className="flex items-start sm:items-end flex-col gap-1.5 shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              {match.totalScore}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Match</span>
          </div>

          <div className={`text-xs px-2.5 py-0.5 rounded border font-semibold ${getBadgeStyle(match.label)}`}>
            {match.label}
          </div>
        </div>
      </div>

      {/* Matched vs Missing Skills section */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-slate-500 font-medium flex items-center gap-1 mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Matched Skills ({match.matchedRequiredSkills.length + match.matchedPreferredSkills.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {match.matchedRequiredSkills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
            {match.matchedPreferredSkills.slice(0, 2).map((skill, i) => (
              <span
                key={`pref-${i}`}
                className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px]"
              >
                {skill} (pref)
              </span>
            ))}
            {match.matchedRequiredSkills.length === 0 && match.matchedPreferredSkills.length === 0 && (
              <span className="text-slate-400 text-[11px]">No direct skill matches</span>
            )}
          </div>
        </div>

        <div>
          <span className="text-slate-500 font-medium flex items-center gap-1 mb-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Missing Skills ({match.missingRequiredSkills.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {match.missingRequiredSkills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px]"
              >
                {skill}
              </span>
            ))}
            {match.missingRequiredSkills.length === 0 && (
              <span className="text-emerald-700 text-[11px] font-medium">None! Full required coverage</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer bar with explanation preview & details button */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-50 text-xs">
        <p className="text-slate-500 text-[11px] line-clamp-1 flex-1 pr-2">
          {match.explanation}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(profile.id);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
        >
          View Match Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
