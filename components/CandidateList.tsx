import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  Filter,
  Check,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { RankedCandidate, ScoreTierLabel } from '../lib/types';

interface CandidateListProps {
  candidates: RankedCandidate[];
  selectedCandidateId?: string;
  shortlistedCandidateIds?: Set<string>;
  onSelectCandidate: (candidateId: string) => void;
  onToggleShortlist?: (candidateId: string, e?: React.MouseEvent) => void;
  jobTitle?: string;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  selectedCandidateId,
  shortlistedCandidateIds = new Set(),
  onSelectCandidate,
  onToggleShortlist,
  jobTitle = 'Software Engineer',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | ScoreTierLabel>('All');
  const [minScore, setMinScore] = useState<number>(0);
  const [minExp, setMinExp] = useState<number>(0);
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'experience' | 'name'>('rank');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(new Set((candidates || []).map((c) => c.profile?.id || c.id)));
    } else {
      setSelectedRowIds(new Set());
    }
  };

  const handleToggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredAndSortedCandidates = useMemo(() => {
    if (!Array.isArray(candidates)) return [];

    return candidates
      .filter((cand) => {
        if (!cand) return false;

        // 1. Text search
        const q = (searchQuery || '').toLowerCase().trim();
        if (q) {
          const name = String(cand.profile?.name || '').toLowerCase();
          const email = String(cand.profile?.email || '').toLowerCase();
          const fileName = String(cand.fileName || '').toLowerCase();
          const skills = Array.isArray(cand.profile?.skills)
            ? cand.profile.skills.map((s) => String(s || '').toLowerCase())
            : [];
          const roles = Array.isArray(cand.profile?.experience)
            ? cand.profile.experience.map((e) => String(e?.role || '').toLowerCase())
            : [];
          const matchedSkills = Array.isArray(cand.match?.matchedRequiredSkills)
            ? cand.match.matchedRequiredSkills.map((s) => String(s || '').toLowerCase())
            : [];

          const matches =
            name.includes(q) ||
            email.includes(q) ||
            fileName.includes(q) ||
            skills.some((s) => s.includes(q)) ||
            roles.some((r) => r.includes(q)) ||
            matchedSkills.some((s) => s.includes(q));

          if (!matches) return false;
        }

        // 2. Tier filter
        if (tierFilter !== 'All' && cand.match?.label !== tierFilter) {
          return false;
        }

        // 3. Min score filter
        if (minScore > 0 && (cand.match?.totalScore || 0) < minScore) {
          return false;
        }

        // 4. Min experience filter
        if (minExp > 0 && (cand.match?.experienceMatch?.candidateYears || 0) < minExp) {
          return false;
        }

        // 5. Skill filter
        if (skillFilter.trim()) {
          const sf = skillFilter.toLowerCase().trim();
          const hasSkill =
            (cand.profile?.skills || []).some((s) => String(s || '').toLowerCase().includes(sf)) ||
            (cand.match?.matchedRequiredSkills || []).some((s) => String(s || '').toLowerCase().includes(sf));
          if (!hasSkill) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rank') return (a.rank || 0) - (b.rank || 0);
        if (sortBy === 'score') return (b.match?.totalScore || 0) - (a.match?.totalScore || 0);
        if (sortBy === 'experience') {
          return (
            (b.match?.experienceMatch?.candidateYears || 0) -
            (a.match?.experienceMatch?.candidateYears || 0)
          );
        }
        if (sortBy === 'name') {
          return String(a.profile?.name || '').localeCompare(String(b.profile?.name || ''));
        }
        return 0;
      });
  }, [candidates, searchQuery, tierFilter, minScore, minExp, skillFilter, sortBy]);

  return (
    <div className="space-y-4">
      {/* Spacious Search & Filter Bar */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talent pool by candidate name, skill, or role..."
              className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs text-[#202124] focus:bg-white focus:outline-none focus:border-[#202124] transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 py-2 border rounded font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
              showAdvancedFilters || minScore > 0 || minExp > 0 || skillFilter
                ? 'bg-[#EEF2FF] border-[#6366F1]/40 text-[#6366F1]'
                : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {(minScore > 0 || minExp > 0 || skillFilter) ? '(Active)' : ''}</span>
          </button>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#F9FAFB] p-1 rounded border border-[#E5E7EB]">
          {(['All', 'Strong Match', 'Good Match', 'Moderate Match', 'Weak Match'] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all ${
                tierFilter === tier
                  ? 'bg-white text-[#202124] shadow-2xs font-semibold'
                  : 'text-[#6B7280] hover:text-[#202124]'
              }`}
            >
              {tier === 'All' ? 'All Tiers' : tier.replace(' Match', '')}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 border border-[#E5E7EB] rounded px-3 py-1.5 bg-white">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#6B7280]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs text-[#202124] focus:outline-none cursor-pointer pr-1 font-medium"
          >
            <option value="rank">Sort: Rank (#1 first)</option>
            <option value="score">Sort: Match Score (High to Low)</option>
            <option value="experience">Sort: Experience (Years)</option>
            <option value="name">Sort: Candidate Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Expandable */}
      {showAdvancedFilters && (
        <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-100">
          <div>
            <label className="text-[#6B7280] font-semibold block mb-1.5">
              Minimum Score Threshold ({minScore}%):
            </label>
            <input
              type="range"
              min="0"
              max="90"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-[#202124]"
            />
          </div>

          <div>
            <label className="text-[#6B7280] font-semibold block mb-1.5">
              Minimum Verified Tenure ({minExp} yrs):
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={minExp}
              onChange={(e) => setMinExp(Number(e.target.value))}
              className="w-full accent-[#202124]"
            />
          </div>

          <div>
            <label className="text-[#6B7280] font-semibold block mb-1.5">Filter by Keyword / Skill:</label>
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="e.g. Java, PostgreSQL, AWS..."
              className="w-full px-3 py-1.5 border border-[#E5E7EB] rounded bg-white text-xs focus:outline-none focus:border-[#202124]"
            />
          </div>
        </div>
      )}

      {/* Information Row */}
      <div className="flex items-center justify-between text-xs text-[#6B7280] px-1">
        <span>
          Showing <span className="font-bold text-[#202124]">{filteredAndSortedCandidates.length}</span> of {candidates.length} ranked candidate records
        </span>
        {selectedRowIds.size > 0 && (
          <span className="font-semibold text-[#202124]">
            {selectedRowIds.size} candidates selected for batch action
          </span>
        )}
      </div>

      {/* Enterprise Data Table (Spacious, 64-70px row heights) */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left enterprise-table">
            <thead>
              <tr>
                <th className="w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      candidates.length > 0 &&
                      selectedRowIds.size === candidates.length
                    }
                    onChange={handleSelectAll}
                    className="accent-[#202124] rounded cursor-pointer"
                  />
                </th>
                <th className="w-16">Rank</th>
                <th>Candidate</th>
                <th>Match Score</th>
                <th>Verified Skills</th>
                <th>Experience</th>
                <th>Skill Gaps</th>
                <th>Recommendation</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCandidates.length > 0 ? (
                filteredAndSortedCandidates.map((cand) => {
                  const candidateId = cand.profile?.id || cand.id;
                  const isShortlisted = shortlistedCandidateIds.has(candidateId);
                  const isSelected = selectedCandidateId === candidateId;
                  const isChecked = selectedRowIds.has(candidateId);

                  const expYears = cand.match?.experienceMatch?.candidateYears;

                  return (
                    <tr
                      key={cand.id}
                      onClick={() => onSelectCandidate(candidateId)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#F5F7FF]' : 'hover:bg-[#FAFBFC]'
                      }`}
                    >
                      <td className="text-center" onClick={(e) => handleToggleRow(candidateId, e)}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#202124] rounded cursor-pointer"
                        />
                      </td>

                      <td className="font-bold text-[#202124]">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#F3F4F6] text-[#202124] font-mono text-xs font-semibold">
                          #{cand.rank}
                        </span>
                      </td>

                      <td>
                        <div className="font-bold text-[#202124] text-[14px] flex items-center gap-1.5">
                          <span className="hover:text-[#6366F1] transition-colors">{cand.profile?.name || 'Name not provided'}</span>
                          {isShortlisted && (
                            <BookmarkCheck className="w-4 h-4 text-[#E83E8C]" />
                          )}
                        </div>
                        <span className="text-xs text-[#6B7280]">
                          {cand.profile?.email || cand.fileName}
                        </span>
                      </td>

                      <td>
                        <div className="flex flex-col items-start gap-0.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-extrabold text-[#202124] text-[15px] font-mono">
                              {cand.match.totalScore}%
                            </span>
                            <span className="text-[10px] font-bold text-[#6366F1] uppercase">
                              AI MATCH
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-[#6B7280]">
                            {cand.match.label}
                          </span>
                        </div>
                      </td>

                      <td className="max-w-[220px]">
                        <div className="truncate text-xs text-[#374151] font-medium">
                          {(cand.match?.matchedRequiredSkills || []).slice(0, 3).join(' · ') ||
                            (cand.profile?.skills || []).slice(0, 3).join(' · ') ||
                            'General Qualifications'}
                        </div>
                      </td>

                      <td>
                        <span className="font-semibold text-xs text-[#202124]">
                          {expYears !== null && expYears !== undefined ? `${expYears} yrs verified` : 'Not specified'}
                        </span>
                      </td>

                      <td className="max-w-[160px]">
                        {(cand.match?.missingRequiredSkills || []).length > 0 ? (
                          <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-xs border border-amber-200 truncate inline-block max-w-[150px]">
                            {cand.match.missingRequiredSkills[0]}
                            {cand.match.missingRequiredSkills.length > 1
                              ? ` +${cand.match.missingRequiredSkills.length - 1}`
                              : ''}
                          </span>
                        ) : (
                          <span className="text-emerald-700 text-xs font-medium inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> All met
                          </span>
                        )}
                      </td>

                      <td>
                        {cand.match.totalScore >= 75 ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Shortlist
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            Review
                          </span>
                        )}
                      </td>

                      <td className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {onToggleShortlist && (
                            <button
                              type="button"
                              onClick={(e) => onToggleShortlist(candidateId, e)}
                              className={`p-1.5 rounded border cursor-pointer transition-colors ${
                                isShortlisted
                                  ? 'bg-[#FDF2F7] text-[#E83E8C] border-[#E83E8C]/30'
                                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:text-[#202124]'
                              }`}
                              title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                            >
                              {isShortlisted ? (
                                <BookmarkCheck className="w-4 h-4 text-[#E83E8C]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onSelectCandidate(candidateId)}
                            className="px-3 py-1.5 rounded bg-white hover:bg-[#F3F4F6] text-[#202124] border border-[#E5E7EB] font-medium text-xs cursor-pointer inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Match Details</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-[#6B7280]">
                    <p className="font-semibold text-[#202124] text-xs">No matching candidate records found.</p>
                    <p className="text-[11px] mt-1">Try resetting search criteria or adjusting score thresholds.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
