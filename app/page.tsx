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
  Zap,
  ArrowDown,
  Filter
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList, getCandidateInitials, getAvatarColorClass } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { ScrollStoryHero } from '../components/ScrollStoryHero';
import { ResumeIntelligenceStory } from '../components/ResumeIntelligenceStory';
import { EvidenceMatchingStory } from '../components/EvidenceMatchingStory';
import { BigMetricsStory } from '../components/BigMetricsStory';
import { LoopingTypography } from '../components/LoopingTypography';
import { HiringSignalsMarquee } from '../components/HiringSignalsMarquee';
import { RecruitmentPipelineFlow } from '../components/RecruitmentPipelineFlow';
import { Footer } from '../components/Footer';
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
  orderNumber: string;
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
  matchTier: 'Strong' | 'Good' | 'Moderate' | 'Weak';
  stage: 'New' | 'Screening' | 'Matched' | 'Interview' | 'Shortlisted' | 'Hired';
  appliedFor: string;
  email: string;
}

const SAMPLE_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    orderNumber: '01',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Hyderabad · Hybrid',
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
    orderNumber: '02',
    title: 'Lead Frontend Developer',
    department: 'Engineering',
    location: 'Bangalore · On-site',
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
    orderNumber: '03',
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
    orderNumber: '04',
    title: 'Cloud DevOps Engineer',
    department: 'Infrastructure',
    location: 'Hyderabad · Hybrid',
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
    experience: '4.2 yrs',
    skills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL'],
    matchScore: 94,
    matchTier: 'Strong',
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
    matchTier: 'Good',
    stage: 'Interview',
    appliedFor: 'Senior Full Stack Engineer',
    email: 'rahul.s@example.com',
  },
  {
    id: 'pool-3',
    name: 'Priya Patel',
    role: 'Frontend Architect',
    experience: '5.0 yrs',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    matchScore: 92,
    matchTier: 'Strong',
    stage: 'Shortlisted',
    appliedFor: 'Lead Frontend Developer',
    email: 'priya.patel@example.com',
  },
  {
    id: 'pool-4',
    name: 'Ananya Roy',
    role: 'Data Analyst',
    experience: '3.0 yrs',
    skills: ['SQL', 'Python', 'Tableau', 'Snowflake'],
    matchScore: 87,
    matchTier: 'Good',
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
    matchTier: 'Strong',
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
    matchTier: 'Moderate',
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
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [stage5Result, setStage5Result] = useState<AnalyzeStage5Response | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set(['pool-3']));
  const [candidatesPool, setCandidatesPool] = useState<GeneralCandidate[]>(INITIAL_CANDIDATES_POOL);
  const [candidateSearch, setCandidateSearch] = useState<string>('');
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

  const filteredCandidates = candidatesPool.filter((c) => {
    if (!candidateSearch) return true;
    const q = candidateSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q)) ||
      c.appliedFor.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#202124] flex flex-col font-sans selection:bg-[#6366F1]/20 selection:text-[#202124]">
      
      {/* 1. NAVBAR */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 motion-fade">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
          
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
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center justify-between max-w-[1400px] mx-auto w-full motion-fade">
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
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 sm:px-10 py-6">
        
        {/* ========================================================================= */}
        {/* VIEW 1: SCROLL STORY + RECOMPOSED HIGH-END RECRUITER INSTRUMENT */}
        {/* ========================================================================= */}
        {activeNav === 'home' && (
          <div className="space-y-4">
            
            {/* 1. BIG HERO */}
            <ScrollStoryHero onStartMatching={() => setActiveNav('matching')} />

            {/* 2. MOVING SIGNALS */}
            <div className="py-2">
              <LoopingTypography />
              <HiringSignalsMarquee />
            </div>

            {/* 3. RESUME -> STRUCTURED CANDIDATE SIGNALS */}
            <ResumeIntelligenceStory />

            {/* 4. BIG NUMBERS */}
            <BigMetricsStory />

            {/* 5. CANDIDATE MATCH DOSSIER / EVIDENCE REVEAL */}
            <EvidenceMatchingStory />

            {/* 6. RECRUITMENT PIPELINE JOURNEY */}
            <section className="py-12 sm:py-16 border-t border-[#E5E7EB]">
              <RecruitmentPipelineFlow />
            </section>

            {/* ===================================================================== */}
            {/* 7. HIGH-END RECRUITER WORKSPACE (Calm, structured, single visual canvas) */}
            {/* ===================================================================== */}
            <section className="py-16 sm:py-24 border-t border-[#E5E7EB] space-y-20">
              
              {/* 7A. CHAPTER 03 / ATS OPERATIONS HEADER */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5E7EB]">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>03 / ATS OPERATIONS</span>
                  </div>

                  <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#202124] tracking-tight leading-[1.08]">
                    NOW MAKE<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#202124] via-[#4338CA] to-[#6366F1]">
                      THE DECISION.
                    </span>
                  </h2>

                  <p className="text-base text-[#4B5563] leading-relaxed pt-1">
                    Everything HireMe AI has analyzed is now organized for human review.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-semibold text-[#202124]">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-mono">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      AI ANALYSIS COMPLETE
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-mono">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      EVIDENCE VERIFIED
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-mono">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      CANDIDATES RANKED
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveNav('matching')}
                    className="px-6 py-3.5 bg-[#202124] hover:bg-black text-white rounded-md text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-all shadow-sm hover:shadow-md"
                  >
                    <span>Launch Matching Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 7B. ACTIVE REQUISITIONS (Continuous Recruiting List with 01/02/03/04 Identity) */}
              <div className="space-y-6">
                <div className="flex items-baseline justify-between pb-3 border-b border-[#E5E7EB]">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-[#202124] font-heading tracking-tight uppercase">
                      ACTIVE REQUISITIONS
                    </h3>
                    <span className="text-xs text-[#6B7280]">
                      4 active roles
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveNav('jobs')}
                    className="text-xs font-semibold text-[#202124] hover:text-[#6366F1] cursor-pointer"
                  >
                    View all requisitions →
                  </button>
                </div>

                {/* Continuous Recruiting List */}
                <div className="divide-y divide-[#E5E7EB]">
                  {SAMPLE_JOBS.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleStartMatchingForJob(job)}
                      className="py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:bg-[#F9FAFB]/80 px-4 -mx-4 rounded transition-all duration-200 cursor-pointer"
                    >
                      {/* Left: Number + Dominant Title + Metadata */}
                      <div className="flex items-start gap-6">
                        <span className="font-mono font-bold text-base text-[#94A3B8] group-hover:text-[#6366F1] transition-colors pt-0.5">
                          {job.orderNumber}
                        </span>

                        <div className="space-y-1">
                          <h4 className="text-lg sm:text-xl font-bold text-[#202124] group-hover:text-black transition-colors font-heading leading-snug">
                            {job.title}
                          </h4>
                          <p className="text-xs text-[#6B7280]">
                            {job.department} · {job.location}
                          </p>
                        </div>
                      </div>

                      {/* Right: Candidates + Signature Match Progress Line + Status + Match Action */}
                      <div className="flex items-center gap-8 lg:gap-12 self-end lg:self-center pl-12 lg:pl-0">
                        {/* Candidates count */}
                        <div className="text-right">
                          <span className="font-mono font-semibold text-xs text-[#202124] block">
                            {job.candidatesCount} candidates
                          </span>
                          <span className="text-[11px] text-[#9CA3AF]">
                            Updated {job.updated}
                          </span>
                        </div>

                        {/* Signature Match Progress Accent */}
                        <div className="text-right min-w-[100px]">
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="font-mono font-black text-sm text-[#202124]">{job.topMatch}%</span>
                            <div className="w-10 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-600 rounded-full"
                                style={{ width: `${job.topMatch}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-[10px] font-mono uppercase font-bold text-[#6B7280] block mt-0.5">
                            TOP MATCH
                          </span>
                        </div>

                        {/* Status Badge */}
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {job.status}
                        </span>

                        {/* Interactive Match Action */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartMatchingForJob(job);
                          }}
                          className="font-semibold text-xs text-[#202124] group-hover:text-[#6366F1] inline-flex items-center gap-1 transition-all"
                        >
                          <span>Match</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7C. CANDIDATE TALENT POOL (Recruiter Product Instrument with Left Signal Rails) */}
              <div className="space-y-6 pt-6">
                
                {/* Header with Search & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-3 border-b border-[#E5E7EB]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg sm:text-xl text-[#202124] font-heading tracking-tight uppercase">
                        CANDIDATE TALENT POOL
                      </h3>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#EEF2FF] text-[#6366F1] border border-[#6366F1]/20">
                        AI EVALUATED {filteredCandidates.length} / {candidatesPool.length}
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      6 evaluated candidates
                    </span>
                  </div>

                  {/* Compact Product Filters */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={candidateSearch}
                        onChange={(e) => setCandidateSearch(e.target.value)}
                        placeholder="Search talent..."
                        className="pl-8 pr-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs w-40 focus:w-48 focus:outline-none focus:border-[#202124] transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveNav('candidates')}
                      className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs font-semibold text-[#4B5563] hover:text-[#202124] hover:bg-[#F9FAFB] cursor-pointer"
                    >
                      Manage pool →
                    </button>
                  </div>
                </div>

                {/* Candidate Records with Left Signal Rails & Strict Typography Hierarchy */}
                <div className="divide-y divide-[#E5E7EB]">
                  {filteredCandidates.map((c) => {
                    const initials = getCandidateInitials(c.name, 'C');
                    const avatarColor = getAvatarColorClass(c.name);

                    // Left rail signal color
                    const railColor =
                      c.matchScore >= 90
                        ? 'border-l-emerald-600'
                        : c.matchScore >= 80
                        ? 'border-l-[#6366F1]'
                        : 'border-l-amber-500';

                    const matchLabel =
                      c.matchScore >= 90
                        ? 'STRONG MATCH'
                        : c.matchScore >= 80
                        ? 'GOOD MATCH'
                        : 'REVIEW';

                    const matchSignalClass =
                      c.matchScore >= 90
                        ? 'bg-emerald-600'
                        : c.matchScore >= 80
                        ? 'bg-[#6366F1]'
                        : 'bg-amber-500';

                    return (
                      <div
                        key={c.id}
                        className={`py-5 px-4 -mx-4 rounded border-l-2 ${railColor} hover:bg-[#F9FAFB]/80 transition-all duration-200 group flex flex-col lg:flex-row lg:items-center justify-between gap-5`}
                        style={{ minHeight: '80px' }}
                      >
                        {/* 1. LEFT: Avatar + Candidate Identity */}
                        <div className="flex items-center gap-3.5 min-w-[280px]">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-base text-[#202124] group-hover:text-black transition-colors leading-tight">
                              {c.name}
                            </div>
                            <div className="text-xs text-[#6B7280] mt-0.5">
                              <span>{c.role}</span>
                              <span className="mx-1.5 text-[#CBD5E1]">·</span>
                              <span className="font-mono text-[11px] text-[#64748B]">{c.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* 2. CENTER: Experience & Clean Skill Tokens */}
                        <div className="flex items-center gap-5 flex-1 pl-12 lg:pl-0">
                          <span className="font-mono text-xs font-semibold text-[#202124] shrink-0">
                            {c.experience}
                          </span>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {c.skills.slice(0, 3).map((s, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded bg-white text-[#374151] text-[11px] font-medium border border-[#E2E8F0] shadow-2xs"
                              >
                                {s}
                              </span>
                            ))}
                            {c.skills.length > 3 && (
                              <span className="text-[10px] text-[#6B7280] font-mono px-1">
                                +{c.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 3. RIGHT: Signature Match Score + Stage + Action */}
                        <div className="flex items-center gap-6 lg:gap-8 self-end lg:self-center pl-12 lg:pl-0">
                          
                          {/* Signature Match Score with Mini Signal Line */}
                          <div className="text-right min-w-[110px]">
                            <div className="flex items-baseline justify-end gap-1">
                              <span className="font-mono font-black text-base text-[#202124]">
                                {c.matchScore}%
                              </span>
                            </div>
                            <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden my-0.5">
                              <div
                                className={`h-full rounded-full ${matchSignalClass}`}
                                style={{ width: `${c.matchScore}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-mono font-bold text-[#6B7280] block uppercase tracking-wider">
                              {matchLabel} · AI
                            </span>
                          </div>

                          {/* Stage */}
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155]">
                            {c.stage}
                          </span>

                          {/* Applied Requisition */}
                          <span className="hidden xl:block text-xs text-[#475569] max-w-[160px] truncate">
                            {c.appliedFor}
                          </span>

                          {/* Actions: Bookmark & View */}
                          <div className="flex items-center gap-2">
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

                            <button
                              type="button"
                              onClick={() => setActiveNav('matching')}
                              className="font-semibold text-xs text-[#202124] group-hover:text-[#6366F1] inline-flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <span>View</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </section>
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

            <div className="border-y border-[#E5E7EB] overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    <th className="py-3 px-3 w-8">
                      <input type="checkbox" className="accent-[#202124] rounded" />
                    </th>
                    <th className="py-3 px-4 font-mono font-medium">Candidate & Role</th>
                    <th className="py-3 px-4 font-mono font-medium">Experience</th>
                    <th className="py-3 px-4 font-mono font-medium">Verified Skills</th>
                    <th className="py-3 px-4 font-mono font-medium">Match</th>
                    <th className="py-3 px-4 font-mono font-medium">Stage</th>
                    <th className="py-3 px-4 font-mono font-medium">Applied For</th>
                    <th className="py-3 px-4 text-right font-mono font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {candidatesPool.map((c, idx) => {
                    const initials = getCandidateInitials(c.name, `C${idx + 1}`);
                    const avatarColor = getAvatarColorClass(c.name);

                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-white/80 transition-colors"
                        style={{ height: '76px' }}
                      >
                        <td className="py-4 px-3 align-middle">
                          <input type="checkbox" className="accent-[#202124] rounded" />
                        </td>
                        <td className="py-4 px-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                              {initials}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-[#202124]">
                                {c.name}
                              </div>
                              <span className="text-xs text-[#6B7280]">{c.role} · {c.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-middle">
                          <span className="text-xs font-semibold text-[#202124] bg-[#F1F5F9] px-2 py-0.5 rounded font-mono">
                            {c.experience}
                          </span>
                        </td>
                        <td className="py-4 px-4 align-middle max-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {c.skills.slice(0, 3).map((s, sIdx) => (
                              <span key={sIdx} className="px-2 py-0.5 rounded bg-white text-[#374151] text-[11px] font-medium border border-[#E2E8F0]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 align-middle">
                          <span className="font-mono font-bold text-sm text-[#202124]">{c.matchScore}%</span>
                        </td>
                        <td className="py-4 px-4 align-middle">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155]">
                            {c.stage}
                          </span>
                        </td>
                        <td className="py-4 px-4 align-middle">
                          <span className="text-xs text-[#6B7280]">{c.appliedFor}</span>
                        </td>
                        <td className="py-4 px-4 text-right align-middle">
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

      {/* FOOTER */}
      <Footer />

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
