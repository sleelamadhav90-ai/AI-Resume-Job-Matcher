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
 */

import {
  CandidateProfile,
  JobRequirements,
  MatchAnalysis,
  RankedCandidate,
  ScoreTierLabel
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
};

/**
 * Normalizes a skill string: lowercased, punctuation stripped, mapped to alias.
 */
export function normalizeSkill(skill: string): string {
  if (!skill) return '';
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
    if (normCandSkill === normJobSkill) {
      return { status: 'matched', matchedSkillName: candSkill };
    }
  }

  // 2. Direct normalized match against candidate technologies from experience & projects
  for (const tech of candidateTechList) {
    const normTech = normalizeSkill(tech);
    if (normTech === normJobSkill) {
      return { status: 'matched', matchedSkillName: tech };
    }
  }

  // 3. Substring / compound word match in skills
  for (const candSkill of candidateSkills) {
    const normCandSkill = normalizeSkill(candSkill);
    if (
      (normCandSkill.length > 2 && normJobSkill.includes(normCandSkill)) ||
      (normJobSkill.length > 2 && normCandSkill.includes(normJobSkill))
    ) {
      return { status: 'matched', matchedSkillName: candSkill };
    }
  }

  // 4. Substring in technologies
  for (const tech of candidateTechList) {
    const normTech = normalizeSkill(tech);
    if (
      (normTech.length > 2 && normJobSkill.includes(normTech)) ||
      (normJobSkill.length > 2 && normTech.includes(normJobSkill))
    ) {
      return { status: 'matched', matchedSkillName: tech };
    }
  }

  // 5. Look for whole-word occurrence in resume text
  const regex = new RegExp(`\\b${normJobSkill}\\b`, 'i');
  if (regex.test(allCandidateText)) {
    return { status: 'partial', matchedSkillName: jobSkill };
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
  // If the job does not require education, give full 15 points
  if (!jobEducationRequirements || jobEducationRequirements.length === 0) {
    return {
      score: 15,
      status: 'not_required',
      evidence: ['No specific education level required by role.'],
    };
  }

  // If candidate has no education listed, 0 points
  if (!candidateEducation || candidateEducation.length === 0) {
    return {
      score: 0,
      status: 'missing',
      evidence: ['No education credentials found in resume.'],
    };
  }

  const evidence: string[] = [];
  let highestTier = 0; // 0 = none, 1 = related/bootcamp, 2 = bachelor, 3 = master/phd

  const degreeKeywords = {
    bachelor: ['bachelor', 'b.s.', 'bs', 'b.sc', 'b.tech', 'btech', 'b.e.', 'be', 'b.a.', 'undergraduate'],
    master: ['master', 'm.s.', 'ms', 'm.sc', 'm.tech', 'mtech', 'mba', 'graduate'],
    doctorate: ['ph.d', 'phd', 'doctorate', 'doctoral'],
    diploma: ['associate', 'bootcamp', 'diploma', 'certificate'],
  };

  const isBachelorReq = jobEducationRequirements.some((req) =>
    degreeKeywords.bachelor.some((k) => req.toLowerCase().includes(k))
  );
  const isMasterReq = jobEducationRequirements.some((req) =>
    degreeKeywords.master.some((k) => req.toLowerCase().includes(k)) ||
    degreeKeywords.doctorate.some((k) => req.toLowerCase().includes(k))
  );

  for (const edu of candidateEducation) {
    const degText = `${edu.degree || ''} ${edu.field || ''} ${edu.institution || ''}`.toLowerCase();
    evidence.push(
      [edu.degree, edu.field, edu.institution, edu.graduationYear ? `(${edu.graduationYear})` : '']
        .filter(Boolean)
        .join(' ')
    );

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

  // Generic degree required and candidate has a degree
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
  if (!candidateProjects || candidateProjects.length === 0) {
    return { score: 0, relevantProjects: [] };
  }

  const normalizedTargets = targetSkills.map(normalizeSkill).filter(Boolean);
  const relevantProjects: string[] = [];
  let totalTechMatches = 0;

  for (const project of candidateProjects) {
    const projectTech = (project.technologies || []).map(normalizeSkill);
    const descLower = (project.description || '').toLowerCase();

    let projectHasMatch = false;

    for (const target of normalizedTargets) {
      if (projectTech.includes(target) || descLower.includes(target)) {
        projectHasMatch = true;
        totalTechMatches++;
      }
    }

    if (projectHasMatch) {
      relevantProjects.push(project.name);
    }
  }

  if (relevantProjects.length === 0) {
    return { score: 2, relevantProjects: [] };
  }

  // Calculate score up to 10 points based on relevant projects and tech coverage
  let score = 5 + Math.min(3, relevantProjects.length * 2) + Math.min(3, totalTechMatches * 1);
  score = Math.min(10, Math.max(0, score));

  return { score, relevantProjects };
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
    return { score: 10, matchedRequirements: ['All role requirements satisfied'], missingRequirements: [] };
  }

  const matched: string[] = [];
  const missing: string[] = [];
  const normText = allCandidateText.toLowerCase();

  for (const req of requirementsToTest) {
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
  const score = Math.min(10, Math.round(ratio * 10 * 10) / 10);

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
  if (requiredYears !== null) {
    if (candidateYears !== null) {
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
 * Core deterministic candidate scoring engine.
 * Computes exact 0-100 score according to strict weights.
 */
export function calculateCandidateScore(
  candidate: CandidateProfile,
  job: JobRequirements
): MatchAnalysis {
  // Extract all technology tokens from candidate experience and projects
  const candidateTechList: string[] = [];
  candidate.experience.forEach((e) => {
    if (e.technologies) candidateTechList.push(...e.technologies);
  });
  candidate.projects.forEach((p) => {
    if (p.technologies) candidateTechList.push(...p.technologies);
  });

  // Searchable text corpus for fallback keyword matching
  const candidateCorpus = [
    candidate.summary,
    candidate.skills.join(' '),
    ...candidate.experience.map(
      (e) => `${e.role || ''} ${e.company || ''} ${e.description} ${(e.technologies || []).join(' ')}`
    ),
    ...candidate.projects.map((p) => `${p.name} ${p.description} ${(p.technologies || []).join(' ')}`),
    candidate.certifications.join(' '),
  ].join(' ');

  // 1. SKILLS (40 Points): 30 pts Required + 10 pts Preferred
  const matchedRequiredSkills: string[] = [];
  const missingRequiredSkills: string[] = [];
  const partialSkills: string[] = [];

  const requiredSkills = job.requiredSkills || [];
  let requiredSkillPoints = 30;

  if (requiredSkills.length > 0) {
    let rawRequiredScore = 0;
    for (const skill of requiredSkills) {
      const match = evaluateSkillMatch(skill, candidate.skills, candidateTechList, candidateCorpus);
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
  }

  const preferredSkills = job.preferredSkills || [];
  const matchedPreferredSkills: string[] = [];
  const missingPreferredSkills: string[] = [];
  let preferredSkillPoints = 10;

  if (preferredSkills.length > 0) {
    let rawPreferredScore = 0;
    for (const skill of preferredSkills) {
      const match = evaluateSkillMatch(skill, candidate.skills, candidateTechList, candidateCorpus);
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
  }

  const skillScore = Math.min(40, requiredSkillPoints + preferredSkillPoints);

  // 2. EXPERIENCE (25 Points)
  let experienceScore = 25;
  let experienceStatus: 'meets' | 'partial' | 'unknown' = 'meets';
  const candYears = candidate.totalExperienceYears;
  const reqYears = job.requiredExperienceYears;

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
    } else {
      if (candidate.experience && candidate.experience.length > 0) {
        experienceScore = Math.min(25, candidate.experience.length >= 2 ? 18 : 12);
        experienceStatus = 'partial';
      } else {
        experienceScore = 0;
        experienceStatus = 'unknown';
      }
    }
  } else {
    // Job has no experience years requirement: full 25 points
    experienceScore = 25;
    experienceStatus = 'meets';
  }

  // 3. EDUCATION (15 Points)
  const eduResult = evaluateEducation(candidate.education, job.educationRequirements || []);
  const educationScore = eduResult.score;

  // 4. PROJECTS (10 Points)
  const allJobTargetSkills = [
    ...(job.requiredSkills || []),
    ...(job.preferredSkills || []),
    ...(job.importantKeywords || []),
  ];
  const projectResult = evaluateProjects(candidate.projects, allJobTargetSkills);
  const projectScore = projectResult.score;

  // 5. OTHER REQUIREMENTS (10 Points)
  const otherReqResult = evaluateOtherRequirements(job, candidateCorpus);
  const requirementsScore = otherReqResult.score;

  // TOTAL SCORE (0 - 100)
  const rawTotal = skillScore + experienceScore + educationScore + projectScore + requirementsScore;
  const totalScore = Math.max(0, Math.min(100, Math.round(rawTotal)));

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

  return {
    candidateId: candidate.id,
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
    id: item.profile.id,
    rank: i + 1,
    fileName: item.profile.fileName,
    status: 'processed' as const,
    profile: item.profile,
    match: item.match,
  }));
}
