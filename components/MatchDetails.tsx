import React from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Sparkles,
  ShieldAlert,
  Award
} from 'lucide-react';
import { RankedCandidate, ScoreTierLabel } from '../lib/types';

interface MatchDetailsProps {
  candidate: RankedCandidate;
  onClose: () => void;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ candidate, onClose }) => {
  const { rank, profile, match } = candidate;

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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-end sm:p-4">
      <div className="bg-white w-full max-w-2xl h-full sm:h-[95vh] sm:rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs px-2 py-0.5 rounded font-bold bg-slate-200 text-slate-800">
                #{rank}
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {profile.name || 'Candidate Name Unavailable'}
              </h2>
              <span className={`text-xs px-2.5 py-0.5 rounded border font-semibold ${getBadgeStyle(match.label)}`}>
                {match.totalScore}% · {match.label}
              </span>
            </div>

            {/* Unboxed clean metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1.5">
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {profile.email}
                </span>
              )}
              {profile.email && profile.phone && <span aria-hidden="true">·</span>}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {profile.phone}
                </span>
              )}
              {(profile.email || profile.phone) && <span aria-hidden="true">·</span>}
              <span className="text-slate-400 font-mono text-[11px]">
                {candidate.fileName}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Why This Candidate Matches (Deterministic Explanation) */}
          <section className="bg-blue-50/60 rounded-xl p-4 border border-blue-200/80">
            <h3 className="font-semibold text-blue-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Why This Candidate Matches
            </h3>
            <p className="mt-2 text-slate-700 leading-relaxed text-xs">
              {match.explanation}
            </p>
          </section>

          {/* 100-Point Score Breakdown */}
          <section>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                Deterministic Score Breakdown
              </h3>
              <span className="font-bold text-slate-900 text-sm">
                {match.totalScore} / 100
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-400 block text-[11px]">Skills (40)</span>
                <span className="font-bold text-slate-900 text-sm">{match.skillScore}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Req: {match.requiredSkillScore}/30
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-400 block text-[11px]">Experience (25)</span>
                <span className="font-bold text-slate-900 text-sm">{match.experienceScore}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 capitalize">
                  {match.experienceMatch.status}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-400 block text-[11px]">Education (15)</span>
                <span className="font-bold text-slate-900 text-sm">{match.educationScore}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 capitalize">
                  {match.educationMatch.status}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-400 block text-[11px]">Projects (10)</span>
                <span className="font-bold text-slate-900 text-sm">{match.projectScore}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {match.relevantProjects.length} relevant
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-400 block text-[11px]">Keywords (10)</span>
                <span className="font-bold text-slate-900 text-sm">{match.requirementsScore}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {match.matchedRequirements.length} matched
                </span>
              </div>
            </div>
          </section>

          {/* Matched vs Missing Skills */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
              <h4 className="font-semibold text-emerald-900 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Matched Skills ({match.matchedRequiredSkills.length + match.matchedPreferredSkills.length})
              </h4>
              <ul className="space-y-1.5 text-xs">
                {match.matchedRequiredSkills.map((skill, i) => (
                  <li key={`req-${i}`} className="flex items-center gap-1.5 text-emerald-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-medium">{skill}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-normal">
                      Required
                    </span>
                  </li>
                ))}
                {match.matchedPreferredSkills.map((skill, i) => (
                  <li key={`pref-${i}`} className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{skill}</span>
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                      Preferred
                    </span>
                  </li>
                ))}
                {match.matchedRequiredSkills.length === 0 && match.matchedPreferredSkills.length === 0 && (
                  <li className="text-slate-400 text-xs italic">No direct skill matches detected.</li>
                )}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30">
              <h4 className="font-semibold text-amber-900 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Missing Skills ({match.missingRequiredSkills.length})
              </h4>
              <ul className="space-y-1.5 text-xs">
                {match.missingRequiredSkills.map((skill, i) => (
                  <li key={`miss-${i}`} className="flex items-center gap-1.5 text-amber-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="font-medium">{skill}</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100/70 px-1.5 py-0.2 rounded font-normal">
                      Required
                    </span>
                  </li>
                ))}
                {match.missingPreferredSkills.map((skill, i) => (
                  <li key={`misspref-${i}`} className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span>{skill}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      Preferred
                    </span>
                  </li>
                ))}
                {match.missingRequiredSkills.length === 0 && (
                  <li className="text-emerald-700 text-xs font-medium">✓ Full required skill coverage!</li>
                )}
              </ul>
            </div>
          </section>

          {/* Experience Comparison */}
          <section className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-slate-600" />
              Experience Alignment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[11px]">Candidate Experience</span>
                <span className="font-semibold text-slate-800">
                  {match.experienceMatch.candidateYears !== null
                    ? `${match.experienceMatch.candidateYears} years`
                    : 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Required by Job</span>
                <span className="font-semibold text-slate-800">
                  {match.experienceMatch.requiredYears !== null
                    ? `${match.experienceMatch.requiredYears} years`
                    : 'None required'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Alignment Status</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {match.experienceMatch.status === 'meets'
                    ? '✓ Meets Requirement'
                    : match.experienceMatch.status === 'partial'
                    ? '⚠ Partial Tenure'
                    : 'Unquantified'}
                </span>
              </div>
            </div>
          </section>

          {/* Relevant Projects */}
          <section className="space-y-2">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4 text-slate-600" />
              Relevant Projects ({match.relevantProjects.length})
            </h4>
            {match.relevantProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {match.relevantProjects.map((name, i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white text-xs">
                    <span className="font-medium text-slate-900 block">{name}</span>
                    <span className="text-[11px] text-emerald-700">Demonstrates required tech stack</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-xs italic">No matching project titles found.</p>
            )}
          </section>

          {/* Claims to Verify (Stage 4 Output) */}
          <section className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
            <h4 className="font-semibold text-amber-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Claims to Verify ({profile.claimsToVerify.length})
            </h4>
            {profile.claimsToVerify.length > 0 ? (
              <ul className="space-y-2 text-xs">
                {profile.claimsToVerify.map((item, i) => (
                  <li key={i} className="p-2.5 rounded-lg bg-white border border-amber-200 text-slate-700">
                    <span className="font-semibold text-slate-900 block">"{item.claim}"</span>
                    <span className="text-[11px] text-amber-800 mt-0.5 block">
                      {item.evidence
                        ? `Evidence in text: ${item.evidence}`
                        : 'Evidence not clearly found in resume. Recommended for verification in interview.'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-xs">
                No unverified or extraordinary claims detected in this resume.
              </p>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 bg-slate-100 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
