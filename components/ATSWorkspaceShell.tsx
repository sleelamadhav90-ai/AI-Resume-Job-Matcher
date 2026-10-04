import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowUpDown,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UploadCloud,
  ShieldCheck,
  Layers,
  Activity,
  Users
} from 'lucide-react';
import { RankedCandidate, AnalyzeStage5Response } from '../lib/types';
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

  const avgRequiredSkills = totalEvaluated > 0
    ? Math.round(candidates.reduce((sum, c) => sum + (c.match.requiredSkillScore / 30 * 100), 0) / totalEvaluated)
    : 0;
  const avgExperienceFit = totalEvaluated > 0
    ? Math.round(candidates.reduce((sum, c) => sum + (c.match.experienceScore / 25 * 100), 0) / totalEvaluated)
    : 0;
  const avgProjectRelevance = totalEvaluated > 0
    ? Math.round(candidates.reduce((sum, c) => sum + (c.match.projectScore / 10 * 100), 0) / totalEvaluated)
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
    <div className="bg-[#F5F3EE] min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 font-sans text-[#171817]">
      
      {/* ========================================================================= */}
      {/* 1. HEADER */}
      {/* ========================================================================= */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#DDDCD6] shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#171817] font-mono">
              LIVE TALENT OPERATIONS
            </h2>
            <p className="text-xs text-[#686A66]">
              Real-time candidate evaluation powered by the 100-point rubric.
            </p>
            <div className="pt-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#174C4A]">
                {jobTitle}
              </h3>
            </div>

            {/* Compact Skill Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {requiredSkills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 rounded-md bg-[#F5F3EE] text-[#171817] text-xs font-semibold border border-[#DDDCD6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={onOpenMatching}
              className="px-4 py-2 bg-white hover:bg-[#F0EEE8] text-[#171817] border border-[#DDDCD6] rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
            >
              <UploadCloud className="w-4 h-4 text-[#686A66]" />
              <span>Upload Resumes</span>
            </button>

            <button
              type="button"
              onClick={onOpenMatching}
              className="px-4 py-2 bg-[#174C4A] hover:bg-[#123B39] text-white rounded-xl text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs transition-all group"
            >
              <span>Matching Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT: SIDEBAR + WORKSPACE */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-[#DDDCD6] shadow-2xs overflow-hidden flex flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <div className="w-full md:w-52 bg-[#F5F3EE] border-r border-[#DDDCD6] p-4 flex flex-col justify-between shrink-0 space-y-6">
          <div className="space-y-6">
            
            {/* MATCHING WORKSPACE */}
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#686A66] tracking-wider block mb-2 px-2">
                MATCHING WORKSPACE
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#174C4A] text-white shadow-2xs'
                      : 'text-[#686A66] hover:bg-white hover:text-[#174C4A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4" />
                    <span>Overview</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('candidates')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'candidates'
                      ? 'bg-[#174C4A] text-white shadow-2xs'
                      : 'text-[#686A66] hover:bg-white hover:text-[#174C4A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Talent Pool</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('shortlisted')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'shortlisted'
                      ? 'bg-[#174C4A] text-white shadow-2xs'
                      : 'text-[#686A66] hover:bg-white hover:text-[#174C4A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookmarkCheck className={`w-4 h-4 ${activeTab === 'shortlisted' ? 'text-white' : 'text-[#174C4A]'}`} />
                    <span>Shortlisted</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* AUDIT & REASON */}
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#686A66] tracking-wider block mb-2 px-2">
                AUDIT & REASON
              </span>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('health')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'health'
                      ? 'bg-[#174C4A] text-white shadow-2xs'
                      : 'text-[#686A66] hover:bg-white hover:text-[#174C4A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className={`w-4 h-4 ${activeTab === 'health' ? 'text-white' : 'text-[#174C4A]'}`} />
                    <span>AI Match Health</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('evidence')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    activeTab === 'evidence'
                      ? 'bg-[#174C4A] text-white shadow-2xs'
                      : 'text-[#686A66] hover:bg-white hover:text-[#174C4A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className={`w-4 h-4 ${activeTab === 'evidence' ? 'text-white' : 'text-[#28745D]'}`} />
                    <span>Evidence Dossiers</span>
                  </div>
                </button>
              </nav>
            </div>

          </div>
        </div>

        {/* WORKSPACE CANVAS */}
        <div className="flex-1 p-5 sm:p-7 space-y-6 min-w-0 bg-white">
          
          {/* ========================================================================= */}
          {/* 3. 4 KPI CARDS */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-1 ATSWorkspaceShell-metrics-container bg-[#F5F3EE] p-5 rounded-2xl border border-[#DDDCD6]">
            
            {/* KPI 1: 100 Point Matching */}
            <MagicCard 
              glowFrom="#174C4A" 
              glowTo="#7FAEA7" 
              gradientOpacity={0.12} 
              className="p-6 bg-white border-[#E5E2DC] hover:border-[#174C4A]/30 transition-all shadow-xs space-y-2 flex flex-col justify-center text-center"
            >
              <div className="text-4xl font-extrabold font-mono text-[#174C4A] tracking-tight">
                <NumberTicker value={100} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#525866] font-bold block">
                POINT MATCHING
              </span>
            </MagicCard>

            {/* KPI 2: 4 Claim Verification */}
            <MagicCard 
              glowFrom="#174C4A" 
              glowTo="#7FAEA7" 
              gradientOpacity={0.12} 
              className="p-6 bg-white border-[#E5E2DC] hover:border-[#174C4A]/30 transition-all shadow-xs space-y-2 flex flex-col justify-center text-center"
            >
              <div className="text-4xl font-extrabold font-mono text-[#174C4A] tracking-tight">
                <NumberTicker value={4} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#525866] font-bold block">
                CLAIM VERIFICATION
              </span>
            </MagicCard>

            {/* KPI 3: Multiple Resume Analysis */}
            <MagicCard 
              glowFrom="#174C4A" 
              glowTo="#7FAEA7" 
              gradientOpacity={0.12} 
              className="p-6 bg-white border-[#E5E2DC] hover:border-[#174C4A]/30 transition-all shadow-xs space-y-2 flex flex-col justify-center text-center"
            >
              <div className="text-3xl font-black font-sans text-[#174C4A] tracking-tight uppercase py-1">
                {totalEvaluated > 1 ? 'MULTIPLE' : 'ACTIVE'}
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#525866] font-bold block">
                RESUME ANALYSIS ({totalEvaluated} Live)
              </span>
            </MagicCard>

            {/* KPI 4: Evidence Backed Results */}
            <MagicCard 
              glowFrom="#174C4A" 
              glowTo="#7FAEA7" 
              gradientOpacity={0.12} 
              className="p-6 bg-white border-[#E5E2DC] hover:border-[#174C4A]/30 transition-all shadow-xs space-y-2 flex flex-col justify-center text-center"
            >
              <div className="text-3xl font-black font-sans text-[#174C4A] tracking-tight uppercase py-1">
                EVIDENCE
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#525866] font-bold block">
                BACKED RESULTS ({avgMatch}% avg)
              </span>
            </MagicCard>

          </div>

          {/* ========================================================================= */}
          {/* 4. AI MATCH HEALTH */}
          {/* ========================================================================= */}
          <MagicCard glowFrom="#174C4A" glowTo="#28745D" gradientOpacity={0.12} className="p-5 sm:p-6 bg-[#DCEAE6]/20 relative border-[#174C4A]/30 shadow-2xs space-y-4">
            <BorderBeam size={240} duration={14} colorFrom="#174C4A" colorTo="#28745D" />

            <div className="pb-2 border-b border-[#DDDCD6]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#174C4A] shrink-0" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-[#174C4A] font-mono">
                  AI MATCH HEALTH
                </span>
              </div>
              <p className="text-xs text-[#686A66] mt-0.5">
                Candidate-to-role alignment analysis
              </p>
            </div>

            {/* Primary Hero Score + Supporting Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Left/Hero Primary Circular Progress */}
              <div className="bg-white p-4 rounded-xl border border-[#DDDCD6] flex flex-col items-center justify-center space-y-2 shadow-2xs md:col-span-1">
                <AnimatedCircularProgressBar
                  value={avgMatch}
                  size={68}
                  gaugePrimaryColor="#174C4A"
                  gaugeSecondaryColor="rgba(0, 0, 0, 0.08)"
                />
                <span className="text-xs font-bold text-[#171817]">Overall Alignment</span>
              </div>

              {/* Supporting Indicators */}
              <div className="grid grid-cols-3 gap-3 md:col-span-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#DDDCD6] flex flex-col items-center justify-center space-y-1.5 shadow-2xs">
                  <AnimatedCircularProgressBar
                    value={avgRequiredSkills}
                    size={52}
                    gaugePrimaryColor="#28745D"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.08)"
                  />
                  <span className="text-[11px] font-bold text-[#171817]">Required Skills</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#DDDCD6] flex flex-col items-center justify-center space-y-1.5 shadow-2xs">
                  <AnimatedCircularProgressBar
                    value={avgExperienceFit}
                    size={52}
                    gaugePrimaryColor="#174C4A"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.08)"
                  />
                  <span className="text-[11px] font-bold text-[#171817]">Experience Fit</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#DDDCD6] flex flex-col items-center justify-center space-y-1.5 shadow-2xs">
                  <AnimatedCircularProgressBar
                    value={avgProjectRelevance}
                    size={52}
                    gaugePrimaryColor="#174C4A"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.08)"
                  />
                  <span className="text-[11px] font-bold text-[#171817]">Project Relevance</span>
                </div>
              </div>

            </div>
          </MagicCard>

          {/* ========================================================================= */}
          {/* 5. RANKED CANDIDATES */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-1">
            
            {/* Header & Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDDCD6]">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-[#171817] tracking-tight uppercase font-mono">
                  RANKED CANDIDATES
                </h4>
                <p className="text-xs text-[#686A66]">
                  {filteredCandidates.length} candidates evaluated against the 100-point rubric
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#686A66] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Search candidates..."
                    className="pl-8 pr-3 py-1.5 bg-[#F5F3EE] border border-[#DDDCD6] rounded-lg text-xs w-40 sm:w-48 focus:bg-white focus:outline-none focus:border-[#174C4A] transition-all"
                  />
                </div>

                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#F5F3EE] border border-[#DDDCD6] rounded-lg text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A] cursor-pointer font-medium"
                >
                  <option value="all">All Tiers</option>
                  <option value="strong">Strong Match (≥85%)</option>
                  <option value="good">Good Match (70–84%)</option>
                  <option value="review">Needs Review (&lt;70%)</option>
                </select>

                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === 'match' ? 'tenure' : 'match')}
                  className="px-2.5 py-1.5 bg-[#F5F3EE] border border-[#DDDCD6] rounded-lg text-xs font-semibold text-[#171817] hover:bg-white inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#686A66]" />
                  <span>{sortBy === 'match' ? 'Best Match' : 'Tenure'}</span>
                </button>
              </div>
            </div>

            {/* Candidate Cards Grid */}
            {filteredCandidates.length > 0 ? (
              <div className="space-y-3">
                {filteredCandidates.map((c, idx) => {
                  const name = c.profile?.name || 'Candidate';
                  const initials = getCandidateInitials(name, `C${idx + 1}`);
                  const avatarColor = getAvatarColorClass(name);

                  // Left edge accent rail + dot color
                  const railClass =
                    c.match.totalScore >= 85
                      ? 'border-l-4 border-l-[#28745D]'
                      : c.match.totalScore >= 70
                      ? 'border-l-4 border-l-[#174C4A]'
                      : 'border-l-4 border-l-[#B77928]';

                  const statusDotClass =
                    c.match.totalScore >= 85
                      ? 'text-[#28745D]'
                      : c.match.totalScore >= 70
                      ? 'text-[#174C4A]'
                      : 'text-[#B77928]';

                  const statusBadgeClass =
                    c.match.totalScore >= 85
                      ? 'bg-[#DCEAE6] text-[#28745D] border-[#28745D]/30'
                      : c.match.totalScore >= 70
                      ? 'bg-[#DCEAE6] text-[#174C4A] border-[#174C4A]/30'
                      : 'bg-[#FBF4EC] text-[#B77928] border-[#B77928]/30';

                  const isShortlisted = shortlistedIds.has(c.profile?.id || c.id);

                  return (
                    <MagicCard
                      key={c.profile?.id || c.id}
                      glowFrom={c.match.totalScore >= 85 ? '#28745D' : '#174C4A'}
                      glowTo="#DCEAE6"
                      gradientOpacity={0.08}
                      className={`p-4 ${railClass} shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group flex flex-col lg:flex-row lg:items-center justify-between gap-4`}
                    >
                      {/* Left: Dot + Avatar + Name + Resume / Email */}
                      <div className="flex items-center gap-3.5 lg:w-[38%] shrink-0">
                        <span className={`text-xs ${statusDotClass}`}>●</span>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base text-[#171817] group-hover:text-[#174C4A] transition-colors leading-tight">
                            {name}
                          </div>
                          <div className="text-xs text-[#686A66] mt-0.5 flex items-center gap-1.5 font-sans">
                            <span className="truncate max-w-[140px] font-medium">{c.profile?.fileName || 'Resume.pdf'}</span>
                            <span className="text-[#DDDCD6]">·</span>
                            <span className="font-mono text-[11px] truncate max-w-[160px] text-[#686A66]">{c.profile?.email || 'No email provided'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Experience + Skill Chips + Status Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 lg:w-[34%] pl-13 lg:pl-0">
                        <span className="font-mono text-xs font-semibold text-[#171817] shrink-0 bg-[#F5F3EE] px-2.5 py-0.5 rounded-md border border-[#DDDCD6]">
                          {c.profile?.totalExperienceYears ? `${c.profile.totalExperienceYears} years experience` : 'Tenure N/A'}
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {(c.profile?.skills || []).slice(0, 3).map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded bg-white text-[#171817] text-[11px] font-semibold border border-[#DDDCD6]"
                            >
                              {s}
                            </span>
                          ))}
                          {(c.profile?.skills || []).length > 3 && (
                            <span className="text-[10px] text-[#686A66] font-mono px-1 font-semibold">
                              +{(c.profile?.skills || []).length - 3}
                            </span>
                          )}
                        </div>

                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${statusBadgeClass} shrink-0`}>
                          {c.match.label}
                        </span>
                      </div>

                      {/* Right: Prominent Score + WHY + Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-3 lg:w-[28%] self-stretch sm:self-auto pl-13 lg:pl-0">
                        <div className="text-right shrink-0">
                          <span className="font-mono font-black text-2xl text-[#174C4A] block leading-none">
                            <NumberTicker value={c.match.totalScore} suffix="%" />
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          {/* WHY Button with ShimmerButton */}
                          <ShimmerButton
                            onClick={() => setWhyCandidateId(whyCandidateId === (c.profile?.id || c.id) ? null : (c.profile?.id || c.id))}
                            title="Inspect AI Match Reason"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#174C4A]" />
                            <span>WHY</span>
                          </ShimmerButton>

                          {/* Bookmark Button */}
                          <button
                            type="button"
                            onClick={() => onToggleShortlist(c.profile?.id || c.id)}
                            className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                              isShortlisted
                                ? 'bg-[#DCEAE6] text-[#174C4A] border-[#174C4A]/30'
                                : 'bg-white text-[#686A66] border-[#DDDCD6] hover:text-[#171817] hover:bg-[#F5F3EE]'
                            }`}
                            title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                          >
                            {isShortlisted ? (
                              <BookmarkCheck className="w-4 h-4 text-[#174C4A]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>

                          {/* Secondary Dossier Button */}
                          <button
                            type="button"
                            onClick={() => onSelectCandidate(c.profile?.id || c.id)}
                            className="px-3.5 py-1.5 bg-[#171817] hover:bg-black text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
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
              <div className="p-10 text-center bg-[#F5F3EE] rounded-xl border border-[#DDDCD6] space-y-2">
                <UploadCloud className="w-8 h-8 text-[#686A66] mx-auto" />
                <h4 className="font-bold text-sm text-[#171817]">No Candidates Found</h4>
                <p className="text-xs text-[#686A66]">Try adjusting your search query or tier filter.</p>
              </div>
            )}

            {/* WHY Overlay Drawer */}
            {whyCandidateId && (
              <div className="p-4 rounded-xl bg-[#DCEAE6]/40 border border-[#174C4A]/30 text-xs text-[#171817] flex items-center justify-between shadow-2xs transition-all">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#174C4A] shrink-0" />
                  <span>
                    <strong className="text-[#174C4A] font-extrabold">Rubric Match Reasoning:</strong>{' '}
                    {candidates.find((c) => (c.profile?.id || c.id) === whyCandidateId)?.match.explanation}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWhyCandidateId(null)}
                  className="text-xs font-bold text-[#174C4A] hover:text-black cursor-pointer ml-4 shrink-0"
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
