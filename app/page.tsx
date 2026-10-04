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
  FileText
} from 'lucide-react';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { AnalyzeSuccessResponse } from './api/analyze/route';

export default function LandingPage() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumes, setResumes] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successData, setSuccessData] = useState<AnalyzeSuccessResponse | null>(null);

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

    // Clear previous errors & previous success state
    setError('');
    setSuccessData(null);
    setIsAnalyzing(true);

    try {
      // 3. Prepare FormData payload
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      resumes.forEach((resume) => {
        formData.append('resumes', resume);
      });

      // 4. Send POST request to /api/analyze
      // Note: Do NOT manually set Content-Type header so browser adds proper multipart boundary
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong while uploading the resumes. Please try again.');
      }

      setSuccessData(data as AnalyzeSuccessResponse);
    } catch (err: any) {
      console.error('Analysis submission error:', err);
      setError(
        err.message || 'Something went wrong while uploading the resumes. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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
              Stage 2: Upload Workflow
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
            <span>Find the right candidate faster</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Find the right candidate faster.
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Upload candidate resumes alongside your job description. The system extracts text,
            evaluates core competencies, and ranks applicants with transparent explanations.
          </p>

          {/* Workflow Sequence */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === 0 || idx === 1;
              return (
                <div
                  key={step.step}
                  className={`p-4 rounded-xl border transition-all shadow-2xs relative group ${
                    isActive
                      ? 'border-blue-200 bg-white ring-1 ring-blue-500/10'
                      : 'border-slate-200/90 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    >
                      {step.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-blue-600' : 'text-slate-400'
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
              Ready to analyze candidate resumes?
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
                  <span>Preparing resumes...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Analyze Candidates</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success State Confirmation */}
        {successData && (
          <div className="bg-white rounded-xl border border-emerald-200 shadow-xs p-6 animate-in fade-in duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {successData.resumeCount}{' '}
                    {successData.resumeCount === 1 ? 'resume' : 'resumes'} ready for AI analysis.
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Backend verification complete · Status: {successData.message}
                  </p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                Stage 2 Complete
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Job Description</span>
                <span className="text-sm font-semibold text-slate-800">
                  {successData.jobDescriptionLength.toLocaleString()} characters verified
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Resumes Received</span>
                <span className="text-sm font-semibold text-slate-800">
                  {successData.resumeCount} valid PDF files processed
                </span>
              </div>
            </div>

            {/* List of Verified Files */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-slate-700 mb-2">
                Verified Candidate Files:
              </h4>
              <div className="space-y-1.5">
                {successData.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200/80 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-mono text-slate-800 truncate">{file.name}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Next Stage: PDF text extraction & Gemini AI scoring engine</span>
              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                Reset Verification
              </button>
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
