/**
 * Deterministic Candidate Matching and Scoring Engine
 * Weights:
 * - Skills: 40% (30% Required + 10% Preferred)
 * - Experience: 25%
 * - Education: 15%
 * - Projects: 10%
 * - Other Requirements (Keywords, Domain, Responsibilities): 10%
 * Total: 100 points
 *
 * 100% deterministic, explainable mathematical scoring without hallucinations.
 * Audited for robustness: NaN/Infinity safety, missing field resilience, deduplication,
 * and structured evidence-based explanations.
 */

import {
  CandidateProfile,
  JobRequirements,
  MatchAnalysis,
  RankedCandidate,
  ScoreTierLabel,
  StructuredMatchExplanation
} from './types';

// Common technical alias dictionary for semantic skill normalization
const SKILL_ALIASES: Record<string, string> = {
  'react.js': 'react',
  'reactjs': 'react',
  'react': 'react',
  'react native': 'reactnative',
  'react-native': 'reactnative',
  'node.js': 'nodejs',
  'nodejs': 'nodejs',
  'node': 'nodejs',
  'next.js': 'nextjs',
  'nextjs': 'nextjs',
  'next': 'nextjs',
  'vue.js': 'vue',
  'vuejs': 'vue',
  'vue': 'vue',
  'angular.js': 'angular',
  'angularjs': 'angular',
  'angular': 'angular',
  'typescript': 'typescript',
  'ts': 'typescript',
  'javascript': 'javascript',
  'js': 'javascript',
  'postgresql': 'postgresql',
  'postgres': 'postgresql',
  'psql': 'postgresql',
  'mongodb': 'mongodb',
  'mongo': 'mongodb',
  'golang': 'go',
  'go': 'go',
  'aws': 'aws',
  'amazon web services': 'aws',
  'gcp': 'gcp',
  'google cloud platform': 'gcp',
  'google cloud': 'gcp',
  'azure': 'azure',
  'microsoft azure': 'azure',
  'kubernetes': 'kubernetes',
  'k8s': 'kubernetes',
  'docker': 'docker',
  'containerization': 'docker',
  'containers': 'docker',
  'tailwind': 'tailwindcss',
  'tailwindcss': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'ci/cd': 'cicd',
  'cicd': 'cicd',
  'graphql': 'graphql',
  'gql': 'graphql',
  'rest': 'rest',
  'restful': 'rest',
  'rest api': 'rest',
  'restful api': 'rest',
  'html5': 'html',
  'html': 'html',
  'css3': 'css',
  'css': 'css',
  'c#': 'csharp',
  'csharp': 'csharp',
  'c++': 'cpp',
  'cpp': 'cpp',
  'python3': 'python',
  'python': 'python',
  'fastapi': 'fastapi',
  'django': 'django',
  'flask': 'flask',
  'spring': 'springboot',
  'spring boot': 'springboot',
  'springboot': 'springboot',
  'sql': 'sql',
  'nosql': 'nosql',
  'redis': 'redis',
  'kafka': 'kafka',
  'terraform': 'terraform',
};

/**
 * Normalizes a skill string: lowercased, punctuation stripped, mapped to alias.
 */
export function normalizeSkill(skill: string): string {
  if (!skill || typeof skill !== 'string') return '';
  const cleaned = skill
    .toLowerCase()
    .trim()
    .replace(/[^\w\s#+.-]/g, '');

  if (SKILL_ALIASES[cleaned]) {
    return SKILL_ALIASES[cleaned];
  }

  // Remove common suffixes like .js or js
  const strippedSuffix = cleaned.replace(/\.js$/, '').replace(/js$/, '');
  if (SKILL_ALIASES[strippedSuffix]) {
    return SKILL_ALIASES[strippedSuffix];
  }

  // Standardize spaces and hyphens
  return cleaned.replace(/[\s-_]+/g, '');
}

/**
 * Deduplicates an array of skill strings using normalized identity.
 */
export function deduplicateSkills(skills: string[]): string[] {
  if (!Array.isArray(skills)) return [];
  const seen = new Set<string>();
  const result: string[] = [];

  for (const s of skills) {
    if (!s || typeof s !== 'string') continue;
    const norm = normalizeSkill(s);
    if (!norm) continue;
    if (!seen.has(norm)) {
      seen.add(norm);
      result.push(s.trim());
    }
  }

  return result;
}

/**
 * Checks if a candidate possesses a job skill.
 * Returns 'matched' | 'partial' | 'missing'.
 */
function evaluateSkillMatch(
  jobSkill: string,
  candidateSkills: string[],
  candidateTechList: string[],
  allCandidateText: string
): { status: 'matched' | 'partial' | 'missing'; matchedSkillName?: string } {
  const normJobSkill = normalizeSkill(jobSkill);
  if (!normJobSkill) {
    return { status: 'missing' };
  }

  // 1. Direct normalized match against explicit candidate skills
  for (const candSkill of candidateSkills) {
    const normCandSkill = normalizeSkill(candSkill);
    if (normCandSkill === normJobSkill || (normCandSkill.length > 3 && normJobSkill.includes(normCandSkill)) || (normJobSkill.length > 3 && normCandSkill.includes(normJobSkill))) {
      return { status: 'matched', matchedSkillName: candSkill };
    }
  }

  // 2. Direct normalized match against candidate technologies
  for (const tech of candidateTechList) {
    const normTech = normalizeSkill(tech);
    if (normTech === normJobSkill || (normTech.length > 3 && normJobSkill.includes(normTech))) {
      return { status: 'matched', matchedSkillName: tech };
    }
  }

  // 3. Whole-word occurrence in resume text (lenient)
  const escapedSkill = jobSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (regex.test(allCandidateText)) {
      return { status: 'matched', matchedSkillName: jobSkill };
    }
    
    // Also try without word boundaries for some cases
    if (allCandidateText.toLowerCase().includes(jobSkill.toLowerCase())) {
        return { status: 'matched', matchedSkillName: jobSkill };
    }
  } catch {
    if (allCandidateText.toLowerCase().includes(jobSkill.toLowerCase())) {
      return { status: 'matched', matchedSkillName: jobSkill };
    }
  }

  return { status: 'missing' };
}

/**
 * Evaluates candidate degree against job education requirements.
 */
function evaluateEducation(
  candidateEducation: CandidateProfile['education'],
  jobEducationRequirements: string[]
): {
  score: number;
  status: 'matches' | 'partial' | 'missing' | 'not_required';
  evidence: string[];
} {
  // If the job does not require education, give 0 points to be conservative (as requested)
  if (!jobEducationRequirements || jobEducationRequirements.length === 0) {
    return {
      score: 0,
      status: 'not_required',
      evidence: ['No specific education credentials required by this job description.'],
    };
  }

  // If candidate has no education listed, 0 points
  if (!candidateEducation || !Array.isArray(candidateEducation) || candidateEducation.length === 0) {
    return {
      score: 0,
      status: 'missing',
      evidence: ['No education credentials provided in resume.'],
    };
  }

  const evidence: string[] = [];
  let highestTier = 0; // 0 = none, 1 = related/bootcamp, 2 = bachelor, 3 = master/phd

  const degreeKeywords = {
    bachelor: ['bachelor', 'b.s.', 'bs', 'b.sc', 'b.tech', 'btech', 'b.e.', 'be', 'b.a.', 'undergraduate', 'bca'],
    master: ['master', 'm.s.', 'ms', 'm.sc', 'm.tech', 'mtech', 'mba', 'graduate', 'mca'],
    doctorate: ['ph.d', 'phd', 'doctorate', 'doctoral'],
    diploma: ['associate', 'bootcamp', 'diploma', 'certificate'],
  };

  const isBachelorReq = jobEducationRequirements.some((req) =>
    degreeKeywords.bachelor.some((k) => (req || '').toLowerCase().includes(k))
  );
  const isMasterReq = jobEducationRequirements.some((req) =>
    degreeKeywords.master.some((k) => (req || '').toLowerCase().includes(k)) ||
    degreeKeywords.doctorate.some((k) => (req || '').toLowerCase().includes(k))
  );

  for (const edu of candidateEducation) {
    if (!edu) continue;
    const degText = `${edu.degree || ''} ${edu.field || ''} ${edu.institution || ''}`.toLowerCase();
    const line = [edu.degree, edu.field, edu.institution, edu.graduationYear ? `(${edu.graduationYear})` : '']
      .filter(Boolean)
      .join(' ');

    if (line) evidence.push(line);

    if (degreeKeywords.doctorate.some((k) => degText.includes(k))) {
      highestTier = Math.max(highestTier, 3);
    } else if (degreeKeywords.master.some((k) => degText.includes(k))) {
      highestTier = Math.max(highestTier, 3);
    } else if (degreeKeywords.bachelor.some((k) => degText.includes(k))) {
      highestTier = Math.max(highestTier, 2);
    } else if (degreeKeywords.diploma.some((k) => degText.includes(k))) {
      highestTier = Math.max(highestTier, 1);
    } else if (edu.degree || edu.institution) {
      highestTier = Math.max(highestTier, 1);
    }
  }

  if (evidence.length === 0) {
    return {
      score: 0,
      status: 'missing',
      evidence: ['No formal degree verified.'],
    };
  }

  if (isMasterReq) {
    if (highestTier >= 3) return { score: 15, status: 'matches', evidence };
    if (highestTier === 2) return { score: 10, status: 'partial', evidence };
    return { score: 5, status: 'partial', evidence };
  }

  if (isBachelorReq) {
    if (highestTier >= 2) return { score: 15, status: 'matches', evidence };
    if (highestTier === 1) return { score: 10, status: 'partial', evidence };
    return { score: 5, status: 'partial', evidence };
  }

  if (highestTier >= 2) {
    return { score: 15, status: 'matches', evidence };
  } else if (highestTier === 1) {
    return { score: 10, status: 'partial', evidence };
  }

  return { score: 5, status: 'partial', evidence };
}

/**
 * Evaluates candidate projects against job skills and keywords.
 * Maximum: 10 points.
 */
function evaluateProjects(
  candidateProjects: CandidateProfile['projects'],
  targetSkills: string[]
): { score: number; relevantProjects: string[] } {
  if (!candidateProjects || !Array.isArray(candidateProjects) || candidateProjects.length === 0) {
    return { score: 0, relevantProjects: [] };
  }

  const normalizedTargets = targetSkills.map(normalizeSkill).filter(Boolean);
  const relevantProjects: string[] = [];
  let totalTechMatches = 0;

  for (const project of candidateProjects) {
    if (!project) continue;
    const projectTech = (project.technologies || []).map(normalizeSkill);
    const descLower = (project.description || '').toLowerCase();

    let projectHasMatch = false;

    for (const target of normalizedTargets) {
      if (projectTech.includes(target) || descLower.includes(target)) {
        projectHasMatch = true;
        totalTechMatches++;
      }
    }

    if (projectHasMatch && project.name) {
      relevantProjects.push(project.name);
    }
  }

  if (relevantProjects.length === 0) {
    return { score: 0, relevantProjects: [] };
  }

  // Calculate score up to 10 points based on relevant projects and tech coverage
  let score = 5 + Math.min(3, relevantProjects.length * 2) + Math.min(3, totalTechMatches * 1);
  score = Math.min(10, Math.max(0, score));

  return { score: Number.isFinite(score) ? score : 0, relevantProjects };
}

/**
 * Evaluates other requirements (keywords, domain requirements, responsibilities).
 * Maximum: 10 points.
 */
function evaluateOtherRequirements(
  job: JobRequirements,
  allCandidateText: string
): { score: number; matchedRequirements: string[]; missingRequirements: string[] } {
  const requirementsToTest = [
    ...(job.domainRequirements || []),
    ...(job.importantKeywords || []),
    ...(job.responsibilities || []).slice(0, 4),
  ];

  if (requirementsToTest.length === 0) {
    return { score: 0, matchedRequirements: [], missingRequirements: [] };
  }

  const matched: string[] = [];
  const missing: string[] = [];
  const normText = (allCandidateText || '').toLowerCase();

  for (const req of requirementsToTest) {
    if (!req || typeof req !== 'string') continue;
    const cleanReq = req.trim();
    if (!cleanReq) continue;

    // Check direct substring
    if (normText.includes(cleanReq.toLowerCase())) {
      matched.push(cleanReq);
      continue;
    }

    // Check meaningful words
    const words = cleanReq
      .toLowerCase()
      .split(/[\s,./-]+/)
      .filter((w) => w.length > 2);

    const matchesWord = words.length > 0 && words.some((w) => normText.includes(w));
    if (matchesWord) {
      matched.push(cleanReq);
    } else {
      missing.push(cleanReq);
    }
  }

  const ratio = matched.length / Math.max(1, requirementsToTest.length);
  const rawScore = Math.min(10, ratio * 10);
  const score = Number.isFinite(rawScore) ? Math.round(rawScore * 10) / 10 : 0;

  return { score, matchedRequirements: matched, missingRequirements: missing };
}

/**
 * Builds a deterministic human-readable explanation of the match.
 */
function generateDeterministicExplanation(
  totalScore: number,
  label: ScoreTierLabel,
  matchedRequired: string[],
  missingRequired: string[],
  candidateYears: number | null,
  requiredYears: number | null,
  relevantProjects: string[]
): string {
  const parts: string[] = [];

  // 1. Headline summary
  parts.push(`${label} with ${totalScore}%.`);

  // 2. Required skills
  if (missingRequired.length === 0) {
    if (matchedRequired.length > 0) {
      parts.push(`The candidate matches all required skills (${matchedRequired.slice(0, 4).join(', ')}).`);
    } else {
      parts.push('Candidate satisfies general role requirements.');
    }
  } else if (matchedRequired.length > 0) {
    const totalReq = matchedRequired.length + missingRequired.length;
    parts.push(
      `Matches ${matchedRequired.length} of ${totalReq} required skills (${matchedRequired.slice(0, 3).join(', ')}).`
    );
    parts.push(`Key skill gaps: ${missingRequired.slice(0, 3).join(', ')}.`);
  } else {
    parts.push(`Lacks required skills (${missingRequired.slice(0, 3).join(', ')}).`);
  }

  // 3. Experience
  if (requiredYears !== null && requiredYears > 0) {
    if (candidateYears !== null && Number.isFinite(candidateYears)) {
      if (candidateYears >= requiredYears) {
        parts.push(`Meets experience requirement (${candidateYears} yrs vs ${requiredYears} yrs required).`);
      } else {
        parts.push(`Experience is below requirement (${candidateYears} yrs vs ${requiredYears} yrs required).`);
      }
    } else {
      parts.push(`Tenure not explicitly quantified against ${requiredYears} required years.`);
    }
  } else if (candidateYears !== null && candidateYears > 0) {
    parts.push(`Brings ${candidateYears} years of relevant experience.`);
  }

  // 4. Projects
  if (relevantProjects.length > 0) {
    parts.push(`Demonstrated ${relevantProjects.length} relevant project${relevantProjects.length === 1 ? '' : 's'}.`);
  }

  return parts.join(' ');
}

/**
 * Builds structured explanation object for detailed recruiter inspection.
 */
function generateStructuredExplanation(
  totalScore: number,
  label: ScoreTierLabel,
  matchedRequired: string[],
  missingRequired: string[],
  candidateYears: number | null,
  requiredYears: number | null,
  relevantProjects: string[],
  candidateEducation: CandidateProfile['education'],
  jobEducation: string[],
  claimsToVerify: CandidateProfile['claimsToVerify']
): StructuredMatchExplanation {
  const headline = `${label} (${totalScore}%)`;

  let expWhy: string | null = null;
  let expMissing: string | null = null;

  if (requiredYears !== null && requiredYears > 0) {
    if (candidateYears !== null && Number.isFinite(candidateYears)) {
      if (candidateYears >= requiredYears) {
        expWhy = `${candidateYears} years verified experience (meets/exceeds ${requiredYears} years required)`;
      } else {
        expMissing = `${candidateYears} years verified (below ${requiredYears} years required)`;
      }
    } else {
      expMissing = `Experience tenure not quantified in resume (Job requires ${requiredYears} years)`;
    }
  } else if (candidateYears !== null && candidateYears > 0) {
    expWhy = `${candidateYears} years relevant industry experience`;
  }

  let eduWhy: string | null = null;
  let eduMissing: string | null = null;

  if (jobEducation && jobEducation.length > 0) {
    if (candidateEducation && candidateEducation.length > 0) {
      eduWhy = candidateEducation
        .map((e) => [e.degree, e.field, e.institution].filter(Boolean).join(' in '))
        .filter(Boolean)
        .join('; ') || 'Degree listed';
    } else {
      eduMissing = `Education requirement specified (${jobEducation[0]}), but no credentials found in resume`;
    }
  } else {
    eduWhy = candidateEducation && candidateEducation.length > 0
      ? candidateEducation.map((e) => e.degree).filter(Boolean).join(', ')
      : 'No formal degree required by job';
  }

  const unverifiedClaims = (claimsToVerify || []).filter(
    (c) => c.status !== 'SUPPORTED' || c.verificationNeeded
  );

  return {
    headline,
    whyMatches: {
      skills: matchedRequired,
      experience: expWhy,
      projects: relevantProjects,
      education: eduWhy,
    },
    whatIsMissing: {
      skills: missingRequired,
      experience: expMissing,
      education: eduMissing,
      other: [],
    },
    recruiterAttention: {
      unverifiedClaimsCount: unverifiedClaims.length,
      flaggedItems: unverifiedClaims.map((c) => c.claim),
    },
  };
}

/**
 * Core deterministic candidate scoring engine.
 * Computes exact 0-100 score according to strict weights.
 */
export function calculateCandidateScore(
  candidate: CandidateProfile,
  job: JobRequirements
): MatchAnalysis {
  // 1. QUALITY & RELEVANCE GATE
  if (!candidate.isQualityResume) {
    return {
      candidateId: candidate.id,
      totalScore: 10,
      label: 'Weak Match',
      skillScore: 0,
      requiredSkillScore: 0,
      preferredSkillScore: 0,
      experienceScore: 0,
      educationScore: 0,
      projectScore: 0,
      requirementsScore: 0,
      matchedRequiredSkills: [],
      missingRequiredSkills: deduplicateSkills(Array.isArray(job?.requiredSkills) ? job.requiredSkills : []),
      matchedPreferredSkills: [],
      missingPreferredSkills: deduplicateSkills(Array.isArray(job?.preferredSkills) ? job.preferredSkills : []),
      partialSkills: [],
      experienceMatch: { candidateYears: null, requiredYears: null, status: 'unknown' },
      educationMatch: { status: 'missing', evidence: [] },
      relevantProjects: [],
      matchedRequirements: [],
      missingRequirements: [],
      explanation: `Document quality check failed: ${candidate.qualityReason || 'Insufficient resume data provided.'}`,
      structuredExplanation: {
        headline: 'Insufficient Resume Data',
        whyMatches: { skills: [], experience: null, projects: [], education: null },
        whatIsMissing: { skills: deduplicateSkills(Array.isArray(job?.requiredSkills) ? job.requiredSkills : []), experience: null, education: null, other: [] },
        recruiterAttention: { unverifiedClaimsCount: 0, flaggedItems: ['Insufficient data'] }
      }
    };
  }

  // Safe defaults for all arrays
  const candSkills = deduplicateSkills(candidate?.skills || []);
  const candExperience = Array.isArray(candidate?.experience) ? candidate.experience : [];
  const candProjects = Array.isArray(candidate?.projects) ? candidate.projects : [];
  const candEducation = Array.isArray(candidate?.education) ? candidate.education : [];
  const candClaims = Array.isArray(candidate?.claimsToVerify) ? candidate.claimsToVerify : [];

  const rawReqSkills = Array.isArray(job?.requiredSkills) ? job.requiredSkills : [];
  const rawPrefSkills = Array.isArray(job?.preferredSkills) ? job.preferredSkills : [];
  const requiredSkills = deduplicateSkills(rawReqSkills);
  const preferredSkills = deduplicateSkills(rawPrefSkills);

  // Extract all technology tokens from candidate experience and projects
  const candidateTechList: string[] = [];
  candExperience.forEach((e) => {
    if (e && Array.isArray(e.technologies)) candidateTechList.push(...e.technologies);
  });
  candProjects.forEach((p) => {
    if (p && Array.isArray(p.technologies)) candidateTechList.push(...p.technologies);
  });

  // Searchable text corpus for fallback keyword matching
  const candidateCorpus = [
    candidate?.summary || '',
    candSkills.join(' '),
    ...candExperience.map(
      (e) => `${e?.role || ''} ${e?.company || ''} ${e?.description || ''} ${(e?.technologies || []).join(' ')}`
    ),
    ...candProjects.map((p) => `${p?.name || ''} ${p?.description || ''} ${(p?.technologies || []).join(' ')}`),
    ...(Array.isArray(candidate?.certifications) ? candidate.certifications : []),
  ].join(' ');

  // 1. SKILLS (40 Points): 30 pts Required + 10 pts Preferred
  const matchedRequiredSkills: string[] = [];
  const missingRequiredSkills: string[] = [];
  const partialSkills: string[] = [];

  let requiredSkillPoints = 0; // Default to 0, not 30

  if (requiredSkills.length > 0) {
    let rawRequiredScore = 0;
    for (const skill of requiredSkills) {
      const match = evaluateSkillMatch(skill, candSkills, candidateTechList, candidateCorpus);
      if (match.status === 'matched') {
        matchedRequiredSkills.push(match.matchedSkillName || skill);
        rawRequiredScore += 1.0;
      } else if (match.status === 'partial') {
        partialSkills.push(skill);
        rawRequiredScore += 0.5;
      } else {
        missingRequiredSkills.push(skill);
      }
    }
    requiredSkillPoints = (rawRequiredScore / requiredSkills.length) * 30;
  } else {
    // If no required skills, maybe award full points or handle differently?
    // User requested "Do NOT treat an undefined/null field as all requirements satisfied"
    // So if JD has no requirements, maybe 0 points for that category?
    // Let's set it to 0 as requested by "Missing information must receive ZERO points".
    requiredSkillPoints = 0;
  }

  const matchedPreferredSkills: string[] = [];
  const missingPreferredSkills: string[] = [];
  let preferredSkillPoints = 0; // Default to 0, not 10

  if (preferredSkills.length > 0) {
    let rawPreferredScore = 0;
    for (const skill of preferredSkills) {
      const match = evaluateSkillMatch(skill, candSkills, candidateTechList, candidateCorpus);
      if (match.status === 'matched') {
        matchedPreferredSkills.push(match.matchedSkillName || skill);
        rawPreferredScore += 1.0;
      } else if (match.status === 'partial') {
        partialSkills.push(skill);
        rawPreferredScore += 0.5;
      } else {
        missingPreferredSkills.push(skill);
      }
    }
    preferredSkillPoints = (rawPreferredScore / preferredSkills.length) * 10;
  } else {
    preferredSkillPoints = 0;
  }

  // ... (skills scoring logic)

  let skillScore = requiredSkillPoints + preferredSkillPoints;
  if (!Number.isFinite(skillScore)) skillScore = 0;
  skillScore = Math.min(40, Math.max(0, skillScore));

  console.log(`Debug Scoring [${candidate.id}]: Required=${requiredSkillPoints.toFixed(1)}, Preferred=${preferredSkillPoints.toFixed(1)}, TotalSkill=${skillScore.toFixed(1)}`);

  // 2. EXPERIENCE (25 Points)
  let experienceScore = 0; // Default to 0, not 25
  let experienceStatus: 'meets' | 'partial' | 'unknown' = 'unknown';
  const candYears = typeof candidate?.totalExperienceYears === 'number' && Number.isFinite(candidate.totalExperienceYears)
    ? candidate.totalExperienceYears
    : null;
  const reqYears = typeof job?.requiredExperienceYears === 'number' && Number.isFinite(job.requiredExperienceYears)
    ? job.requiredExperienceYears
    : null;

  if (reqYears !== null && reqYears > 0) {
    if (candYears !== null) {
      if (candYears >= reqYears) {
        experienceScore = 25;
        experienceStatus = 'meets';
      } else {
        const ratio = Math.max(0, candYears / reqYears);
        experienceScore = Math.min(25, ratio * 25);
        experienceStatus = 'partial';
      }
    } else if (candExperience.length > 0) {
      experienceScore = Math.min(15, candExperience.length >= 2 ? 12 : 6);
      experienceStatus = 'partial';
    } else {
      experienceScore = 0;
      experienceStatus = 'unknown';
    }
  } else {
    // Job has no experience years requirement: set to 0 to be conservative (as requested)
    experienceScore = 0;
    experienceStatus = 'unknown';
  }

  if (!Number.isFinite(experienceScore)) experienceScore = 0;
  experienceScore = Math.min(25, Math.max(0, experienceScore));

  // 3. EDUCATION (15 Points)
  const eduResult = evaluateEducation(candEducation, job?.educationRequirements || []);
  let educationScore = eduResult.score;
  if (!Number.isFinite(educationScore)) educationScore = 0;
  educationScore = Math.min(15, Math.max(0, educationScore));

  // 4. PROJECTS (10 Points)
  const allJobTargetSkills = [
    ...requiredSkills,
    ...preferredSkills,
    ...(Array.isArray(job?.importantKeywords) ? job.importantKeywords : []),
  ];
  const projectResult = evaluateProjects(candProjects, allJobTargetSkills);
  let projectScore = projectResult.score;
  if (!Number.isFinite(projectScore)) projectScore = 0;
  projectScore = Math.min(10, Math.max(0, projectScore));

  // 5. OTHER REQUIREMENTS (10 Points)
  const otherReqResult = evaluateOtherRequirements(job || ({} as JobRequirements), candidateCorpus);
  let requirementsScore = otherReqResult.score;
  if (!Number.isFinite(requirementsScore)) requirementsScore = 0;
  requirementsScore = Math.min(10, Math.max(0, requirementsScore));

  // TOTAL SCORE (0 - 100)
  const rawTotal = skillScore + experienceScore + educationScore + projectScore + requirementsScore;
  const safeTotal = Number.isFinite(rawTotal) ? rawTotal : 0;
  let totalScore = Math.max(0, Math.min(100, Math.round(safeTotal)));

  // 1.2 DEBUG LOGGING - Final Scores
  console.log(`[DEBUG] Final Score Breakdown [${candidate.id}]:`, {
      skillScore: skillScore.toFixed(1),
      requiredSkillScore: requiredSkillPoints.toFixed(1),
      preferredSkillScore: preferredSkillPoints.toFixed(1),
      experienceScore: experienceScore.toFixed(1),
      educationScore: educationScore.toFixed(1),
      projectScore: projectScore.toFixed(1),
      requirementsScore: requirementsScore.toFixed(1),
      finalScore: totalScore
  });

  // Final Quality/Relevance Cap
  // If resume has NO matching required skills and no relevant projects, it is likely irrelevant.
  if (matchedRequiredSkills.length === 0 && projectResult.relevantProjects.length === 0 && totalScore > 30) {
    totalScore = 25;
  }

  // SCORE LABEL
  let label: ScoreTierLabel = 'Weak Match';
  if (totalScore >= 85) {
    label = 'Strong Match';
  } else if (totalScore >= 70) {
    label = 'Good Match';
  } else if (totalScore >= 50) {
    label = 'Moderate Match';
  }

  // EXPLANATION
  const explanation = generateDeterministicExplanation(
    totalScore,
    label,
    matchedRequiredSkills,
    missingRequiredSkills,
    candYears,
    reqYears,
    projectResult.relevantProjects
  );

  const structuredExplanation = generateStructuredExplanation(
    totalScore,
    label,
    matchedRequiredSkills,
    missingRequiredSkills,
    candYears,
    reqYears,
    projectResult.relevantProjects,
    candEducation,
    job?.educationRequirements || [],
    candClaims
  );

  return {
    candidateId: candidate?.id || 'unknown',
    totalScore,
    label,
    skillScore: Math.round(skillScore * 10) / 10,
    requiredSkillScore: Math.round(requiredSkillPoints * 10) / 10,
    preferredSkillScore: Math.round(preferredSkillPoints * 10) / 10,
    experienceScore: Math.round(experienceScore * 10) / 10,
    educationScore: Math.round(educationScore * 10) / 10,
    projectScore: Math.round(projectScore * 10) / 10,
    requirementsScore: Math.round(requirementsScore * 10) / 10,
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    missingPreferredSkills,
    partialSkills,
    experienceMatch: {
      candidateYears: candYears,
      requiredYears: reqYears,
      status: experienceStatus,
    },
    educationMatch: {
      status: eduResult.status,
      evidence: eduResult.evidence,
    },
    relevantProjects: projectResult.relevantProjects,
    matchedRequirements: otherReqResult.matchedRequirements,
    missingRequirements: otherReqResult.missingRequirements,
    explanation,
    structuredExplanation,
  };
}

/**
 * Ranks all candidates deterministically based on their MatchAnalysis.
 * Stable secondary sorting: totalScore desc -> requiredSkillScore desc -> experienceScore desc -> original index.
 */
export function rankCandidates(
  candidates: CandidateProfile[],
  job: JobRequirements
): RankedCandidate[] {
  if (!Array.isArray(candidates)) return [];

  const scoredItems = candidates.map((profile, index) => {
    const match = calculateCandidateScore(profile, job);
    return {
      profile,
      match,
      originalIndex: index,
    };
  });

  scoredItems.sort((a, b) => {
    // 1. Total score descending
    if (b.match.totalScore !== a.match.totalScore) {
      return b.match.totalScore - a.match.totalScore;
    }
    // 2. Required skills score descending
    if (b.match.requiredSkillScore !== a.match.requiredSkillScore) {
      return b.match.requiredSkillScore - a.match.requiredSkillScore;
    }
    // 3. Experience score descending
    if (b.match.experienceScore !== a.match.experienceScore) {
      return b.match.experienceScore - a.match.experienceScore;
    }
    // 4. Stable original index
    return a.originalIndex - b.originalIndex;
  });

  return scoredItems.map((item, i) => ({
    id: item.profile?.id || `cand-${i + 1}`,
    rank: i + 1,
    fileName: item.profile?.fileName || `resume-${i + 1}.pdf`,
    status: 'processed' as const,
    profile: item.profile,
    match: item.match,
  }));
}
