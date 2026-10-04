# HireMe AI — Algothon'26 Submission (Track: ALG-AI-01)

> **Find the right talent. Understand why.**

**HireMe AI** is an AI Resume & Job Matching System built for **ALGOTHON'26 (Problem Statement ALG-AI-01)**. It extracts structured facts from PDF resumes, deterministically evaluates candidates against job descriptions using a 100-point rubric, audits candidate claims with verbatim evidence, and delivers an explainable recruiter workspace.

---

## 1. Problem Statement

Recruiters receive hundreds of resumes per requisition. Traditional keyword-based applicant tracking systems (ATS) miss semantic skill synonyms, while naive LLM scoring systems hallucinate experience, drift on repeat runs, and offer zero auditable evidence. Recruiters need a system that:
* Ingests unformatted, messy PDF resumes in batch.
* Accurately parses required vs. preferred criteria.
* Deterministically scores and ranks candidates without model hallucination.
* Explains the *reason* behind every score with verbatim evidence.
* Identifies unsupported or contradictory resume claims.

---

## 2. Architecture & Pipeline

HireMe AI strictly separates **AI Fact Extraction** from **Deterministic Mathematical Scoring**:

```
[ Candidate PDF Resumes ]              [ Job Description Input ]
           │                                       │
           ▼                                       ▼
[ PDF Text Extractor (pdf-parse) ]      [ Job Criteria Schema ]
           │                                       │
           ▼                                       ▼
[ Gemini 2.5 Structured Extraction ]    [ Gemini 2.5 Criteria Parser ]
           │                                       │
           ▼                                       ▼
  [ Candidate Facts Dossier ]             [ Structured Job Requirements ]
  (Skills, Tenure, Projects, Degrees)     (Required vs Preferred Skills, Years, Degree)
           │                                       │
           └───────────────────┬───────────────────┘
                               │
                               ▼
            [ Deterministic 100-Point Scoring Engine ]
            (lib/scoring.ts — Weighted Mathematical Rubric)
                               │
                               ▼
             [ 4-Tier Claim Verification Engine ]
             (SUPPORTED / UNSUPPORTED / CONTRADICTORY / NOT ENOUGH EVIDENCE)
                               │
                               ▼
              [ Stable Deterministic Ranking ]
              (Score → Required Skills → Tenure → Index)
                               │
                               ▼
        [ Enterprise Recruiter Workspace & Dossier Inspection ]
```

---

## 3. Deterministic 100-Point Scoring Rubric

HireMe AI employs a weighted rubric where every point is auditable:

| Rubric Dimension | Max Points | Evaluation Logic |
| :--- | :--- | :--- |
| **Required Skills** | **30 pts** | Proportional credit $\frac{\text{matched}}{\text{total required}} \times 30$ with semantic normalization (`React.js` $\leftrightarrow$ `React`). |
| **Experience Tenure** | **25 pts** | Full 25 pts awarded if candidate meets/exceeds required tenure; pro-rated curve for partial tenure. |
| **Education Alignment** | **15 pts** | Evaluates degree level (BS/MS/PhD) and STEM discipline relevance against role criteria. |
| **Preferred Skills** | **10 pts** | Bonus points for nice-to-have technical qualifications. |
| **Projects & Relevance** | **10 pts** | Evaluates production scale, architecture complexity, and technology alignment in portfolio work. |
| **Domain & Other Criteria** | **10 pts** | Evaluates certifications, industry domain fit (Fintech, Cloud, etc.), and role alignment. |
| **Total** | **100 pts** | Total score mapped to tiers: **Strong** ($\ge 85$), **Good** ($70-84$), **Moderate** ($55-69$), **Weak** ($< 55$). |

---

## 4. 4-Tier Claim Verification Taxonomy

HireMe AI audits resume claims to assist recruiters in technical screening:
* `SUPPORTED`: Claim is confirmed by verbatim work experience and production metrics in the resume.
* `NOT_ENOUGH_EVIDENCE`: Skill or title is listed without supporting tenure, project, or company context.
* `UNSUPPORTED`: Significant metrics or achievements claimed without substantiation in employment history.
* `CONTRADICTORY`: Timeline, graduation date, or tenure calculations conflict with other resume sections.

---

## 5. Robustness & Messy Resume Handling

HireMe AI gracefully handles edge cases:
* **Missing Contact Info**: Assigns fallback candidate identifiers without failing the batch.
* **Unquantified Tenure**: Computes career tenure from chronological company date spans.
* **Skill Deduplication**: Normalizes case, aliases, and duplicate tokens (`NodeJS`, `Node.js`, `node`).
* **Unreadable PDFs**: Gracefully flags corrupted or password-locked files without interrupting the analysis of other valid resumes in the batch.

---

## 6. Limitations & AI Disclosure

* **Scanned / Image-only PDFs**: PDFs containing only rasterized scanned images without embedded text streams are flagged as `IMAGE-BASED PDF (Text extraction unavailable)` rather than fabricating candidate data. OCR integration is documented as a production pipeline extension.
* **AI Model Disclosure**: Google Gemini (`gemini-2.5-flash`) is used strictly for schema-constrained factual extraction via the official `@google/genai` TypeScript SDK. Scoring is 100% deterministic and mathematical.

---

## 7. Verification & Automated Tests

Run the complete test suite:
```bash
npm test
```
Tests cover:
* 17 Stage 6 robustness, normalization, scoring, and claim classification unit tests.
* 6 Algothon session integrity, data flow isolation, and search/filter verification tests.
