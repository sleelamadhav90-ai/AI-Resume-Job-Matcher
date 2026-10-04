import { calculateCandidateScore, rankCandidates, normalizeSkill, deduplicateSkills } from './scoring';
import { classifyClaimStatus } from './ai';
import { CandidateProfile, JobRequirements, RankedCandidate, ResumeClaim } from './types';

function createCandidate(id: string, name: string, skills: string[], experienceYears: number, claims: ResumeClaim[] = []): CandidateProfile {
  return {
    id,
    fileName: `${name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: '555-0100',
    skills,
    education: [
      {
        degree: "Bachelor's in Computer Science",
        field: 'Computer Science',
        institution: 'Tech University',
        graduationYear: 2021,
      },
    ],
    experience: [
      {
        company: 'Cloud Corp',
        role: 'Software Engineer',
        startDate: '2021',
        endDate: '2025',
        description: `Worked with ${skills.join(', ')} on scalable backend services.`,
        technologies: skills,
      },
    ],
    projects: [
      {
        name: 'Distributed Platform',
        description: `Built microservices using ${skills.slice(0, 3).join(', ')}.`,
        technologies: skills.slice(0, 3),
      },
    ],
    certifications: [],
    totalExperienceYears: experienceYears,
    summary: `${name} is a software engineer with ${experienceYears} years of experience in ${skills.join(', ')}.`,
    claimsToVerify: claims,
  };
}

function createJob(title: string, requiredSkills: string[], preferredSkills: string[], minYears: number = 3): JobRequirements {
  return {
    jobTitle: title,
    requiredSkills,
    preferredSkills,
    requiredExperienceYears: minYears,
    educationRequirements: ["Bachelor's in Computer Science or related field"],
    responsibilities: ['Build scalable backend microservices'],
    importantKeywords: ['microservices', 'cloud'],
    domainRequirements: ['Cloud computing'],
    summary: `Role: ${title}`,
  };
}

console.log('--- Starting Algothon 26 Comprehensive Product & Session Integrity Tests ---');

// Test 1: Empty inputs handling
console.log('[Test 1] Empty Job Description & Empty Resumes rejection');
const emptyJob: JobRequirements = {
  jobTitle: '',
  requiredSkills: [],
  preferredSkills: [],
  requiredExperienceYears: null,
  educationRequirements: [],
  responsibilities: [],
  importantKeywords: [],
  domainRequirements: [],
  summary: '',
};
const emptyCand: CandidateProfile = {
  id: 'c-empty',
  fileName: 'empty.pdf',
  name: 'Unknown',
  email: null,
  phone: null,
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  totalExperienceYears: null,
  summary: '',
  claimsToVerify: [],
};
const emptyScore = calculateCandidateScore(emptyCand, emptyJob);
if (isNaN(emptyScore.totalScore) || emptyScore.totalScore < 0) {
  throw new Error('Score resulted in NaN or negative value on empty input');
}

// Test 2: Live multi-resume analysis session ranking
console.log('[Test 2] Multi-candidate deterministic ranking');
const jobA = createJob('Senior Backend Engineer', ['Java', 'Spring Boot', 'PostgreSQL'], ['AWS', 'Docker'], 3);
const cand1 = createCandidate('cand-1', 'Alice Walker', ['Java', 'Spring Boot', 'PostgreSQL', 'AWS'], 4.5);
const cand2 = createCandidate('cand-2', 'Bob Smith', ['Java', 'PostgreSQL'], 2.0);
const cand3 = createCandidate('cand-3', 'Charlie Brown', ['React', 'CSS'], 1.0);

const score1 = calculateCandidateScore(cand1, jobA);
const score2 = calculateCandidateScore(cand2, jobA);
const score3 = calculateCandidateScore(cand3, jobA);

const ranked = rankCandidates([cand1, cand2, cand3], jobA);

if (ranked[0].profile?.name !== 'Alice Walker' || ranked[0].rank !== 1) {
  throw new Error(`Expected Alice Walker ranked 1st, got ${ranked[0].profile?.name}`);
}
if (ranked[1].profile?.name !== 'Bob Smith' || ranked[1].rank !== 2) {
  throw new Error(`Expected Bob Smith ranked 2nd, got ${ranked[1].profile?.name}`);
}
if (ranked[2].profile?.name !== 'Charlie Brown' || ranked[2].rank !== 3) {
  throw new Error(`Expected Charlie Brown ranked 3rd, got ${ranked[2].profile?.name}`);
}

// Test 3: Session Isolation (JD A + Resumes A vs JD B + Resumes B)
console.log('[Test 3] Session Isolation without ghost candidates');
const jobB = createJob('Frontend Architect', ['React', 'TypeScript', 'Next.js'], ['Tailwind CSS'], 4);
const cand4 = createCandidate('cand-4', 'Diana Prince', ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'], 5);
const cand5 = createCandidate('cand-5', 'Evan Wright', ['React', 'JavaScript'], 3);

const rankedB = rankCandidates([cand4, cand5], jobB);

// Verify Session B has exactly 2 candidates and NO Alice, Bob, or Charlie
if (rankedB.length !== 2) {
  throw new Error(`Expected Session B to contain exactly 2 candidates, found ${rankedB.length}`);
}
const namesInSessionB = rankedB.map(r => r.profile?.name);
if (namesInSessionB.includes('Alice Walker') || namesInSessionB.includes('Bob Smith')) {
  throw new Error('Data pollution detected: Session A candidates leaked into Session B');
}

// Test 4: Claim Verification taxonomy
console.log('[Test 4] 4-Tier Claim Verification Taxonomy');
const statusSupported = classifyClaimStatus(
  'Led backend microservices team',
  'Managed team of 6 engineers at Cloud Corp',
  false
);
if (statusSupported.status !== 'SUPPORTED') {
  throw new Error(`Expected SUPPORTED status, got ${statusSupported.status}`);
}

const statusUnsupported = classifyClaimStatus(
  'Expert Kubernetes Architect',
  null,
  true
);
if (statusUnsupported.status !== 'UNSUPPORTED' && statusUnsupported.status !== 'NOT_ENOUGH_EVIDENCE') {
  throw new Error(`Expected UNSUPPORTED/NOT_ENOUGH_EVIDENCE status, got ${statusUnsupported.status}`);
}

const statusContradictory = classifyClaimStatus(
  '10 years React experience',
  'Graduation date inconsistent with timeline',
  true
);
if (statusContradictory.status !== 'CONTRADICTORY') {
  throw new Error(`Expected CONTRADICTORY status, got ${statusContradictory.status}`);
}

// Test 5: Live search, filter, and sorting
console.log('[Test 5] In-memory search and filter on live session');
const query = 'Walker';
const searchMatches = ranked.filter(r => (r.profile?.name || '').toLowerCase().includes(query.toLowerCase()));
if (searchMatches.length !== 1 || searchMatches[0].profile?.name !== 'Alice Walker') {
  throw new Error('Search failed to identify candidate by surname query');
}

const strongMatches = ranked.filter(r => r.match.label === 'Strong Match');
if (strongMatches.length < 1) {
  throw new Error(`Expected at least 1 strong match, found ${strongMatches.length}`);
}

// Test 6: 100-Point Weighted Rubric Score Breakdown Sum
console.log('[Test 6] 100-Point Rubric verification');
const scoreSum = score1.requiredSkillScore +
  score1.preferredSkillScore +
  score1.experienceScore +
  score1.educationScore +
  score1.projectScore +
  score1.requirementsScore;

if (Math.abs(scoreSum - score1.totalScore) > 0.01) {
  throw new Error(`Score sum ${scoreSum} does not match total score ${score1.totalScore}`);
}

console.log('=== ALL 6 ALGOTHON SESSION INTEGRITY TESTS PASSED WITH 0 ASSERTION FAILURES ===');
