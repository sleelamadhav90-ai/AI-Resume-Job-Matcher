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
  Filter,
  Layers,
  HelpCircle,
  UploadCloud,
  Play
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList, getCandidateInitials, getAvatarColorClass } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { ScrollStoryHero } from '../components/ScrollStoryHero';
import { EvidenceMatchingStory } from '../components/EvidenceMatchingStory';
import { HiringSignalsMarquee } from '../components/HiringSignalsMarquee';
import { CandidateCardStackSection } from '../components/CandidateCardStackSection';
import { ScoreExplanationSection } from '../components/ScoreExplanationSection';
import { AsymmetricBentoGrid } from '../components/AsymmetricBentoGrid';
import { LandingCTA } from '../components/LandingCTA';
import { ATSWorkspaceShell } from '../components/ATSWorkspaceShell';
import { Footer } from '../components/Footer';
import { AnalyzeStage5Response, RankedCandidate, JobRequirements } from '../lib/types';

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

const SAMPLE_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    orderNumber: '01',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Hyderabad · Hybrid',
    type: 'Full Time',
    candidatesCount: 3,
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
    candidatesCount: 2,
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
    candidatesCount: 2,
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
];

// Initial pre-loaded demonstration session for immediate evaluation
const INITIAL_DEMO_CANDIDATES: RankedCandidate[] = [
  {
    rank: 1,
    id: 'cand-1',
    fileName: 'Jane_Doe_Resume.pdf',
    status: 'processed',
    profile: {
      id: 'cand-1',
      fileName: 'Jane_Doe_Resume.pdf',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '555-0142',
      skills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'REST APIs', 'Docker'],
      education: [
        {
          degree: "Bachelor's Degree in Computer Science",
          field: 'Computer Science',
          institution: 'University of Texas at Austin',
          graduationYear: 2020,
        },
      ],
      experience: [
        {
          company: 'Fintech Solutions Inc.',
          role: 'Senior Full Stack Engineer',
          startDate: '2020',
          endDate: '2024',
          description: 'Architected and deployed Java Spring Boot microservices handling over 50,000 requests per minute with PostgreSQL on AWS infrastructure, reducing latency by 32%.',
          technologies: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'REST APIs'],
        },
      ],
      projects: [
        {
          name: 'High-Throughput Payment Engine',
          description: 'Engineered a resilient event-driven payment routing microservice in Java and Spring Boot with AWS ECS and PostgreSQL.',
          technologies: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL'],
        },
      ],
      certifications: ['AWS Certified Solutions Architect'],
      totalExperienceYears: 4.2,
      summary: 'Senior full-stack engineer with 4.2 years of experience architecting high-scale Java Spring Boot microservices on AWS.',
      claimsToVerify: [
        {
          claim: 'Architected and deployed Java Spring Boot microservices on AWS',
          evidence: 'Architected and deployed Java Spring Boot microservices handling over 50,000 requests per minute with PostgreSQL on AWS infrastructure',
          verificationNeeded: false,
          status: 'SUPPORTED',
          explanation: 'Verbatim evidence confirmed in work experience with production performance metrics.',
        },
        {
          claim: 'Kubernetes Cluster Administration',
          evidence: null,
          verificationNeeded: true,
          status: 'NOT_ENOUGH_EVIDENCE',
          explanation: 'Kubernetes listed as a skill without explicit project or infrastructure tenure detail.',
        },
      ],
    },
    match: {
      candidateId: 'cand-1',
      totalScore: 94,
      label: 'Strong Match',
      skillScore: 37.5,
      requiredSkillScore: 30,
      preferredSkillScore: 7.5,
      experienceScore: 25,
      educationScore: 15,
      projectScore: 9.5,
      requirementsScore: 7.0,
      matchedRequiredSkills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'REST APIs'],
      missingRequiredSkills: [],
      matchedPreferredSkills: ['Docker', 'CI/CD'],
      missingPreferredSkills: ['Kubernetes', 'Kafka'],
      partialSkills: [],
      experienceMatch: { candidateYears: 4.2, requiredYears: 3, status: 'meets' },
      educationMatch: { status: 'matches', evidence: ["Bachelor's Degree in Computer Science"] },
      relevantProjects: ['High-Throughput Payment Engine'],
      matchedRequirements: ['High-scale distributed systems'],
      missingRequirements: [],
      explanation: 'Jane Doe satisfies all 5 required skills (Java, Spring Boot, AWS, PostgreSQL, REST APIs) and exceeds the 3+ year experience requirement with 4.2 verified years in production Fintech microservices.',
    },
  },
  {
    rank: 2,
    id: 'cand-2',
    fileName: 'Rahul_Sharma_CV.pdf',
    status: 'processed',
    profile: {
      id: 'cand-2',
      fileName: 'Rahul_Sharma_CV.pdf',
      name: 'Rahul Sharma',
      email: 'rahul.s@example.com',
      phone: '555-0189',
      skills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'SQL'],
      education: [
        {
          degree: 'B.Tech in Information Technology',
          field: 'Information Technology',
          institution: 'National Institute of Technology',
          graduationYear: 2021,
        },
      ],
      experience: [
        {
          company: 'Apex Cloud Systems',
          role: 'Backend Developer',
          startDate: '2021',
          endDate: '2024',
          description: 'Developed RESTful services in Java and Spring Boot with PostgreSQL relational schema optimization.',
          technologies: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
        },
      ],
      projects: [
        {
          name: 'Order Processing Microservice',
          description: 'Built Spring Boot backend pipeline with PostgreSQL transaction locks.',
          technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
        },
      ],
      certifications: ['Oracle Certified Java Associate'],
      totalExperienceYears: 3.5,
      summary: 'Backend developer with 3.5 years experience in Java Spring Boot REST microservices.',
      claimsToVerify: [
        {
          claim: 'Optimized PostgreSQL relational schemas',
          evidence: 'Optimized query latency by 20% on high-load table indexing',
          verificationNeeded: false,
          status: 'SUPPORTED',
          explanation: 'Supported by Apex Cloud Systems employment record.',
        },
      ],
    },
    match: {
      candidateId: 'cand-2',
      totalScore: 88,
      label: 'Good Match',
      skillScore: 29.0,
      requiredSkillScore: 24,
      preferredSkillScore: 5.0,
      experienceScore: 25,
      educationScore: 15,
      projectScore: 9.0,
      requirementsScore: 10.0,
      matchedRequiredSkills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
      missingRequiredSkills: ['AWS'],
      matchedPreferredSkills: ['Docker'],
      missingPreferredSkills: ['Kubernetes', 'Kafka'],
      partialSkills: [],
      experienceMatch: { candidateYears: 3.5, requiredYears: 3, status: 'meets' },
      educationMatch: { status: 'matches', evidence: ['B.Tech in Information Technology'] },
      relevantProjects: ['Order Processing Microservice'],
      matchedRequirements: ['Backend microservices'],
      missingRequirements: [],
      explanation: 'Rahul Sharma meets 4 of 5 required skills (Java, Spring Boot, REST APIs, PostgreSQL) with 3.5 years of experience. AWS cloud experience was self-reported without explicit cloud infrastructure tenure.',
    },
  },
  {
    rank: 3,
    id: 'cand-3',
    fileName: 'Sneha_Reddy_Resume.pdf',
    status: 'processed',
    profile: {
      id: 'cand-3',
      fileName: 'Sneha_Reddy_Resume.pdf',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      phone: '555-0199',
      skills: ['Java', 'AWS', 'REST APIs', 'MySQL'],
      education: [
        {
          degree: 'B.S. in Computer Science',
          field: 'Computer Science',
          institution: 'State University',
          graduationYear: 2022,
        },
      ],
      experience: [
        {
          company: 'Nexus Digital',
          role: 'Full Stack Engineer',
          startDate: '2022',
          endDate: '2024',
          description: 'Built Java web applications and connected to AWS S3 and DynamoDB databases.',
          technologies: ['Java', 'AWS', 'REST APIs'],
        },
      ],
      projects: [],
      certifications: [],
      totalExperienceYears: 2.2,
      summary: 'Full stack engineer with 2.2 years experience developing Java web services on AWS.',
      claimsToVerify: [],
    },
    match: {
      candidateId: 'cand-3',
      totalScore: 78,
      label: 'Moderate Match',
      skillScore: 20.5,
      requiredSkillScore: 18,
      preferredSkillScore: 2.5,
      experienceScore: 18.3,
      educationScore: 15,
      projectScore: 6.0,
      requirementsScore: 8.2,
      matchedRequiredSkills: ['Java', 'AWS', 'REST APIs'],
      missingRequiredSkills: ['Spring Boot', 'PostgreSQL'],
      matchedPreferredSkills: [],
      missingPreferredSkills: ['Kubernetes', 'Docker', 'Kafka'],
      partialSkills: [],
      experienceMatch: { candidateYears: 2.2, requiredYears: 3, status: 'partial' },
      educationMatch: { status: 'matches', evidence: ['B.S. in Computer Science'] },
      relevantProjects: [],
      matchedRequirements: [],
      missingRequirements: [],
      explanation: 'Sneha Reddy has 3 of 5 required skills (Java, AWS, REST APIs). Her 2.2 years of professional experience is slightly below the 3+ year requirement for this Senior opening.',
    },
  },
];

export default function HireMeApp() {
  const [activeNav, setActiveNav] = useState<NavigationTab>('home');
  const [selectedJob, setSelectedJob] = useState<JobOpening>(SAMPLE_JOBS[0]);
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JOBS[0].jdText);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  
  // LIVE SESSION STATE: Real analyzed results or initial active demo session
  const [stage5Result, setStage5Result] = useState<AnalyzeStage5Response | null>({
    success: true,
    message: 'Analysis complete',
    jobRequirements: {
      jobTitle: SAMPLE_JOBS[0].title,
      requiredSkills: SAMPLE_JOBS[0].requiredSkills,
      preferredSkills: SAMPLE_JOBS[0].preferredSkills,
      requiredExperienceYears: 3,
      educationRequirements: [SAMPLE_JOBS[0].education],
      responsibilities: ['Build scalable backend services'],
      importantKeywords: ['microservices', 'Java', 'AWS'],
      domainRequirements: ['High-throughput systems'],
      summary: SAMPLE_JOBS[0].jdText,
    },
    candidates: INITIAL_DEMO_CANDIDATES,
    failedCandidates: [],
    unprocessedResumes: [],
  });

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(INITIAL_DEMO_CANDIDATES[0].id);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [candidateSearch, setCandidateSearch] = useState<string>('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'tenure'>('match');
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [whyCandidateId, setWhyCandidateId] = useState<string | null>(null);

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

  const handleSelectJobByTitle = (title: string) => {
    const found = SAMPLE_JOBS.find((j) => j.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      handleStartMatchingForJob(found);
    } else {
      setActiveNav('matching');
    }
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

  // Live evaluated candidates strictly from the active analysis session
  const liveCandidates: RankedCandidate[] = stage5Result?.candidates || [];

  const selectedCandidateRecord: RankedCandidate | undefined =
    liveCandidates.find(
      (c) => (c.profile?.id || c.id) === selectedCandidateId
    ) || (liveCandidates.length > 0 ? liveCandidates[0] : undefined);

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
                onClick={() => setActiveNav('matching')}
                className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
                  activeNav === 'matching'
                    ? 'border-[#202124] text-[#202124] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#202124]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Matching Workspace</span>
                {liveCandidates.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                )}
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
                Candidates ({liveCandidates.length})
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
                Requisitions
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
                Shortlisted ({shortlistedIds.size})
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
                Audit & Rubric
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Search live talent pool..."
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
        {/* VIEW 1: COMPLETE PRODUCT STORY + LARGE ATS PRODUCT SHOWCASE + WORKSPACE */}
        {/* ========================================================================= */}
        {activeNav === 'home' && (
          <div className="space-y-4">
            
            {/* 1. HERO */}
            <ScrollStoryHero onStartMatching={() => setActiveNav('matching')} />

            {/* 2. SIGNAL MARQUEE */}
            <HiringSignalsMarquee />

            {/* 3. STICKY SCROLL REVEAL FEATURE STORY */}
            <EvidenceMatchingStory />

            {/* 4. CANDIDATE CARD STACK */}
            <CandidateCardStackSection />

            {/* 5. SCORE EXPLANATION SECTION */}
            <ScoreExplanationSection />

            {/* 6. ASYMMETRIC BENTO GRID */}
            <AsymmetricBentoGrid />

            {/* 7. LANDING CTA */}
            <LandingCTA onStartMatching={() => setActiveNav('matching')} />

            {/* ===================================================================== */}
            {/* 8. LIVE FUNCTIONAL RECRUITER WORKSPACE (Real Application Shell) */}
            {/* ===================================================================== */}
            <section className="py-16 sm:py-24 border-t border-[#E5E7EB] space-y-6">
              
              <div className="space-y-2 mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6366F1] font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03 / RECRUITER WORKSPACE</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#202124] tracking-tight">
                  LIVE TALENT OPERATIONS
                </h3>
                <p className="text-sm text-[#64748B]">
                  Real-time candidate evaluation environment powered by the 100-point deterministic rubric engine.
                </p>
              </div>

              {/* Complete Structured ATS Workspace Shell */}
              <ATSWorkspaceShell
                stage5Result={stage5Result}
                selectedJobTitle={selectedJob.title}
                onOpenMatching={() => setActiveNav('matching')}
                onSelectCandidate={(id) => setSelectedCandidateId(id)}
                shortlistedIds={shortlistedIds}
                onToggleShortlist={(id) => handleToggleShortlist(id)}
              />

            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CANDIDATES DATABASE */}
        {/* ========================================================================= */}
        {activeNav === 'candidates' && (
          <div className="space-y-8 motion-fade-up">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                  Evaluated Candidate Pool ({liveCandidates.length})
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  Active session candidates ranked by deterministic rubric score.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveNav('matching')}
                className="px-4 py-2 bg-[#202124] text-white rounded-md text-xs font-semibold cursor-pointer"
              >
                + Analyze More Resumes
              </button>
            </div>

            {liveCandidates.length > 0 ? (
              <CandidateList
                candidates={liveCandidates}
                selectedCandidateId={selectedCandidateId || undefined}
                shortlistedCandidateIds={shortlistedIds}
                onSelectCandidate={(id) => setSelectedCandidateId(id)}
                onToggleShortlist={(id) => handleToggleShortlist(id)}
                jobTitle={stage5Result?.jobRequirements?.jobTitle || selectedJob.title}
              />
            ) : (
              <div className="p-12 text-center bg-white rounded-xl border border-[#E5E7EB] space-y-3">
                <UploadCloud className="w-10 h-10 text-[#9CA3AF] mx-auto" />
                <h4 className="font-bold text-base text-[#202124]">No Live Candidates in Pool</h4>
                <p className="text-xs text-[#6B7280]">Upload resumes in the Matching Console to evaluate candidates.</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: JOBS REQUISITIONS DIRECTORY */}
        {/* ========================================================================= */}
        {activeNav === 'jobs' && (
          <div className="space-y-8 motion-fade-up">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Job Requisitions
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Select a requisition to launch matching or configure role criteria.
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
        {/* VIEW 4: MATCHING WORKSPACE */}
        {/* ========================================================================= */}
        {activeNav === 'matching' && (
          <div className="space-y-8 motion-fade-up">
            
            {/* Header Area */}
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                  Candidate Matching Console
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  {selectedJob.title} · {liveCandidates.length > 0 ? `${liveCandidates.length} candidate resumes analyzed` : 'Configure criteria & upload PDF resumes'}
                </p>
              </div>

              {liveCandidates.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStage5Result(null);
                    setUploadedFiles([]);
                  }}
                  className="px-3.5 py-2 bg-white hover:bg-[#F9FAFB] text-[#202124] border border-[#E5E7EB] rounded-md text-xs font-semibold cursor-pointer transition-colors"
                >
                  Start New Session / Reset
                </button>
              )}
            </div>

            {/* Analysis Loading State */}
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
                      01 Extracting Information
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
                      02 Comparing Skills
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
                      03 Evaluating Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded border border-[#6366F1]/15">
                    {analysisStep >= 4 ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#D1D5DB] shrink-0" />
                    )}
                    <span className={analysisStep >= 4 ? 'font-semibold text-[#202124]' : 'text-[#6B7280]'}>
                      04 Generating Rubric Scores
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* AI MATCH SUMMARY */}
            {liveCandidates.length > 0 && !isAnalyzing && (
              <div className="bg-[#EEF2FF] rounded-lg p-6 border border-[#6366F1]/20 shadow-2xs space-y-2 motion-fade-up">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6366F1] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Session Match Summary
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-[#374151] pt-1">
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {liveCandidates.length}
                    </span>
                    <span>candidates evaluated</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {liveCandidates.filter((c) => c.match.missingRequiredSkills.length === 0).length}
                    </span>
                    <span>satisfy all required skills</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {liveCandidates.filter((c) => (c.match.experienceMatch.candidateYears || 0) >= 3).length}
                    </span>
                    <span>exceed experience threshold</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#202124] block text-base font-mono">
                      {liveCandidates.filter((c) => (c.profile?.claimsToVerify || []).some((cl) => cl.status !== 'SUPPORTED')).length}
                    </span>
                    <span>require claim verification</span>
                  </div>
                </div>
              </div>
            )}

            {/* Input Workspace (Step 1: Criteria + Step 2: Upload) */}
            {(!stage5Result || liveCandidates.length === 0) && !isAnalyzing && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

                <div className="lg:col-span-5 bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-2xs space-y-6 flex flex-col justify-between motion-fade-up stagger-2">
                  <div className="space-y-6">
                    <div className="pb-4 border-b border-[#F3F4F6]">
                      <h3 className="text-base font-bold text-[#202124] font-heading">
                        2. Candidate Resumes (PDF)
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        Upload candidate resumes for real-time evaluation.
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
            {liveCandidates.length > 0 && !isAnalyzing && (
              <CandidateList
                candidates={liveCandidates}
                selectedCandidateId={selectedCandidateId || undefined}
                shortlistedCandidateIds={shortlistedIds}
                onSelectCandidate={(id) => setSelectedCandidateId(id)}
                onToggleShortlist={(id) => handleToggleShortlist(id)}
                jobTitle={stage5Result?.jobRequirements?.jobTitle || selectedJob.title}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: SHORTLISTED CANDIDATES */}
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
                    const matchInAnalyzed = liveCandidates.find(
                      (c) => (c.profile?.id || c.id) === id
                    );

                    const name = matchInAnalyzed?.profile?.name || 'Candidate';
                    const email = matchInAnalyzed?.profile?.email || 'email@example.com';
                    const score = matchInAnalyzed?.match?.totalScore || 85;
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
                  <p className="text-[11px] mt-0.5">Click the bookmark icon on any candidate record in the talent pool to shortlist them.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: AUDIT & RUBRIC BREAKDOWN */}
        {/* ========================================================================= */}
        {activeNav === 'reports' && (
          <div className="space-y-8 motion-fade-up">
            <div>
              <h1 className="text-3xl font-bold text-[#202124] font-heading tracking-tight">
                Scoring Engine Rubric & Audit
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Deterministic 100-point rubric breakdown for ALGOTHON'26 (ALG-AI-01).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-2 motion-fade-up stagger-1">
                <span className="text-xs font-mono font-bold text-[#6366F1] uppercase">Required Skills</span>
                <span className="text-2xl font-black text-[#202124] font-mono block">30 Points</span>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Proportional credit for mandatory job skills extracted from candidate experience and project evidence.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-2 motion-fade-up stagger-2">
                <span className="text-xs font-mono font-bold text-[#6366F1] uppercase">Experience Tenure</span>
                <span className="text-2xl font-black text-[#202124] font-mono block">25 Points</span>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Full 25 pts awarded if candidate meets or exceeds min required years; pro-rated curve for partial tenure.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-2 motion-fade-up stagger-3">
                <span className="text-xs font-mono font-bold text-[#6366F1] uppercase">Education & Projects</span>
                <span className="text-2xl font-black text-[#202124] font-mono block">25 Points</span>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  15 pts for degree level / STEM alignment + 10 pts for project relevance and production achievements.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-[#202124]">4-Tier Claim Verification Taxonomy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-800 block">SUPPORTED</span>
                  <span className="text-emerald-700 text-[11px]">Verbatim evidence present in resume</span>
                </div>
                <div className="p-3 rounded bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-800 block">NOT ENOUGH EVIDENCE</span>
                  <span className="text-amber-700 text-[11px]">Skill listed without project context</span>
                </div>
                <div className="p-3 rounded bg-red-50 border border-red-200">
                  <span className="font-bold text-red-800 block">UNSUPPORTED</span>
                  <span className="text-red-700 text-[11px]">Unsubstantiated metric claim</span>
                </div>
                <div className="p-3 rounded bg-purple-50 border border-purple-200">
                  <span className="font-bold text-purple-800 block">CONTRADICTORY</span>
                  <span className="text-purple-700 text-[11px]">Timeline or graduation date mismatch</span>
                </div>
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
