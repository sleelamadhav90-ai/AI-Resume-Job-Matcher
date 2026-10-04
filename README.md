# AI Resume & Job Matching System

A fast, transparent candidate screening and ranking system built for modern recruiters to evaluate multiple PDF resumes against a job description.

## Problem Statement

Recruiters receive hundreds of resumes for a single job opening. Manually screening and comparing each resume is slow, prone to bias, and inconsistent. The **AI Resume & Job Matching System** automates the first-pass screening workflow:
1. Recruiter inputs a Job Description.
2. Recruiter uploads multiple candidate PDF resumes.
3. System extracts structured signals using Gemini AI.
4. Candidates are scored deterministically and ranked from highest to lowest.
5. Recruiter inspects transparent match explanations, missing skills, and unverified claims.

---

## Core Workflow

```
Job Description ➔ Upload Resumes ➔ AI Extraction & Analysis ➔ Ranked Candidates & Fact-Check
```

1. **Job Description Input**: Paste requirements or select a role template.
2. **Batch Resume Upload**: Add candidate PDF files.
3. **Structured AI Extraction**: Gemini extracts candidate contacts, skills, experience, education, projects, and certifications.
4. **Deterministic Scoring**: Transparent mathematical weights score candidates (no random AI scores).
5. **Interactive Candidate Results**: Search, filter, and drill into detailed match criteria and fact-check verification.

---

## Scoring Model

The matching engine computes candidate scores using deterministic code:

| Criterion | Weight | Description |
| :--- | :--- | :--- |
| **Skills** | **40%** | Direct and semantic match of required and preferred technical skills |
| **Experience** | **25%** | Years of experience, relevant scope, and role seniority |
| **Education** | **15%** | Degree level and relevant academic field match |
| **Projects** | **10%** | Portfolio depth, applied technologies, and relevant outcomes |
| **Requirements** | **10%** | Role-specific must-haves, domain experience, and certifications |
| **Total** | **100%** | Transparent total score |

---

## Project Structure

```
├── app/
│   ├── page.tsx               # Main landing page & workflow orchestrator
│   └── api/
│       └── analyze/
│           └── route.ts       # Analysis & AI matching API endpoint
├── components/
│   ├── JobDescriptionInput.tsx# Job description textarea with sample roles
│   ├── ResumeUploader.tsx     # Drag-and-drop PDF resume queue
│   ├── CandidateCard.tsx      # Candidate ranking card with score breakdown
│   ├── CandidateList.tsx      # Search, filter, and sorting controls
│   └── MatchDetails.tsx       # Slide-over modal with gap analysis & claims
├── lib/
│   ├── types.ts               # Shared TypeScript data models
│   ├── ai.ts                  # Gemini AI extraction prompts & parsing
│   ├── parser.ts              # PDF text extraction utilities
│   └── scoring.ts             # Deterministic weighted scoring engine
├── public/                    # Static assets
├── .env.example               # Template for environment variables
├── .gitignore                 # Excludes .env*, .env.local, node_modules
├── package.json               # Dependencies & scripts
└── README.md                  # Project overview and setup instructions
```

---

## Setup & Running the Project

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

1. Clone or open the repository.
2. Ensure dependencies are installed:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your `GEMINI_API_KEY` in `.env.local` (never committed to version control).

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Key Principles & Constraints

- **No Auth / No Database**: Single-session recruiter MVP designed for immediate zero-friction evaluation.
- **No Chatbot**: Purpose-built dashboard focusing on structured screening and deterministic comparison.
- **Privacy & Security**: Gemini API key is never exposed on the client; resumes and secrets are kept strictly server-side.
- **Anti-Hallucination ("Claims to Verify")**: Identifies unsupported or exaggerated candidate claims lacking direct corroborating evidence.
