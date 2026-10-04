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
  AlertCircle,
  Award,
  Layers,
  MapPin
} from 'lucide-react';
import { ClaimVerificationStatus, RankedCandidate, ResumeClaim } from '../lib/types';
import { getCandidateInitials, getAvatarColorClass } from './CandidateList';

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
    
    for (const exp of (profile?.experience || [])) {
      if (!exp) continue;
      if ((exp.description || '').toLowerCase().includes(sLower) || (exp.role || '').toLowerCase().includes(sLower)) {
        return `"${exp.description || `Worked as ${exp.role || 'Engineer'} at ${exp.company || 'Company'}`}"`;
      }
    }
    
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
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-[#E8F0E6] text-[#28745D] border border-[#28745D]/30 inline-flex items-center gap-1 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#28745D]" />
            SUPPORTED
          </span>
        );
      case 'CONTRADICTORY':
        return (
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-red-50 text-red-700 border border-red-200 inline-flex items-center gap-1 uppercase">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            CONTRADICTORY
          </span>
        );
      case 'UNSUPPORTED':
        return (
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1 uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            UNSUPPORTED
          </span>
        );
      case 'NOT_ENOUGH_EVIDENCE':
      default:
        return (
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1 uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            NOT ENOUGH EVIDENCE
          </span>
        );
    }
  };

  const struct = match.structuredExplanation;
  const name = profile?.name || 'Candidate Record';
  const initials = getCandidateInitials(name, `C${rank}`);
  const avatarColor = getAvatarColorClass(name);

  // Percentage calculations
  const reqPercent = Math.round((match.requiredSkillScore / 30) * 100);
  const prefPercent = Math.round((match.preferredSkillScore / 10) * 100);
  const expPercent = Math.round((match.experienceScore / 25) * 100);
  const eduPercent = Math.round((match.educationScore / 15) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-end">
      <div className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col border-l border-[#E5E2DC]">
        
        {/* Recruiter Dossier Top Bar */}
        <div className="px-8 py-5 border-b border-[#E5E2DC] bg-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#525866] hover:text-[#18181B] hover:bg-[#FAF7F2] rounded-xl cursor-pointer transition-colors"
              title="Back to Candidates"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                {initials}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black text-[#18181B] font-heading">
                    {name}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-lg font-mono font-bold bg-[#E8F0E6] text-[#0D3834] uppercase">
                    {match.totalScore}% Match
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-lg font-bold bg-[#FAF7F2] text-[#525866] uppercase">
                    {currentStage}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#525866] mt-1 font-sans">
                  <span>{profile?.experience?.[0]?.role || 'Software Engineer'}</span>
                  <span>·</span>
                  <span className="font-bold">{match.experienceMatch.candidateYears !== null ? `${match.experienceMatch.candidateYears} yrs verified` : 'Tenure n/a'}</span>
                  <span>·</span>
                  <span className="font-mono text-[11px]">{candidate.fileName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={currentStage}
              onChange={(e) => setCurrentStage(e.target.value as any)}
              className="px-3 py-1.5 border border-[#E5E2DC] rounded-xl text-xs font-bold bg-white text-[#18181B] cursor-pointer focus:outline-none focus:border-[#0D3834]"
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
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#E8F0E6] text-[#0D3834] border-[#0D3834]'
                    : 'bg-white text-[#18181B] border-[#E5E2DC] hover:bg-[#FAF7F2]'
                }`}
              >
                {isShortlisted ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#0D3834]" />
                    Shortlisted
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-[#525866]" />
                    Shortlist
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#525866] hover:text-[#18181B] hover:bg-[#FAF7F2] rounded-xl cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FAF7F2]">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DC]">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#525866]">
                  Contact & Profile Summary
                </h3>
                <span className="text-xs text-[#525866] font-mono font-bold">
                  ID: {profile?.id}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#18181B] font-semibold">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#525866] shrink-0" />
                  <span>{profile?.email || 'Email not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#525866] shrink-0" />
                  <span>{profile?.phone || 'Phone not provided'}</span>
                </div>
              </div>

              {profile?.summary && (
                <p className="text-xs text-[#525866] leading-relaxed pt-2 border-t border-[#E5E2DC]">
                  {profile.summary}
                </p>
              )}
            </div>

            {/* Evaluation Reasoning */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 space-y-4 shadow-2xs">
              <div className="pb-3 border-b border-[#E5E2DC] flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] font-heading flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0D3834]" />
                  Evaluation Reasoning
                </h3>
                <span className="text-xs font-black text-[#0D3834] uppercase">{match.label}</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#28745D] block uppercase">
                  Why this candidate matches:
                </span>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#18181B] font-medium">
                  {match.matchedRequiredSkills.length > 0 && (
                    <li>
                      <strong className="text-[#18181B]">Strong technical alignment:</strong> {match.matchedRequiredSkills.join(', ')}
                    </li>
                  )}
                  {match.experienceMatch.candidateYears !== null && (
                    <li>
                      <strong className="text-[#18181B]">Tenure verification:</strong> {match.experienceMatch.candidateYears} years of quantified experience
                    </li>
                  )}
                  {match.relevantProjects.length > 0 && (
                    <li>
                      <strong className="text-[#18181B]">Project evidence:</strong> {match.relevantProjects.join(', ')}
                    </li>
                  )}
                </ul>
              </div>

              {/* What is Missing */}
              <div className="space-y-2 pt-3 border-t border-[#E5E2DC]">
                <span className="text-xs font-bold text-amber-900 block uppercase">
                  What is missing / Gaps:
                </span>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#18181B] font-medium">
                  {match.missingRequiredSkills.length > 0 ? (
                    <li>
                      <strong className="text-[#18181B]">Missing required skills:</strong> {match.missingRequiredSkills.join(', ')}
                    </li>
                  ) : (
                    <li>
                      <strong className="text-[#059669]">No missing required skills.</strong> Candidate satisfies all mandatory technical prerequisites.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Work Experience Timeline */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 space-y-4 shadow-2xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] font-heading flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#0D3834]" />
                Work Experience History
              </h3>

              <div className="space-y-4">
                {(profile?.experience || []).map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E2DC] space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-[#18181B]">{exp.role}</h4>
                        <span className="text-xs font-bold text-[#0D3834]">{exp.company}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#525866]">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </span>
                    </div>

                    <p className="text-xs text-[#525866] leading-relaxed">{exp.description}</p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {exp.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-white text-[#18181B] font-bold border border-[#E5E2DC]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 100-Point Rubric Breakdown */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 space-y-4 shadow-2xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0D3834] font-heading">
                100-Point Rubric Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Required Skills ({match.requiredSkillScore}/30 pts)</span>
                    <span className="font-mono text-[#0D3834]">{reqPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#E5E2DC]">
                    <div className="bg-[#0D3834] h-full" style={{ width: `${reqPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Preferred Skills ({match.preferredSkillScore}/10 pts)</span>
                    <span className="font-mono text-[#0D3834]">{prefPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#E5E2DC]">
                    <div className="bg-[#0D3834] h-full" style={{ width: `${prefPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Experience Tenure ({match.experienceScore}/25 pts)</span>
                    <span className="font-mono text-[#0D3834]">{expPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#E5E2DC]">
                    <div className="bg-[#0D3834] h-full" style={{ width: `${expPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Education Credentials ({match.educationScore}/15 pts)</span>
                    <span className="font-mono text-[#0D3834]">{eduPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#E5E2DC]">
                    <div className="bg-[#0D3834] h-full" style={{ width: `${eduPercent}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Claims Verification Audit */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 space-y-4 shadow-2xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] font-heading flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#0D3834]" />
                Resume Claim Verification Audit
              </h3>

              <div className="space-y-3">
                {(profile?.claimsToVerify || []).map((claim, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5E2DC] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#18181B]">{claim.claim}</span>
                      {getClaimStatusBadge(claim.status)}
                    </div>
                    {claim.evidence && (
                      <p className="resume-quote">{claim.evidence}</p>
                    )}
                    <p className="text-[11px] text-[#525866]">{claim.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 space-y-4 shadow-2xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] font-heading">
                Recruiter Evaluation Notes
              </h3>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#E5E2DC] text-xs text-[#18181B] font-medium">
                    {note}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add evaluation note..."
                  className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#E5E2DC] rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#0D3834]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D3834] text-white rounded-xl text-xs font-extrabold cursor-pointer hover:bg-[#082825]"
                >
                  Add
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
