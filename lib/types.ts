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

export type ClaimVerificationStatus =
  | 'SUPPORTED'
  | 'UNSUPPORTED'
  | 'CONTRADICTORY'
  | 'NOT_ENOUGH_EVIDENCE';

export interface ResumeClaim {
  claim: string;
  evidence: string | null;
  verificationNeeded: boolean;
  status: ClaimVerificationStatus;
  explanation?: string;
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

export type ScoreTierLabel = 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Weak Match';

export interface StructuredMatchExplanation {
  headline: string;
  whyMatches: {
    skills: string[];
    experience: string | null;
    projects: string[];
    education: string | null;
  };
  whatIsMissing: {
    skills: string[];
    experience: string | null;
    education: string | null;
    other: string[];
  };
  recruiterAttention: {
    unverifiedClaimsCount: number;
    flaggedItems: string[];
  };
}

export interface MatchAnalysis {
  candidateId: string;
  totalScore: number;
  label: ScoreTierLabel;

  skillScore: number;           // 0 - 40 total
  requiredSkillScore: number;   // 0 - 30
  preferredSkillScore: number;  // 0 - 10

  experienceScore: number;      // 0 - 25
  educationScore: number;       // 0 - 15
  projectScore: number;         // 0 - 10
  requirementsScore: number;    // 0 - 10

  matchedRequiredSkills: string[];
  missingRequiredSkills: string[];

  matchedPreferredSkills: string[];
  missingPreferredSkills: string[];

  partialSkills: string[];

  experienceMatch: {
    candidateYears: number | null;
    requiredYears: number | null;
    status: 'meets' | 'partial' | 'unknown';
  };

  educationMatch: {
    status: 'matches' | 'partial' | 'missing' | 'not_required';
    evidence: string[];
  };

  relevantProjects: string[];

  matchedRequirements: string[];
  missingRequirements: string[];

  explanation: string;
  structuredExplanation?: StructuredMatchExplanation;
}

export interface RankedCandidate {
  id: string;
  rank: number;
  fileName: string;
  status: 'processed';
  profile: CandidateProfile;
  match: MatchAnalysis;
}

export interface FailedCandidateItem {
  id: string;
  fileName: string;
  status: 'failed';
  reason?: string;
  message?: string;
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

export interface AnalyzeStage5Response {
  success: boolean;
  message: string;
  jobRequirements?: JobRequirements;
  candidates: RankedCandidate[];
  failedCandidates: FailedCandidateItem[];
  unprocessedResumes: ExtractedResumeItem[];
  error?: string;
}

// Backward compatibility alias
export type AnalyzeResponse = AnalyzeStage5Response;
