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
  ChevronDown,
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
  Play,
  RefreshCw
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateList, getCandidateInitials, getAvatarColorClass } from '../components/CandidateList';
import { MatchDetails } from '../components/MatchDetails';
import { HeroSection } from '../components/redesign/HeroSection';
import { AICandidateMatchingSection } from '../components/redesign/AICandidateMatchingSection';
import { AutomationSection } from '../components/redesign/AutomationSection';
import { WorkflowSection } from '../components/redesign/WorkflowSection';
import { StatsSection } from '../components/redesign/StatsSection';
import { IntegrationsSection } from '../components/redesign/IntegrationsSection';
import { ATSCheckSection } from '../components/redesign/ATSCheckSection';
import { LandingCTA } from '../components/redesign/LandingCTA';
import { HiringSignalsMarquee } from '../components/HiringSignalsMarquee';
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
      setErrorBanner('Please select at least one candidate resume (PDF or DOCX) to analyze.');
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
    <div className="min-h-screen bg-[#F5F3EE] text-[#171817] flex flex-col font-sans selection:bg-[#174C4A]/20 selection:text-[#171817]">
      
      {/* ========================================================================= */}
      {/* 1. TOP SUB-HEADER BAR (Zoho Suite Product Ribbon - Reference Image) */}
      {/* ========================================================================= */}
      <div className="bg-[#171817] text-white py-1.5 px-6 sm:px-10 text-[11px] font-mono font-medium border-b border-white/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            <span className="text-[#7FAEA7] font-extrabold uppercase tracking-wider">HireMe Suite:</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors">CRM</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors">People</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors">Creator</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors">Voice</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors">Sign</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors">Payroll</span>
            <span className="hover:text-[#7FAEA7] cursor-pointer transition-colors inline-flex items-center gap-1">
              <span>All Products</span>
              <ChevronDown className="w-3 h-3 text-[#7FAEA7]" />
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#DDDCD6] cursor-pointer hover:text-white" />
            <span className="text-white hover:text-[#7FAEA7] cursor-pointer font-bold border-l border-white/20 pl-3">
              Sign In
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN PRODUCT NAVIGATION BAR (Matching Reference Image) */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-[#DDDCD6] sticky top-0 z-40 shadow-2xs">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
          
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setActiveNav('home')}
              className="cursor-pointer flex items-center gap-2"
            >
              <Logo size="md" showTagline={false} />
            </button>
            
            <nav className="hidden md:flex items-center gap-5 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => setActiveNav('home')}
                className={`py-1 transition-colors cursor-pointer border-b-2 uppercase tracking-wide ${
                  activeNav === 'home'
                    ? 'border-[#174C4A] text-[#174C4A] font-black'
                    : 'border-transparent text-[#686A66] hover:text-[#171817]'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('matching')}
                className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 uppercase tracking-wide ${
                  activeNav === 'matching'
                    ? 'border-[#174C4A] text-[#174C4A] font-black'
                    : 'border-transparent text-[#686A66] hover:text-[#171817]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#174C4A]" />
                <span>Upload & Match</span>
                {uploadedFiles.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#174C4A] text-white text-[10px] font-mono">
                    {uploadedFiles.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('candidates')}
                className={`py-1 transition-colors cursor-pointer border-b-2 uppercase tracking-wide ${
                  activeNav === 'candidates'
                    ? 'border-[#174C4A] text-[#174C4A] font-black'
                    : 'border-transparent text-[#686A66] hover:text-[#171817]'
                }`}
              >
                Candidates ({liveCandidates.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('jobs')}
                className={`py-1 transition-colors cursor-pointer border-b-2 uppercase tracking-wide ${
                  activeNav === 'jobs'
                    ? 'border-[#174C4A] text-[#174C4A] font-black'
                    : 'border-transparent text-[#686A66] hover:text-[#171817]'
                }`}
              >
                Requisitions
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('shortlisted')}
                className={`py-1 transition-colors cursor-pointer border-b-2 uppercase tracking-wide ${
                  activeNav === 'shortlisted'
                    ? 'border-[#174C4A] text-[#174C4A] font-black'
                    : 'border-transparent text-[#686A66] hover:text-[#171817]'
                }`}
              >
                Shortlisted ({shortlistedIds.size})
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('reports')}
                className={`py-1 transition-colors cursor-pointer border-b-2 uppercase tracking-wide ${
                  activeNav === 'reports'
                    ? 'border-[#174C4A] text-[#174C4A] font-black'
                    : 'border-transparent text-[#686A66] hover:text-[#171817]'
                }`}
              >
                Audit & Rubric
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Ask AI Pill Button (Matching "Ask Zia" in reference image) */}
            <button
              type="button"
              onClick={() => setActiveNav('matching')}
              className="px-3.5 py-1.5 rounded-full border border-[#174C4A] bg-[#DCEAE6] text-[#174C4A] font-black text-xs inline-flex items-center gap-1.5 hover:bg-[#174C4A] hover:text-white transition-all cursor-pointer shadow-2xs"
            >
              <span>Ask AI</span>
              <Sparkles className="w-3.5 h-3.5 text-[#174C4A] group-hover:text-white" />
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('matching')}
              className="px-4 py-2 bg-[#174C4A] hover:bg-[#123B39] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {errorBanner && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3 text-xs text-red-900 flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold">{errorBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner(null)}
            className="text-red-800 hover:text-black font-bold cursor-pointer underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Surface */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 sm:px-10 py-6">
        
        {/* ========================================================================= */}
        {/* VIEW 1: COMPLETE PRODUCT LANDING & LIVE RECRUITER WORKSPACE */}
        {/* ========================================================================= */}
        {activeNav === 'home' && (
          <div className="space-y-6">
            
            {/* 1. HERO SECTION (Matching Reference Image Tour + Form Layout) */}
            <HeroSection
              onStartMatching={() => setActiveNav('matching')}
              onSeeHowItWorks={() => {
                const el = document.getElementById('insights-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveNav('matching');
              }}
            />

            {/* 2. PROMINENT UPLOAD YOUR RESUME SECTION */}
            <section className="bg-white rounded-3xl border border-[#DDDCD6] p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDDCD6]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEAE6] text-[#174C4A] text-xs font-mono font-extrabold mb-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>PROMINENT RESUME UPLOAD WORKFLOW</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#171817] uppercase">
                    UPLOAD YOUR RESUME FOR REAL-TIME AI ANALYSIS
                  </h2>
                  <p className="text-xs text-[#686A66]">
                    Upload candidate PDF or DOCX files to extract structured profiles and compute 100-point rubric match scores.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#686A66] font-mono font-bold">
                    {uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) ready` : 'No files selected'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <ResumeUploader
                    files={uploadedFiles}
                    onFilesChange={(files: File[]) => setUploadedFiles(files)}
                    disabled={isAnalyzing}
                  />
                </div>

                <div className="lg:col-span-5 bg-[#F5F3EE] p-6 rounded-2xl border border-[#DDDCD6] space-y-4">
                  <h4 className="font-extrabold text-sm text-[#171817] font-heading uppercase">
                    100-Point AI Rubric Analysis
                  </h4>
                  <p className="text-xs text-[#686A66] leading-relaxed">
                    Once uploaded, HireMe AI parses contact information, verified skills, total experience tenure, education credentials, and candidate claim statements.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || uploadedFiles.length === 0}
                      className={`w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ${
                        isAnalyzing || uploadedFiles.length === 0
                          ? 'bg-[#DDDCD6] text-[#686A66] cursor-not-allowed opacity-60'
                          : 'bg-[#174C4A] hover:bg-[#123B39] text-white'
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Analyzing Resumes ({uploadedFiles.length})...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-white" />
                          <span>
                            {uploadedFiles.length > 0
                              ? `Analyze ${uploadedFiles.length} Uploaded Resume(s)`
                              : 'Select Resume File to Enable Analysis'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. MARQUEE */}
            <HiringSignalsMarquee />

            {/* 4. AI CANDIDATE MATCHING */}
            <div id="insights-section">
              <AICandidateMatchingSection />
            </div>

            {/* 5. AUTOMATION SECTION */}
            <AutomationSection />

            {/* 6. CONNECTED WORKFLOW */}
            <WorkflowSection />

            {/* 7. STATS SECTION */}
            <StatsSection />

            {/* 8. INTEGRATIONS SECTION WITH PICTURE SHOWCASE */}
            <IntegrationsSection />

            {/* 9. ATS CHECK */}
            <ATSCheckSection />

            {/* 10. LANDING CTA */}
            <LandingCTA onStartMatching={() => setActiveNav('matching')} />

            {/* 11. LIVE RECRUITER WORKSPACE */}
            <section className="py-12 border-t border-[#DDDCD6] space-y-6">
              <div className="space-y-1 mb-4">
                <h2 className="text-2xl font-black font-heading text-[#171817] uppercase">
                  LIVE TALENT OPERATIONS CONSOLE
                </h2>
                <p className="text-xs text-[#686A66]">
                  Real-time candidate evaluation environment powered by the 100-point deterministic rubric engine.
                </p>
              </div>

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
          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black font-heading text-[#171817] tracking-tight uppercase">
                  Evaluated Candidate Pool ({liveCandidates.length})
                </h1>
                <p className="text-xs text-[#686A66] mt-1">
                  Active session candidates ranked by deterministic rubric score.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveNav('matching')}
                className="px-4 py-2 bg-[#174C4A] hover:bg-[#123B39] text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                + Upload & Analyze Resumes
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
              <div className="p-12 text-center bg-white rounded-3xl border border-[#DDDCD6] space-y-3">
                <UploadCloud className="w-10 h-10 text-[#686A66] mx-auto" />
                <h4 className="font-bold text-base text-[#171817] uppercase">No Live Candidates in Pool</h4>
                <p className="text-xs text-[#686A66]">Upload PDF or DOCX resumes to analyze and evaluate candidates.</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: JOBS REQUISITIONS DIRECTORY */}
        {/* ========================================================================= */}
        {activeNav === 'jobs' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black font-heading text-[#171817] tracking-tight uppercase">
                Job Requisitions Directory
              </h1>
              <p className="text-xs text-[#686A66] mt-1">
                Select a requisition to launch matching or configure role criteria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl border border-[#DDDCD6] p-6 space-y-4 flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-base text-[#171817] font-heading">{job.title}</h3>
                        <span className="text-xs text-[#686A66]">{job.department} · {job.location}</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[#DCEAE6] text-[#28745D] border border-[#28745D]/30">
                        {job.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="text-[#686A66] font-bold block text-[11px] uppercase">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requiredSkills.map((s, sIdx) => (
                          <span key={sIdx} className="text-xs px-2.5 py-0.5 bg-[#F5F3EE] rounded-md border border-[#DDDCD6] text-[#171817] font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DDDCD6] flex items-center justify-between">
                    <span className="text-xs text-[#686A66] font-mono">
                      {job.candidatesCount} applicants · {job.topMatch}% top match
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartMatchingForJob(job)}
                      className="px-4 py-2 bg-[#174C4A] hover:bg-[#123B39] text-white rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer transition-colors"
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
        {/* VIEW 4: MATCHING WORKSPACE (PROMINENT RESUME UPLOADER) */}
        {/* ========================================================================= */}
        {activeNav === 'matching' && (
          <div className="space-y-6">
            
            {/* Header Area */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-2 border-b border-[#DDDCD6]">
              <div>
                <h1 className="text-2xl font-black font-heading text-[#171817] tracking-tight uppercase">
                  Candidate Matching Console
                </h1>
                <p className="text-xs text-[#686A66] mt-1">
                  Target Role: <strong className="text-[#174C4A]">{selectedJob.title}</strong> · Upload PDF or DOCX resumes for AI analysis.
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setUploadedFiles([])}
                  className="px-3.5 py-2 bg-white hover:bg-[#F5F3EE] text-[#171817] border border-[#DDDCD6] rounded-xl text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#686A66]" />
                  <span>Reset Uploads</span>
                </button>
              )}
            </div>

            {/* Analysis Progress / Loading State */}
            {isAnalyzing && (
              <div className="bg-[#DCEAE6]/40 rounded-3xl p-6 border border-[#174C4A]/30 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#174C4A] animate-spin" />
                    <span className="font-black text-xs uppercase tracking-wider text-[#174C4A] font-mono">
                      Analyzing Candidate Resumes
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#174C4A]">Step {analysisStep} of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#DDDCD6]">
                    {analysisStep > 1 ? (
                      <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#174C4A] shrink-0" />
                    )}
                    <span className={analysisStep >= 1 ? 'font-bold text-[#171817]' : 'text-[#686A66]'}>
                      01 Extracting Information
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#DDDCD6]">
                    {analysisStep > 2 ? (
                      <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    ) : analysisStep === 2 ? (
                      <span className="w-2 h-2 rounded-full bg-[#174C4A] animate-pulse shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#DDDCD6] shrink-0" />
                    )}
                    <span className={analysisStep >= 2 ? 'font-bold text-[#171817]' : 'text-[#686A66]'}>
                      02 Comparing Skills
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#DDDCD6]">
                    {analysisStep > 3 ? (
                      <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    ) : analysisStep === 3 ? (
                      <span className="w-2 h-2 rounded-full bg-[#174C4A] animate-pulse shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#DDDCD6] shrink-0" />
                    )}
                    <span className={analysisStep >= 3 ? 'font-bold text-[#171817]' : 'text-[#686A66]'}>
                      03 Evaluating Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#DDDCD6]">
                    {analysisStep >= 4 ? (
                      <Check className="w-4 h-4 text-[#28745D] shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#DDDCD6] shrink-0" />
                    )}
                    <span className={analysisStep >= 4 ? 'font-bold text-[#171817]' : 'text-[#686A66]'}>
                      04 Generating Rubric Scores
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Input Workspace Panel */}
            {!isAnalyzing && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. Job Requisition Criteria */}
                <div className="lg:col-span-6 bg-white rounded-3xl border border-[#DDDCD6] p-6 sm:p-8 shadow-2xs space-y-6">
                  <div className="pb-4 border-b border-[#DDDCD6]">
                    <h2 className="text-base font-black text-[#171817] font-heading uppercase">
                      1. Job Description & Role Criteria
                    </h2>
                    <p className="text-xs text-[#686A66] mt-0.5">
                      Define required skills, experience duration, and education prerequisites.
                    </p>
                  </div>

                  <JobDescriptionInput
                    value={jobDescription}
                    onChange={(val) => setJobDescription(val)}
                  />
                </div>

                {/* 2. Prominent Resume Upload Area */}
                <div className="lg:col-span-6 bg-white rounded-3xl border border-[#DDDCD6] p-6 sm:p-8 shadow-2xs space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="pb-4 border-b border-[#DDDCD6] flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-black text-[#171817] font-heading uppercase">
                          2. Upload Candidate Resumes
                        </h2>
                        <p className="text-xs text-[#686A66] mt-0.5">
                          Select PDF or DOCX resume files to run AI extraction.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#DCEAE6] text-[#174C4A] font-mono text-xs font-bold">
                        PDF & DOCX
                      </span>
                    </div>

                    <ResumeUploader
                      files={uploadedFiles}
                      onFilesChange={(files: File[]) => setUploadedFiles(files)}
                      disabled={isAnalyzing}
                    />
                  </div>

                  {/* Prominent Analyze Resume Button */}
                  <div className="pt-6 border-t border-[#DDDCD6]">
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || uploadedFiles.length === 0}
                      className={`w-full py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2.5 cursor-pointer shadow-sm transition-all uppercase tracking-wider ${
                        isAnalyzing || uploadedFiles.length === 0
                          ? 'bg-[#DDDCD6] text-[#686A66] cursor-not-allowed opacity-60'
                          : 'bg-[#174C4A] hover:bg-[#123B39] text-white'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-white shrink-0" />
                      <span>
                        {uploadedFiles.length > 0
                          ? `Analyze ${uploadedFiles.length} Selected Resume(s)`
                          : 'Select Resume File to Enable Analysis'}
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Evaluated Candidates Results */}
            {liveCandidates.length > 0 && !isAnalyzing && (
              <div className="space-y-4 pt-4 border-t border-[#DDDCD6]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-[#171817] uppercase font-heading">
                    Analyzed Candidates ({liveCandidates.length})
                  </h2>
                  <span className="text-xs font-mono text-[#686A66] font-bold">
                    Ranked by 100-Point Rubric
                  </span>
                </div>

                <CandidateList
                  candidates={liveCandidates}
                  selectedCandidateId={selectedCandidateId || undefined}
                  shortlistedCandidateIds={shortlistedIds}
                  onSelectCandidate={(id) => setSelectedCandidateId(id)}
                  onToggleShortlist={(id) => handleToggleShortlist(id)}
                  jobTitle={stage5Result?.jobRequirements?.jobTitle || selectedJob.title}
                />
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: SHORTLISTED CANDIDATES */}
        {/* ========================================================================= */}
        {activeNav === 'shortlisted' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black font-heading text-[#171817] tracking-tight uppercase">
                Shortlisted Candidates ({shortlistedIds.size})
              </h1>
              <p className="text-xs text-[#686A66] mt-1">
                Candidates marked for hiring manager review and interview scheduling.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#DDDCD6] p-6 shadow-2xs">
              {shortlistedIds.size > 0 ? (
                <div className="divide-y divide-[#DDDCD6]">
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
                        className="py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono shadow-2xs ${avatarColor}`}>
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-[#171817] block">{name}</span>
                            <span className="text-xs text-[#686A66]">{email}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono font-bold text-[#174C4A]">{score}% Match</span>
                          <button
                            type="button"
                            onClick={() => handleToggleShortlist(id)}
                            className="text-xs text-[#686A66] hover:text-[#171817] underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-[#686A66]">
                  <Bookmark className="w-8 h-8 mx-auto text-[#DDDCD6] mb-2" />
                  <p className="font-bold text-[#171817] text-xs">No candidates shortlisted yet.</p>
                  <p className="text-[11px] mt-0.5">Click the bookmark icon on any candidate record to shortlist them.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: AUDIT & RUBRIC BREAKDOWN */}
        {/* ========================================================================= */}
        {activeNav === 'reports' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black font-heading text-[#171817] tracking-tight uppercase">
                Scoring Engine Rubric & Audit
              </h1>
              <p className="text-xs text-[#686A66] mt-1">
                Deterministic 100-point rubric breakdown.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl border border-[#DDDCD6] p-6 space-y-2">
                <span className="text-xs font-mono font-bold text-[#174C4A] uppercase">Required Skills</span>
                <span className="text-2xl font-black text-[#171817] font-mono block">30 Points</span>
                <p className="text-xs text-[#686A66] leading-relaxed">
                  Proportional credit for mandatory job skills extracted from candidate experience and project evidence.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-[#DDDCD6] p-6 space-y-2">
                <span className="text-xs font-mono font-bold text-[#174C4A] uppercase">Experience Tenure</span>
                <span className="text-2xl font-black text-[#171817] font-mono block">25 Points</span>
                <p className="text-xs text-[#686A66] leading-relaxed">
                  Full 25 pts awarded if candidate meets or exceeds min required years; pro-rated curve for partial tenure.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-[#DDDCD6] p-6 space-y-2">
                <span className="text-xs font-mono font-bold text-[#174C4A] uppercase">Education & Projects</span>
                <span className="text-2xl font-black text-[#171817] font-mono block">25 Points</span>
                <p className="text-xs text-[#686A66] leading-relaxed">
                  15 pts for degree level / STEM alignment + 10 pts for project relevance and production achievements.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#DDDCD6] p-6 space-y-3">
              <h3 className="font-bold text-sm text-[#171817]">4-Tier Claim Verification Taxonomy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#DCEAE6] border border-[#28745D]/30">
                  <span className="font-bold text-[#28745D] block">SUPPORTED</span>
                  <span className="text-[#28745D] text-[11px]">Verbatim evidence present in resume</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FBF4EC] border border-[#B77928]/30">
                  <span className="font-bold text-[#B77928] block">NOT ENOUGH EVIDENCE</span>
                  <span className="text-[#B77928] text-[11px]">Skill listed without project context</span>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                  <span className="font-bold text-red-800 block">UNSUPPORTED</span>
                  <span className="text-red-700 text-[11px]">Unsubstantiated metric claim</span>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
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
