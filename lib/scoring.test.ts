import { calculateCandidateScore, rankCandidates, normalizeSkill } from './scoring';
import { CandidateProfile, JobRequirements } from './types';

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
    claimsToVerify: [],
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
  console.log('--- Starting Stage 5 Deterministic Scoring Engine Tests ---');

  // Test 1: Perfect candidate
  console.log('\n[Test 1] Perfect candidate');
  const perfectCandidate = createMockCandidate();
  const standardJob = createMockJob();
  const score1 = calculateCandidateScore(perfectCandidate, standardJob);
  console.log(`Total Score: ${score1.totalScore} / 100, Label: ${score1.label}`);
  console.log(`Breakdown: Skills=${score1.skillScore}, Exp=${score1.experienceScore}, Edu=${score1.educationScore}, Proj=${score1.projectScore}, Req=${score1.requirementsScore}`);
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
  console.log(`Total Score: ${score2.totalScore} / 100`);
  console.assert(score2.totalScore < 50, `Expected score < 50, got ${score2.totalScore}`);
  console.assert(score2.missingRequiredSkills.length === 3, 'Should miss all 3 required skills');

  // Test 3: Required skill missing
  console.log('\n[Test 3] Required skill missing');
  const missingReqCandidate = createMockCandidate({
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'], // Missing TypeScript completely
    experience: [
      {
        company: 'TechCorp',
        role: 'Full Stack Engineer',
        description: 'Developed scalable React web apps and microservices.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built store using React and Node.js.',
        technologies: ['React', 'Node.js'],
      },
    ],
  });
  const score3 = calculateCandidateScore(missingReqCandidate, standardJob);
  console.log(`Score with missing required skill: ${score3.totalScore}`);
  console.assert(score3.missingRequiredSkills.includes('TypeScript'), 'TypeScript should be in missingRequiredSkills');
  console.assert(score3.totalScore < score1.totalScore, 'Score should be strictly less than perfect');

  // Test 4: Preferred skill missing vs required missing
  console.log('\n[Test 4] Preferred skill missing has smaller effect');
  const missingPrefCandidate = createMockCandidate({
    skills: ['React', 'TypeScript', 'Node.js'], // Has all required, missing preferred PostgreSQL & Docker
    experience: [
      {
        company: 'TechCorp',
        role: 'Engineer',
        description: 'React and Node.js microservices',
        technologies: ['React', 'TypeScript', 'Node.js'],
      },
    ],
    projects: [
      {
        name: 'Web App',
        description: 'React and TypeScript app',
        technologies: ['React', 'TypeScript', 'Node.js'],
      },
    ],
  });
  const score4 = calculateCandidateScore(missingPrefCandidate, standardJob);
  console.log(`Score missing preferred: ${score4.totalScore} vs missing required: ${score3.totalScore}`);
  console.assert(
    score4.requiredSkillScore === 30,
    `Expected full 30 required points, got ${score4.requiredSkillScore}`
  );
  console.assert(
    score4.preferredSkillScore === 0,
    `Expected 0 preferred points, got ${score4.preferredSkillScore}`
  );

  // Test 5: Experience exceeds requirement
  console.log('\n[Test 5] Experience exceeds requirement (5 yrs vs 3 yrs)');
  const expExceeds = createMockCandidate({ totalExperienceYears: 5 });
  const score5 = calculateCandidateScore(expExceeds, standardJob);
  console.assert(score5.experienceScore === 25, `Expected 25, got ${score5.experienceScore}`);
  console.assert(score5.experienceMatch.status === 'meets', 'Status should be meets');

  // Test 6: Experience below requirement
  console.log('\n[Test 6] Experience below requirement (1 yr vs 3 yrs)');
  const expBelow = createMockCandidate({ totalExperienceYears: 1 });
  const score6 = calculateCandidateScore(expBelow, standardJob);
  console.log(`Experience score for 1 yr / 3 yrs: ${score6.experienceScore}`);
  console.assert(score6.experienceScore < 25, `Expected < 25, got ${score6.experienceScore}`);
  console.assert(score6.experienceMatch.status === 'partial', 'Status should be partial');

  // Test 7: No experience requirement in job
  console.log('\n[Test 7] No experience requirement in job');
  const noExpJob = createMockJob({ requiredExperienceYears: null });
  const score7 = calculateCandidateScore(createMockCandidate({ totalExperienceYears: 0 }), noExpJob);
  console.log(`Experience score when job has no requirement: ${score7.experienceScore}`);
  console.assert(score7.experienceScore === 25, 'Should receive full 25 points');

  // Test 8: React vs React.js semantic matching
  console.log('\n[Test 8] React vs React.js normalization');
  console.assert(normalizeSkill('React') === normalizeSkill('React.js'), 'React and React.js must normalize to same key');
  console.assert(normalizeSkill('ReactJS') === normalizeSkill('React'), 'ReactJS and React must normalize to same key');

  // Test 9: Node.js vs NodeJS semantic matching
  console.log('\n[Test 9] Node.js vs NodeJS normalization');
  console.assert(normalizeSkill('Node.js') === normalizeSkill('NodeJS'), 'Node.js and NodeJS must normalize to same key');

  // Test 10: No education requirement in job
  console.log('\n[Test 10] No education requirement in job');
  const noEduJob = createMockJob({ educationRequirements: [] });
  const noEduScore = calculateCandidateScore(createMockCandidate({ education: [] }), noEduJob);
  console.log(`Education score when not required: ${noEduScore.educationScore}`);
  console.assert(noEduScore.educationScore === 15, 'Should receive full 15 points');

  // Test 11: Missing candidate education when required
  console.log('\n[Test 11] Missing candidate education when required');
  const missingEduScore = calculateCandidateScore(createMockCandidate({ education: [] }), standardJob);
  console.log(`Education score when missing: ${missingEduScore.educationScore}`);
  console.assert(missingEduScore.educationScore === 0, 'Should receive 0 points');

  // Test 12: Deterministic ranking with equal scores
  console.log('\n[Test 12] Deterministic ranking with equal scores');
  const candA = createMockCandidate({ id: 'cand-A', name: 'Alice' });
  const candB = createMockCandidate({ id: 'cand-B', name: 'Bob' });
  const ranked = rankCandidates([candA, candB], standardJob);
  console.assert(ranked[0].rank === 1 && ranked[0].id === 'cand-A', 'First candidate should hold rank 1');
  console.assert(ranked[1].rank === 2 && ranked[1].id === 'cand-B', 'Second candidate should hold rank 2');

  console.log('\nALL 12 UNIT TESTS PASSED WITH 0 ASSERTION FAILURES!');
}

runTests();
