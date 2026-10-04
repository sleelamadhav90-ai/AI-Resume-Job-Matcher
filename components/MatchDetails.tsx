import React from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  AlertTriangle,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import { CandidateMatchResult } from '../lib/types';

interface MatchDetailsProps {
  result: CandidateMatchResult | null;
  onClose: () => void;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ result, onClose }) => {
  if (!result) return null;

  const {
    candidate,
    score,
    matchedSkills,
    missingSkills,
    relevantExperience,
    relevantProjects,
    educationMatch,
    overallExplanation,
    claimsToVerify
  } = result;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-end sm:p-4">
      <div className="bg-white w-full max-w-2xl h-full sm:h-[95vh] sm:rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {candidate.name || 'Candidate Name Unavailable'}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {score.totalScore}% Match
              </span>
            </div>

            {/* Unboxed clean metadata line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1.5">
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
              <span className="font-mono text-slate-400 text-[11px]">
                {candidate.fileName}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Transparent Score Breakdown */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Weighted Match Scoring Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Skills (40%)</span>
                <span className="text-base font-bold text-slate-900">{score.skillsScore}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Experience (25%)</span>
                <span className="text-base font-bold text-slate-900">{score.experienceScore}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Education (15%)</span>
                <span className="text-base font-bold text-slate-900">{score.educationScore}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Projects (10%)</span>
                <span className="text-base font-bold text-slate-900">{score.projectsScore}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Other (10%)</span>
                <span className="text-base font-bold text-slate-900">{score.otherScore}%</span>
              </div>
            </div>
          </div>

          {/* Overall AI Summary / Reasoning */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Match Synthesis & Explanation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200 rounded-lg p-3.5">
              {overallExplanation || 'Candidate evaluation will appear here once analyzed.'}
            </p>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matched */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Matched Skills ({matchedSkills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">None identified</p>
                )}
              </div>
            </div>

            {/* Missing */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h4 className="text-xs font-semibold text-rose-800 flex items-center gap-1.5 mb-2.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Missing Required Skills ({missingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">All required skills covered</p>
                )}
              </div>
            </div>
          </div>

          {/* Relevant Experience */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              Relevant Work Experience
            </h3>
            <div className="space-y-2">
              {relevantExperience.length > 0 ? (
                relevantExperience.map((exp, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed"
                  >
                    {exp}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No relevant experience highlighted</p>
              )}
            </div>
          </div>

          {/* Relevant Projects */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
              Relevant Projects
            </h3>
            <div className="space-y-2">
              {relevantProjects.length > 0 ? (
                relevantProjects.map((proj, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed"
                  >
                    {proj}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No specific projects listed</p>
              )}
            </div>
          </div>

          {/* Education Match */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              Education Assessment
            </h3>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {educationMatch || 'Degree matches baseline requirements.'}
            </div>
          </div>

          {/* Bonus: Claims to Verify */}
          <div className="border border-amber-200/80 bg-amber-50/40 rounded-xl p-4">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Claims to Verify (Recruiter Fact-Check)
            </h3>
            <p className="text-xs text-amber-800 mb-3 leading-relaxed">
              Identified claims in resume that lack direct supporting evidence, specific metrics, or verifiable milestones:
            </p>

            {claimsToVerify.length > 0 ? (
              <div className="space-y-2">
                {claimsToVerify.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-lg border border-amber-200 text-xs space-y-1"
                  >
                    <p className="font-semibold text-slate-800">
                      "{item.claim}"
                    </p>
                    <p className="text-slate-500">
                      <span className="font-medium text-slate-700">Context:</span> {item.context}
                    </p>
                    <p className="text-amber-700 font-medium">
                      <span className="text-amber-800">Why verify:</span> {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200">
                No unverifiable claims flagged for this candidate.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
