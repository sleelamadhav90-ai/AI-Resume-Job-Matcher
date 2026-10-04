/**
 * Fallback AI Extraction Engine
 * Provides deterministic, rule-based extraction for resumes and job descriptions
 * when Gemini is unavailable (e.g., quota exceeded).
 */

import { CandidateProfile, JobRequirements } from './types';

export function extractCandidateWithFallback(
  resumeText: string,
  fileName: string,
  candidateId: string
): CandidateProfile {
  // Simple regex-based extraction
  const nameMatch = resumeText.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/);
  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = resumeText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  
  // Basic skill detection
  const commonSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'SQL', 'Docker', 'AWS', 'Java', 'Git',
    'Spring Boot', 'PostgreSQL', 'REST APIs', 'Kubernetes', 'Kafka', 'CI/CD', 'Azure', 'GCP', 'Angular', 'Vue',
    'Django', 'Flask', 'Next.js', 'Terraform', 'Machine Learning', 'AI', 'NLP', 'Data Science'
  ];
  const skills = commonSkills.filter(skill => 
    new RegExp(`\\b${skill}\\b`, 'i').test(resumeText)
  );

  return {
    id: candidateId,
    fileName,
    name: nameMatch ? nameMatch[0] : null,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    skills,
    education: [], // Placeholder for simple fallback
    experience: [],
    projects: [],
    certifications: [],
    totalExperienceYears: null,
    summary: resumeText.substring(0, 200) + '...',
    claimsToVerify: [],
    isQualityResume: true,
    qualityReason: null
  };
}

export function extractJobRequirementsWithFallback(jobDescription: string): JobRequirements {
  const commonSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'SQL', 'Docker', 'AWS', 'Java', 'Git'];
  const requiredSkills = commonSkills.filter(skill => 
    new RegExp(`\\b${skill}\\b`, 'i').test(jobDescription)
  );

  return {
    jobTitle: 'Position',
    requiredSkills,
    preferredSkills: [],
    requiredExperienceYears: null,
    educationRequirements: [],
    responsibilities: [],
    importantKeywords: [],
    domainRequirements: [],
    summary: jobDescription.substring(0, 200) + '...'
  };
}
