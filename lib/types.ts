export interface CandidateExperience {
  role: string;
  company: string;
  duration?: string;
  description?: string;
  highlights?: string[];
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  year?: string;
  field?: string;
}

export interface CandidateProject {
  title: string;
  description: string;
  technologies?: string[];
}

export interface CandidateData {
  id: string;
  fileName: string;
  name: string;
  email?: string;
  phone?: string;
  skills: string[];
  education: CandidateEducation[];
  experience: CandidateExperience[];
  projects: CandidateProject[];
  certifications: string[];
  rawText?: string;
}

export interface JobRequirements {
  title?: string;
  rawText: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredExperience: string;
  educationRequirements: string;
  importantResponsibilities: string[];
}

export interface ScoreBreakdown {
  skillsScore: number;       // 40% weight
  experienceScore: number;   // 25% weight
  educationScore: number;    // 15% weight
  projectsScore: number;     // 10% weight
  otherScore: number;        // 10% weight
  totalScore: number;        // 0-100
}

export interface ClaimToVerify {
  claim: string;
  context: string;
  reason: string;
}

export interface CandidateMatchResult {
  candidate: CandidateData;
  score: ScoreBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  relevantExperience: string[];
  relevantProjects: string[];
  educationMatch: string;
  overallExplanation: string;
  claimsToVerify: ClaimToVerify[];
}

export interface AnalysisState {
  jobDescription: string;
  uploadedFiles: File[];
  isAnalyzing: boolean;
  results: CandidateMatchResult[];
  selectedCandidateId: string | null;
}
