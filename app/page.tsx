import React, { useState, useEffect } from 'react';
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
  ArrowUpDown,
  Check,
  Activity,
  Award,
  Zap
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList, getCandidateInitials, getAvatarColorClass } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { AIMatchVisual } from '../components/AIMatchVisual';
import { LoopingTypography } from '../components/LoopingTypography';
import { HiringSignalsMarquee } from '../components/HiringSignalsMarquee';
import { RecruitmentPipelineFlow } from '../components/RecruitmentPipelineFlow';
import { AnalyzeStage5Response, RankedCandidate } from '../lib/types';
import { useCountUp } from '../lib/useCountUp';

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
    skills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL'],
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

const AnimatedStatistic: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
  target,
  suffix = '',
  duration = 600,
}) => {
  const count = useCountUp(target, duration);
  return (
    <span className="font-mono">
      {count}
      {suffix}
    </span>
  );
};

export default function HireMeApp() {
  const [activeNav, setActiveNav] = useState<NavigationTab>('home');
  const [selectedJob, setSelectedJob] = useState<JobOpening>(SAMPLE_JOBS[0]);
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JOBS[0].jdText);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [stage5Result, setStage5Result] = useState<AnalyzeStage5Response | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set(['pool-3']));
  const [candidatesPool, setCandidatesPool] = useState<GeneralCandidate[]>(INITIAL_CANDIDATES_POOL);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Step progression during analysis
  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setAnalysisStep(1);
      interval = setInterval(() => {
        setAnalysisStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 700);
    } else {
      setAnalysisStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

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
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30 motion-fade">
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

      {/* Looping Continuous Typography Bar */}
      <LoopingTypography />

      {/* Hiring Signals Live Ticker Marquee */}
      <HiringSignalsMarquee />

      {/* Error Banner */}
      {errorBanner && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center justify-between max-w-[1440px] mx-auto w-full motion-fade">
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
        {/* VIEW 1: HOME / EDITORIAL RECRUITMENT WORKSPACE */}
        {/* ========================================================================= */}
        {activeNav === 'home' && (
          <div className="space-y-10">
            
            {/* 1. SIGNATURE AI MATCHING VISUAL (Connected Nodes with Signal Animation) */}
            <AIMatchVisual onStartMatching={() => setActiveNav('matching')} />

            {/* 2. ASYMMETRIC OVERVIEW SECTION (65% Welcome & Stats / 35% AI Match Health) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left 65%: Welcome & Stats */}
              <div className="lg:col-span-8 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs flex flex-col justify-between space-y-6 motion-fade-up">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-[#202124] font-heading tracking-tight">
                        Good morning, Recruiter
                      </h1>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        3 active requisitions require candidate matching review today.
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB] font-mono">
                      Acme Talent Operations
                    </span>
                  </div>

                  {/* AI Hiring Insight Callout */}
                  <div className="bg-[#EEF2FF] rounded-md p-3.5 border border-[#6366F1]/20 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#6366F1] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6366F1] block">
                        AI Hiring Insight
                      </span>
                      <p className="text-xs text-[#374151] mt-0.5">
                        Your <span className="font-semibold text-[#202124]">Senior Full Stack Engineer</span> opening has 18 strong matches. 4 candidates exceed mandatory tenure.
                      </p>
                    </div>
                  </div>

                  {/* 4 Structured Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6]">
                    <div>
                      <span className="text-xs text-[#6B7280] block font-medium">Open Roles</span>
                      <div className="text-2xl font-bold text-[#202124] mt-0.5">
                        <AnimatedStatistic target={14} />
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">+2 this week</span>
                    </div>

                    <div className="pt-2 sm:pt-0 sm:pl-5">
                      <span className="text-xs text-[#6B7280] block font-medium">Evaluated</span>
                      <div className="text-2xl font-bold text-[#202124] mt-0.5">
                        <AnimatedStatistic target={842} />
                      </div>
                      <span className="text-[11px] text-[#6B7280]">Candidates</span>
                    </div>

                    <div className="pt-2 sm:pt-0 sm:pl-5">
                      <span className="text-xs text-[#6B7280] block font-medium">Avg. Alignment</span>
                      <div className="text-2xl font-bold text-[#202124] mt-0.5">
                        <AnimatedStatistic target={78} suffix="%" />
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">High quality</span>
                    </div>

                    <div className="pt-2 sm:pt-0 sm:pl-5">
                      <span className="text-xs text-[#6B7280] block font-medium">Shortlisted</span>
                      <div className="text-2xl font-bold text-[#202124] mt-0.5">
                        <AnimatedStatistic target={shortlistedIds.size + 7} />
                      </div>
                      <span className="text-[11px] text-[#6B7280]">For interview</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">
                    Launch deterministic evaluation for active requisitions.
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveNav('matching')}
                    className="px-4 py-2 bg-[#202124] hover:bg-black text-white rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Match Candidates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 35%: Signature AI Match Health Signal */}
              <div className="lg:col-span-4 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs flex flex-col justify-between space-y-4 motion-fade-up stagger-1">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6366F1] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#6366F1]" />
                      AI Match Health
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-semibold">
                      Strong Signal
                    </span>
                  </div>

                  <div className="py-4 text-center">
                    <div className="text-4xl font-black text-[#202124] font-mono">
                      <AnimatedStatistic target={86} suffix="%" />
                    </div>
                    <span className="text-xs text-[#6B7280] font-medium block mt-1">
                      Cohort Match Confidence
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#4B5563]">Required Skills Precision</span>
                        <span className="font-mono font-bold text-[#202124]">91%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#202124] rounded-full" style={{ width: '91%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#4B5563]">Experience Fit Tenure</span>
                        <span className="font-mono font-bold text-[#202124]">84%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '84%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#4B5563]">Project & Domain Relevance</span>
                        <span className="font-mono font-bold text-[#202124]">88%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#202124] rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F3F4F6] text-[11px] text-[#6B7280] text-center">
                  Calibrated across 842 candidate profiles
                </div>
              </div>
            </div>

            {/* 3. CONNECTED RECRUITMENT PIPELINE WITH TRAVELING PULSE */}
            <RecruitmentPipelineFlow shortlistedCount={shortlistedIds.size + 7} />

            {/* 4. ACTIVE JOB OPENINGS TABLE */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden shadow-2xs motion-fade-up stagger-3">
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
                    {SAMPLE_JOBS.map((job, idx) => (
                      <tr
                        key={job.id}
                        className={`hover:bg-[#FAFBFC] transition-colors motion-fade-up stagger-${idx + 1}`}
                      >
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
                            className="px-3 py-1.5 bg-white hover:bg-[#F3F4F6] text-[#202124] border border-[#E5E7EB] rounded-md font-medium text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
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
          <div className="space-y-8 motion-fade-up">
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
                      <th>Candidate & Role</th>
                      <th>Experience</th>
                      <th>Verified Skills</th>
                      <th>Match</th>
                      <th>Stage</th>
                      <th>Applied For</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatesPool.map((c, idx) => {
                      const initials = getCandidateInitials(c.name, `C${idx + 1}`);
                      const avatarColor = getAvatarColorClass(c.name);

                      return (
                        <tr
                          key={c.id}
                          className={`hover:bg-[#FAFBFC] transition-colors motion-fade-up stagger-${Math.min(idx + 1, 6)}`}
                        >
                          <td className="text-center">
                            <input type="checkbox" className="accent-[#202124] rounded" />
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                                {initials}
                              </div>
                              <div>
                                <div className="font-bold text-[14px] text-[#202124]">
                                  {c.name}
                                </div>
                                <span className="text-xs text-[#6B7280]">{c.role} · {c.email}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-xs font-medium text-[#202124]">{c.experience}</span>
                          </td>
                          <td className="max-w-[200px]">
                            <div className="flex flex-wrap gap-1">
                              {c.skills.slice(0, 3).map((s, sIdx) => (
                                <span key={sIdx} className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[#374151] text-[11px] font-medium border border-[#E5E7EB]">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-xs text-[#202124]">{c.matchScore}%</span>
                              <span className="text-[10px] font-bold text-[#6366F1]">AI</span>
                            </div>
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
                              className={`p-1.5 rounded-md border cursor-pointer transition-colors ${
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
                      );
                    })}
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
          <div className="space-y-8 motion-fade-up">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Job Openings
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Configure role criteria and evaluate applicants against job requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_JOBS.map((job, idx) => (
                <div
                  key={job.id}
                  className={`bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-4 flex flex-col justify-between motion-fade-up stagger-${idx + 1}`}
                >
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
                        {job.requiredSkills.map((s, sIdx) => (
                          <span key={sIdx} className="text-xs px-2 py-0.5 bg-[#F9FAFB] rounded border border-[#E5E7EB] text-[#202124]">
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
                      className="px-4 py-2 bg-[#202124] hover:bg-black text-white rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
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
          <div className="space-y-8 motion-fade-up">
            
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
                  className="px-3.5 py-2 bg-white hover:bg-[#F9FAFB] text-[#202124] border border-[#E5E7EB] rounded-md text-xs font-semibold cursor-pointer transition-colors"
                >
                  Adjust Requisition / Upload More
                </button>
              )}
            </div>

            {/* Compact Professional Analysis Loading Pipeline State */}
            {isAnalyzing && (
              <div className="bg-[#EEF2FF] rounded-lg p-6 border border-[#6366F1]/20 shadow-2xs space-y-4 motion-fade">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#6366F1] animate-spin" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#6366F1]">
                      Analyzing Candidate Resumes
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#6366F1]">Step {analysisStep} of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded border border-[#6366F1]/15">
                    {analysisStep > 1 ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#6366F1] shrink-0" />
                    )}
                    <span className={analysisStep >= 1 ? 'font-semibold text-[#202124]' : 'text-[#6B7280]'}>
                      Extracting Information
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded border border-[#6366F1]/15">
                    {analysisStep > 2 ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : analysisStep === 2 ? (
                      <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D1D5DB] shrink-0" />
                    )}
                    <span className={analysisStep >= 2 ? 'font-semibold text-[#202124]' : 'text-[#6B7280]'}>
                      Comparing Skills
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded border border-[#6366F1]/15">
                    {analysisStep > 3 ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : analysisStep === 3 ? (
                      <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D1D5DB] shrink-0" />
                    )}
                    <span className={analysisStep >= 3 ? 'font-semibold text-[#202124]' : 'text-[#6B7280]'}>
                      Evaluating Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded border border-[#6366F1]/15">
                    {analysisStep >= 4 ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D1D5DB] shrink-0" />
                    )}
                    <span className={analysisStep >= 4 ? 'font-semibold text-[#202124]' : 'text-[#6B7280]'}>
                      Generating Scores
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* AI MATCH SUMMARY */}
            {stage5Result?.candidates && stage5Result.candidates.length > 0 && !isAnalyzing && (
              <div className="bg-[#EEF2FF] rounded-lg p-6 border border-[#6366F1]/20 shadow-2xs space-y-2 motion-fade-up">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6366F1] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Match Summary
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-[#374151] pt-1">
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {stage5Result.candidates.length}
                    </span>
                    <span>candidates analyzed</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {stage5Result.candidates.filter((c) => c.match.missingRequiredSkills.length === 0).length}
                    </span>
                    <span>satisfy all required skills</span>
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
            {!stage5Result && !isAnalyzing && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Step 1: Job Criteria */}
                <div className="lg:col-span-7 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs space-y-6 motion-fade-up stagger-1">
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
                <div className="lg:col-span-5 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs space-y-6 flex flex-col justify-between motion-fade-up stagger-2">
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
                      className={`w-full py-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-all ${
                        isAnalyzing || uploadedFiles.length === 0
                          ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                          : 'bg-[#202124] hover:bg-black text-white'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#6366F1]" />
                      <span>Find Matching Candidates ({uploadedFiles.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Ranked Candidates Table */}
            {stage5Result?.candidates && !isAnalyzing && (
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
          <div className="space-y-8 motion-fade-up">
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
                  {Array.from(shortlistedIds).map((id, idx) => {
                    const matchInPool = candidatesPool.find((c) => c.id === id);
                    const matchInAnalyzed = stage5Result?.candidates?.find(
                      (c) => (c.profile?.id || c.id) === id
                    );

                    const name = matchInAnalyzed?.profile?.name || matchInPool?.name || 'Shortlisted Candidate';
                    const email = matchInAnalyzed?.profile?.email || matchInPool?.email || 'email@example.com';
                    const score = matchInAnalyzed?.match?.totalScore || matchInPool?.matchScore || 90;
                    const initials = getCandidateInitials(name, `S${idx + 1}`);
                    const avatarColor = getAvatarColorClass(name);

                    return (
                      <div
                        key={id}
                        className={`py-4 flex items-center justify-between motion-fade-up stagger-${Math.min(idx + 1, 6)}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-[#202124] block">{name}</span>
                            <span className="text-xs text-[#6B7280]">{email}</span>
                          </div>
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
          <div className="space-y-8 motion-fade-up">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Reports & Analytics
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Deterministic matching throughput, evaluation cycle times, and candidate alignment metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-1 motion-fade-up stagger-1">
                <span className="text-xs text-[#6B7280] font-medium">Total Resumes Evaluated</span>
                <span className="text-3xl font-bold text-[#202124] font-mono block">842</span>
                <span className="text-xs text-emerald-700 font-medium">100% Deterministic Extraction</span>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-1 motion-fade-up stagger-2">
                <span className="text-xs text-[#6B7280] font-medium">Average Evaluation Latency</span>
                <span className="text-3xl font-bold text-[#202124] font-mono block">&lt; 1.2s</span>
                <span className="text-xs text-[#6B7280]">Per candidate batch</span>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-1 motion-fade-up stagger-3">
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
