import React, { useState } from 'react';
import {
  Home,
  Users,
  Briefcase,
  BarChart2,
  BookmarkCheck,
  Calendar,
  PieChart,
  Settings,
  Search,
  Plus,
  Bell,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Download,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  MapPin,
  Clock,
  MoreHorizontal,
  Bookmark,
  FileText,
  UserCheck,
  Loader2,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  RotateCcw
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
  | 'job_detail'
  | 'matching'
  | 'shortlisted'
  | 'interviews'
  | 'reports'
  | 'settings';

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
    title: 'Software Engineer',
    department: 'Engineering',
    location: 'Hyderabad, India',
    type: 'Full Time',
    candidatesCount: 42,
    topMatch: 94,
    status: 'Active',
    updated: 'Today',
    requiredSkills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL', 'REST APIs'],
    preferredSkills: ['Kubernetes', 'Docker', 'Kafka', 'CI/CD'],
    experience: '3+ years',
    education: "Bachelor's in Computer Science or related STEM field",
    jdText: `Role: Software Engineer
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
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full Time',
    candidatesCount: 31,
    topMatch: 89,
    status: 'Active',
    updated: 'Yesterday',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3'],
    preferredSkills: ['Next.js', 'Tailwind CSS', 'Vite', 'Jest'],
    experience: '3+ years',
    education: "Bachelor's degree in Computer Science or Software Engineering",
    jdText: `Role: Frontend Developer
Requirements:
- 3+ years hands-on experience with React, TypeScript, and modern JavaScript (ES6+).
- Strong command of HTML5, CSS3, responsive UI design, and state management.
- Degree in Computer Science, Software Engineering, or related discipline.
Preferred:
- Next.js, Tailwind CSS, Webpack/Vite, and unit testing.`,
  },
  {
    id: 'job-3',
    title: 'Data Analyst',
    department: 'Analytics',
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
    jdText: `Role: Data Analyst
Requirements:
- 2+ years of professional experience in data analysis, SQL querying, and Python.
- Proven dashboard design in Tableau or PowerBI.
- Bachelor's degree in quantitative field.
Preferred:
- Snowflake, dbt, ETL workflows, and statistical modeling.`,
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    department: 'Platform',
    location: 'Pune, India',
    type: 'Full Time',
    candidatesCount: 18,
    topMatch: 82,
    status: 'Active',
    updated: '4 days ago',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    preferredSkills: ['Prometheus', 'Grafana', 'Go', 'Linux Kernel'],
    experience: '4+ years',
    education: 'Bachelor of Engineering in CS/IT',
    jdText: `Role: DevOps Engineer
Requirements:
- 4+ years managing AWS cloud infrastructure, Kubernetes clusters, and Terraform.
- Automated CI/CD pipeline development.
Preferred:
- Prometheus monitoring and Go scripting.`,
  },
];

const INITIAL_CANDIDATES: GeneralCandidate[] = [
  {
    id: 'cand-1',
    name: 'Arjun Sharma',
    role: 'Software Engineer',
    experience: '3.2 yrs',
    skills: ['Java', 'Spring Boot', 'AWS', 'PostgreSQL'],
    matchScore: 94,
    stage: 'Shortlisted',
    appliedFor: 'Software Engineer',
    email: 'arjun.sharma@example.com',
  },
  {
    id: 'cand-2',
    name: 'Rahul Kumar',
    role: 'Backend Developer',
    experience: '2.8 yrs',
    skills: ['Java', 'SQL', 'Docker', 'AWS'],
    matchScore: 87,
    stage: 'Matched',
    appliedFor: 'Software Engineer',
    email: 'rahul.kumar@example.com',
  },
  {
    id: 'cand-3',
    name: 'Priya Reddy',
    role: 'Software Engineer',
    experience: '2.4 yrs',
    skills: ['React', 'Node.js', 'AWS', 'JavaScript'],
    matchScore: 81,
    stage: 'Screening',
    appliedFor: 'Frontend Developer',
    email: 'priya.reddy@example.com',
  },
  {
    id: 'cand-4',
    name: 'Vikram Patel',
    role: 'Full Stack Engineer',
    experience: '4.5 yrs',
    skills: ['Java', 'React', 'Spring Boot', 'PostgreSQL'],
    matchScore: 92,
    stage: 'Interview',
    appliedFor: 'Software Engineer',
    email: 'vikram.patel@example.com',
  },
  {
    id: 'cand-5',
    name: 'Neha Gupta',
    role: 'Frontend Engineer',
    experience: '3.0 yrs',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    matchScore: 89,
    stage: 'Shortlisted',
    appliedFor: 'Frontend Developer',
    email: 'neha.gupta@example.com',
  },
  {
    id: 'cand-6',
    name: 'Ananya Sen',
    role: 'Data Analyst',
    experience: '2.5 yrs',
    skills: ['SQL', 'Python', 'Tableau', 'PowerBI'],
    matchScore: 86,
    stage: 'Matched',
    appliedFor: 'Data Analyst',
    email: 'ananya.sen@example.com',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedJob, setSelectedJob] = useState<JobOpening>(SAMPLE_JOBS[0]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [jobFilterTab, setJobFilterTab] = useState<'All' | 'Active' | 'Draft' | 'Closed'>('All');

  // Real AI Matching Engine State
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JOBS[0].jdText);
  const [resumes, setResumes] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [stage5Result, setStage5Result] = useState<AnalyzeStage5Response | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Shortlist State
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set(['cand-1', 'cand-5']));

  const handleToggleShortlist = (candidateId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShortlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(candidateId)) next.delete(candidateId);
      else next.add(candidateId);
      return next;
    });
  };

  // Run Real Deterministic Candidate Matching Pipeline
  const handleAnalyzeClick = async () => {
    if (!jobDescription.trim()) {
      setError('No job description provided. Please enter or select a job requisition.');
      return;
    }

    if (resumes.length === 0) {
      setError('Please upload at least one PDF resume to evaluate.');
      return;
    }

    setError('');
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      resumes.forEach((resume) => {
        formData.append('resumes', resume);
      });

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.candidates && data.candidates.length > 0) {
          setStage5Result(data as AnalyzeStage5Response);
        }
        throw new Error(data.error || 'Matching process encountered an issue. Please check the uploaded files.');
      }

      setStage5Result(data as AnalyzeStage5Response);
      setActiveTab('matching');
    } catch (err: any) {
      console.error('HireMe AI Matching Error:', err);
      setError(err.message || 'Failed to analyze candidate resumes. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOpenJobDetail = (job: JobOpening) => {
    setSelectedJob(job);
    setJobDescription(job.jdText);
    setActiveTab('job_detail');
  };

  const handleStartMatchingForJob = (job: JobOpening) => {
    setSelectedJob(job);
    setJobDescription(job.jdText);
    setActiveTab('matching');
  };

  const selectedMatchedCandidate = stage5Result?.candidates.find(
    (c) => c.profile.id === selectedCandidateId
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#202124] flex flex-col md:flex-row antialiased">
      {/* LEFT SIDEBAR (Zoho Recruit Style - Compact, Light, Professional) */}
      <aside className="w-full md:w-56 bg-white border-r border-[#E5E7EB] flex flex-col shrink-0 z-30">
        {/* Brand Header */}
        <div className="h-14 px-4 flex items-center border-b border-[#E5E7EB]">
          <Logo size="sm" showTagline />
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-0.5 flex-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('candidates')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'candidates'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Candidates</span>
            </div>
            <span className="text-[11px] text-[#6B7280]">128</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'jobs' || activeTab === 'job_detail'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4" />
              <span>Job Openings</span>
            </div>
            <span className="text-[11px] text-[#6B7280]">{SAMPLE_JOBS.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matching')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart2 className="w-4 h-4" />
              <span>Matching</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E83E8C] text-white font-bold">
              AI
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shortlisted')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'shortlisted'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookmarkCheck className="w-4 h-4" />
              <span>Shortlisted</span>
            </div>
            {shortlistedIds.size > 0 && (
              <span className="text-[11px] text-[#E83E8C] font-bold">
                {shortlistedIds.size}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interviews')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'interviews'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Interviews</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Reports</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded font-medium transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#FDF2F7] text-[#E83E8C] font-bold'
                : 'text-[#4B5563] hover:text-[#202124] hover:bg-[#F3F4F6]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Recruiter Profile Widget at bottom */}
        <div className="p-3 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#202124] text-white flex items-center justify-center font-bold text-xs">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#202124] truncate">Arjun Sharma</p>
            <p className="text-[10px] text-[#6B7280] truncate">Senior Recruiter</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* COMPACT TOP HEADER */}
        <header className="h-14 bg-white border-b border-[#E5E7EB] px-5 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search candidates, jobs, skills..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded text-xs text-[#202124] focus:outline-none focus:border-[#E83E8C] placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('matching');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#E83E8C] hover:bg-[#D62F7B] text-white text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Match</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="p-1.5 text-[#6B7280] hover:text-[#202124] hover:bg-[#F3F4F6] rounded cursor-pointer relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E83E8C] absolute top-1.5 right-1.5" />
            </button>

            <div className="h-4 w-px bg-[#E5E7EB]" />

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#202124] hidden sm:inline">Acme Corp HQ</span>
            </div>
          </div>
        </header>

        {/* MAIN BODY PER TAB */}
        <main className="p-5 flex-1 overflow-y-auto space-y-5">
          {/* TAB 1: HOME / DASHBOARD (Zoho Recruit Style Recruitment Operations) */}
          {activeTab === 'home' && (
            <div className="space-y-5">
              {/* Header */}
              <div>
                <h1 className="text-base font-bold text-[#202124]">Home</h1>
                <p className="text-xs text-[#6B7280]">Overview of your recruitment activity</p>
              </div>

              {/* Four Compact Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded border border-[#E5E7EB] shadow-2xs">
                  <span className="text-[11px] font-semibold text-[#6B7280] block">Open Jobs</span>
                  <div className="text-xl font-bold text-[#202124] mt-0.5">14</div>
                  <span className="text-[10px] text-[#10B981] font-medium block mt-0.5">4 priority roles</span>
                </div>

                <div className="bg-white p-3.5 rounded border border-[#E5E7EB] shadow-2xs">
                  <span className="text-[11px] font-semibold text-[#6B7280] block">Candidates</span>
                  <div className="text-xl font-bold text-[#202124] mt-0.5">128</div>
                  <span className="text-[10px] text-[#6B7280] block mt-0.5">Active in pipeline</span>
                </div>

                <div className="bg-white p-3.5 rounded border border-[#E5E7EB] shadow-2xs">
                  <span className="text-[11px] font-semibold text-[#6B7280] block">Resumes Analyzed</span>
                  <div className="text-xl font-bold text-[#202124] mt-0.5">842</div>
                  <span className="text-[10px] text-[#10B981] font-medium block mt-0.5">100% deterministic</span>
                </div>

                <div className="bg-white p-3.5 rounded border border-[#E5E7EB] shadow-2xs">
                  <span className="text-[11px] font-semibold text-[#6B7280] block">Average Match</span>
                  <div className="text-xl font-bold text-[#202124] mt-0.5">78%</div>
                  <span className="text-[10px] text-[#E83E8C] font-semibold block mt-0.5">High fit cohort</span>
                </div>
              </div>

              {/* RECRUITMENT PIPELINE */}
              <div className="bg-white rounded border border-[#E5E7EB] p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-[#202124] uppercase tracking-wider">
                    Recruitment Pipeline
                  </h2>
                  <span className="text-[11px] text-[#6B7280]">128 Total In-Process</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  <div className="bg-[#F9FAFB] p-2.5 rounded border border-[#E5E7EB] text-center">
                    <span className="text-[11px] text-[#6B7280] block">New</span>
                    <span className="text-base font-bold text-[#202124] block mt-0.5">42</span>
                  </div>

                  <div className="bg-[#F9FAFB] p-2.5 rounded border border-[#E5E7EB] text-center">
                    <span className="text-[11px] text-[#6B7280] block">Screening</span>
                    <span className="text-base font-bold text-[#202124] block mt-0.5">28</span>
                  </div>

                  <div className="bg-[#FDF2F7] p-2.5 rounded border border-[#E83E8C]/30 text-center">
                    <span className="text-[11px] font-semibold text-[#E83E8C] block">Matched</span>
                    <span className="text-base font-bold text-[#E83E8C] block mt-0.5">31</span>
                  </div>

                  <div className="bg-[#F9FAFB] p-2.5 rounded border border-[#E5E7EB] text-center">
                    <span className="text-[11px] text-[#6B7280] block">Interview</span>
                    <span className="text-base font-bold text-[#202124] block mt-0.5">15</span>
                  </div>

                  <div className="bg-[#F9FAFB] p-2.5 rounded border border-[#E5E7EB] text-center">
                    <span className="text-[11px] text-[#6B7280] block">Shortlisted</span>
                    <span className="text-base font-bold text-[#202124] block mt-0.5">8</span>
                  </div>

                  <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200 text-center">
                    <span className="text-[11px] text-emerald-800 font-semibold block">Hired</span>
                    <span className="text-base font-bold text-emerald-800 block mt-0.5">4</span>
                  </div>
                </div>
              </div>

              {/* ACTIVE JOB OPENINGS TABLE */}
              <div className="bg-white rounded border border-[#E5E7EB] shadow-2xs overflow-hidden">
                <div className="p-3.5 border-b border-[#E5E7EB] flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#202124] uppercase tracking-wider">
                    Active Job Openings
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('jobs')}
                    className="text-xs font-semibold text-[#E83E8C] hover:underline"
                  >
                    View all jobs →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left recruit-table">
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
                        <tr key={job.id} className="hover:bg-[#F9FAFB]">
                          <td className="font-bold text-[#202124]">
                            <button
                              type="button"
                              onClick={() => handleOpenJobDetail(job)}
                              className="hover:text-[#E83E8C] hover:underline cursor-pointer text-left"
                            >
                              {job.title}
                            </button>
                          </td>
                          <td className="text-[#6B7280]">{job.department}</td>
                          <td className="text-[#6B7280]">{job.location}</td>
                          <td className="font-semibold text-[#202124]">{job.candidatesCount}</td>
                          <td>
                            <span className="font-bold text-[#10B981]">{job.topMatch}%</span>
                          </td>
                          <td>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {job.status}
                            </span>
                          </td>
                          <td className="text-[#6B7280] text-[11px]">{job.updated}</td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => handleStartMatchingForJob(job)}
                              className="px-2.5 py-1 rounded bg-[#FDF2F7] hover:bg-[#E83E8C] text-[#E83E8C] hover:text-white font-semibold text-xs border border-[#E83E8C]/30 transition-colors cursor-pointer"
                            >
                              Match Candidates
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

          {/* TAB 2: CANDIDATES PAGE */}
          {activeTab === 'candidates' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-base font-bold text-[#202124]">Candidates</h1>
                  <p className="text-xs text-[#6B7280]">Candidate database and stage tracking</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('matching')}
                    className="px-3 py-1.5 rounded bg-[#202124] text-white text-xs font-semibold hover:bg-black cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Import Resumes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('matching')}
                    className="px-3 py-1.5 rounded bg-[#E83E8C] text-white text-xs font-semibold hover:bg-[#D62F7B] cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Candidate</span>
                  </button>
                </div>
              </div>

              {/* Candidate Table */}
              <div className="bg-white rounded border border-[#E5E7EB] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left recruit-table">
                    <thead>
                      <tr>
                        <th className="w-8 text-center">
                          <input type="checkbox" className="accent-[#E83E8C] rounded" />
                        </th>
                        <th>Candidate</th>
                        <th>Current Role</th>
                        <th>Experience</th>
                        <th>Skills</th>
                        <th>Match</th>
                        <th>Stage</th>
                        <th>Applied For</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INITIAL_CANDIDATES.map((c) => (
                        <tr key={c.id}>
                          <td className="text-center">
                            <input type="checkbox" className="accent-[#E83E8C] rounded" />
                          </td>
                          <td>
                            <div className="font-bold text-[#202124]">{c.name}</div>
                            <span className="text-[11px] text-[#6B7280]">{c.email}</span>
                          </td>
                          <td className="text-[#202124]">{c.role}</td>
                          <td className="font-semibold text-[#202124]">{c.experience}</td>
                          <td className="text-xs text-[#4B5563]">
                            {c.skills.join(' · ')}
                          </td>
                          <td>
                            <span className="font-extrabold text-[#10B981]">{c.matchScore}%</span>
                          </td>
                          <td>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">
                              {c.stage}
                            </span>
                          </td>
                          <td className="text-[#202124] font-medium">{c.appliedFor}</td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setJobDescription(SAMPLE_JOBS[0].jdText);
                                setActiveTab('matching');
                              }}
                              className="px-2 py-1 rounded border border-[#D1D5DB] text-xs font-medium text-[#202124] hover:bg-[#F3F4F6] cursor-pointer"
                            >
                              Evaluate
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

          {/* TAB 3: JOB OPENINGS PAGE */}
          {activeTab === 'jobs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-base font-bold text-[#202124]">Job Openings</h1>
                  <p className="text-xs text-[#6B7280]">Manage active requisitions and candidate matching benchmarks</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(SAMPLE_JOBS[0]);
                    setActiveTab('job_detail');
                  }}
                  className="px-3 py-1.5 rounded bg-[#E83E8C] text-white text-xs font-semibold hover:bg-[#D62F7B] cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Job</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#E5E7EB] gap-2 text-xs font-medium text-[#6B7280]">
                {(['All', 'Active', 'Draft', 'Closed'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setJobFilterTab(tab)}
                    className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
                      jobFilterTab === tab
                        ? 'border-[#E83E8C] text-[#202124] font-bold'
                        : 'border-transparent hover:text-[#202124]'
                    }`}
                  >
                    {tab} {tab === 'All' ? `(${SAMPLE_JOBS.length})` : tab === 'Active' ? '(4)' : '(0)'}
                  </button>
                ))}
              </div>

              {/* Jobs Table */}
              <div className="bg-white rounded border border-[#E5E7EB] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left recruit-table">
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Location</th>
                        <th>Employment Type</th>
                        <th>Candidates</th>
                        <th>Top Match</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_JOBS.map((job) => (
                        <tr key={job.id}>
                          <td className="font-bold text-[#202124]">
                            <button
                              type="button"
                              onClick={() => handleOpenJobDetail(job)}
                              className="hover:text-[#E83E8C] hover:underline cursor-pointer text-left"
                            >
                              {job.title}
                            </button>
                          </td>
                          <td className="text-[#6B7280]">{job.department}</td>
                          <td className="text-[#6B7280]">{job.location}</td>
                          <td className="text-[#6B7280]">{job.type}</td>
                          <td className="font-semibold text-[#202124]">{job.candidatesCount}</td>
                          <td className="font-bold text-[#10B981]">{job.topMatch}%</td>
                          <td>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {job.status}
                            </span>
                          </td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => handleStartMatchingForJob(job)}
                              className="px-2.5 py-1 rounded bg-[#FDF2F7] hover:bg-[#E83E8C] text-[#E83E8C] hover:text-white font-semibold text-xs border border-[#E83E8C]/30 transition-colors cursor-pointer"
                            >
                              Match Candidates
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

          {/* TAB 4: JOB DETAIL PAGE */}
          {activeTab === 'job_detail' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="bg-white rounded border border-[#E5E7EB] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold text-[#202124]">{selectedJob.title}</h1>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {selectedJob.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-1">
                    <span>{selectedJob.department}</span>
                    <span>·</span>
                    <span>{selectedJob.location}</span>
                    <span>·</span>
                    <span>{selectedJob.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartMatchingForJob(selectedJob)}
                    className="px-4 py-2 rounded bg-[#E83E8C] text-white text-xs font-bold hover:bg-[#D62F7B] transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Find Matching Candidates</span>
                  </button>
                </div>
              </div>

              {/* Sub-sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded border border-[#E5E7EB] p-4 space-y-4 shadow-2xs text-xs">
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#6B7280] mb-2">
                      Job Description
                    </h3>
                    <p className="text-[#202124] leading-relaxed whitespace-pre-line bg-[#F9FAFB] p-3 rounded border border-[#F3F4F6]">
                      {selectedJob.jdText}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded border border-[#E5E7EB] p-4 space-y-4 shadow-2xs text-xs">
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#6B7280] mb-2">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedJob.requiredSkills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#FDF2F7] text-[#E83E8C] border border-[#E83E8C]/20 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#6B7280] mb-2">
                      Preferred Skills
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedJob.preferredSkills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-3 space-y-2">
                    <div>
                      <span className="text-[#6B7280] block text-[11px]">Experience Requirement:</span>
                      <span className="font-semibold text-[#202124]">{selectedJob.experience}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block text-[11px]">Education:</span>
                      <span className="font-semibold text-[#202124]">{selectedJob.education}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MATCHING PAGE (The Most Important Part - Real Deterministic Pipeline) */}
          {activeTab === 'matching' && (
            <div className="space-y-4">
              {/* Header Bar */}
              <div className="bg-white rounded border border-[#E5E7EB] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-bold text-[#202124]">AI Candidate Matching</h1>
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#FDF2F7] text-[#E83E8C] border border-[#E83E8C]/20">
                      {selectedJob.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    {stage5Result ? `${stage5Result.candidates.length} candidate profiles evaluated deterministically` : 'Upload resumes and run factual scoring against job criteria'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAnalyzeClick}
                    disabled={isAnalyzing}
                    className={`px-4 py-2 rounded text-xs font-bold text-white transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5 ${
                      isAnalyzing
                        ? 'bg-[#E83E8C]/70 cursor-not-allowed'
                        : 'bg-[#E83E8C] hover:bg-[#D62F7B]'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Find Matching Candidates</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Workspace Input Controls (Collapsible / Top section) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <div className="p-3 rounded border border-red-200 bg-red-50 text-red-700 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setError('')}
                    className="text-red-700 hover:underline font-semibold cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* MATCHED CANDIDATE RESULTS TABLE */}
              {stage5Result && (
                <div className="space-y-4 pt-2">
                  <CandidateList
                    candidates={stage5Result.candidates}
                    selectedCandidateId={selectedCandidateId || undefined}
                    shortlistedCandidateIds={shortlistedIds}
                    onSelectCandidate={(id) => setSelectedCandidateId(id)}
                    onToggleShortlist={handleToggleShortlist}
                    jobTitle={selectedJob.title}
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SHORTLISTED CANDIDATES */}
          {activeTab === 'shortlisted' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-base font-bold text-[#202124]">Shortlisted Candidates</h1>
                  <p className="text-xs text-[#6B7280]">Recruiter shortlists earmarked for final interviews</p>
                </div>
                <span className="text-xs font-bold text-[#E83E8C] bg-[#FDF2F7] border border-[#E83E8C]/20 px-2.5 py-1 rounded">
                  {shortlistedIds.size} Shortlisted Records
                </span>
              </div>

              <div className="bg-white rounded border border-[#E5E7EB] shadow-2xs overflow-hidden">
                <table className="w-full text-left recruit-table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Applied Role</th>
                      <th>Match Score</th>
                      <th>Experience</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_CANDIDATES.filter((c) => shortlistedIds.has(c.id)).map((cand) => (
                      <tr key={cand.id}>
                        <td className="font-bold text-[#202124]">{cand.name}</td>
                        <td className="text-[#6B7280]">{cand.appliedFor}</td>
                        <td className="font-bold text-[#10B981]">{cand.matchScore}%</td>
                        <td className="text-[#202124]">{cand.experience}</td>
                        <td className="text-[#6B7280] text-xs">{cand.email}</td>
                        <td>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Ready for Interview
                          </span>
                        </td>
                        <td className="text-right">
                          <button
                            type="button"
                            onClick={() => setActiveTab('interviews')}
                            className="px-2.5 py-1 rounded bg-[#202124] text-white text-xs font-semibold hover:bg-black cursor-pointer"
                          >
                            Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: INTERVIEWS */}
          {activeTab === 'interviews' && (
            <div className="space-y-4">
              <h1 className="text-base font-bold text-[#202124]">Interview Schedules</h1>
              <div className="bg-white rounded border border-[#E5E7EB] p-6 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 text-xs">
                  <div>
                    <span className="font-bold text-[#202124] block">Technical Screening: Arjun Sharma</span>
                    <span className="text-[#6B7280]">Role: Software Engineer · Interviewer: Engineering Lead</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#202124] bg-gray-100 px-2 py-1 rounded">
                    Tomorrow, 2:00 PM IST
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#202124] block">System Design: Vikram Patel</span>
                    <span className="text-[#6B7280]">Role: Software Engineer · Interviewer: VP Engineering</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#202124] bg-gray-100 px-2 py-1 rounded">
                    Thursday, 11:00 AM IST
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h1 className="text-base font-bold text-[#202124]">Recruitment Intelligence Reports</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white rounded border border-[#E5E7EB] p-4 shadow-2xs space-y-2">
                  <span className="font-bold text-[#202124] block">Candidate Match Distribution</span>
                  <p className="text-[#6B7280]">842 resumes parsed with 0 hallucinations across 14 job openings.</p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#10B981]">38% Strong Match</span>
                    <span>·</span>
                    <span className="text-xs font-bold text-[#E83E8C]">44% Good Match</span>
                    <span>·</span>
                    <span className="text-xs font-bold text-[#6B7280]">18% Moderate/Weak</span>
                  </div>
                </div>

                <div className="bg-white rounded border border-[#E5E7EB] p-4 shadow-2xs space-y-2">
                  <span className="font-bold text-[#202124] block">Time-to-Shortlist Efficiency</span>
                  <p className="text-[#6B7280]">Average candidate screening reduced from 4.2 days to 30 seconds.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-base font-bold text-[#202124]">Scoring Engine Configuration</h1>
              <div className="bg-white rounded border border-[#E5E7EB] p-5 shadow-2xs space-y-3 text-xs">
                <span className="font-bold text-[#202124] block pb-2 border-b border-[#E5E7EB]">
                  Deterministic 100-Point Scoring Model
                </span>
                <div className="space-y-2 text-[#6B7280]">
                  <div className="flex justify-between">
                    <span>Required Technical Skills (Semantic Normalization)</span>
                    <span className="font-bold text-[#202124]">30 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preferred Qualifications</span>
                    <span className="font-bold text-[#202124]">10 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience Tenure Comparison</span>
                    <span className="font-bold text-[#202124]">25 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Education & STEM Degree Alignment</span>
                    <span className="font-bold text-[#202124]">15 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Evidence & Domain Keywords</span>
                    <span className="font-bold text-[#202124]">20 pts</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Candidate Match Detail Drawer Modal */}
      {selectedMatchedCandidate && (
        <MatchDetails
          candidate={selectedMatchedCandidate}
          isShortlisted={shortlistedIds.has(selectedMatchedCandidate.profile.id)}
          onToggleShortlist={(id) => handleToggleShortlist(id)}
          onClose={() => setSelectedCandidateId(null)}
        />
      )}
    </div>
  );
}
