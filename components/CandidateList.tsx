import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, SlidersHorizontal, Users } from 'lucide-react';
import { CandidateMatchResult } from '../lib/types';
import { CandidateCard } from './CandidateCard';

interface CandidateListProps {
  results: CandidateMatchResult[];
  selectedCandidateId: string | null;
  onSelectCandidate: (id: string) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  results,
  selectedCandidateId,
  onSelectCandidate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'name'>('score-desc');

  const filteredAndSortedCandidates = useMemo(() => {
    return results
      .filter((res) => {
        const candidateName = res.candidate.name || 'Candidate';
        const matchesQuery =
          candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.candidate.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
          res.matchedSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesMinScore = res.score.totalScore >= minScore;
        return matchesQuery && matchesMinScore;
      })
      .sort((a, b) => {
        if (sortBy === 'score-desc') return b.score.totalScore - a.score.totalScore;
        if (sortBy === 'score-asc') return a.score.totalScore - b.score.totalScore;
        return (a.candidate.name || '').localeCompare(b.candidate.name || '');
      });
  }, [results, searchQuery, minScore, sortBy]);

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name or skill..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Min score filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Min Score:</span>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value={0}>All</option>
              <option value={50}>50%+</option>
              <option value={70}>70%+</option>
              <option value={85}>85%+</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="score-desc">Highest Score</option>
              <option value="score-asc">Lowest Score</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing {filteredAndSortedCandidates.length} of {results.length} candidates
        </span>
        <span>Ranked by weighted criteria</span>
      </div>

      {/* Candidate Cards */}
      {filteredAndSortedCandidates.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
          <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No candidates match your filters</p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or lowering the minimum score.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedCandidates.map((res, index) => (
            <CandidateCard
              key={res.candidate.id}
              result={res}
              rank={index + 1}
              isSelected={selectedCandidateId === res.candidate.id}
              onSelect={onSelectCandidate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
