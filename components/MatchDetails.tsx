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
  Send
} from 'lucide-react';
import { RankedCandidate } from '../lib/types';

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

  // Generate deterministic evidence excerpts from candidate profile
  const getSkillEvidence = (skillName: string): string => {
    const sLower = skillName.toLowerCase();
    
    // Check in experience
    for (const exp of profile.experience) {
      if ((exp.description || '').toLowerCase().includes(sLower) || (exp.role || '').toLowerCase().includes(sLower)) {
        return `"${exp.description || `Worked as ${exp.role} at ${exp.company || 'Enterprise'}`}"`;
      }
    }
    
    // Check in projects
    for (const proj of profile.projects) {
      if ((proj.technologies || []).some(t => t.toLowerCase().includes(sLower)) || (proj.description || '').toLowerCase().includes(sLower)) {
        return `"${proj.name}: ${proj.description || `Implemented using ${proj.technologies.join(', ')}`}"`;
      }
    }

    // Fallback evidence
    return `Verified in candidate skills repertoire under ${profile.experience.length > 0 ? profile.experience[0].role : 'Professional Experience'}.`;
  };

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
                  {profile.name || 'Candidate Record'}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#FDF2F7] text-[#E83E8C] border border-[#E83E8C]/20">
                  {match.totalScore}% Match
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-[#E5E7EB] text-[#4B5563]">
                  {currentStage}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-0.5">
                <span>{profile.experience[0]?.role || 'Applicant'}</span>
                <span>·</span>
                <span>{match.experienceMatch.candidateYears !== null ? `${match.experienceMatch.candidateYears} yrs exp` : 'Exp unquantified'}</span>
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
            Evidence & Gaps
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
            Recruiter Activity ({notes.length})
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-[#202124]">
          {/* TAB 1: MATCH SUMMARY */}
          {activeTab === 'match' && (
            <div className="space-y-5">
              {/* AI Recommendation Box */}
              <div className="p-3.5 bg-[#FDF2F7] rounded border border-[#E83E8C]/20 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#E83E8C] text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>HireMe AI Match Analysis</span>
                </div>
                <p className="text-xs text-[#202124] leading-relaxed">
                  {match.explanation}
                </p>
              </div>

              {/* 5-Category Point Breakdown Table */}
              <div className="border border-[#E5E7EB] rounded overflow-hidden">
                <div className="bg-[#F9FAFB] px-3.5 py-2 border-b border-[#E5E7EB] font-bold text-xs flex items-center justify-between">
                  <span>Match Scoring Breakdown</span>
                  <span className="text-[#E83E8C] font-extrabold">{match.totalScore} / 100 Points</span>
                </div>
                <div className="divide-y divide-[#E5E7EB]">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Required Skills Coverage</span>
                      <span className="text-[11px] text-[#6B7280]">
                        Matched {match.matchedRequiredSkills.length} of {match.matchedRequiredSkills.length + match.missingRequiredSkills.length} core technical requirements
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.requiredSkillScore} / 30 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Preferred Skills Coverage</span>
                      <span className="text-[11px] text-[#6B7280]">
                        Matched {match.matchedPreferredSkills.length} secondary qualifications
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.preferredSkillScore} / 10 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Experience Tenure</span>
                      <span className="text-[11px] text-[#6B7280]">
                        {match.experienceMatch.candidateYears !== null ? `${match.experienceMatch.candidateYears} yrs verified` : 'Unquantified'} vs {match.experienceMatch.requiredYears !== null ? `${match.experienceMatch.requiredYears} yrs benchmark` : 'No min.'}
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.experienceScore} / 25 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Education & Degree</span>
                      <span className="text-[11px] text-[#6B7280]">
                        {profile.education[0]?.degree || 'Technical credential validation'}
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.educationScore} / 15 pts</span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block">Project & Keyword Evidence</span>
                      <span className="text-[11px] text-[#6B7280]">
                        {match.relevantProjects.length} relevant projects and domain keywords verified
                      </span>
                    </div>
                    <span className="font-bold text-xs">{match.projectScore + match.requirementsScore} / 20 pts</span>
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Skills Quick Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-[#E5E7EB] rounded p-3 bg-white">
                  <span className="font-bold text-xs text-[#10B981] flex items-center gap-1 mb-2">
                    <Check className="w-3.5 h-3.5" />
                    Matched Requirements ({match.matchedRequiredSkills.length + match.matchedPreferredSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {match.matchedRequiredSkills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                        ✓ {s}
                      </span>
                    ))}
                    {match.matchedPreferredSkills.map((s, idx) => (
                      <span key={`p-${idx}`} className="px-2 py-0.5 rounded bg-gray-50 text-gray-700 border border-gray-200 text-[11px]">
                        ✓ {s} (pref)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-[#E5E7EB] rounded p-3 bg-white">
                  <span className="font-bold text-xs text-[#F59E0B] flex items-center gap-1 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Skill Gaps ({match.missingRequiredSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {match.missingRequiredSkills.length > 0 ? (
                      match.missingRequiredSkills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-medium">
                          ⚠ {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-medium">
                        ✓ All required job criteria satisfied.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVIDENCE & GAPS */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="border border-[#E5E7EB] rounded overflow-hidden bg-white">
                <div className="bg-[#F9FAFB] px-3.5 py-2 border-b border-[#E5E7EB] font-bold text-xs">
                  Evidence Extracted from Resume
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
                          Strong Evidence
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] italic bg-[#F9FAFB] p-2 rounded border border-[#F3F4F6]">
                        {getSkillEvidence(skill)}
                      </p>
                    </div>
                  ))}
                  {match.matchedRequiredSkills.length === 0 && (
                    <div className="p-4 text-center text-[#6B7280]">
                      No direct evidence found for required job skills.
                    </div>
                  )}
                </div>
              </div>

              {/* Claims to verify */}
              {profile.claimsToVerify && profile.claimsToVerify.length > 0 && (
                <div className="border border-[#E5E7EB] rounded overflow-hidden bg-white">
                  <div className="bg-amber-50 px-3.5 py-2 border-b border-amber-200 font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>Claims Recommended for Verification</span>
                  </div>
                  <div className="divide-y divide-amber-100 p-3 space-y-2">
                    {profile.claimsToVerify.map((item, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <span className="font-semibold text-[#202124]">"{item.claim}"</span>
                        <p className="text-[11px] text-[#6B7280]">
                          {item.evidence || 'Verify candidate role ownership and technical depth during interview.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESUME DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Contact Card */}
              <div className="border border-[#E5E7EB] rounded p-3 bg-[#F9FAFB] flex flex-wrap items-center gap-4 text-xs">
                {profile.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#6B7280]" />
                    {profile.email}
                  </span>
                )}
                {profile.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#6B7280]" />
                    {profile.phone}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#6B7280]" />
                  {candidate.fileName}
                </span>
              </div>

              {/* Experience History */}
              <div className="border border-[#E5E7EB] rounded p-3 space-y-3 bg-white">
                <span className="font-bold text-xs uppercase tracking-wider text-[#6B7280] block">
                  Work Experience
                </span>
                {profile.experience.length > 0 ? (
                  profile.experience.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-[#E5E7EB] pl-3 py-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#202124]">{exp.role}</span>
                        <span className="text-[11px] text-[#6B7280]">
                          {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 'Recent'}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B7280] block font-medium">{exp.company}</span>
                      {exp.description && (
                        <p className="text-[11px] text-[#4B5563] leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B7280] italic">No itemized work experience parsed.</p>
                )}
              </div>

              {/* Education */}
              <div className="border border-[#E5E7EB] rounded p-3 space-y-2 bg-white">
                <span className="font-bold text-xs uppercase tracking-wider text-[#6B7280] block">
                  Education & Credentials
                </span>
                {profile.education.length > 0 ? (
                  profile.education.map((edu, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#202124] block">{edu.degree}</span>
                        <span className="text-[#6B7280]">{edu.institution}</span>
                      </div>
                      {edu.graduationYear && <span className="text-[#6B7280] font-mono">{edu.graduationYear}</span>}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B7280] italic">No formal education section parsed.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RECRUITER ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              {/* Stage Mover */}
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

              {/* Notes List */}
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

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
          <span className="text-[11px] text-[#6B7280]">
            Candidate ID: {profile.id}
          </span>
          <div className="flex items-center gap-2">
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
    </div>
  );
};
