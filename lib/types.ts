export interface CandidateExperience {
  role: string | null;
  company: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description: string;
  technologies: string[];
}

export interface CandidateEducation {
  degree: string | null;
  field: string | null;
  institution: string | null;
  graduationYear?: number | null;
}

export interface CandidateProject {
  name: string;
  description: string;
  technologies: string[];
}

export interface ResumeClaim {
  claim: string;
  evidence: string | null;
  verificationNeeded: boolean;
}

export interface CandidateProfile {
  id: string;
  fileName: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  skills: string[];
  education: CandidateEducation[];
  experience: CandidateExperience[];
  projects: CandidateProject[];
  certifications: string[];
  totalExperienceYears: number | null;
  summary: string;
  claimsToVerify: ResumeClaim[];
}

export interface CandidateExtractionItem {
  id: string;
  fileName: string;
  status: 'processed' | 'failed';
  profile?: CandidateProfile;
  reason?: string;
  message?: string;
}

export interface JobRequirements {
  jobTitle: string | null;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredExperienceYears: number | null;
  educationRequirements: string[];
  responsibilities: string[];
  importantKeywords: string[];
  domainRequirements: string[];
  summary: string;
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
  candidate: CandidateProfile;
  score: ScoreBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  relevantExperience: string[];
  relevantProjects: string[];
  educationMatch: string;
  overallExplanation: string;
  claimsToVerify: ClaimToVerify[];
}

export interface ExtractedResumeItem {
  fileName: string;
  status: 'processed' | 'failed';
  characterCount?: number;
  wordCount?: number;
  pageCount?: number;
  textPreview?: string;
  isTruncated?: boolean;
  reason?: 'NO_TEXT_FOUND' | 'CORRUPTED' | 'INVALID_FILE' | 'UNKNOWN';
  message?: string;
}

export interface AnalyzeStage4Response {
  success: boolean;
  message: string;
  jobRequirements?: JobRequirements;
  candidates: CandidateExtractionItem[];
  unprocessedResumes: ExtractedResumeItem[];
  error?: string;
}
