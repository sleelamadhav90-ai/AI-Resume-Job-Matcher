import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { CandidateCard } from './CandidateCard';
import { RankedCandidate, ScoreTierLabel } from '../lib/types';

interface CandidateListProps {
  candidates: RankedCandidate[];
  selectedCandidateId?: string;
  onSelectCandidate: (candidateId: string) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  selectedCandidateId,
  onSelectCandidate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | ScoreTierLabel>('All');
  const [sortBy, setSortBy] = useState<'best' | 'lowest' | 'name'>('best');

  const filterTiers: Array<'All' | ScoreTierLabel> = [
    'All',
    'Strong Match',
    'Good Match',
    'Moderate Match',
    'Weak Match',
  ];

  const filteredAndSortedCandidates = useMemo(() => {
    return candidates
      .filter((cand) => {
        // 1. Text Search matching name, skills, role
        const q = searchQuery.toLowerCase().trim();
        let matchesQuery = true;
        if (q) {
          const name = (cand.profile.name || '').toLowerCase();
          const skills = cand.profile.skills.map((s) => s.toLowerCase());
          const roles = cand.profile.experience.map((e) => (e.role || '').toLowerCase());
          const matchedSkills = cand.match.matchedRequiredSkills.map((s) => s.toLowerCase());

          matchesQuery =
            name.includes(q) ||
            skills.some((s) => s.includes(q)) ||
            roles.some((r) => r.includes(q)) ||
            matchedSkills.some((s) => s.includes(q));
        }

        // 2. Tier Filter
        let matchesTier = true;
        if (tierFilter !== 'All') {
          matchesTier = cand.match.label === tierFilter;
        }

        return matchesQuery && matchesTier;
      })
      .sort((a, b) => {
        if (sortBy === 'best') {
          // Default: rank ascending (Rank 1 is best)
          return a.rank - b.rank;
        }
        if (sortBy === 'lowest') {
          return a.match.totalScore - b.match.totalScore;
        }
        if (sortBy === 'name') {
          return (a.profile.name || '').localeCompare(b.profile.name || '');
        }
        return 0;
      });
  }, [candidates, searchQuery, tierFilter, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search and Filters toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, skill, or role..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tier Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {filterTiers.map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setTierFilter(tier)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  tierFilter === tier
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="best">Best Match (Rank)</option>
              <option value="lowest">Lowest Match</option>
              <option value="name">Candidate Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing {filteredAndSortedCandidates.length} of {candidates.length} ranked candidate
          {candidates.length === 1 ? '' : 's'}
        </span>
        {tierFilter !== 'All' && (
          <span className="font-medium text-slate-700">Filter: {tierFilter}</span>
        )}
      </div>

      {/* Candidate Cards Stack */}
      <div className="space-y-3">
        {filteredAndSortedCandidates.length > 0 ? (
          filteredAndSortedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidateId === candidate.profile.id}
              onSelect={onSelectCandidate}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500 space-y-2">
            <p className="font-semibold text-slate-700">No matching candidates found.</p>
            <p>Try clearing your search query or switching tier filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setTierFilter('All');
              }}
              className="mt-2 text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
