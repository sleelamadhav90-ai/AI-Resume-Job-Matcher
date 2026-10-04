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
  Clock,
  Compass,
  FolderCheck,
  HelpCircle
} from 'lucide-react';
import { RankedCandidate, JobRequirements, AnalyzeStage5Response } from '../lib/types';
import { getCandidateInitials, getAvatarColorClass } from './CandidateList';
import { MagicCard } from './magicui/MagicCard';
import { NumberTicker } from './magicui/NumberTicker';
import { AnimatedCircularProgressBar } from './magicui/AnimatedCircularProgressBar';
import { BorderBeam } from './magicui/BorderBeam';
import { ShimmerButton } from './magicui/ShimmerButton';

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
      // Sidebar Tab Filters
      if (activeTab === 'shortlisted' && !shortlistedIds.has(c.profile?.id || c.id)) return false;
      if (activeTab === 'evidence' && (!c.profile?.claimsToVerify || c.profile.claimsToVerify.length === 0)) return false;

      // Tier Filter Dropdown
      if (tierFilter === 'strong' && c.match.label !== 'Strong Match') return false;
      if (tierFilter === 'good' && c.match.label !== 'Good Match') return false;
      if (tierFilter === 'review' && c.match.label !== 'Moderate Match' && c.match.label !== 'Weak Match') return false;

      // Text Search Query
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
    <div className="bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6 font-sans text-[#111827]">
      
      {/* ========================================================================= */}
      {/* 1. HEADER & COMMAND BAR */}
      {/* ========================================================================= */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-4">
        
        {/* Breadcrumb / Session Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <span>Workspace</span>
            <span className="text-[#CBD5E1]">/</span>
            <span>Active Session</span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="font-bold text-[#111827] uppercase tracking-wider">Live Talent Operations</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold">ACTIVE RECRUITER SESSION</span>
          </div>
        </div>

        {/* Title, Skill Chips & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111827] tracking-tight leading-tight">
              {jobTitle}
            </h3>

            {/* Compact Skill Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-[#64748B] font-medium mr-1">Required Criteria:</span>
              {requiredSkills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#334155] text-xs font-semibold border border-[#E2E8F0]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={onOpenMatching}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-[#111827] border border-[#CBD5E1] rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs transition-all"
            >
              <UploadCloud className="w-4 h-4 text-[#475569]" />
              <span>Upload Resumes</span>
            </button>

            <button
              type="button"
              onClick={onOpenMatching}
              className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all group"
            >
              <span>Matching Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN ATS APPLICATION SHELL (SIDEBAR + WORKSPACE CANVAS) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDEBAR NAVIGATION (220px) */}
        <div className="w-full md:w-56 bg-[#F8FAFC] border-r border-[#E2E8F0] p-4 flex flex-col justify-between shrink-0 space-y-6">
          <div className="space-y-6">
            
            {/* Group 1: Matching Workspace */}
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#94A3B8] tracking-wider block mb-2.5 px-2">
                Matching Workspace
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span>Overview</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${activeTab === 'overview' ? 'text-indigo-300' : 'text-[#94A3B8]'}`}>
                    {totalEvaluated}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('candidates')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'candidates'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Talent Pool</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${activeTab === 'candidates' ? 'text-indigo-300' : 'text-[#94A3B8]'}`}>
                    {totalEvaluated}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('shortlisted')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'shortlisted'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookmarkCheck className={`w-4 h-4 ${activeTab === 'shortlisted' ? 'text-pink-400' : 'text-[#E83E8C]'}`} />
                    <span>Shortlisted</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${activeTab === 'shortlisted' ? 'text-indigo-300' : 'text-[#94A3B8]'}`}>
                    {shortlistedIds.size}
                  </span>
                </button>
              </nav>
            </div>

            {/* Group 2: Audit & Reason */}
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#94A3B8] tracking-wider block mb-2.5 px-2">
                Audit & Reason
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('health')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'health'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className={`w-4 h-4 ${activeTab === 'health' ? 'text-indigo-300' : 'text-[#6366F1]'}`} />
                    <span>AI Match Health</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-extrabold">{avgMatch}%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('evidence')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'evidence'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className={`w-4 h-4 ${activeTab === 'evidence' ? 'text-emerald-300' : 'text-emerald-600'}`} />
                    <span>Evidence Dossiers</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${activeTab === 'evidence' ? 'text-indigo-300' : 'text-[#94A3B8]'}`}>
                    {totalEvaluated}
                  </span>
                </button>
              </nav>
            </div>

          </div>

          {/* Footer Metadata */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-1.5 text-[11px] text-[#64748B]">
            <div className="flex items-center justify-between font-mono">
              <span>Rubric Weight:</span>
              <span className="font-extrabold text-[#111827]">100 pts</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>Precision:</span>
              <span className="font-extrabold text-emerald-700">Deterministic</span>
            </div>
          </div>

        </div>

        {/* RIGHT WORKSPACE CANVAS (~80%) */}
        <div className="flex-1 p-5 sm:p-7 space-y-6 min-w-0 bg-white">
          
          {/* ========================================================================= */}
          {/* 3. TOP METRICS CARDS WITH MAGIC CARD & NUMBER TICKER */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pb-2">
            
            <MagicCard gradientColor="#6366F1" gradientOpacity={0.08} className="p-4 space-y-1">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Evaluated Dossiers</span>
                <FileText className="w-3.5 h-3.5 text-[#64748B]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#111827]">
                <NumberTicker value={totalEvaluated} />
              </div>
            </MagicCard>

            <MagicCard gradientColor="#10B981" gradientOpacity={0.12} className="p-4 space-y-1 bg-emerald-50/30">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Strong Matches</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
                <NumberTicker value={strongMatches.length} />
              </div>
            </MagicCard>

            <MagicCard gradientColor="#6366F1" gradientOpacity={0.12} className="p-4 space-y-1 bg-indigo-50/30">
              <div className="flex items-center justify-between text-indigo-800">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Average Match</span>
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-600">
                <NumberTicker value={avgMatch} suffix="%" />
              </div>
            </MagicCard>

            <MagicCard gradientColor="#F59E0B" gradientOpacity={0.12} className="p-4 space-y-1 bg-amber-50/30">
              <div className="flex items-center justify-between text-amber-900">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Requires Review</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-700">
                <NumberTicker value={reviewRequired.length} />
              </div>
            </MagicCard>

          </div>

          {/* ========================================================================= */}
          {/* 4. AI MATCH HEALTH & RUBRIC PRECISION (MAGIC CARD + BORDER BEAM + CIRCULAR PROGRESS) */}
          {/* ========================================================================= */}
          <MagicCard gradientColor="#6366F1" gradientOpacity={0.15} className="p-5 sm:p-6 bg-indigo-50/40 relative border-indigo-200/80">
            <BorderBeam size={220} duration={10} colorFrom="#6366F1" colorTo="#10B981" />

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-indigo-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-extrabold text-xs uppercase tracking-wider text-indigo-900 font-mono">
                      AI Match Health & Rubric Precision
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    AI-powered alignment analysis across skills, experience, and project relevance
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-indigo-200/90 shadow-2xs self-start sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block">Overall Alignment</span>
                    <span className="text-sm font-black font-mono text-indigo-700">
                      <NumberTicker value={avgMatch} suffix="%" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Circular Progress Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
                  <AnimatedCircularProgressBar value={avgMatch} size={64} gaugePrimaryColor="#6366F1" />
                  <span className="text-[11px] font-bold text-slate-800">Overall Alignment</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
                  <AnimatedCircularProgressBar value={92} size={64} gaugePrimaryColor="#10B981" />
                  <span className="text-[11px] font-bold text-slate-800">Required Skills</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
                  <AnimatedCircularProgressBar value={84} size={64} gaugePrimaryColor="#6366F1" />
                  <span className="text-[11px] font-bold text-slate-800">Experience Fit</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
                  <AnimatedCircularProgressBar value={89} size={64} gaugePrimaryColor="#3B82F6" />
                  <span className="text-[11px] font-bold text-slate-800">Project Relevance</span>
                </div>

              </div>
            </div>
          </MagicCard>

          {/* ========================================================================= */}
          {/* 5. RANKED CANDIDATES & CONTROLS */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-1">
            
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-[#111827] tracking-tight">
                  Ranked Candidates ({filteredCandidates.length})
                </h4>
                <p className="text-xs text-[#64748B]">
                  Evaluated against 100-point rubric with verbatim evidence grounding
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Search candidate or skill..."
                    className="pl-8 pr-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs w-40 sm:w-48 focus:bg-white focus:outline-none focus:border-[#4F46E5] transition-all"
                  />
                </div>

                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#334155] focus:bg-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                >
                  <option value="all">All Tiers</option>
                  <option value="strong">Strong Match (≥85%)</option>
                  <option value="good">Good Match (70-84%)</option>
                  <option value="review">Needs Review (&lt;70%)</option>
                </select>

                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === 'match' ? 'tenure' : 'match')}
                  className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#334155] hover:text-[#111827] hover:bg-white inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{sortBy === 'match' ? 'Best Match' : 'Tenure'}</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 6. CANDIDATE CARDS (USING MAGIC CARD + SHIMMER BUTTON + NUMBER TICKER) */}
            {/* ========================================================================= */}
            {filteredCandidates.length > 0 ? (
              <div className="space-y-3">
                {filteredCandidates.map((c, idx) => {
                  const name = c.profile?.name || 'Candidate';
                  const initials = getCandidateInitials(name, `C${idx + 1}`);
                  const avatarColor = getAvatarColorClass(name);

                  // Left edge accent rail
                  const railClass =
                    c.match.totalScore >= 85
                      ? 'border-l-4 border-l-emerald-500'
                      : c.match.totalScore >= 70
                      ? 'border-l-4 border-l-indigo-500'
                      : 'border-l-4 border-l-amber-500';

                  const scoreBarClass =
                    c.match.totalScore >= 85
                      ? 'bg-emerald-600'
                      : c.match.totalScore >= 70
                      ? 'bg-indigo-600'
                      : 'bg-amber-500';

                  const isShortlisted = shortlistedIds.has(c.profile?.id || c.id);

                  return (
                    <MagicCard
                      key={c.profile?.id || c.id}
                      gradientColor={c.match.totalScore >= 85 ? '#10B981' : '#6366F1'}
                      gradientOpacity={0.08}
                      className={`p-4 ${railClass} shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group flex flex-col lg:flex-row lg:items-center justify-between gap-4`}
                    >
                      {/* Left: Avatar + Name + File/Email */}
                      <div className="flex items-center gap-3.5 lg:w-[38%] shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-indigo-600 transition-colors leading-tight">
                            {name}
                          </div>
                          <div className="text-xs text-[#64748B] mt-0.5 flex items-center gap-1.5 font-sans">
                            <span className="truncate max-w-[140px] font-medium">{c.profile?.fileName || 'Resume.pdf'}</span>
                            <span className="text-[#CBD5E1]">·</span>
                            <span className="font-mono text-[11px] truncate max-w-[160px] text-[#94A3B8]">{c.profile?.email || 'No email provided'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Center: Tenure + Skill Chips */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 lg:w-[32%] pl-13 lg:pl-0">
                        <span className="font-mono text-xs font-bold text-[#111827] shrink-0 bg-[#F1F5F9] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                          {c.profile?.totalExperienceYears ? `${c.profile.totalExperienceYears} yrs` : 'Tenure N/A'}
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {(c.profile?.skills || []).slice(0, 3).map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 rounded bg-[#F8FAFC] text-[#334155] text-[11px] font-semibold border border-[#E2E8F0] hover:bg-slate-100 transition-colors"
                            >
                              {s}
                            </span>
                          ))}
                          {(c.profile?.skills || []).length > 3 && (
                            <span className="text-[10px] text-[#64748B] font-mono px-1 font-semibold">
                              +{(c.profile?.skills || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Prominent Score + WHY + Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-4 lg:w-[30%] self-stretch sm:self-auto pl-13 lg:pl-0">
                        <div className="text-right min-w-[95px]">
                          <span className="font-mono font-black text-lg text-[#111827] block leading-none">
                            <NumberTicker value={c.match.totalScore} suffix="%" />
                          </span>
                          <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden my-1">
                            <div
                              className={`h-full rounded-full ${scoreBarClass}`}
                              style={{ width: `${c.match.totalScore}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                            {c.match.label}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          {/* WHY Button with ShimmerButton */}
                          <ShimmerButton
                            onClick={() => setWhyCandidateId(whyCandidateId === (c.profile?.id || c.id) ? null : (c.profile?.id || c.id))}
                            title="Inspect AI Match Reason"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>WHY?</span>
                          </ShimmerButton>

                          {/* Bookmark Button */}
                          <button
                            type="button"
                            onClick={() => onToggleShortlist(c.profile?.id || c.id)}
                            className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                              isShortlisted
                                ? 'bg-pink-50 text-[#E83E8C] border-pink-200'
                                : 'bg-white text-[#64748B] border-[#CBD5E1] hover:text-[#111827] hover:bg-slate-50'
                            }`}
                            title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                          >
                            {isShortlisted ? (
                              <BookmarkCheck className="w-4 h-4 text-[#E83E8C]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>

                          {/* Dossier Secondary Button */}
                          <button
                            type="button"
                            onClick={() => onSelectCandidate(c.profile?.id || c.id)}
                            className="px-3.5 py-1.5 bg-[#111827] hover:bg-black text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
                          >
                            <span>Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </MagicCard>
                  );
                })}
              </div>
            ) : (
              <div className="p-10 text-center bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
                <UploadCloud className="w-8 h-8 text-[#94A3B8] mx-auto" />
                <h4 className="font-bold text-sm text-[#111827]">No Candidates Found</h4>
                <p className="text-xs text-[#64748B]">Try adjusting your search query or tier filter.</p>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 7. WHY MICRO-INTERACTION OVERLAY DRAWER */}
            {/* ========================================================================= */}
            {whyCandidateId && (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-[#111827] flex items-center justify-between shadow-2xs transition-all">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong className="text-indigo-900 font-extrabold">Rubric Match Reasoning:</strong>{' '}
                    {candidates.find((c) => (c.profile?.id || c.id) === whyCandidateId)?.match.explanation}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWhyCandidateId(null)}
                  className="text-xs font-bold text-indigo-700 hover:text-black cursor-pointer ml-4 shrink-0"
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
