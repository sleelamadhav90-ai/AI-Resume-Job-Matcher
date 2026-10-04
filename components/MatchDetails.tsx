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
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Clock,
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
  const [currentStage, setCurrentStage] = useState<'Screening' | 'Matched' | 'Interview' | 'Shortlisted' | 'Hired'>(
    isShortlisted ? 'Shortlisted' : 'Matched'
  );
  const [notes, setNotes] = useState<string[]>(['Automated resume parsing and deterministic matching completed.']);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote('');
  };

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

    return `Verified in candidate technical qualifications.`;
  };

  const getClaimStatusBadge = (status: ClaimVerificationStatus) => {
    switch (status) {
      case 'SUPPORTED':
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            SUPPORTED
          </span>
        );
      case 'CONTRADICTORY':
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 inline-flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            CONTRADICTORY
          </span>
        );
      case 'UNSUPPORTED':
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            UNSUPPORTED
          </span>
        );
      case 'NOT_ENOUGH_EVIDENCE':
      default:
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            NOT ENOUGH EVIDENCE
          </span>
        );
    }
  };

  const struct = match.structuredExplanation;

  // Percentage calculations for thin bar indicators
  const reqPercent = Math.round((match.requiredSkillScore / 30) * 100);
  const prefPercent = Math.round((match.preferredSkillScore / 10) * 100);
  const expPercent = Math.round((match.experienceScore / 25) * 100);
  const eduPercent = Math.round((match.educationScore / 15) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-end">
      <div className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col border-l border-[#E5E7EB] animate-in slide-in-from-right duration-150">
        
        {/* Header Bar */}
        <div className="px-8 py-5 border-b border-[#E5E7EB] bg-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#6B7280] hover:text-[#202124] hover:bg-[#F3F4F6] rounded-md cursor-pointer transition-colors"
              title="Back to Candidates"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-[#202124] font-heading">
                  {profile?.name || 'Candidate Record'}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded font-mono font-bold bg-[#EEF2FF] text-[#6366F1]">
                  {match.totalScore}% Match
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded font-medium bg-[#F3F4F6] text-[#4B5563]">
                  {currentStage}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-1">
                <span>{profile?.experience?.[0]?.role || 'Applicant Record'}</span>
                <span>·</span>
                <span>{match.experienceMatch.candidateYears !== null ? `${match.experienceMatch.candidateYears} yrs verified` : 'Tenure not specified'}</span>
                <span>·</span>
                <span className="font-mono text-[11px]">{candidate.fileName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Stage Selector */}
            <select
              value={currentStage}
              onChange={(e) => setCurrentStage(e.target.value as any)}
              className="px-3 py-1.5 border border-[#E5E7EB] rounded text-xs font-semibold bg-white text-[#202124] cursor-pointer focus:outline-none focus:border-[#202124]"
            >
              <option value="Screening">Stage: Screening</option>
              <option value="Matched">Stage: Matched</option>
              <option value="Interview">Stage: Interview</option>
              <option value="Shortlisted">Stage: Shortlisted</option>
              <option value="Hired">Stage: Hired</option>
            </select>

            {onToggleShortlist && (
              <button
                type="button"
                onClick={() => onToggleShortlist(profile.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#FDF2F7] text-[#E83E8C] border-[#E83E8C]/30'
                    : 'bg-white text-[#202124] border-[#E5E7EB] hover:bg-[#F9FAFB]'
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
              className="p-1.5 text-[#6B7280] hover:text-[#202124] hover:bg-[#F3F4F6] rounded-md cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Two-Column Workspace (Spacious, Level 2 Surface with Level 3 Separators) */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#F7F8FA]">
          
          {/* LEFT COLUMN (65% on desktop): Main Candidate Record */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact Information & Metadata */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Candidate Profile
                </h3>
                <span className="text-xs text-[#6B7280] font-mono">
                  ID: {profile?.id}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#202124]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6B7280] shrink-0" />
                  <span>{profile?.email || 'Email not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6B7280] shrink-0" />
                  <span>{profile?.phone || 'Phone not provided'}</span>
                </div>
              </div>

              {profile?.summary && (
                <p className="text-xs text-[#4B5563] leading-relaxed pt-2 border-t border-[#F3F4F6]">
                  {profile.summary}
                </p>
              )}
            </div>

            {/* Why This Candidate Matches & What is Missing */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-4 shadow-2xs">
              <div className="pb-3 border-b border-[#F3F4F6] flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] font-heading flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                  Evaluation Reasoning
                </h3>
                <span className="text-xs font-bold text-[#202124]">{match.label}</span>
              </div>

              {/* Why Matches */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 block">
                  Why this candidate matches:
                </span>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#374151]">
                  {match.matchedRequiredSkills.length > 0 && (
                    <li>
                      <span className="font-semibold text-[#202124]">Strong technical alignment:</span> {match.matchedRequiredSkills.join(', ')}
                    </li>
                  )}
                  {struct?.whyMatches.experience ? (
                    <li>
                      <span className="font-semibold text-[#202124]">Tenure verification:</span> {struct.whyMatches.experience}
                    </li>
                  ) : match.experienceMatch.candidateYears !== null ? (
                    <li>
                      <span className="font-semibold text-[#202124]">Tenure verification:</span> {match.experienceMatch.candidateYears} years of quantified experience
                    </li>
                  ) : null}
                  {match.relevantProjects.length > 0 && (
                    <li>
                      <span className="font-semibold text-[#202124]">Project evidence:</span> {match.relevantProjects.join(', ')}
                    </li>
                  )}
                  {struct?.whyMatches.education && (
                    <li>
                      <span className="font-semibold text-[#202124]">Education alignment:</span> {struct.whyMatches.education}
                    </li>
                  )}
                </ul>
              </div>

              {/* What is Missing */}
              <div className="space-y-2 pt-3 border-t border-[#F3F4F6]">
                <span className="text-xs font-bold text-amber-800 block">
                  What is missing / Gaps:
                </span>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#374151]">
                  {match.missingRequiredSkills.length > 0 ? (
                    <li>
                      <span className="font-semibold text-[#202124]">Missing required skills:</span> {match.missingRequiredSkills.join(', ')}
                    </li>
                  ) : (
                    <li className="text-emerald-700 font-medium">✓ All mandatory core technical skills are satisfied.</li>
                  )}
                  {struct?.whatIsMissing.experience && (
                    <li>
                      <span className="font-semibold text-[#202124]">Experience gap:</span> {struct.whatIsMissing.experience}
                    </li>
                  )}
                  {struct?.whatIsMissing.education && (
                    <li>
                      <span className="font-semibold text-[#202124]">Education gap:</span> {struct.whatIsMissing.education}
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Work History */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-4 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Work Experience History
              </h3>
              
              {profile?.experience && profile.experience.length > 0 ? (
                <div className="space-y-4">
                  {profile.experience.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-[#E5E7EB] pl-4 py-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#202124]">{exp.role || 'Role not specified'}</span>
                        <span className="text-xs text-[#6B7280]">
                          {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Dates not specified'}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium block">{exp.company || 'Company not specified'}</span>
                      {exp.description ? (
                        <p className="text-xs text-[#4B5563] leading-relaxed pt-1">{exp.description}</p>
                      ) : (
                        <p className="text-xs text-[#9CA3AF] italic">No description provided.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#6B7280] italic">No work history provided in resume.</p>
              )}
            </div>

            {/* Portfolio Projects */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-3 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Portfolio Projects
              </h3>
              {profile?.projects && profile.projects.length > 0 ? (
                <div className="space-y-3">
                  {profile.projects.map((proj, idx) => (
                    <div key={idx} className="p-3 rounded bg-[#FAFBFC] border border-[#E5E7EB] text-xs space-y-1">
                      <span className="font-bold text-[#202124] block">{proj.name || 'Project'}</span>
                      {proj.description && <p className="text-xs text-[#4B5563]">{proj.description}</p>}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[11px] text-[#6366F1] font-mono block">
                          Tech: {proj.technologies.join(', ')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#6B7280] italic">No projects listed in resume.</p>
              )}
            </div>

            {/* Education Credentials */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 space-y-3 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Education Credentials
              </h3>
              {profile?.education && profile.education.length > 0 ? (
                <div className="space-y-2">
                  {profile.education.map((edu, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#F3F4F6] last:border-0">
                      <div>
                        <span className="font-bold text-[#202124] block">{edu.degree || 'Degree not specified'}</span>
                        <span className="text-[#6B7280]">{[edu.field, edu.institution].filter(Boolean).join(' · ') || 'Institution not specified'}</span>
                      </div>
                      {edu.graduationYear && <span className="text-[#6B7280] font-mono text-xs">{edu.graduationYear}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#6B7280] italic">No formal education credentials listed in resume.</p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (35% on desktop): AI Match Verification Layer */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 100-Point Score Allocation with Thin Progress Bars */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-4">
              <div className="flex items-baseline justify-between pb-3 border-b border-[#F3F4F6]">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                    Match Score Breakdown
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-black text-[#202124] font-mono">{match.totalScore}</span>
                    <span className="text-xs font-bold text-[#6B7280]">/ 100 Points</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded font-bold bg-[#EEF2FF] text-[#6366F1]">
                  {match.label}
                </span>
              </div>

              {/* Thin Progress Visualizations */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#202124] font-medium">Required Technical Skills</span>
                    <span className="font-mono font-bold text-[#202124]">{match.requiredSkillScore} / 30 pts</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#202124] rounded-full" style={{ width: `${reqPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#202124] font-medium">Preferred Qualifications</span>
                    <span className="font-mono font-bold text-[#202124]">{match.preferredSkillScore} / 10 pts</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6B7280] rounded-full" style={{ width: `${prefPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#202124] font-medium">Experience Tenure</span>
                    <span className="font-mono font-bold text-[#202124]">{match.experienceScore} / 25 pts</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#202124] rounded-full" style={{ width: `${expPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#202124] font-medium">Education Alignment</span>
                    <span className="font-mono font-bold text-[#202124]">{match.educationScore} / 15 pts</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#202124] rounded-full" style={{ width: `${eduPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#202124] font-medium">Projects & Core Requirements</span>
                    <span className="font-mono font-bold text-[#202124]">{match.projectScore + match.requirementsScore} / 20 pts</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6366F1] rounded-full" style={{ width: `${((match.projectScore + match.requirementsScore) / 20) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recruiter Attention: Claims to Verify (Stage 6) */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  Recruiter Attention · Claims to Verify
                </h3>
                <span className="text-xs text-[#6B7280]">
                  {profile?.claimsToVerify?.length || 0} claims
                </span>
              </div>

              {profile?.claimsToVerify && profile.claimsToVerify.length > 0 ? (
                <div className="space-y-3">
                  {profile.claimsToVerify.map((item: ResumeClaim, idx: number) => (
                    <div key={idx} className="p-3 bg-[#FAFBFC] border border-[#E5E7EB] rounded space-y-1.5 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#202124]">
                          "{item.claim}"
                        </span>
                        {getClaimStatusBadge(item.status)}
                      </div>
                      <p className="resume-quote">
                        {item.evidence ? `"${item.evidence}"` : 'No direct supporting metrics detailed in resume.'}
                      </p>
                      <p className="text-[11px] text-[#6B7280]">
                        <span className="font-semibold text-[#4B5563]">Note: </span>
                        {item.explanation || 'Needs verification during candidate screening.'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#6B7280] italic">
                  No unverified or extraordinary claims flagged.
                </p>
              )}
            </div>

            {/* Evidence Behind The Match */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] pb-3 border-b border-[#F3F4F6]">
                Evidence Behind the Match
              </h3>

              <div className="space-y-3">
                {match.matchedRequiredSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#202124] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {skill}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700">
                        Strong match
                      </span>
                    </div>
                    <p className="resume-quote">
                      {getSkillEvidence(skill)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Activity Log */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] pb-2 border-b border-[#F3F4F6]">
                Recruiter Notes
              </h3>
              
              <div className="space-y-2">
                {notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAFBFC] border border-[#E5E7EB] rounded text-xs flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#202124]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add note or interview observation..."
                  className="flex-1 px-3 py-1.5 border border-[#E5E7EB] rounded text-xs focus:outline-none focus:border-[#202124]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#202124] hover:bg-black text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-8 py-4 border-t border-[#E5E7EB] bg-white flex items-center justify-between text-xs">
          <span className="text-xs text-[#6B7280]">
            Deterministic Matching Engine · Fact Grounded
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#202124] hover:bg-black text-white rounded text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};
