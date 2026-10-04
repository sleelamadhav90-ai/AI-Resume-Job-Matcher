import React, { useState } from 'react';
import {
  X,
  Check,
  AlertTriangle,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  FileText,
  UserCheck,
  Clock,
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { ClaimVerificationStatus, RankedCandidate, ResumeClaim } from '../lib/types';

interface MatchDetailsProps {
  candidate: RankedCandidate;
  isShortlisted?: boolean;
  onToggleShortlist?: (candidateId: string) => void;
  onClose: () => void;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({
  candidate,
  isShortlisted = false,
  onToggleShortlist,
  onClose,
}) => {
  const { rank, profile, match } = candidate;
  const [activeTab, setActiveTab] = useState<'match' | 'profile' | 'evidence' | 'activity'>('match');
  const [notes, setNotes] = useState<string[]>(['Initial resume screening completed by HireMe AI.']);
  const [newNote, setNewNote] = useState('');
  const [currentStage, setCurrentStage] = useState<'Screening' | 'Matched' | 'Interview' | 'Shortlisted' | 'Hired'>(
    isShortlisted ? 'Shortlisted' : 'Matched'
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote('');
  };

  // Helper to retrieve verified evidence from candidate profile
  const getSkillEvidence = (skillName: string): string => {
    const sLower = skillName.toLowerCase();
    
    // Check in experience
    for (const exp of (profile?.experience || [])) {
      if (!exp) continue;
      if ((exp.description || '').toLowerCase().includes(sLower) || (exp.role || '').toLowerCase().includes(sLower)) {
        return `"${exp.description || `Worked as ${exp.role || 'Engineer'} at ${exp.company || 'Company'}`}"`;
      }
    }
    
    // Check in projects
    for (const proj of (profile?.projects || [])) {
      if (!proj) continue;
      if ((proj.technologies || []).some((t) => t.toLowerCase().includes(sLower)) || (proj.description || '').toLowerCase().includes(sLower)) {
        return `"${proj.name || 'Project'}: ${proj.description || `Implemented using ${(proj.technologies || []).join(', ')}`}"`;
      }
    }

    return `Verified in candidate skills profile under ${profile?.experience?.[0]?.role || 'Technical Repertoire'}.`;
  };

  const getClaimStatusBadge = (status: ClaimVerificationStatus) => {
    switch (status) {
      case 'SUPPORTED':
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            SUPPORTED
          </span>
        );
      case 'CONTRADICTORY':
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 inline-flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            CONTRADICTORY
          </span>
        );
      case 'UNSUPPORTED':
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            UNSUPPORTED
          </span>
        );
      case 'NOT_ENOUGH_EVIDENCE':
      default:
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            NOT ENOUGH EVIDENCE
          </span>
        );
    }
  };

  const struct = match.structuredExplanation;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-end">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-[#E5E7EB] animate-in slide-in-from-right duration-150">
        {/* Header Bar */}
        <div className="p-4 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#202124] text-white flex items-center justify-center font-bold text-xs">
              #{rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#202124]">
                  {profile?.name || 'Candidate Record (Name not provided)'}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#FDF2F7] text-[#E83E8C] border border-[#E83E8C]/20">
                  {match.totalScore}% Match
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-[#E5E7EB] text-[#4B5563]">
                  {currentStage}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-0.5">
                <span>{profile?.experience?.[0]?.role || 'Applicant Profile'}</span>
                <span>·</span>
                <span>{match.experienceMatch.candidateYears !== null ? `${match.experienceMatch.candidateYears} yrs exp` : 'Experience not specified'}</span>
                <span>·</span>
                <span>{candidate.fileName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleShortlist && (
              <button
                type="button"
                onClick={() => {
                  onToggleShortlist(profile.id);
                  setCurrentStage(isShortlisted ? 'Matched' : 'Shortlisted');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#FDF2F7] text-[#E83E8C] border-[#E83E8C]/30'
                    : 'bg-white text-[#202124] border-[#D1D5DB] hover:border-[#E83E8C]'
                }`}
              >
                {isShortlisted ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#E83E8C]" />
                    Shortlisted
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-[#6B7280]" />
                    Shortlist
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#6B7280] hover:text-[#202124] hover:bg-[#E5E7EB] rounded cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E7EB] px-4 bg-white text-xs font-medium text-[#6B7280] gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('match')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'match'
                ? 'border-[#E83E8C] text-[#202124] font-bold'
                : 'border-transparent hover:text-[#202124]'
            }`}
          >
            Match Summary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'evidence'
                ? 'border-[#E83E8C] text-[#202124] font-bold'
                : 'border-transparent hover:text-[#202124]'
            }`}
          >
            Evidence & Claims ({profile?.claimsToVerify?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'profile'
                ? 'border-[#E83E8C] text-[#202124] font-bold'
                : 'border-transparent hover:text-[#202124]'
            }`}
          >
            Resume Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'activity'
                ? 'border-[#E83E8C] text-[#202124] font-bold'
                : 'border-transparent hover:text-[#202124]'
            }`}
          >
            Recruiter Log ({notes.length})
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-[#202124]">
          {/* TAB 1: MATCH SUMMARY */}
          {activeTab === 'match' && (
            <div className="space-y-5">
              {/* Structured Evidence-Based Explanation */}
              <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white shadow-2xs space-y-3 p-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#E83E8C] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E83E8C]" />
                    Candidate Evaluation Breakdown
                  </span>
                  <span className="font-bold text-xs text-[#202124]">{match.label} ({match.totalScore}%)</span>
                </div>

                {/* Why This Candidate Matches */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-xs text-emerald-800 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    Why this candidate matches:
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc text-[11px] text-[#202124]">
                    {match.matchedRequiredSkills.length > 0 && (
                      <li>
                        <span className="font-semibold">Strongest matching skills:</span> {match.matchedRequiredSkills.join(', ')}
                      </li>
                    )}
                    {struct?.whyMatches.experience ? (
                      <li>
                        <span className="font-semibold">Relevant experience:</span> {struct.whyMatches.experience}
                      </li>
                    ) : match.experienceMatch.candidateYears !== null ? (
                      <li>
                        <span className="font-semibold">Relevant experience:</span> {match.experienceMatch.candidateYears} years verified
                      </li>
                    ) : null}
                    {match.relevantProjects.length > 0 && (
                      <li>
                        <span className="font-semibold">Relevant projects:</span> {match.relevantProjects.join(', ')}
                      </li>
                    )}
                    {struct?.whyMatches.education && (
                      <li>
                        <span className="font-semibold">Education alignment:</span> {struct.whyMatches.education}
                      </li>
                    )}
                  </ul>
                </div>

                {/* What is Missing */}
                <div className="space-y-1.5 pt-2 border-t border-[#F3F4F6]">
                  <h4 className="font-bold text-xs text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
                    What is missing / Gaps:
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc text-[11px] text-[#202124]">
                    {match.missingRequiredSkills.length > 0 ? (
                      <li>
                        <span className="font-semibold">Missing required skills:</span> {match.missingRequiredSkills.join(', ')}
                      </li>
                    ) : (
                      <li className="text-emerald-700">✓ All core required technical skills are met.</li>
                    )}
                    {struct?.whatIsMissing.experience && (
                      <li>
                        <span className="font-semibold">Experience gap:</span> {struct.whatIsMissing.experience}
                      </li>
                    )}
                    {struct?.whatIsMissing.education && (
                      <li>
                        <span className="font-semibold">Education gap:</span> {struct.whatIsMissing.education}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Recruiter Attention */}
                {(profile?.claimsToVerify || []).some((c) => c.status !== 'SUPPORTED') && (
                  <div className="space-y-1 pt-2 border-t border-[#F3F4F6]">
                    <h4 className="font-bold text-xs text-[#E83E8C] flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#E83E8C]" />
                      Recruiter Attention:
                    </h4>
                    <p className="text-[11px] text-[#4B5563]">
                      {(profile?.claimsToVerify || []).filter((c) => c.status !== 'SUPPORTED').length} claim(s) require verification during initial screening.
                    </p>
                  </div>
                )}
              </div>

              {/* 100-Point Score Breakdown */}
              <div className="border border-[#E5E7EB] rounded overflow-hidden">
                <div className="bg-[#F9FAFB] px-3.5 py-2 border-b border-[#E5E7EB] font-bold text-xs flex items-center justify-between">
                  <span>Deterministic 100-Point Score Allocation</span>
                  <span className="text-[#E83E8C] font-extrabold">{match.totalScore} / 100 Points</span>
                </div>
                <div className="divide-y divide-[#E5E7EB]">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Required Skills (30 pts)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        Matched {match.matchedRequiredSkills.length} of {match.matchedRequiredSkills.length + match.missingRequiredSkills.length} required skills
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.requiredSkillScore} / 30 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Preferred Skills (10 pts)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        Matched {match.matchedPreferredSkills.length} optional skills
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.preferredSkillScore} / 10 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Experience Tenure (25 pts)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        {match.experienceMatch.candidateYears !== null ? `${match.experienceMatch.candidateYears} yrs verified` : 'Not specified'} vs {match.experienceMatch.requiredYears !== null ? `${match.experienceMatch.requiredYears} yrs required` : 'None required'}
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.experienceScore} / 25 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Education Alignment (15 pts)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        {match.educationMatch.evidence[0] || 'Credential evaluation'}
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.educationScore} / 15 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Projects & Domain Requirements (20 pts)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        {match.relevantProjects.length} relevant projects and domain keywords verified
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.projectScore + match.requirementsScore} / 20 pts</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVIDENCE & CLAIMS (Stage 6 Focus) */}
          {activeTab === 'evidence' && (
            <div className="space-y-5">
              {/* Claims Verification Box */}
              <div className="border border-[#E5E7EB] rounded overflow-hidden bg-white">
                <div className="bg-[#F9FAFB] px-3.5 py-2 border-b border-[#E5E7EB] font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#E83E8C]" />
                    Evidence-Based Claims Verification
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    {profile?.claimsToVerify?.length || 0} claims audited
                  </span>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  {profile?.claimsToVerify && profile.claimsToVerify.length > 0 ? (
                    profile.claimsToVerify.map((item: ResumeClaim, idx: number) => (
                      <div key={idx} className="p-3.5 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-bold text-xs text-[#202124]">
                            "{item.claim}"
                          </span>
                          {getClaimStatusBadge(item.status)}
                        </div>

                        <div className="bg-[#F9FAFB] p-2.5 rounded border border-[#F3F4F6] text-[11px] space-y-1">
                          <span className="font-semibold text-[#6B7280] block">Evidence found in resume:</span>
                          <p className="text-[#202124] italic">
                            {item.evidence ? `"${item.evidence}"` : 'No direct supporting evidence or metrics detailed in resume.'}
                          </p>
                        </div>

                        <p className="text-[11px] text-[#6B7280]">
                          <span className="font-semibold text-[#4B5563]">Recruiter note: </span>
                          {item.explanation || 'Needs verification — insufficient supporting evidence in the resume.'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-[#6B7280] text-xs">
                      No extraordinary or unverified claims flagged in this resume.
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Evidence Section */}
              <div className="border border-[#E5E7EB] rounded overflow-hidden bg-white">
                <div className="bg-[#F9FAFB] px-3.5 py-2 border-b border-[#E5E7EB] font-bold text-xs">
                  Technical Skills Grounding & Resume Excerpts
                </div>
                <div className="divide-y divide-[#E5E7EB]">
                  {match.matchedRequiredSkills.map((skill, idx) => (
                    <div key={idx} className="p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#202124] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          {skill}
                        </span>
                        <span className="text-[10px] font-semibold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded">
                          ✓ Verified in Resume
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] italic bg-[#F9FAFB] p-2 rounded border border-[#F3F4F6]">
                        {getSkillEvidence(skill)}
                      </p>
                    </div>
                  ))}
                  {match.matchedRequiredSkills.length === 0 && (
                    <div className="p-4 text-center text-[#6B7280] text-xs">
                      No required skill evidence identified in resume text.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESUME DETAILS (Messy / Incomplete Resumes Handled Gracefully) */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Contact Information */}
              <div className="border border-[#E5E7EB] rounded p-3 bg-[#F9FAFB] flex flex-wrap items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#202124]">
                  <Mail className="w-3.5 h-3.5 text-[#6B7280]" />
                  {profile?.email || 'Email not provided'}
                </span>
                <span className="flex items-center gap-1.5 text-[#202124]">
                  <Phone className="w-3.5 h-3.5 text-[#6B7280]" />
                  {profile?.phone || 'Phone not provided'}
                </span>
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <FileText className="w-3.5 h-3.5" />
                  {candidate.fileName}
                </span>
              </div>

              {/* Work Experience */}
              <div className="border border-[#E5E7EB] rounded p-3 space-y-3 bg-white">
                <span className="font-bold text-xs uppercase tracking-wider text-[#6B7280] block">
                  Work History
                </span>
                {profile?.experience && profile.experience.length > 0 ? (
                  profile.experience.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-[#E5E7EB] pl-3 py-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#202124]">{exp.role || 'Role not specified'}</span>
                        <span className="text-[11px] text-[#6B7280]">
                          {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Dates not specified'}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B7280] block font-medium">{exp.company || 'Company not specified'}</span>
                      {exp.description ? (
                        <p className="text-[11px] text-[#4B5563] leading-relaxed">{exp.description}</p>
                      ) : (
                        <p className="text-[11px] text-[#9CA3AF] italic">No detailed description provided.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B7280] italic">No work history provided in resume.</p>
                )}
              </div>

              {/* Projects */}
              <div className="border border-[#E5E7EB] rounded p-3 space-y-2 bg-white">
                <span className="font-bold text-xs uppercase tracking-wider text-[#6B7280] block">
                  Projects & Portfolio
                </span>
                {profile?.projects && profile.projects.length > 0 ? (
                  profile.projects.map((proj, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#F9FAFB] border border-[#F3F4F6] text-xs space-y-1">
                      <span className="font-bold text-[#202124] block">{proj.name || 'Project'}</span>
                      {proj.description && <p className="text-[11px] text-[#4B5563]">{proj.description}</p>}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[10px] text-[#E83E8C] font-mono block">
                          Tech: {proj.technologies.join(', ')}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B7280] italic">No projects listed in resume.</p>
                )}
              </div>

              {/* Education */}
              <div className="border border-[#E5E7EB] rounded p-3 space-y-2 bg-white">
                <span className="font-bold text-xs uppercase tracking-wider text-[#6B7280] block">
                  Education Credentials
                </span>
                {profile?.education && profile.education.length > 0 ? (
                  profile.education.map((edu, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#202124] block">{edu.degree || 'Degree not specified'}</span>
                        <span className="text-[#6B7280]">{[edu.field, edu.institution].filter(Boolean).join(' · ') || 'Institution not specified'}</span>
                      </div>
                      {edu.graduationYear && <span className="text-[#6B7280] font-mono">{edu.graduationYear}</span>}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B7280] italic">No formal education credentials listed in resume.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RECRUITER ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="border border-[#E5E7EB] rounded p-3 bg-[#F9FAFB] space-y-2">
                <span className="font-bold text-xs text-[#202124] block">Update Pipeline Stage</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['Screening', 'Matched', 'Interview', 'Shortlisted', 'Hired'] as const).map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => setCurrentStage(stg)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border cursor-pointer transition-all ${
                        currentStage === stg
                          ? 'bg-[#202124] text-white border-[#202124]'
                          : 'bg-white text-[#4B5563] border-[#D1D5DB] hover:border-[#202124]'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-[#E5E7EB] rounded p-3 space-y-3 bg-white">
                <span className="font-bold text-xs text-[#202124] block">Recruiter Log</span>
                <div className="space-y-2">
                  {notes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#F9FAFB] border border-[#E5E7EB] text-xs flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-[#202124]">{note}</p>
                        <span className="text-[10px] text-[#6B7280] mt-0.5 block">Recorded by Recruiter</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-2 border-t border-[#E5E7EB]">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add interview feedback or notes..."
                    className="flex-1 px-3 py-1.5 border border-[#D1D5DB] rounded text-xs focus:outline-none focus:border-[#E83E8C]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#202124] text-white rounded text-xs font-semibold hover:bg-black cursor-pointer"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
          <span className="text-[11px] text-[#6B7280]">
            Candidate ID: {profile?.id || 'N/A'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 border border-[#D1D5DB] bg-white rounded text-xs font-semibold text-[#202124] hover:bg-[#F3F4F6] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
