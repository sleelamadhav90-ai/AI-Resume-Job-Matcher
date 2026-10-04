# HireMe AI

> **Find the right talent. Understand why.**

An enterprise recruitment platform that extracts structured facts from resumes, evaluates candidates against job description criteria, deterministically scores qualifications, and provides transparent, evidence-based matching breakdowns.

---

## Problem

Recruiters receive hundreds of resumes per job opening and need a fast, objective, and explainable method to evaluate and shortlist candidates. Traditional keyword matching misses technical synonyms and context, while generic LLM scoring suffers from hallucinations, inconsistent scoring, and lack of auditability.

---

## Solution

**HireMe AI** separates **factual extraction** from **candidate scoring**:
1. **Factual Extraction**: Google Gemini AI parses resumes and job descriptions into structured, normalized data models (skills, experience duration, projects, education, claims).
2. **Deterministic Scoring**: A 100-point mathematical scoring algorithm evaluates candidates against requirements with semantic skill normalization, tenure verification, and evidence extraction—without AI hallucinations or score drift.

---

## Core Features

* **Multiple PDF Resume Upload**: Batch upload candidate resumes (up to 10 files, 5 MB each) with client and server validation.
* **Job Requisition Analysis**: Distinguishes strictly between *Required (Must-Have)* and *Preferred (Nice-to-Have)* skills, experience tenure, and degree requirements.
* **AI-Powered Structured Extraction**: Extracts explicit skills, chronological experience, portfolio projects, education, and candidate claims.
* **Deterministic 100-Point Candidate Scoring**: Explainable mathematical model with fixed category weights.
* **Candidate Ranking**: Stable, deterministic secondary ordering (`Total Score` $\to$ `Required Skills` $\to$ `Experience Tenure` $\to$ `Upload Index`).
* **Evidence-Based Match Details**: Provides verbatim resume excerpts and verified project evidence demonstrating where each skill match was identified.
* **4-Tier Claim Verification**: Classifies candidate claims into `SUPPORTED`, `UNSUPPORTED`, `CONTRADICTORY`, and `NOT_ENOUGH_EVIDENCE` using recruiter-safe terminology.
* **Robust Incomplete Resume Handling**: Gracefully handles missing emails, missing phone numbers, unquantified tenures, and unlisted degrees without crashing or fabricating facts.
* **Recruiter Workspace & Pipeline**: Search, filter by score tiers/experience/skills, sort, shortlist candidates, and maintain recruiter logs.

---

## Technical Architecture

```
[ PDF Resumes ]
       │
       ▼
[ Client / Server PDF Parser ] (pdf-parse / text extraction)
       │
       ▼
[ Gemini AI Structured Extraction ] (@google/genai structured schemas)
       │
       ▼
[ Normalized Candidate Profiles & Job Criteria ]
       │
       ▼
[ Deterministic 100-Point Scoring Engine ] (lib/scoring.ts)
       │
       ▼
[ Stable Candidate Ranking & Explainable Match Analysis ]
       │
       ▼
[ Enterprise Recruitment UI ] (React 19 + Tailwind CSS + Vite)
```

---

## 100-Point Scoring Model

| Category | Points | Description |
| :--- | :---: | :--- |
| **Required Skills** | **30** | Proportion of mandatory technical qualifications satisfied (with alias normalization). |
| **Preferred Skills** | **10** | Proportion of optional/bonus qualifications satisfied. |
| **Experience Tenure** | **25** | Candidate tenure compared to job minimums ($\min(\text{candYears}/\text{reqYears}, 1) \times 25$). |
| **Education Alignment** | **15** | Degree level (Bachelor's, Master's, PhD) and discipline evaluation. |
| **Project Evidence** | **10** | Evidenced technology implementation across portfolio projects. |
| **Role Requirements** | **10** | Domain requirements, core responsibilities, and industry keywords. |
| **Total Score** | **100** | Clamped to $0 \le \text{Score} \le 100$ with tier mapping (*Strong, Good, Moderate, Weak*). |

---

## AI Disclosure

* **Where AI is Used**: Google Gemini AI is used solely as a structured information extraction engine to parse unstructured PDF text into typed candidate profiles and job requirements.
* **Where AI is NOT Used**: Candidate scoring, percentage calculations, skill gap identification, and final ranking are performed **100% deterministically by the mathematical scoring algorithm** in `lib/scoring.ts`.

---

## Known Limitations

* **Scanned Image PDFs**: Scanned image-only PDFs without an embedded text layer require OCR before upload.
* **Resume Grounding**: Claim verification evaluates only evidence explicitly stated within the uploaded resume text.
* **External Portfolios**: Direct verification of live external URLs and third-party references is outside the current MVP scope.

---

## Setup & Local Run Instructions

### Prerequisites
* Node.js 18+ or Bun
* A valid `GEMINI_API_KEY`

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Unit Tests
```bash
npx tsx lib/scoring.test.ts
```

### 5. Build for Production
```bash
npm run build
npm start
```
