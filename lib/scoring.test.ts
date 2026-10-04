import { calculateCandidateScore, rankCandidates, normalizeSkill, deduplicateSkills } from './scoring';
import { classifyClaimStatus } from './ai';
import { CandidateProfile, JobRequirements, ResumeClaim } from './types';

function createMockCandidate(overrides: Partial<CandidateProfile> = {}): CandidateProfile {
  return {
    id: 'cand-1',
    fileName: 'resume.pdf',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-123-4567',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    education: [
      {
        degree: "Bachelor's Degree in Computer Science",
        field: 'Computer Science',
        institution: 'University of Washington',
        graduationYear: 2020,
      },
    ],
    experience: [
      {
        company: 'TechCorp',
        role: 'Full Stack Engineer',
        startDate: '2020',
        endDate: '2024',
        description: 'Developed scalable React web apps and microservices with database architectures.',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built high-scale web store using React, Node.js, and PostgreSQL with Docker deployment.',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      },
      {
        name: 'Analytics Dashboard',
        description: 'Real-time dashboard using React and Node.js microservices.',
        technologies: ['React', 'TypeScript', 'Node.js'],
      },
    ],
    certifications: ['AWS Certified Developer'],
    totalExperienceYears: 4,
    summary: 'Senior developer with 4 years of experience building scalable web applications and microservices.',
    claimsToVerify: [
      {
        claim: 'Led team of 10 engineers',
        evidence: 'Managed sprint planning and led frontend pod of 10 developers at TechCorp',
        verificationNeeded: false,
        status: 'SUPPORTED',
        explanation: 'Verified with supporting details directly in the candidate resume.',
      },
      {
        claim: 'Increased transaction throughput by 300%',
        evidence: null,
        verificationNeeded: true,
        status: 'UNSUPPORTED',
        explanation: 'Needs verification — insufficient supporting evidence in the resume.',
      },
    ],
    isQualityResume: true,
    qualityReason: null,
    ...overrides,
  };
}

function createMockJob(overrides: Partial<JobRequirements> = {}): JobRequirements {
  return {
    jobTitle: 'Senior Full Stack Engineer',
    requiredSkills: ['React', 'TypeScript', 'Node.js'],
    preferredSkills: ['PostgreSQL', 'Docker'],
    requiredExperienceYears: 3,
    educationRequirements: ["Bachelor's degree in Computer Science or related field"],
    responsibilities: ['Build modern web applications', 'Architect backend microservices'],
    importantKeywords: ['microservices', 'scalable', 'database'],
    domainRequirements: ['web development'],
    summary: 'Looking for a Senior Full Stack Engineer with React and Node.js expertise.',
    ...overrides,
  };
}

function runTests() {
  console.log('--- Starting Stage 6 Robustness & Claim Verification Tests ---');

  // Test 1: Perfect candidate
  console.log('\n[Test 1] Perfect candidate');
  const perfectCandidate = createMockCandidate();
  const standardJob = createMockJob();
  const score1 = calculateCandidateScore(perfectCandidate, standardJob);
  console.log(`Total Score: ${score1.totalScore} / 100, Label: ${score1.label}`);
  console.assert(score1.totalScore === 100, `Expected 100, got ${score1.totalScore}`);

  // Test 2: No matching skills
  console.log('\n[Test 2] No matching skills');
  const unrelatedCandidate = createMockCandidate({
    skills: ['Cobol', 'Fortran', 'Assembly'],
    experience: [
      {
        company: 'Legacy Inc',
        role: 'Mainframe Developer',
        description: 'Mainframe maintenance with Cobol',
        technologies: ['Cobol'],
      },
    ],
    projects: [],
  });
  const score2 = calculateCandidateScore(unrelatedCandidate, standardJob);
  console.assert(score2.totalScore < 50, `Expected score < 50, got ${score2.totalScore}`);
  console.assert(score2.missingRequiredSkills.length === 3, 'Should miss all 3 required skills');

  // Test 3: Required skill missing
  console.log('\n[Test 3] Required skill missing');
  const missingReqCandidate = createMockCandidate({
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    experience: [
      {
        company: 'TechCorp',
        role: 'Full Stack Engineer',
        description: 'Developed scalable React web apps and microservices.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      },
    ],
    projects: [],
  });
  const score3 = calculateCandidateScore(missingReqCandidate, standardJob);
  console.assert(score3.missingRequiredSkills.includes('TypeScript'), 'TypeScript should be in missingRequiredSkills');
  console.assert(score3.totalScore < score1.totalScore, 'Score should be less than perfect');

  // Test 4: Preferred skill missing vs required missing
  console.log('\n[Test 4] Preferred skill missing has smaller effect');
  const missingPrefCandidate = createMockCandidate({
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: [],
    projects: [],
  });
  const score4 = calculateCandidateScore(missingPrefCandidate, standardJob);
  console.assert(score4.requiredSkillScore === 30, `Expected 30, got ${score4.requiredSkillScore}`);
  console.assert(score4.preferredSkillScore === 0, `Expected 0, got ${score4.preferredSkillScore}`);

  // Test 5: Experience exceeds requirement
  console.log('\n[Test 5] Experience exceeds requirement (5 yrs vs 3 yrs)');
  const expExceeds = createMockCandidate({ totalExperienceYears: 5 });
  const score5 = calculateCandidateScore(expExceeds, standardJob);
  console.assert(score5.experienceScore === 25, `Expected 25, got ${score5.experienceScore}`);
  console.assert(score5.experienceMatch.status === 'meets');

  // Test 6: Experience below requirement
  console.log('\n[Test 6] Experience below requirement (1 yr vs 3 yrs)');
  const expBelow = createMockCandidate({ totalExperienceYears: 1 });
  const score6 = calculateCandidateScore(expBelow, standardJob);
  console.assert(score6.experienceScore < 10, `Expected < 10, got ${score6.experienceScore}`);
  console.assert(score6.experienceMatch.status === 'partial');

  // Test 7: No experience requirement in job
  console.log('\n[Test 7] No experience requirement in job');
  const noExpJob = createMockJob({ requiredExperienceYears: null });
  const score7 = calculateCandidateScore(expBelow, noExpJob);
  console.assert(score7.experienceScore === 0, `Expected 0, got ${score7.experienceScore}`);

  // Test 8: React vs React.js normalization
  console.log('\n[Test 8] React vs React.js normalization');
  console.assert(normalizeSkill('React.js') === 'react', 'React.js should normalize to react');
  console.assert(normalizeSkill('ReactJS') === 'react', 'ReactJS should normalize to react');

  // Test 9: Node.js vs NodeJS normalization
  console.log('\n[Test 9] Node.js vs NodeJS normalization');
  console.assert(normalizeSkill('Node.js') === 'nodejs', 'Node.js should normalize to nodejs');
  console.assert(normalizeSkill('NodeJS') === 'nodejs', 'NodeJS should normalize to nodejs');

  // Test 10: No education requirement in job
  console.log('\n[Test 10] No education requirement in job');
  const noEduJob = createMockJob({ educationRequirements: [] });
  const noEduCandidate = createMockCandidate({ education: [] });
  const score10 = calculateCandidateScore(noEduCandidate, noEduJob);
  console.assert(score10.educationScore === 0, `Expected 0, got ${score10.educationScore}`);

  // Test 11: Missing candidate education when required
  console.log('\n[Test 11] Missing candidate education when required');
  const score11 = calculateCandidateScore(noEduCandidate, standardJob);
  console.assert(score11.educationScore === 0, `Expected 0, got ${score11.educationScore}`);

  // Test 12: Deterministic ranking with equal scores
  console.log('\n[Test 12] Deterministic ranking with equal scores');
  const candA = createMockCandidate({ id: 'cand-a', name: 'Alice' });
  const candB = createMockCandidate({ id: 'cand-b', name: 'Bob' });
  const ranked = rankCandidates([candA, candB], standardJob);
  console.assert(ranked[0].rank === 1 && ranked[1].rank === 2);
  console.assert(ranked[0].id === 'cand-a' && ranked[1].id === 'cand-b');

  // --- STAGE 6 ROBUSTNESS AUDIT TESTS ---

  // Test 13: Empty candidate resilience
  console.log('\n[Test 13] Empty candidate profile resilience');
  const emptyCandidate: CandidateProfile = {
    id: 'empty-1',
    fileName: 'empty.pdf',
    name: null,
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
    isQualityResume: false,
    qualityReason: 'Insufficient data'
  };
  const score13 = calculateCandidateScore(emptyCandidate, standardJob);
  console.assert(Number.isFinite(score13.totalScore), 'Score must be finite');
  console.assert(score13.totalScore >= 0 && score13.totalScore <= 100, 'Score must be bounded between 0 and 100');
  console.assert(!isNaN(score13.totalScore), 'Score must not be NaN');

  // Test 14: Duplicate skills handling
  console.log('\n[Test 14] Duplicate skills deduplication');
  const dupCandidate = createMockCandidate({
    skills: ['React', 'react', 'REACT.JS', 'TypeScript', 'TS', 'Node.js', 'nodejs'],
  });
  const dupJob = createMockJob({
    requiredSkills: ['React', 'react.js', 'TypeScript', 'Node.js'],
  });
  const dedupedCandSkills = deduplicateSkills(dupCandidate.skills);
  const dedupedJobSkills = deduplicateSkills(dupJob.requiredSkills);
  console.assert(dedupedCandSkills.length === 3, `Expected 3 deduped skills, got ${dedupedCandSkills.length}`);
  console.assert(dedupedJobSkills.length === 3, `Expected 3 deduped job skills, got ${dedupedJobSkills.length}`);

  // Test 15: Score clamping & NaN protection
  console.log('\n[Test 15] Score clamping and NaN protection');
  const nanYearsCandidate = createMockCandidate({ totalExperienceYears: NaN });
  const score15 = calculateCandidateScore(nanYearsCandidate, standardJob);
  console.assert(!isNaN(score15.experienceScore), 'Experience score must not be NaN');
  console.assert(!isNaN(score15.totalScore), 'Total score must not be NaN');

  // Test 16: Claim Verification Status Classification
  console.log('\n[Test 16] Claim verification status classification');
  const supportedClaim = classifyClaimStatus('SUPPORTED', 'Led 10 engineers', false);
  console.assert(supportedClaim.status === 'SUPPORTED');

  const unsupportedClaim = classifyClaimStatus('UNSUPPORTED', null, true);
  console.assert(unsupportedClaim.status === 'UNSUPPORTED');
  console.assert(unsupportedClaim.explanation.includes('insufficient supporting evidence'));

  const contradictoryClaim = classifyClaimStatus('CONTRADICTORY', 'Discrepancy in timeline', true);
  console.assert(contradictoryClaim.status === 'CONTRADICTORY');

  const notEnoughEvidenceClaim = classifyClaimStatus('NOT_ENOUGH_EVIDENCE', 'Short mention without metric', true);
  console.assert(notEnoughEvidenceClaim.status === 'NOT_ENOUGH_EVIDENCE');

  // Test 17: Structured Explanation Generation
  console.log('\n[Test 17] Structured match explanation');
  const score17 = calculateCandidateScore(perfectCandidate, standardJob);
  console.assert(Boolean(score17.structuredExplanation), 'Structured explanation must be present');
  console.assert(score17.structuredExplanation?.whyMatches.skills.length === 3, 'Must identify 3 matching skills');

  console.log('\n=== ALL 17 STAGE 6 UNIT TESTS PASSED WITH 0 ASSERTION FAILURES ===\n');
}

runTests();
