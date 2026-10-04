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
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  ArrowRight
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

const AVATAR_COLORS = [
  'bg-[#0D3834] text-white',
  'bg-[#00A86B] text-white',
  'bg-[#123B39] text-white',
  'bg-[#18181B] text-white',
];

export function getCandidateInitials(name?: string | null, fallback: string = 'CD'): string {
  if (!name || !name.trim()) return fallback;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getAvatarColorClass(name?: string | null): string {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  selectedCandidateId,
  shortlistedCandidateIds = new Set(),
  onSelectCandidate,
  onToggleShortlist,
  jobTitle = 'Senior Full Stack Engineer',
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
          const nameMatch = (cand.profile?.name || '').toLowerCase().includes(q);
          const emailMatch = (cand.profile?.email || '').toLowerCase().includes(q);
          const roleMatch = (cand.profile?.experience?.[0]?.role || '').toLowerCase().includes(q);

          const matchedSkills = [
            ...(cand.profile?.skills || []),
            ...(cand.match?.matchedRequiredSkills || []),
          ].map((s) => String(s || '').toLowerCase());

          const matches =
            nameMatch ||
            emailMatch ||
            roleMatch ||
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
      
      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] p-4 flex flex-wrap items-center justify-between gap-4 text-xs shadow-2xs">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#525866] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, skill, or role..."
              className="w-full pl-10 pr-3 py-2 bg-[#FAF7F2] border border-[#E5E2DC] rounded-xl text-xs text-[#18181B] font-medium focus:bg-white focus:outline-none focus:border-[#0D3834] transition-all placeholder:text-[#525866]"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3.5 py-2 border rounded-xl font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
              showAdvancedFilters || minScore > 0 || minExp > 0 || skillFilter
                ? 'bg-[#E8F0E6] border-[#0D3834] text-[#0D3834]'
                : 'bg-white border-[#E5E2DC] text-[#525866] hover:bg-[#FAF7F2]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {(minScore > 0 || minExp > 0 || skillFilter) ? '(Active)' : ''}</span>
          </button>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#E5E2DC]">
          {(['All', 'Strong Match', 'Good Match', 'Moderate Match', 'Weak Match'] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                tierFilter === tier
                  ? 'bg-white text-[#0D3834] shadow-2xs font-black'
                  : 'text-[#525866] hover:text-[#18181B]'
              }`}
            >
              {tier === 'All' ? 'All Tiers' : tier.replace(' Match', '')}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 border border-[#E5E2DC] rounded-xl px-3 py-1.5 bg-white">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#525866]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs font-bold text-[#18181B] focus:outline-none cursor-pointer pr-1"
          >
            <option value="rank">Rank (#1 first)</option>
            <option value="score">Match Score (High to Low)</option>
            <option value="experience">Experience (Years)</option>
            <option value="name">Candidate Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-[#FAF7F2] border border-[#E5E2DC] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
          <div>
            <label className="text-[#525866] font-bold block mb-1.5">
              Minimum Score Threshold ({minScore}%):
            </label>
            <input
              type="range"
              min="0"
              max="90"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-[#0D3834]"
            />
          </div>

          <div>
            <label className="text-[#525866] font-bold block mb-1.5">
              Minimum Verified Tenure ({minExp} yrs):
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={minExp}
              onChange={(e) => setMinExp(Number(e.target.value))}
              className="w-full accent-[#0D3834]"
            />
          </div>

          <div>
            <label className="text-[#525866] font-bold block mb-1.5">Filter by Specific Skill:</label>
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="e.g. Java, React, Docker..."
              className="w-full px-3 py-1.5 border border-[#E5E2DC] rounded-xl bg-white text-xs font-semibold focus:outline-none focus:border-[#0D3834]"
            />
          </div>
        </div>
      )}

      {/* Table Metadata */}
      <div className="flex items-center justify-between text-xs text-[#525866] px-1 font-mono">
        <span>
          Showing <strong className="text-[#0D3834] font-black">{filteredAndSortedCandidates.length}</strong> of {candidates.length} ranked candidate records
        </span>
        {selectedRowIds.size > 0 && (
          <span className="font-extrabold text-[#0D3834]">
            {selectedRowIds.size} candidates selected for batch action
          </span>
        )}
      </div>

      {/* Ranked Candidate Table */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left enterprise-table table-fixed min-w-[900px]">
            <thead>
              <tr>
                <th className="w-12 text-center">
                  <input
                    type="checkbox"
                    checked={
                      candidates.length > 0 &&
                      selectedRowIds.size === candidates.length
                    }
                    onChange={handleSelectAll}
                    className="accent-[#0D3834] rounded cursor-pointer"
                  />
                </th>
                <th className="w-16 text-center">Rank</th>
                <th className="w-[280px]">Candidate & Experience</th>
                <th className="w-[200px]">Verified Skill Chips</th>
                <th className="w-[120px]">Match Score</th>
                <th className="w-[140px]">Skill Gap / Notes</th>
                <th className="w-[150px]">Recommendation</th>
                <th className="w-[180px] text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCandidates.length > 0 ? (
                filteredAndSortedCandidates.map((cand, idx) => {
                  const candidateId = cand.profile?.id || cand.id;
                  const isShortlisted = shortlistedCandidateIds.has(candidateId);
                  const isSelected = selectedCandidateId === candidateId;
                  const isChecked = selectedRowIds.has(candidateId);

                  const name = cand.profile?.name || 'Candidate Record';
                  const initials = getCandidateInitials(cand.profile?.name, `C${cand.rank}`);
                  const avatarColor = getAvatarColorClass(name);

                  const expYears = cand.match?.experienceMatch?.candidateYears;

                  const topSkills = (cand.match?.matchedRequiredSkills || [])
                    .slice(0, 3)
                    .concat((cand.profile?.skills || []).slice(0, 2))
                    .slice(0, 3);

                  return (
                    <tr
                      key={cand.id}
                      onClick={() => onSelectCandidate(candidateId)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#E8F0E6]/50' : 'hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <td className="text-center" onClick={(e) => handleToggleRow(candidateId, e)}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#174C4A] rounded cursor-pointer"
                        />
                      </td>

                      <td className="text-center font-black text-[#174C4A]">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#E8F0E6] text-[#174C4A] font-mono text-xs font-bold border border-[#174C4A]/10">
                          #{cand.rank}
                        </span>
                      </td>

                      {/* Candidate Avatar & Tenure */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold text-[#18181B] text-[14px] flex items-center gap-1.5 font-heading">
                              <span className="hover:text-[#174C4A] transition-colors truncate block" title={name}>{name}</span>
                              {isShortlisted && (
                                <BookmarkCheck className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-[#525866] flex items-center gap-1.5 mt-0.5 font-sans whitespace-nowrap">
                              <span className="truncate max-w-[130px]" title={cand.profile?.experience?.[0]?.role || 'Software Engineer'}>
                                {cand.profile?.experience?.[0]?.role || 'Software Engineer'}
                              </span>
                              <span className="text-[#DDDCD6] font-normal">·</span>
                              <span className="font-bold text-[#18181B] font-mono shrink-0">
                                {expYears !== null && expYears !== undefined ? `${expYears} yrs` : 'Tenure n/a'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Skill Chips */}
                      <td>
                        <div className="flex flex-wrap gap-1 max-w-[240px]">
                          {topSkills.length > 0 ? (
                            topSkills.map((s, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded bg-[#F5F3EE] text-[#18181B] text-[11px] font-bold border border-[#DDDCD6]"
                              >
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-[#525866] italic">General qualifications</span>
                          )}
                        </div>
                      </td>

                      {/* Match Score */}
                      <td>
                        <div className="flex flex-col items-start gap-0.5 font-mono">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-black text-[#174C4A] text-[16px]">
                              {cand.match.totalScore}%
                            </span>
                            <span className="text-[10px] font-bold text-[#00A86B] uppercase">
                              RUBRIC
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-[#525866] font-sans">
                            {cand.match.label}
                          </span>
                        </div>
                      </td>

                      {/* Skill Gap */}
                      <td className="max-w-[160px]">
                        {(cand.match?.missingRequiredSkills || []).length > 0 ? (
                          <span className="text-amber-800 bg-amber-50/60 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200/50 truncate inline-block max-w-[150px]">
                            {cand.match.missingRequiredSkills[0]}
                            {cand.match.missingRequiredSkills.length > 1
                              ? ` +${cand.match.missingRequiredSkills.length - 1}`
                              : ''}
                          </span>
                        ) : (
                          <span className="text-[#059669] text-xs font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> All met
                          </span>
                        )}
                      </td>

                      {/* Recommendation */}
                      <td>
                        {cand.match.totalScore >= 75 ? (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-[#E8F0E6] text-[#174C4A] border border-[#174C4A]/20 inline-flex items-center gap-1 uppercase tracking-wider">
                            <Sparkles className="w-3 h-3 text-[#174C4A]" />
                            Shortlist
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 uppercase">
                            Review
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {onToggleShortlist && (
                            <button
                              type="button"
                              onClick={(e) => onToggleShortlist(candidateId, e)}
                              className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                                isShortlisted
                                  ? 'bg-[#E8F0E6] text-[#174C4A] border-[#174C4A]'
                                  : 'bg-white text-[#525866] border-[#E5E2DC] hover:text-[#18181B]'
                              }`}
                              title={isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                            >
                              {isShortlisted ? (
                                <BookmarkCheck className="w-4 h-4 text-[#0D3834]" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onSelectCandidate(candidateId)}
                            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#0D3834] border border-[#E5E2DC] font-extrabold text-xs cursor-pointer inline-flex items-center gap-1 transition-colors"
                          >
                            <span>View match</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#0D3834]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#525866]">
                    <p className="font-bold text-[#18181B] text-xs">No matching candidate records found.</p>
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
