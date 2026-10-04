import React, { useState } from 'react';
import {
  Home,
  Users,
  Briefcase,
  BarChart2,
  BookmarkCheck,
  Search,
  Plus,
  Bell,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Bookmark,
  FileText,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Clock,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { AnalyzeStage5Response, RankedCandidate } from '../lib/types';

type NavigationTab =
  | 'home'
  | 'candidates'
  | 'jobs'
  | 'matching'
  | 'shortlisted'
  | 'reports';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  candidatesCount: number;
  topMatch: number;
  status: 'Active' | 'Draft' | 'Closed';
  updated: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experience: string;
  education: string;
  jdText: string;
}

interface GeneralCandidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  matchScore: number;
  stage: 'New' | 'Screening' | 'Matched' | 'Interview' | 'Shortlisted' | 'Hired';
  appliedFor: string;
  email: string;
}

const SAMPLE_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Hyderabad, India (Hybrid)',
    type: 'Full Time',
    candidatesCount: 42,
    topMatch: 94,
    status: 'Active',
    updated: 'Today',
    requiredSkills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'REST APIs'],
    preferredSkills: ['Kubernetes', 'Docker', 'Kafka', 'CI/CD'],
    experience: '3+ years',
    education: "Bachelor's in Computer Science or related STEM field",
    jdText: `Role: Senior Full Stack Engineer
Requirements:
- 3+ years experience with Java, Spring Boot, and AWS cloud infrastructure.
- Solid understanding of PostgreSQL database design, REST APIs, and microservices.
- Bachelor's degree in Computer Science, Information Technology, or equivalent.
Preferred:
- Kubernetes, Docker, and CI/CD pipelines (Jenkins / GitHub Actions).
- Experience in high-throughput transaction systems.`,
  },
  {
    id: 'job-2',
    title: 'Lead Frontend Developer',
    department: 'Engineering',
    location: 'Bangalore, India (On-site)',
    type: 'Full Time',
    candidatesCount: 31,
    topMatch: 89,
    status: 'Active',
    updated: 'Yesterday',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3'],
    preferredSkills: ['Next.js', 'Tailwind CSS', 'Vite', 'Jest'],
    experience: '3+ years',
    education: "Bachelor's degree in Computer Science or Software Engineering",
    jdText: `Role: Lead Frontend Developer
Requirements:
- 3+ years hands-on experience with React, TypeScript, and modern JavaScript (ES6+).
- Strong command of HTML5, CSS3, responsive UI design, and state management.
- Degree in Computer Science, Software Engineering, or related discipline.
Preferred:
- Next.js, Tailwind CSS, Webpack/Vite, and unit testing.`,
  },
  {
    id: 'job-3',
    title: 'Senior Data Analyst',
    department: 'Analytics & BI',
    location: 'Remote',
    type: 'Full Time',
    candidatesCount: 27,
    topMatch: 86,
    status: 'Active',
    updated: '3 days ago',
    requiredSkills: ['SQL', 'Python', 'Tableau', 'Data Modeling'],
    preferredSkills: ['Snowflake', 'dbt', 'R', 'ETL'],
    experience: '2+ years',
    education: "Bachelor's degree in Statistics, Mathematics, or Computer Science",
    jdText: `Role: Senior Data Analyst
Requirements:
- 2+ years of professional experience in data analysis, SQL querying, and Python.
- Proven dashboard design in Tableau or PowerBI.
- Bachelor's degree in quantitative field.
Preferred:
- Snowflake, dbt, ETL workflows, and statistical modeling.`,
  },
  {
    id: 'job-4',
    title: 'Cloud DevOps Engineer',
    department: 'Infrastructure',
    location: 'Hyderabad, India (Hybrid)',
    type: 'Full Time',
    candidatesCount: 19,
    topMatch: 91,
    status: 'Active',
    updated: '5 days ago',
    requiredSkills: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
    preferredSkills: ['Prometheus', 'Grafana', 'Go', 'Linux'],
    experience: '4+ years',
    education: "Bachelor's degree in Engineering or Computer Science",
    jdText: `Role: Cloud DevOps Engineer
Requirements:
- 4+ years managing Kubernetes clusters and cloud infrastructure on AWS.
- Infrastructure as Code with Terraform and Docker containerization.
Preferred:
- Monitoring with Prometheus & Grafana, Go programming.`,
  },
];

const INITIAL_CANDIDATES_POOL: GeneralCandidate[] = [
  {
    id: 'pool-1',
    name: 'Jane Doe',
    role: 'Senior Full Stack Engineer',
    experience: '4 yrs',
    skills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'Docker'],
    matchScore: 94,
    stage: 'Screening',
    appliedFor: 'Senior Full Stack Engineer',
    email: 'jane.doe@example.com',
  },
  {
    id: 'pool-2',
    name: 'Rahul Sharma',
    role: 'Backend Developer',
    experience: '3.5 yrs',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
    matchScore: 88,
    stage: 'Interview',
    appliedFor: 'Senior Full Stack Engineer',
    email: 'rahul.s@example.com',
  },
  {
    id: 'pool-3',
    name: 'Priya Patel',
    role: 'Frontend Architect',
    experience: '5 yrs',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    matchScore: 92,
    stage: 'Shortlisted',
    appliedFor: 'Lead Frontend Developer',
    email: 'priya.patel@example.com',
  },
  {
    id: 'pool-4',
    name: 'Ananya Roy',
    role: 'Data Analyst',
    experience: '3 yrs',
    skills: ['SQL', 'Python', 'Tableau', 'Snowflake'],
    matchScore: 87,
    stage: 'Screening',
    appliedFor: 'Senior Data Analyst',
    email: 'ananya.roy@example.com',
  },
  {
    id: 'pool-5',
    name: 'Vikram Mehta',
    role: 'DevOps Specialist',
    experience: '4.5 yrs',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
    matchScore: 91,
    stage: 'Matched',
    appliedFor: 'Cloud DevOps Engineer',
    email: 'vikram.m@example.com',
  },
  {
    id: 'pool-6',
    name: 'Sneha Reddy',
    role: 'Full Stack Engineer',
    experience: '2.5 yrs',
    skills: ['Java', 'AWS', 'REST APIs', 'MySQL'],
    matchScore: 79,
    stage: 'New',
    appliedFor: 'Senior Full Stack Engineer',
    email: 'sneha.reddy@example.com',
  },
];

export default function HireMeApp() {
  const [activeNav, setActiveNav] = useState<NavigationTab>('home');
  const [selectedJob, setSelectedJob] = useState<JobOpening>(SAMPLE_JOBS[0]);
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JOBS[0].jdText);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [stage5Result, setStage5Result] = useState<AnalyzeStage5Response | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set(['pool-3']));
  const [candidatesPool, setCandidatesPool] = useState<GeneralCandidate[]>(INITIAL_CANDIDATES_POOL);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const handleToggleShortlist = (candidateId: string) => {
    setShortlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(candidateId)) next.delete(candidateId);
      else next.add(candidateId);
      return next;
    });
  };

  const handleStartMatchingForJob = (job: JobOpening) => {
    setSelectedJob(job);
    setJobDescription(job.jdText);
    setActiveNav('matching');
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setErrorBanner('Please provide job requirements text before running analysis.');
      return;
    }
    if (uploadedFiles.length === 0) {
      setErrorBanner('Please upload at least one candidate PDF resume to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setErrorBanner(null);

    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    uploadedFiles.forEach((file) => formData.append('resumes', file));

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete resume analysis.');
      }

      setStage5Result(data);
      if (data.candidates && data.candidates.length > 0) {
        setSelectedCandidateId(data.candidates[0].profile?.id || data.candidates[0].id);
      }
    } catch (err: any) {
      setErrorBanner(err.message || 'An error occurred during resume analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedCandidateRecord: RankedCandidate | undefined =
    stage5Result?.candidates?.find(
      (c) => (c.profile?.id || c.id) === selectedCandidateId
    ) || (stage5Result?.candidates && stage5Result.candidates[0]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#202124] flex flex-col font-sans selection:bg-[#6366F1]/20 selection:text-[#202124]">
      
      {/* Calm, Premium Top Navigation Bar */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
          
          {/* Left: Brand & Navigation Links */}
          <div className="flex items-center gap-10">
            <Logo size="md" showTagline={false} />
            
            <nav className="hidden md:flex items-center gap-6 text-[13.5px] font-medium">
              <button
                type="button"
                onClick={() => setActiveNav('home')}
                className={`py-1 transition-colors cursor-pointer border-b-2 ${
                  activeNav === 'home'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('candidates')}
                className={`py-1 transition-colors cursor-pointer border-b-2 ${
                  activeNav === 'candidates'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                Candidates
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('jobs')}
                className={`py-1 transition-colors cursor-pointer border-b-2 ${
                  activeNav === 'jobs'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                Jobs
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('matching')}
                className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
                  activeNav === 'matching'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Matching</span>
                {stage5Result?.candidates && (
                  <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('shortlisted')}
                className={`py-1 transition-colors cursor-pointer border-b-2 ${
                  activeNav === 'shortlisted'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                Shortlisted
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('reports')}
                className={`py-1 transition-colors cursor-pointer border-b-2 ${
                  activeNav === 'reports'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                Reports
              </button>
            </nav>
          </div>

          {/* Right: Search, Notifications & Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search talent pool..."
                className="pl-9 pr-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs w-52 focus:w-64 focus:bg-white focus:outline-none focus:border-[#202124] transition-all"
              />
            </div>

            <button
              type="button"
              className="p-2 text-[#6B7280] hover:text-[#202124] hover:bg-[#F3F4F6] rounded-full relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-[#6366F1] rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
            </button>

            {/* Recruiter Profile */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#E5E7EB]">
              <div className="w-8 h-8 rounded-full bg-[#202124] text-white flex items-center justify-center font-bold text-xs font-mono">
                AS
              </div>
              <div className="hidden xl:block text-left">
                <span className="text-xs font-bold text-[#202124] block leading-none">Arjun Sharma</span>
                <span className="text-[11px] text-[#6B7280] leading-tight">Senior Recruiter</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {errorBanner && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center justify-between max-w-[1440px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner(null)}
            className="text-amber-800 hover:text-black font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Surface */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 py-10">
        
        {/* ========================================================================= */}
        {/* VIEW 1: HOME / EDITORIAL RECRUITMENT OVERVIEW */}
        {/* ========================================================================= */}
        {activeNav === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-150">
            
            {/* Header Area */}
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                  Good morning, Recruiter
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  Your recruitment overview and talent matching intelligence for today.
                </p>
              </div>
              <div className="text-xs text-[#6B7280]">
                Active organization: <span className="font-semibold text-[#202124]">Acme Talent Operations</span>
              </div>
            </div>

            {/* SECTION 1: RECRUITMENT OVERVIEW (Single wide structured region, no giant cards) */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-6">
                Recruitment Overview
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#F3F4F6]">
                <div className="lg:pr-6">
                  <span className="text-xs text-[#6B7280] block font-medium">Open Requisitions</span>
                  <div className="text-3xl font-bold text-[#202124] font-mono mt-1">14</div>
                  <span className="text-xs text-emerald-700 font-medium block mt-1">+2 added this week</span>
                </div>

                <div className="pt-4 lg:pt-0 lg:px-6">
                  <span className="text-xs text-[#6B7280] block font-medium">Candidates Evaluated</span>
                  <div className="text-3xl font-bold text-[#202124] font-mono mt-1">842</div>
                  <span className="text-xs text-[#6B7280] block mt-1">Across active pipelines</span>
                </div>

                <div className="pt-4 lg:pt-0 lg:px-6">
                  <span className="text-xs text-[#6B7280] block font-medium">Average Match</span>
                  <div className="text-3xl font-bold text-[#202124] font-mono mt-1">78%</div>
                  <span className="text-xs text-[#6B7280] block mt-1">Deterministic alignment</span>
                </div>

                <div className="pt-4 lg:pt-0 lg:pl-6">
                  <span className="text-xs text-[#6B7280] block font-medium">Shortlisted</span>
                  <div className="text-3xl font-bold text-[#202124] font-mono mt-1">{shortlistedIds.size + 7}</div>
                  <span className="text-xs text-[#6B7280] block mt-1">Ready for next stage</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: PRIMARY WORKFLOW (READY TO MATCH + AI INSIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-[#202124] font-heading">
                    Ready to match candidates
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Select a job requisition and evaluate multiple resumes in seconds using HireMe AI.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNav('matching')}
                  className="px-5 py-2.5 bg-[#202124] hover:bg-black text-white rounded text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Find matching candidates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="lg:col-span-4 bg-[#EEF2FF] rounded-lg p-8 border border-[#6366F1]/20 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Insight
                </div>
                <p className="text-xs text-[#374151] leading-relaxed">
                  18 candidates currently satisfy all mandatory skills for Senior Full Stack Engineer.
                </p>
              </div>
            </div>

            {/* SECTION 3: RECRUITMENT PIPELINE (Minimalist columns with thin separators) */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-6">
                Recruitment Pipeline
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6]">
                <div className="sm:pr-4">
                  <span className="text-xs text-[#6B7280] block">New applicants</span>
                  <div className="text-2xl font-bold text-[#202124] font-mono mt-1">42</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:px-4">
                  <span className="text-xs text-[#6B7280] block">Screening</span>
                  <div className="text-2xl font-bold text-[#202124] font-mono mt-1">28</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:px-4 bg-[#EEF2FF]/50 p-2 rounded">
                  <span className="text-xs text-[#6366F1] font-semibold block">AI matched</span>
                  <div className="text-2xl font-bold text-[#6366F1] font-mono mt-1">31</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:px-4">
                  <span className="text-xs text-[#6B7280] block">Interview</span>
                  <div className="text-2xl font-bold text-[#202124] font-mono mt-1">15</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:px-4">
                  <span className="text-xs text-[#6B7280] block">Shortlisted</span>
                  <div className="text-2xl font-bold text-[#202124] font-mono mt-1">{shortlistedIds.size + 7}</div>
                </div>

                <div className="pt-3 sm:pt-0 sm:pl-4 bg-emerald-50/50 p-2 rounded">
                  <span className="text-xs text-emerald-800 font-semibold block">Hired</span>
                  <div className="text-2xl font-bold text-emerald-800 font-mono mt-1">4</div>
                </div>
              </div>
            </div>

            {/* SECTION 4: ACTIVE JOB OPENINGS (Dominant professional table) */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-2xs">
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#202124] font-heading">
                    Active Job Openings
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Click Match to launch immediate candidate evaluation for any opening.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('jobs')}
                  className="text-xs font-semibold text-[#202124] hover:text-[#6366F1] cursor-pointer"
                >
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left enterprise-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Department</th>
                      <th>Location</th>
                      <th>Candidates</th>
                      <th>Top Match</th>
                      <th>Status</th>
                      <th>Updated</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_JOBS.map((job) => (
                      <tr key={job.id} className="hover:bg-[#FAFBFC] transition-colors">
                        <td>
                          <div className="font-bold text-[14px] text-[#202124]">
                            {job.title}
                          </div>
                          <span className="text-xs text-[#6B7280] font-mono">ID: {job.id}</span>
                        </td>
                        <td>
                          <span className="text-xs text-[#202124]">{job.department}</span>
                        </td>
                        <td>
                          <span className="text-xs text-[#6B7280]">{job.location}</span>
                        </td>
                        <td>
                          <span className="font-mono font-medium text-xs text-[#202124]">{job.candidatesCount}</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-xs text-[#202124]">{job.topMatch}%</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                          </div>
                        </td>
                        <td>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {job.status}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-[#6B7280]">{job.updated}</span>
                        </td>
                        <td className="text-right">
                          <button
                            type="button"
                            onClick={() => handleStartMatchingForJob(job)}
                            className="px-3 py-1.5 bg-white hover:bg-[#F3F4F6] text-[#202124] border border-[#E5E7EB] rounded font-medium text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>Match</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CANDIDATES DATABASE / TALENT POOL */}
        {/* ========================================================================= */}
        {activeNav === 'candidates' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Candidates
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Manage, review and evaluate your talent pool.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left enterprise-table">
                  <thead>
                    <tr>
                      <th className="w-10 text-center">
                        <input type="checkbox" className="accent-[#202124] rounded" />
                      </th>
                      <th>Candidate</th>
                      <th>Role</th>
                      <th>Experience</th>
                      <th>Skills</th>
                      <th>Match</th>
                      <th>Stage</th>
                      <th>Applied For</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatesPool.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAFBFC] transition-colors">
                        <td className="text-center">
                          <input type="checkbox" className="accent-[#202124] rounded" />
                        </td>
                        <td>
                          <div className="font-bold text-[14px] text-[#202124]">
                            {c.name}
                          </div>
                          <span className="text-xs text-[#6B7280]">{c.email}</span>
                        </td>
                        <td>
                          <span className="text-xs text-[#202124]">{c.role}</span>
                        </td>
                        <td>
                          <span className="text-xs font-medium text-[#202124]">{c.experience}</span>
                        </td>
                        <td className="max-w-[200px]">
                          <span className="text-xs text-[#4B5563] truncate block">
                            {c.skills.slice(0, 3).join(' · ')}
                          </span>
                        </td>
                        <td>
                          <span className="font-mono font-bold text-xs text-[#202124]">{c.matchScore}%</span>
                        </td>
                        <td>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                            {c.stage}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-[#6B7280]">{c.appliedFor}</span>
                        </td>
                        <td className="text-right">
                          <button
                            type="button"
                            onClick={() => handleToggleShortlist(c.id)}
                            className={`p-1.5 rounded border cursor-pointer transition-colors ${
                              shortlistedIds.has(c.id)
                                ? 'bg-[#FDF2F7] text-[#E83E8C] border-[#E83E8C]/30'
                                : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:text-[#202124]'
                            }`}
                            title={shortlistedIds.has(c.id) ? 'Shortlisted' : 'Add to Shortlist'}
                          >
                            {shortlistedIds.has(c.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-[#E83E8C]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: JOBS DIRECTORY */}
        {/* ========================================================================= */}
        {activeNav === 'jobs' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Job Openings
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Configure role criteria and evaluate applicants against job requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_JOBS.map((job) => (
                <div key={job.id} className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-[#202124] font-heading">{job.title}</h3>
                        <span className="text-xs text-[#6B7280]">{job.department} · {job.location}</span>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {job.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="text-[#6B7280] font-semibold block text-[11px]">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requiredSkills.map((s, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-[#F9FAFB] rounded border border-[#E5E7EB] text-[#202124]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                    <span className="text-xs text-[#6B7280] font-mono">
                      {job.candidatesCount} applicants · {job.topMatch}% top match
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartMatchingForJob(job)}
                      className="px-4 py-2 bg-[#202124] hover:bg-black text-white rounded text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Match Candidates</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: SIGNATURE AI MATCHING PAGE */}
        {/* ========================================================================= */}
        {activeNav === 'matching' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Header Area */}
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                  AI Candidate Matching
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  {selectedJob.title} · {stage5Result?.candidates ? `${stage5Result.candidates.length} candidates analyzed` : 'Configure criteria & upload resumes'}
                </p>
              </div>

              {stage5Result?.candidates && (
                <button
                  type="button"
                  onClick={() => setStage5Result(null)}
                  className="px-3.5 py-2 bg-white hover:bg-[#F9FAFB] text-[#202124] border border-[#E5E7EB] rounded text-xs font-semibold cursor-pointer transition-colors"
                >
                  Adjust Requisition / Upload More
                </button>
              )}
            </div>

            {/* AI MATCH SUMMARY (Subtle indigo background, no giant card, no pink border) */}
            {stage5Result?.candidates && stage5Result.candidates.length > 0 && (
              <div className="bg-[#EEF2FF] rounded-lg p-6 border border-[#6366F1]/20 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6366F1] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Match Summary
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#374151] pt-1">
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {stage5Result.candidates.filter((c) => c.match.missingRequiredSkills.length === 0).length}
                    </span>
                    <span>candidates satisfy all required skills</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {stage5Result.candidates.filter((c) => (c.match.experienceMatch.candidateYears || 0) >= 3).length}
                    </span>
                    <span>exceed experience requirements</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {stage5Result.candidates.filter((c) => (c.profile.claimsToVerify || []).some((cl) => cl.status !== 'SUPPORTED')).length}
                    </span>
                    <span>require recruiter verification</span>
                  </div>
                </div>
              </div>
            )}

            {/* Input Workspace (Step 1 & Step 2) */}
            {!stage5Result && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Step 1: Job Criteria */}
                <div className="lg:col-span-7 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs space-y-6">
                  <div className="pb-4 border-b border-[#F3F4F6]">
                    <h3 className="text-base font-bold text-[#202124] font-heading">
                      1. Job Description & Criteria
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Specify required skills, experience tenure, and degree requirements.
                    </p>
                  </div>

                  <JobDescriptionInput
                    value={jobDescription}
                    onChange={(val) => setJobDescription(val)}
                  />
                </div>

                {/* Step 2: Upload Resumes */}
                <div className="lg:col-span-5 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="pb-4 border-b border-[#F3F4F6]">
                      <h3 className="text-base font-bold text-[#202124] font-heading">
                        2. Candidate Resumes (PDF)
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        Upload up to 10 resumes for batch evaluation.
                      </p>
                    </div>

                    <ResumeUploader
                      files={uploadedFiles}
                      onFilesChange={(files: File[]) => setUploadedFiles(files)}
                      disabled={isAnalyzing}
                    />
                  </div>

                  <div className="pt-6 border-t border-[#F3F4F6]">
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || uploadedFiles.length === 0}
                      className={`w-full py-3 rounded text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-all ${
                        isAnalyzing || uploadedFiles.length === 0
                          ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                          : 'bg-[#202124] hover:bg-black text-white'
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Evaluating candidate pool...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#6366F1]" />
                          <span>Find Matching Candidates ({uploadedFiles.length})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Ranked Candidates Table */}
            {stage5Result?.candidates && (
              <CandidateList
                candidates={stage5Result.candidates}
                selectedCandidateId={selectedCandidateId || undefined}
                shortlistedCandidateIds={shortlistedIds}
                onSelectCandidate={(id) => setSelectedCandidateId(id)}
                onToggleShortlist={(id) => handleToggleShortlist(id)}
                jobTitle={selectedJob.title}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: SHORTLISTED */}
        {/* ========================================================================= */}
        {activeNav === 'shortlisted' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Shortlisted Candidates ({shortlistedIds.size})
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Candidates marked for hiring manager review and interview scheduling.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs">
              {shortlistedIds.size > 0 ? (
                <div className="divide-y divide-[#F3F4F6]">
                  {Array.from(shortlistedIds).map((id) => {
                    const matchInPool = candidatesPool.find((c) => c.id === id);
                    const matchInAnalyzed = stage5Result?.candidates?.find(
                      (c) => (c.profile?.id || c.id) === id
                    );

                    const name = matchInAnalyzed?.profile?.name || matchInPool?.name || 'Shortlisted Candidate';
                    const email = matchInAnalyzed?.profile?.email || matchInPool?.email || 'email@example.com';
                    const score = matchInAnalyzed?.match?.totalScore || matchInPool?.matchScore || 90;

                    return (
                      <div key={id} className="py-4 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-[#202124] block">{name}</span>
                          <span className="text-xs text-[#6B7280]">{email}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono font-bold text-[#202124]">{score}% Match</span>
                          <button
                            type="button"
                            onClick={() => handleToggleShortlist(id)}
                            className="text-xs text-[#6B7280] hover:text-[#202124] underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-[#6B7280]">
                  <Bookmark className="w-8 h-8 mx-auto text-[#D1D5DB] mb-2" />
                  <p className="font-semibold text-[#202124] text-xs">No candidates shortlisted yet.</p>
                  <p className="text-[11px] mt-0.5">Click the bookmark icon on any candidate record to shortlist them.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: REPORTS */}
        {/* ========================================================================= */}
        {activeNav === 'reports' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Reports & Analytics
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Deterministic matching throughput, evaluation cycle times, and candidate alignment metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-1">
                <span className="text-xs text-[#6B7280] font-medium">Total Resumes Evaluated</span>
                <span className="text-3xl font-bold text-[#202124] font-mono block">842</span>
                <span className="text-xs text-emerald-700 font-medium">100% Deterministic Extraction</span>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-1">
                <span className="text-xs text-[#6B7280] font-medium">Average Evaluation Latency</span>
                <span className="text-3xl font-bold text-[#202124] font-mono block">&lt; 1.2s</span>
                <span className="text-xs text-[#6B7280]">Per candidate batch</span>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-1">
                <span className="text-xs text-[#6B7280] font-medium">Top Matched Skills</span>
                <span className="text-3xl font-bold text-[#202124] font-mono block">Java / React</span>
                <span className="text-xs text-[#6B7280]">Highest frequency match</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Candidate Record Inspection Drawer */}
      {selectedCandidateId && selectedCandidateRecord && (
        <MatchDetails
          candidate={selectedCandidateRecord}
          isShortlisted={shortlistedIds.has(selectedCandidateRecord.profile?.id || selectedCandidateRecord.id)}
          onToggleShortlist={(id) => handleToggleShortlist(id)}
          onClose={() => setSelectedCandidateId(null)}
        />
      )}
    </div>
  );
}
