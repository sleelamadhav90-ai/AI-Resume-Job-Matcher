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
  AlertCircle,
  CheckCircle2,
  Loader2,
  FileText,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { AnalyzeStage5Response, RankedCandidate } from '../lib/types';

export default function LandingPage() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumes, setResumes] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [stage5Result, setStage5Result] = useState<AnalyzeStage5Response | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

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
      desc: 'Batch upload candidate resumes in standard PDF format (up to 10 resumes, 5 MB max).',
      icon: UploadCloud,
    },
    {
      step: '03',
      title: 'AI Fact Extraction',
      desc: 'Gemini extracts factual skills, timeline, education, and claims without hallucinations.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Deterministic Ranking',
      desc: 'Deterministic mathematical weighted scoring (100 pts) with transparent explanations.',
      icon: BarChart3,
    },
  ];

  const scoringModelWeights = [
    { label: 'Skills', weight: '40 pts', desc: '30 pts Required + 10 pts Preferred coverage' },
    { label: 'Experience', weight: '25 pts', desc: 'Tenure ratio vs required years (min(cand/req, 1))' },
    { label: 'Education', weight: '15 pts', desc: 'Degree level and relevant discipline' },
    { label: 'Projects', weight: '10 pts', desc: 'Demonstrated skills in project descriptions' },
    { label: 'Requirements', weight: '10 pts', desc: 'Domain keywords & core responsibilities' },
  ];

  const handleAnalyzeClick = async () => {
    // 1. Validation: Job description must be provided
    if (!jobDescription.trim()) {
      setError('No job description provided. Please enter or paste a job description first.');
      return;
    }

    // 2. Validation: At least one resume must be selected
    if (resumes.length === 0) {
      setError('Please upload at least one resume (PDF format, max 5 MB).');
      return;
    }

    // Clear previous errors & previous results
    setError('');
    setStage5Result(null);
    setSelectedCandidateId(null);
    setIsAnalyzing(true);

    try {
      // 3. Prepare FormData payload
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      resumes.forEach((resume) => {
        formData.append('resumes', resume);
      });

      // 4. Send POST request to /api/analyze
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.candidates && data.candidates.length > 0) {
          setStage5Result(data as AnalyzeStage5Response);
        }
        throw new Error(data.error || 'Something went wrong during candidate matching. Please try again.');
      }

      setStage5Result(data as AnalyzeStage5Response);
    } catch (err: any) {
      console.error('Stage 5 analysis error:', err);
      setError(
        err.message || 'Something went wrong while processing the resumes. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedCandidate: RankedCandidate | undefined = stage5Result?.candidates.find(
    (c) => c.profile.id === selectedCandidateId
  );

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
              Deterministic 100-Point Scoring
            </span>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="text-slate-500 font-mono text-[11px] bg-slate-100 px-2 py-1 rounded">
              Stage 5: Scored & Ranked
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
            <span>Deterministic Candidate Matching & Scoring</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Find the right candidate faster.
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Upload candidate resumes alongside your job description. The system extracts strict facts with Gemini AI,
            then calculates transparent 100-point deterministic scores and rankings without AI scoring bias.
          </p>

          {/* Workflow Sequence */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = idx === 3;
              return (
                <div
                  key={step.step}
                  className={`p-4 rounded-xl border transition-all shadow-2xs relative group ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20'
                      : 'border-slate-200/90 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isCurrent ? 'text-blue-600' : 'text-slate-600'
                      }`}
                    >
                      {step.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isCurrent ? 'text-blue-600' : 'text-slate-500'
                      }`}
                    />
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
              if (error) setError('');
            }}
            disabled={isAnalyzing}
            error={!jobDescription.trim() && error ? error : undefined}
            onClearError={() => setError('')}
          />

          <ResumeUploader
            files={resumes}
            onFilesChange={(newFiles) => {
              setResumes(newFiles);
              if (error) setError('');
            }}
            disabled={isAnalyzing}
            error={resumes.length === 0 && error ? error : undefined}
            onClearError={() => setError('')}
          />
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-start justify-between gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError('')}
              className="text-rose-600 hover:text-rose-800 text-xs font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Primary Action Section */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-semibold text-slate-900">
              Ready to match and rank candidates?
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
              <span>
                {jobDescription.trim()
                  ? `${jobDescription.trim().split(/\s+/).filter(Boolean).length} words in job description`
                  : 'Job description pending'}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'} queued
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAnalyzeClick}
              disabled={isAnalyzing}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all shadow-xs cursor-pointer ${
                isAnalyzing
                  ? 'bg-blue-400 cursor-not-allowed opacity-90'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Matching & scoring candidates...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  <span>Match & Rank Candidates</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stage 5 Ranked Candidates Results */}
        {stage5Result && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Target Job Requirements Summary Bar */}
            {stage5Result.jobRequirements && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {stage5Result.jobRequirements.jobTitle || 'Target Role Requirements'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {stage5Result.candidates.length} candidate{stage5Result.candidates.length === 1 ? '' : 's'} ranked deterministically
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                      Stage 5 Verified
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStage5Result(null);
                        setSelectedCandidateId(null);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Clear results"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium block mb-1">
                      Required Skills ({stage5Result.jobRequirements.requiredSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stage5Result.jobRequirements.requiredSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium block mb-1">
                      Preferred Skills ({stage5Result.jobRequirements.preferredSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stage5Result.jobRequirements.preferredSkills.length > 0 ? (
                        stage5Result.jobRequirements.preferredSkills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-[11px]">None specified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium block mb-1">Experience & Education:</span>
                    <p className="text-slate-700 text-[11px]">
                      {stage5Result.jobRequirements.requiredExperienceYears !== null
                        ? `${stage5Result.jobRequirements.requiredExperienceYears}+ years required`
                        : 'No minimum experience specified'}
                    </p>
                    {stage5Result.jobRequirements.educationRequirements.length > 0 && (
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {stage5Result.jobRequirements.educationRequirements[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Warning notices for any unreadable or failed PDFs */}
            {(stage5Result.unprocessedResumes.length > 0 || stage5Result.failedCandidates.length > 0) && (
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Some files could not be processed:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px] text-amber-800">
                  {stage5Result.unprocessedResumes.map((item, idx) => (
                    <li key={`unproc-${idx}`}>
                      <span className="font-medium">{item.fileName}:</span> {item.message || 'Unreadable PDF'}
                    </li>
                  ))}
                  {stage5Result.failedCandidates.map((item, idx) => (
                    <li key={`failcand-${idx}`}>
                      <span className="font-medium">{item.fileName}:</span> {item.message || 'AI extraction failed'}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Candidate List with client-side search, tier filters, sorting */}
            <CandidateList
              candidates={stage5Result.candidates}
              selectedCandidateId={selectedCandidateId || undefined}
              onSelectCandidate={(id) => setSelectedCandidateId(id)}
            />
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
                Mathematical weights ensure reproducible, unbiased candidate ranking without AI scoring hallucinations
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
            <span>Total Weighted Score: 100 points</span>
            <span>AI extracts factual signals · Deterministic code computes rank & explanations</span>
          </div>
        </section>
      </main>

      {/* Match Details Drawer Modal */}
      {selectedCandidate && (
        <MatchDetails
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidateId(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 AI Resume & Job Matching System. Built for modern recruiting teams.</p>
          <div className="flex items-center gap-4">
            <span>No Auth Required</span>
            <span aria-hidden="true">·</span>
            <span>Zero Data Stored</span>
            <span aria-hidden="true">·</span>
            <span>Deterministic Scoring</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
