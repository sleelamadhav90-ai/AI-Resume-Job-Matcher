/**
 * Gemini AI Structured Information Extraction Module
 * Extracts structured facts from resumes and job descriptions using @google/genai SDK.
 * Server-side only. Does NOT score candidates.
 *
 * Enhanced in Stage 6 for claim verification status classification (SUPPORTED, UNSUPPORTED,
 * CONTRADICTORY, NOT_ENOUGH_EVIDENCE) and robust handling of messy/incomplete resumes.
 */

import { GoogleGenAI, Type } from '@google/genai';
import { CandidateProfile, ClaimVerificationStatus, JobRequirements, ResumeClaim } from './types';

/**
 * Returns an initialized GoogleGenAI client using process.env.GEMINI_API_KEY.
 * Throws a clean error if the API key is unconfigured.
 */
export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured. Please set the GEMINI_API_KEY environment variable.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export function getModelName(): string {
  return process.env.GEMINI_MODEL || 'gemini-3.8-flash';
}

// JSON Schema for Resume CandidateProfile
const candidateSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, nullable: true },
    email: { type: Type.STRING, nullable: true },
    phone: { type: Type.STRING, nullable: true },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING, nullable: true },
          field: { type: Type.STRING, nullable: true },
          institution: { type: Type.STRING, nullable: true },
          graduationYear: { type: Type.INTEGER, nullable: true },
        },
      },
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING, nullable: true },
          role: { type: Type.STRING, nullable: true },
          startDate: { type: Type.STRING, nullable: true },
          endDate: { type: Type.STRING, nullable: true },
          description: { type: Type.STRING },
          technologies: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          technologies: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      },
    },
    certifications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    totalExperienceYears: { type: Type.NUMBER, nullable: true },
    summary: { type: Type.STRING },
    claimsToVerify: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          claim: { type: Type.STRING },
          evidence: { type: Type.STRING, nullable: true },
          status: {
            type: Type.STRING,
            description: 'One of SUPPORTED, UNSUPPORTED, CONTRADICTORY, or NOT_ENOUGH_EVIDENCE',
          },
          verificationNeeded: { type: Type.BOOLEAN },
          explanation: { type: Type.STRING, nullable: true },
        },
        required: ['claim'],
      },
    },
  },
  required: ['skills', 'education', 'experience', 'projects', 'certifications', 'summary'],
};

// JSON Schema for JobRequirements
const jobRequirementsSchema = {
  type: Type.OBJECT,
  properties: {
    jobTitle: { type: Type.STRING, nullable: true },
    requiredSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    preferredSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    requiredExperienceYears: { type: Type.NUMBER, nullable: true },
    educationRequirements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    responsibilities: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    importantKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    domainRequirements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    summary: { type: Type.STRING },
  },
  required: [
    'requiredSkills',
    'preferredSkills',
    'educationRequirements',
    'responsibilities',
    'importantKeywords',
    'domainRequirements',
    'summary',
  ],
};

/**
 * Normalizes claim verification status into one of 4 strict categories with recruiter-safe language.
 */
export function classifyClaimStatus(
  rawStatus: any,
  evidence: string | null,
  verificationNeeded: boolean
): { status: ClaimVerificationStatus; explanation: string } {
  const normStatus = String(rawStatus || '').toUpperCase().trim();

  if (normStatus === 'SUPPORTED') {
    return {
      status: 'SUPPORTED',
      explanation: 'Verified with supporting details directly in the candidate resume.',
    };
  }
  if (normStatus === 'CONTRADICTORY') {
    return {
      status: 'CONTRADICTORY',
      explanation: 'Needs verification — resume timeline or scope appears inconsistent with the claim.',
    };
  }
  if (normStatus === 'UNSUPPORTED') {
    return {
      status: 'UNSUPPORTED',
      explanation: 'Needs verification — insufficient supporting evidence in the resume.',
    };
  }
  if (normStatus === 'NOT_ENOUGH_EVIDENCE') {
    return {
      status: 'NOT_ENOUGH_EVIDENCE',
      explanation: 'Needs verification — insufficient information to confirm in resume.',
    };
  }

  // Deterministic classification if model returned non-standard status
  if (!evidence || evidence.trim().length === 0 || evidence.toLowerCase().includes('no evidence')) {
    return {
      status: 'UNSUPPORTED',
      explanation: 'Needs verification — insufficient supporting evidence in the resume.',
    };
  }

  if (evidence.toLowerCase().includes('contradict') || evidence.toLowerCase().includes('inconsistent')) {
    return {
      status: 'CONTRADICTORY',
      explanation: 'Needs verification — resume timeline or scope appears inconsistent with the claim.',
    };
  }

  if (verificationNeeded) {
    return {
      status: 'NOT_ENOUGH_EVIDENCE',
      explanation: 'Needs verification — claim stated without detailed technical context.',
    };
  }

  return {
    status: 'SUPPORTED',
    explanation: 'Verified with supporting details directly in the candidate resume.',
  };
}

/**
 * Validates and sanitizes raw JSON parsed from Gemini into a reliable CandidateProfile.
 * Resilient against missing keys, unusual types, and incomplete resumes.
 */
export function validateCandidateProfile(parsed: any, id: string, fileName: string): CandidateProfile {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Candidate extraction did not return a valid structured object.');
  }

  const name = typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name.trim() : null;
  const email = typeof parsed.email === 'string' && parsed.email.trim() ? parsed.email.trim() : null;
  const phone = typeof parsed.phone === 'string' && parsed.phone.trim() ? parsed.phone.trim() : null;

  // Skills
  const skills = Array.isArray(parsed.skills)
    ? parsed.skills.filter((s: any) => typeof s === 'string' && s.trim()).map((s: string) => s.trim())
    : [];

  // Education
  const education = Array.isArray(parsed.education)
    ? parsed.education.map((edu: any) => ({
        degree: typeof edu?.degree === 'string' && edu.degree.trim() ? edu.degree.trim() : null,
        field: typeof edu?.field === 'string' && edu.field.trim() ? edu.field.trim() : null,
        institution: typeof edu?.institution === 'string' && edu.institution.trim() ? edu.institution.trim() : null,
        graduationYear: typeof edu?.graduationYear === 'number' && Number.isFinite(edu.graduationYear) ? edu.graduationYear : null,
      }))
    : [];

  // Experience
  const experience = Array.isArray(parsed.experience)
    ? parsed.experience.map((exp: any) => ({
        company: typeof exp?.company === 'string' && exp.company.trim() ? exp.company.trim() : null,
        role: typeof exp?.role === 'string' && exp.role.trim() ? exp.role.trim() : null,
        startDate: typeof exp?.startDate === 'string' && exp.startDate.trim() ? exp.startDate.trim() : null,
        endDate: typeof exp?.endDate === 'string' && exp.endDate.trim() ? exp.endDate.trim() : null,
        description: typeof exp?.description === 'string' ? exp.description.trim() : '',
        technologies: Array.isArray(exp?.technologies)
          ? exp.technologies.filter((t: any) => typeof t === 'string' && t.trim()).map((t: string) => t.trim())
          : [],
      }))
    : [];

  // Projects
  const projects = Array.isArray(parsed.projects)
    ? parsed.projects.map((proj: any) => ({
        name: typeof proj?.name === 'string' && proj.name.trim() ? proj.name.trim() : 'Project',
        description: typeof proj?.description === 'string' ? proj.description.trim() : '',
        technologies: Array.isArray(proj?.technologies)
          ? proj.technologies.filter((t: any) => typeof t === 'string' && t.trim()).map((t: string) => t.trim())
          : [],
      }))
    : [];

  // Certifications
  const certifications = Array.isArray(parsed.certifications)
    ? parsed.certifications.filter((c: any) => typeof c === 'string' && c.trim()).map((c: string) => c.trim())
    : [];

  // Experience Years
  const totalExperienceYears =
    typeof parsed.totalExperienceYears === 'number' && Number.isFinite(parsed.totalExperienceYears) && !isNaN(parsed.totalExperienceYears)
      ? parsed.totalExperienceYears
      : null;

  // Summary
  const summary = typeof parsed.summary === 'string' ? parsed.summary.trim() : '';

  // Claims to Verify with 4-status classification
  const claimsToVerify: ResumeClaim[] = Array.isArray(parsed.claimsToVerify)
    ? parsed.claimsToVerify
        .map((item: any) => {
          const claim = typeof item?.claim === 'string' ? item.claim.trim() : '';
          const evidence = typeof item?.evidence === 'string' && item.evidence.trim() ? item.evidence.trim() : null;
          const verificationNeeded = Boolean(item?.verificationNeeded ?? true);
          const classified = classifyClaimStatus(item?.status, evidence, verificationNeeded);

          return {
            claim,
            evidence,
            verificationNeeded,
            status: classified.status,
            explanation: typeof item?.explanation === 'string' && item.explanation.trim()
              ? item.explanation.trim()
              : classified.explanation,
          };
        })
        .filter((item: ResumeClaim) => item.claim.length > 0)
    : [];

  return {
    id,
    fileName,
    name,
    email,
    phone,
    skills,
    education,
    experience,
    projects,
    certifications,
    totalExperienceYears,
    summary,
    claimsToVerify,
  };
}

/**
 * Validates and sanitizes raw JSON parsed from Gemini into a reliable JobRequirements object.
 */
export function validateJobRequirements(parsed: any): JobRequirements {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Job description extraction did not return a valid structured object.');
  }

  const jobTitle = typeof parsed.jobTitle === 'string' && parsed.jobTitle.trim() ? parsed.jobTitle.trim() : null;

  const requiredSkills = Array.isArray(parsed.requiredSkills)
    ? parsed.requiredSkills.filter((s: any) => typeof s === 'string' && s.trim()).map((s: string) => s.trim())
    : [];

  const preferredSkills = Array.isArray(parsed.preferredSkills)
    ? parsed.preferredSkills.filter((s: any) => typeof s === 'string' && s.trim()).map((s: string) => s.trim())
    : [];

  const requiredExperienceYears =
    typeof parsed.requiredExperienceYears === 'number' && Number.isFinite(parsed.requiredExperienceYears) && !isNaN(parsed.requiredExperienceYears)
      ? parsed.requiredExperienceYears
      : null;

  const educationRequirements = Array.isArray(parsed.educationRequirements)
    ? parsed.educationRequirements.filter((e: any) => typeof e === 'string' && e.trim()).map((e: string) => e.trim())
    : [];

  const responsibilities = Array.isArray(parsed.responsibilities)
    ? parsed.responsibilities.filter((r: any) => typeof r === 'string' && r.trim()).map((r: string) => r.trim())
    : [];

  const importantKeywords = Array.isArray(parsed.importantKeywords)
    ? parsed.importantKeywords.filter((k: any) => typeof k === 'string' && k.trim()).map((k: string) => k.trim())
    : [];

  const domainRequirements = Array.isArray(parsed.domainRequirements)
    ? parsed.domainRequirements.filter((d: any) => typeof d === 'string' && d.trim()).map((d: string) => d.trim())
    : [];

  const summary = typeof parsed.summary === 'string' ? parsed.summary.trim() : '';

  return {
    jobTitle,
    requiredSkills,
    preferredSkills,
    requiredExperienceYears,
    educationRequirements,
    responsibilities,
    importantKeywords,
    domainRequirements,
    summary,
  };
}

/**
 * Helper to call generateContent with retry and fallback model handling for transient 503 spikes.
 */
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction: string,
  schema: any
): Promise<string> {
  const primaryModel = getModelName();
  const modelsToTry = [primaryModel];
  if (primaryModel !== 'gemini-3.8-flash') {
    modelsToTry.push('gemini-3.8-flash');
  }

  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: schema,
          },
        });

        const text = response.text;
        if (text && text.trim()) {
          return text;
        }
      } catch (err: any) {
        lastError = err;
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }

  // Translate errors into recruiter-friendly message
  const rawMsg = lastError?.message || '';
  if (rawMsg.includes('API_KEY') || rawMsg.includes('401') || rawMsg.includes('UNAUTHENTICATED')) {
    throw new Error('GEMINI_API_KEY is not configured or invalid.');
  }
  if (rawMsg.includes('503') || rawMsg.includes('UNAVAILABLE') || rawMsg.includes('overloaded')) {
    throw new Error('The AI extraction service is experiencing high load. Please try again in a moment.');
  }

  throw new Error(`AI extraction could not complete: ${rawMsg || 'Unable to parse document structured response'}`);
}

/**
 * Extracts structured facts from cleaned resume text.
 * Strictly adheres to facts in the text without hallucinations.
 */
export async function extractCandidateFromResume(
  resumeText: string,
  fileName: string,
  candidateId: string = `candidate-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
): Promise<CandidateProfile> {
  if (!resumeText || !resumeText.trim()) {
    throw new Error(`Resume "${fileName}" contains no extractable text or is empty.`);
  }

  const ai = getGeminiClient();

  const systemInstruction = `You are a strict, factual information extraction system for resumes in a recruiter software platform.
Extract ONLY facts explicitly supported by the provided resume text.
Do not infer, assume, extrapolate, or invent information.
If a field is missing, unclear, or not explicitly stated in the resume, return null or an empty array.
Preserve technical skill names as they appear, normalizing obvious capitalization/formatting variations (e.g. "React.js" -> "React", "Typescript" -> "TypeScript").
Extract skills from all sections including skills lists, experience bullets, and project descriptions.
Separate professional work experience from academic/personal projects.

Identify key claims made in the resume (e.g. "Expert in X", "Led team of 10", "Increased performance by 40%"), extract any supporting evidence found in the resume, and categorize status as:
- "SUPPORTED" if reasonable evidence exists in resume
- "UNSUPPORTED" if claim is stated without supporting evidence
- "CONTRADICTORY" if resume evidence is inconsistent with claim
- "NOT_ENOUGH_EVIDENCE" if there is insufficient information to determine

Do NOT score or rank the candidate.`;

  const prompt = `Resume Document: "${fileName}"
Resume Content:
${resumeText}

Extract all explicitly mentioned facts into the specified structured JSON schema.`;

  const responseText = await callGeminiWithFallback(ai, prompt, systemInstruction, candidateSchema);
  let parsed: any;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error(`Failed to parse AI extraction output for "${fileName}".`);
  }
  return validateCandidateProfile(parsed, candidateId, fileName);
}

/**
 * Extracts structured job requirements from job description text.
 * Strictly separates REQUIRED skills from PREFERRED qualifications.
 */
export async function extractJobRequirements(
  jobDescription: string
): Promise<JobRequirements> {
  if (!jobDescription || !jobDescription.trim()) {
    throw new Error('Job description is empty. Please provide job requirements.');
  }

  const ai = getGeminiClient();

  const systemInstruction = `You are a precise job description analysis engine for a recruitment ATS.
Extract only explicit requirements stated in the job description text.
Do not invent or assume requirements not mentioned.
CRITICAL: Distinguish strictly between REQUIRED skills (must-have, minimum qualifications, requirements) and PREFERRED skills (nice-to-have, bonus, plus, preferred qualifications).
Extract minimum years of experience as a number (e.g. "3+ years" -> 3; if no explicit years required, return null).
Extract required education levels (e.g. "Bachelor's in Computer Science").
Extract core responsibilities and industry domain requirements.
Do NOT score or generate match scores.`;

  const prompt = `Job Description Text:
${jobDescription}

Extract all explicit requirements into the specified structured JSON schema.`;

  const responseText = await callGeminiWithFallback(ai, prompt, systemInstruction, jobRequirementsSchema);
  let parsed: any;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error('Failed to parse AI extraction output for job description.');
  }
  return validateJobRequirements(parsed);
}
