# HireMe AI

## Find the right talent. Understand why.

**Live Demo:** [https://ais-dev-kv2l3mq6xaieowqifjz2vl-906787466824.asia-southeast1.run.app](https://ais-dev-kv2l3mq6xaieowqifjz2vl-906787466824.asia-southeast1.run.app)

---

## 1. Overview

**HireMe AI** is an explainable AI resume and job matching system that helps recruiters analyze multiple resumes against a job description, rank candidates using a deterministic scoring engine, and understand the evidence behind every match.

---

## 2. The Problem

Recruiters may receive hundreds of resumes for one position. 
* Keyword-based filtering can miss contextual skill synonyms.
* Black-box AI scoring can make recommendations difficult to trust or audit.

HireMe AI combines AI-powered factual extraction with deterministic matching and evidence-based explanations, giving recruiters complete confidence in their hiring pipeline.

---

## 3. The Solution Workflow

```
Job Description 
      ↓
Resume Upload (Batch PDF)
      ↓
PDF Text Extraction (pdf-parse)
      ↓
Structured AI Extraction (Google Gemini)
      ↓
Deterministic Matching Rubric (100 pts)
      ↓
Candidate Ranking & Tiering
      ↓
Evidence & Explanation Inspection
      ↓
Recruiter Decision & Shortlisting
```

---

## 4. Key Features

* **Multiple PDF Resume Upload**: Ingest unformatted resume batches instantly.
* **Job Description Analysis**: Parse mandatory skills, experience thresholds, and education requirements.
* **Structured Candidate Extraction**: Extract normalized skills, tenure, projects, and educational degrees.
* **Skill Normalization**: Handle aliases and case variations (e.g., `React.js` $\leftrightarrow$ `React`).
* **Deterministic 100-Point Matching**: Mathematically calculate scores without LLM score drift.
* **Candidate Ranking & Filtering**: Sort and filter candidates by match tier and score.
* **Explainable Match Details**: Inspect matched vs. missing skills and tenure calculations.
* **Verbatim Evidence Excerpts**: View exact resume quotes supporting each candidate score.
* **Claim Verification**: Audit candidate claims across 4 distinct credibility states.
* **Recruiter Shortlisting**: Bookmark candidates for hiring manager review.
* **Batch & Edge-Case Resilience**: Gracefully isolate corrupt or unreadable PDFs without breaking batch processing.

---

## 5. Scoring Model (100-Point Rubric)

HireMe AI separates AI fact extraction from mathematical scoring. Gemini does **not** directly determine the final candidate score. The final score is calculated by the deterministic scoring engine (`lib/scoring.ts`):

| Rubric Dimension | Points |
| :--- | :--- |
| **Required Skills** | 30 |
| **Preferred Skills** | 10 |
| **Experience Tenure** | 25 |
| **Education Alignment** | 15 |
| **Projects & Relevance** | 10 |
| **Other Requirements** | 10 |
| **TOTAL** | **100** |

---

## 6. Why This Is Different

HireMe AI separates AI extraction from candidate scoring:
1. **AI Extraction**: Converts messy unstructured resumes into clean structured candidate information.
2. **Deterministic Engine**: Evaluates that structured information against job requirements mathematically.
3. **Auditable Explanation**: Recruiters can inspect exactly what matched, what was missing, why points were awarded, supporting resume evidence, and claims requiring verification.

---

## 7. Claim Verification Taxonomy

HireMe AI audits candidate claims to assist recruiters in technical screening across 4 supported states:
* `SUPPORTED`: Claim is confirmed by verbatim work experience and production metrics in the resume.
* `NOT_ENOUGH_EVIDENCE`: Skill or title is listed without supporting tenure, project, or company context.
* `UNSUPPORTED`: Significant metrics or achievements claimed without substantiation in employment history.
* `CONTRADICTORY`: Timeline, graduation date, or tenure calculations conflict with other resume sections.

---

## 8. Architecture

```mermaid
graph TD
    A[Recruiter] -->|Uploads PDF & JD| B[React + TypeScript + Vite Frontend]
    B -->|POST /api/analyze| C[Express API Backend]
    C -->|Extracts Text| D[PDF Parser (pdf-parse)]
    C -->|Extracts Facts| E[Google Gemini API]
    D --> F[Structured Candidate & JD Facts]
    E --> F
    F --> G[Deterministic Scoring Engine (lib/scoring.ts)]
    G --> H[Ranked Candidate Stream & Evidence Dossier]
    H --> B
```

---

## 9. Technology Stack

* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React.
* **Backend**: Node.js, Express, TypeScript (`tsx`), Multer, pdf-parse.
* **AI Engine**: Google Gemini, `@google/genai`.
* **Testing & Quality**: TypeScript compiler (`tsc`), automated scoring and session integrity test suites (`lib/scoring.test.ts`, `lib/session.test.ts`).

---

## 10. Local Setup & Testing

### Prerequisites
* Node.js (v18+)
* Google Gemini API Key

### Installation
```bash
git clone https://github.com/sleelamadhav90-ai/HireMe-AI.git
cd HireMe-AI
npm install
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
PORT=3000
```

### Running Development Server
```bash
npm run dev
```

### Running Production Build & Start
```bash
npm run build
npm start
```

### Running Automated Tests
```bash
npm test
```

### Type Checking
```bash
npx tsc --noEmit
```

---

## 11. Verified Testing Status

* **23/23 automated tests passing** (17 unit scoring/claim verification tests + 6 session data flow integrity tests).

---

## 12. Limitations

* **Scanned / Image-only PDFs**: PDFs containing only rasterized scanned images without embedded text streams require OCR integration.
* **Evidence-Based Auditing**: Claim verification relies strictly on extracted resume text; external portfolio verification is not performed.
* **Human Judgment**: HireMe AI assists recruiters in screening but does not replace human hiring decisions.
* **Stateless Demo Session**: The demo operates in-memory per session and does not persist records to an external enterprise database or OAuth authentication layer.

---

## 13. AI Disclosure

Google Gemini (`gemini-3.1-flash-lite`) is used strictly for schema-constrained factual extraction and evidence/claim analysis via the official `@google/genai` TypeScript SDK. The final candidate score and ranking are calculated by HireMe AI's deterministic scoring engine rather than asking the LLM to directly assign the final score. The project was developed with AI-assisted coding where applicable.
