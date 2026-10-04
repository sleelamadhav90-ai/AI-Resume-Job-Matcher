import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  ArrowUpDown,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UploadCloud,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  Activity,
  Briefcase,
  Users,
  BarChart2,
  SlidersHorizontal,
  Clock
} from 'lucide-react';
import { RankedCandidate, JobRequirements, AnalyzeStage5Response } from '../lib/types';
import { getCandidateInitials, getAvatarColorClass } from './CandidateList';

interface ATSWorkspaceShellProps {
  stage5Result: AnalyzeStage5Response | null;
  selectedJobTitle: string;
  onOpenMatching: () => void;
  onSelectCandidate: (id: string) => void;
  shortlistedIds: Set<string>;
  onToggleShortlist: (id: string) => void;
}

type SidebarTab = 'overview' | 'candidates' | 'shortlisted' | 'health' | 'evidence';

export const ATSWorkspaceShell: React.FC<ATSWorkspaceShellProps> = ({
  stage5Result,
  selectedJobTitle,
  onOpenMatching,
  onSelectCandidate,
  shortlistedIds,
  onToggleShortlist,
}) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('overview');
  const [candidateSearch, setCandidateSearch] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'tenure'>('match');
  const [whyCandidateId, setWhyCandidateId] = useState<string | null>(null);

  const candidates: RankedCandidate[] = stage5Result?.candidates || [];
  const jobTitle = stage5Result?.jobRequirements?.jobTitle || selectedJobTitle || 'Senior Full Stack Engineer';
  const requiredSkills = stage5Result?.jobRequirements?.requiredSkills || ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'REST APIs'];

  // Calculate live session metrics
  const totalEvaluated = candidates.length;
  const strongMatches = candidates.filter((c) => c.match.totalScore >= 85);
  const goodMatches = candidates.filter((c) => c.match.totalScore >= 70 && c.match.totalScore < 85);
  const reviewRequired = candidates.filter((c) =>
    (c.profile?.claimsToVerify || []).some((cl) => cl.status !== 'SUPPORTED') || c.match.totalScore < 70
  );

  const avgMatch = totalEvaluated > 0
    ? Math.round(candidates.reduce((sum, c) => sum + c.match.totalScore, 0) / totalEvaluated)
    : 0;

  const filteredCandidates = candidates
    .filter((c) => {
      if (tierFilter === 'strong' && c.match.label !== 'Strong Match') return false;
      if (tierFilter === 'good' && c.match.label !== 'Good Match') return false;
      if (tierFilter === 'review' && c.match.label !== 'Moderate Match' && c.match.label !== 'Weak Match') return false;

      if (!candidateSearch) return true;
      const q = candidateSearch.toLowerCase();
      const name = (c.profile?.name || '').toLowerCase();
      const email = (c.profile?.email || '').toLowerCase();
      const skills = (c.profile?.skills || []).some((s) => s.toLowerCase().includes(q));
      const summary = (c.profile?.summary || '').toLowerCase().includes(q);
      return name.includes(q) || email.includes(q) || skills || summary;
    })
    .sort((a, b) => {
      if (sortBy === 'match') return b.match.totalScore - a.match.totalScore;
      return (b.profile?.totalExperienceYears || 0) - (a.profile?.totalExperienceYears || 0);
    });

  return (
    <div className="bg-[#F5F6F8] p-4 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
      
      {/* 1. Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#202124]">
              Active Recruiter Session
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Live State
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#202124] mt-1">
            {jobTitle}
          </h3>
          <p className="text-xs text-[#6B7280]">
            Required Criteria: {requiredSkills.join(' · ')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={onOpenMatching}
            className="px-4 py-2 bg-white hover:bg-[#F9FAFB] text-[#202124] border border-[#CBD5E1] rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <span>Upload Resumes</span>
            <UploadCloud className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onOpenMatching}
            className="px-4 py-2 bg-[#202124] hover:bg-black text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <span>Matching Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Main ATS Application Shell */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar Navigation (210px) */}
        <div className="w-full md:w-52 bg-[#FAFBFC] border-r border-[#E2E8F0] p-4 flex flex-col justify-between shrink-0 space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#94A3B8] tracking-wider block mb-2 px-2">
                Matching Workspace
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-[#202124] text-white shadow-2xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Overview</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">{totalEvaluated}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('candidates')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    activeTab === 'candidates'
                      ? 'bg-[#202124] text-white shadow-2xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>Talent Pool</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">{totalEvaluated}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('shortlisted')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    activeTab === 'shortlisted'
                      ? 'bg-[#202124] text-white shadow-2xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#E83E8C]" />
                    <span>Shortlisted</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">{shortlistedIds.size}</span>
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#94A3B8] tracking-wider block mb-2 px-2">
                Audit & Reason
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('health')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    activeTab === 'health'
                      ? 'bg-[#202124] text-white shadow-2xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>AI Match Health</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">{avgMatch}%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('evidence')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    activeTab === 'evidence'
                      ? 'bg-[#202124] text-white shadow-2xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Evidence Dossiers</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">{totalEvaluated}</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#64748B]">
            <div className="flex items-center justify-between font-mono">
              <span>Rubric Weight:</span>
              <span className="font-bold text-[#202124]">100 pts</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>Precision:</span>
              <span className="font-bold text-emerald-700">Deterministic</span>
            </div>
          </div>
        </div>

        {/* Main Workspace Canvas (Right ~80%) */}
        <div className="flex-1 p-6 sm:p-8 space-y-8 min-w-0">
          
          {/* Signal Header: Typography-Driven Metrics Stream */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#F1F5F9]">
            <div>
              <span className="text-[11px] font-mono uppercase font-semibold text-[#64748B] block">
                Evaluated Dossiers
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#202124]">
                {totalEvaluated}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase font-semibold text-[#64748B] block">
                Strong Matches
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
                {strongMatches.length}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase font-semibold text-[#64748B] block">
                Average Match
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#6366F1]">
                {avgMatch}%
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase font-semibold text-[#64748B] block">
                Requires Review
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700">
                {reviewRequired.length}
              </span>
            </div>
          </div>

          {/* AI Match Health Banner (Subtle Indigo Environment) */}
          <div className="p-5 rounded-xl bg-[#EEF2FF]/80 border border-[#6366F1]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                <span className="font-bold text-xs uppercase tracking-wider text-[#6366F1] font-mono">
                  AI Match Health & Rubric Precision
                </span>
              </div>
              <span className="font-mono font-bold text-xs text-[#6366F1]">
                {avgMatch}% Overall Alignment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#334155] pt-1">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Required Skills Match</span>
                  <span className="font-mono font-bold">92%</span>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Experience Fit</span>
                  <span className="font-mono font-bold">84%</span>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Project Relevance</span>
                  <span className="font-mono font-bold">89%</span>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#202124] rounded-full" style={{ width: '89%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Candidate Stream Workspace */}
          <div className="space-y-5">
            
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E2E8F0]">
              <div className="space-y-0.5">
                <h4 className="font-bold text-base sm:text-lg text-[#202124] font-heading uppercase tracking-tight">
                  Ranked Candidates ({filteredCandidates.length})
                </h4>
                <p className="text-xs text-[#64748B]">
                  Evaluated against 100-point rubric with verbatim evidence grounding
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Search candidate or skill..."
                    className="pl-8 pr-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs w-40 sm:w-48 focus:bg-white focus:outline-none focus:border-[#202124] transition-all"
                  />
                </div>

                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#334155] focus:bg-white focus:outline-none focus:border-[#202124] cursor-pointer"
                >
                  <option value="all">All Tiers</option>
                  <option value="strong">Strong Match (≥85%)</option>
                  <option value="good">Good Match (70-84%)</option>
                  <option value="review">Needs Review (&lt;70%)</option>
                </select>

                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === 'match' ? 'tenure' : 'match')}
                  className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#334155] hover:text-[#202124] hover:bg-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ArrowUpDown className="w-3 h-3 text-[#64748B]" />
                  <span>{sortBy === 'match' ? 'Best Match' : 'Tenure'}</span>
                </button>
              </div>
            </div>

            {/* Candidate Records */}
            {filteredCandidates.length > 0 ? (
              <div className="divide-y divide-[#E2E8F0]">
                {filteredCandidates.map((c, idx) => {
                  const name = c.profile?.name || 'Candidate';
                  const initials = getCandidateInitials(name, `C${idx + 1}`);
                  const avatarColor = getAvatarColorClass(name);

                  const railColor =
                    c.match.totalScore >= 90
                      ? 'border-l-emerald-600'
                      : c.match.totalScore >= 80
                      ? 'border-l-[#6366F1]'
                      : 'border-l-amber-500';

                  const matchSignalClass =
                    c.match.totalScore >= 90
                      ? 'bg-emerald-600'
                      : c.match.totalScore >= 80
                      ? 'bg-[#6366F1]'
                      : 'bg-amber-500';

                  const isShortlisted = shortlistedIds.has(c.profile?.id || c.id);

                  return (
                    <div
                      key={c.profile?.id || c.id}
                      className={`py-4 px-3.5 -mx-3.5 rounded-lg border-l-2 ${railColor} hover:bg-[#F8FAFC] transition-all duration-150 group flex flex-col lg:flex-row lg:items-center justify-between gap-4`}
                    >
                      {/* Left 38%: Avatar + Name + Contact */}
                      <div className="flex items-center gap-3.5 lg:w-[38%] shrink-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base text-[#202124] group-hover:text-black transition-colors leading-tight">
                            {name}
                          </div>
                          <div className="text-xs text-[#64748B] mt-0.5 flex items-center gap-1.5">
                            <span className="truncate max-w-[140px]">{c.profile?.fileName || 'Resume.pdf'}</span>
                            <span className="text-[#CBD5E1]">·</span>
                            <span className="font-mono text-[11px] truncate max-w-[160px]">{c.profile?.email || 'No email provided'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Center 32%: Tenure + Verified Skill Tokens */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:w-[32%] pl-12 lg:pl-0">
                        <span className="font-mono text-xs font-semibold text-[#202124] shrink-0 bg-[#F1F5F9] px-2 py-0.5 rounded">
                          {c.profile?.totalExperienceYears ? `${c.profile.totalExperienceYears} yrs` : 'Tenure N/A'}
                        </span>

                        <div className="flex flex-wrap items-center gap-1">
                          {(c.profile?.skills || []).slice(0, 3).map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded bg-white text-[#334155] text-[11px] font-medium border border-[#CBD5E1] shadow-2xs"
                            >
                              {s}
                            </span>
                          ))}
                          {(c.profile?.skills || []).length > 3 && (
                            <span className="text-[10px] text-[#64748B] font-mono px-1">
                              +{(c.profile?.skills || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right 30%: Score Anchor + WHY + View Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-5 lg:w-[30%] self-stretch sm:self-auto pl-12 lg:pl-0">
                        <div className="text-right min-w-[100px]">
                          <span className="font-mono font-black text-base text-[#202124]">
                            {c.match.totalScore}%
                          </span>
                          <div className="w-full h-1 bg-[#E2E8F0] rounded-full overflow-hidden my-0.5">
                            <div
                              className={`h-full rounded-full ${matchSignalClass}`}
                              style={{ width: `${c.match.totalScore}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                            {c.match.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setWhyCandidateId(whyCandidateId === (c.profile?.id || c.id) ? null : (c.profile?.id || c.id))}
                            className="text-[11px] font-bold text-[#6366F1] hover:text-[#4338CA] underline underline-offset-2 cursor-pointer transition-colors"
                          >
                            WHY?
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleShortlist(c.profile?.id || c.id)}
                            className={`p-1.5 rounded-md border cursor-pointer transition-colors ${
                              isShortlisted
                                ? 'bg-[#FDF2F7] text-[#E83E8C] border-[#E83E8C]/30'
                                : 'bg-white text-[#64748B] border-[#CBD5E1] hover:text-[#202124]'
                            }`}
                            title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                          >
                            {isShortlisted ? (
                              <BookmarkCheck className="w-4 h-4 text-[#E83E8C]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectCandidate(c.profile?.id || c.id)}
                            className="px-3 py-1.5 bg-white hover:bg-[#202124] hover:text-white text-[#202124] border border-[#CBD5E1] rounded-md text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                          >
                            <span>Dossier</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
                <UploadCloud className="w-10 h-10 text-[#94A3B8] mx-auto" />
                <h4 className="font-bold text-sm text-[#202124]">No Candidates in Current Filter</h4>
                <p className="text-xs text-[#64748B]">Try clearing your search or adjusting the match tier filter.</p>
              </div>
            )}

            {/* WHY Micro-signal Overlay Explanation Drawer */}
            {whyCandidateId && (
              <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#6366F1]/25 text-xs text-[#202124] flex items-center justify-between motion-fade">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#6366F1] shrink-0" />
                  <span>
                    <strong>Rubric Match Reasoning:</strong>{' '}
                    {candidates.find((c) => (c.profile?.id || c.id) === whyCandidateId)?.match.explanation}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWhyCandidateId(null)}
                  className="text-xs font-semibold text-[#6366F1] hover:text-black cursor-pointer ml-4 shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
