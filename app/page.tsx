import React, { useState } from 'react';
import {
  Briefcase,
  UploadCloud,
  Cpu,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { CandidateMatchResult } from '../lib/types';

export default function LandingPage() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [showReadyNotice, setShowReadyNotice] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateMatchResult | null>(null);

  const handleStartAnalysis = () => {
    setShowReadyNotice(true);
  };

  const workflowSteps = [
    {
      step: '01',
      title: 'Job Description',
      desc: 'Define role requirements, required & preferred skills, and experience criteria.',
      icon: Briefcase,
    },
    {
      step: '02',
      title: 'Upload Resumes',
      desc: 'Batch upload candidate resumes in standard PDF format.',
      icon: UploadCloud,
    },
    {
      step: '03',
      title: 'AI Analysis',
      desc: 'Gemini extracts structured data, verifies claims, and parses competencies.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Ranked Candidates',
      desc: 'Deterministic weighted scoring with transparent gap analysis and explanations.',
      icon: BarChart3,
    },
  ];

  const scoringModelWeights = [
    { label: 'Skills', weight: '40%', desc: 'Direct & semantic technical skill alignment' },
    { label: 'Experience', weight: '25%', desc: 'Tenure, role seniority & relevant scope' },
    { label: 'Education', weight: '15%', desc: 'Academic credentials & field of study' },
    { label: 'Projects', weight: '10%', desc: 'Practical projects & portfolio relevance' },
    { label: 'Requirements', weight: '10%', desc: 'Certifications & role-specific must-haves' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 tracking-tight text-base block leading-tight">
                AI Resume & Job Matcher
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Recruitment Intelligence System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500 hidden sm:inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Transparent Scoring Model
            </span>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="text-slate-500 font-mono text-[11px] bg-slate-100 px-2 py-1 rounded">
              MVP Phase 1
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-10 pb-8 px-4 sm:px-6 border-b border-slate-200/60 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50/80 border border-blue-200/70 px-3 py-1 rounded-md mb-4">
            <span>Recruiter Co-Pilot</span>
            <span aria-hidden="true">·</span>
            <span>Eliminate Resume Screening Bottlenecks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Find the right candidate faster.
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Analyze batches of candidate resumes against custom job requirements.
            Get transparent match scores, missing skills analysis, and verifiable fact-checks in seconds.
          </p>

          {/* Workflow Sequence */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-300 transition-all shadow-2xs relative group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      {step.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Workspace / Action Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* Core Input Grid: Job Description & Resume Uploader */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobDescriptionInput
            value={jobDescription}
            onChange={(val) => {
              setJobDescription(val);
              setShowReadyNotice(false);
            }}
          />

          <ResumeUploader
            files={files}
            onFilesChange={(newFiles) => {
              setFiles(newFiles);
              setShowReadyNotice(false);
            }}
          />
        </div>

        {/* Primary Action Section */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-semibold text-slate-900">
              Ready to evaluate candidates?
            </h3>
            <p className="text-xs text-slate-500">
              {jobDescription.trim() ? 'Job description loaded' : 'Job description needed'} ·{' '}
              {files.length} {files.length === 1 ? 'resume' : 'resumes'} queued
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleStartAnalysis}
              disabled={!jobDescription.trim() || files.length === 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              Analyze Candidates
            </button>
          </div>
        </div>

        {/* Phase 1 Status Banner */}
        {showReadyNotice && (
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-blue-900 text-xs flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">
                Setup Complete & Ready for Phase 2 AI Integration
              </p>
              <p className="text-blue-800 leading-relaxed">
                Inputs successfully validated: 1 job description ({jobDescription.trim().split(/\s+/).length} words) and {files.length} resume file(s) are queued.
                In the next phase, Gemini API extraction, PDF text parsing, and the deterministic scoring engine will be connected to process live rankings!
              </p>
            </div>
          </div>
        )}

        {/* Transparent Scoring Model Explanation Card */}
        <section className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                Transparent 100-Point Scoring Model
              </h2>
              <p className="text-xs text-slate-500">
                Deterministic mathematical weights ensure reproducible, unbiased candidate ranking
              </p>
            </div>
            <FileCheck2 className="w-5 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
            {scoringModelWeights.map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/60"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-medium text-xs text-slate-800">{item.label}</span>
                  <span className="font-bold text-sm text-blue-600">{item.weight}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Total Weighted Score: 100%</span>
            <span>AI extracts semantic structured signals · Code computes deterministic rank</span>
          </div>
        </section>
      </main>

      {/* Match Details Slide-over / Modal */}
      <MatchDetails
        result={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 AI Resume & Job Matching System. Built for modern recruiting teams.</p>
          <div className="flex items-center gap-4">
            <span>No Auth Required</span>
            <span aria-hidden="true">·</span>
            <span>Zero Data Stored</span>
            <span aria-hidden="true">·</span>
            <span>Client-Private</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
