/**
 * /api/analyze route handler
 * Stage 5: Real PDF & DOCX text extraction + Gemini AI extraction + Deterministic Scoring & Ranking
 */

import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { extractTextFromResume, PdfExtractionResult } from '../../../lib/parser';
import { extractCandidateFromResume, extractJobRequirements } from '../../../lib/ai';
import { rankCandidates } from '../../../lib/scoring';
import {
  AnalyzeStage5Response,
  CandidateProfile,
  ExtractedResumeItem,
  FailedCandidateItem,
  JobRequirements,
  RankedCandidate
} from '../../../lib/types';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Core business workflow for Stage 5 analysis:
 * 1. Extract raw text from PDF & DOCX resumes and filter valid files
 * 2. Verify Gemini API configuration
 * 3. Extract structured job requirements via Gemini (1 call)
 * 4. Extract structured candidate profiles via Gemini (1 call per valid resume)
 * 5. Deterministically score & rank candidates using lib/scoring.ts
 */
async function processAnalyzeWorkflow(
  jobDescription: string,
  resumeFiles: Array<{ name: string; buffer: Buffer }>
): Promise<{ statusCode: number; data: AnalyzeStage5Response }> {
  // 1. Validate inputs
  if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Validation failed',
        error: 'No job description provided.',
        candidates: [],
        failedCandidates: [],
        unprocessedResumes: [],
      },
    };
  }

  if (!resumeFiles || resumeFiles.length === 0) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Validation failed',
        error: 'Please upload at least one resume (PDF or DOCX).',
        candidates: [],
        failedCandidates: [],
        unprocessedResumes: [],
      },
    };
  }

  if (resumeFiles.length > MAX_FILES) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Validation failed',
        error: `Maximum ${MAX_FILES} resumes allowed per analysis run.`,
        candidates: [],
        failedCandidates: [],
        unprocessedResumes: [],
      },
    };
  }

  // 2. Stage 3: PDF / DOCX Text Extraction
  const textExtractionResults: Array<{
    name: string;
    text: string;
    extraction: PdfExtractionResult;
  }> = [];
  const unprocessedResumes: ExtractedResumeItem[] = [];

  for (const file of resumeFiles) {
    const lowerName = file.name.toLowerCase();
    const isSupportedFormat = lowerName.endsWith('.pdf') || lowerName.endsWith('.docx') || lowerName.endsWith('.doc');

    if (!isSupportedFormat) {
      unprocessedResumes.push({
        fileName: file.name,
        status: 'failed',
        reason: 'INVALID_FILE',
        message: 'Only PDF and DOCX resume files are supported.',
      });
      continue;
    }

    if (file.buffer.length > MAX_FILE_SIZE) {
      unprocessedResumes.push({
        fileName: file.name,
        status: 'failed',
        reason: 'INVALID_FILE',
        message: `File exceeds 5 MB limit (${(file.buffer.length / (1024 * 1024)).toFixed(1)} MB).`,
      });
      continue;
    }

    try {
      const extraction = await extractTextFromResume(file.buffer, file.name);
      if (extraction.success && extraction.cleanedText) {
        textExtractionResults.push({
          name: file.name,
          text: extraction.cleanedText,
          extraction,
        });
      } else {
        unprocessedResumes.push({
          fileName: file.name,
          status: 'failed',
          reason: extraction.reason,
          message: extraction.message,
        });
      }
    } catch {
      unprocessedResumes.push({
        fileName: file.name,
        status: 'failed',
        reason: 'CORRUPTED',
        message: `Could not read "${file.name}". The file may be corrupted or unreadable.`,
      });
    }
  }

  // Check if any resume was readable
  if (textExtractionResults.length === 0) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Extraction failed',
        error: 'No readable text could be extracted from any of the uploaded resumes.',
        candidates: [],
        failedCandidates: [],
        unprocessedResumes,
      },
    };
  }

  // 3. Check Gemini API key configuration
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return {
      statusCode: 500,
      data: {
        success: false,
        message: 'Configuration error',
        error: 'GEMINI_API_KEY is not configured.',
        candidates: [],
        failedCandidates: [],
        unprocessedResumes,
      },
    };
  }

  // 4. Extract Structured Job Requirements (1 Gemini request)
  let jobRequirements: JobRequirements;
  try {
    jobRequirements = await extractJobRequirements(jobDescription);
  } catch (err: any) {
    console.error('Job requirements extraction failed:', err);
    return {
      statusCode: 502,
      data: {
        success: false,
        message: 'Job analysis error',
        error: `AI extraction for job description failed: ${err.message || 'Please try again.'}`,
        candidates: [],
        failedCandidates: [],
        unprocessedResumes,
      },
    };
  }

  // 5. Extract Structured Candidate Profiles (1 Gemini request per valid resume)
  const successfulProfiles: CandidateProfile[] = [];
  const failedCandidates: FailedCandidateItem[] = [];

  for (let i = 0; i < textExtractionResults.length; i++) {
    const item = textExtractionResults[i];
    const candidateId = `candidate-${i + 1}-${Date.now().toString(36)}`;

    try {
      const profile = await extractCandidateFromResume(item.text, item.name, candidateId);
      successfulProfiles.push(profile);
    } catch (err: any) {
      console.error(`AI extraction failed for ${item.name}:`, err);
      failedCandidates.push({
        id: candidateId,
        fileName: item.name,
        status: 'failed',
        reason: 'AI_EXTRACTION_FAILED',
        message: err.message || 'AI extraction temporarily failed for this resume.',
      });
    }
  }

  if (successfulProfiles.length === 0 && failedCandidates.length > 0) {
    return {
      statusCode: 502,
      data: {
        success: false,
        message: 'AI processing error',
        error: 'AI extraction temporarily failed for all candidate resumes. Please try again.',
        jobRequirements,
        candidates: [],
        failedCandidates,
        unprocessedResumes,
      },
    };
  }

  // 6. Stage 5: Deterministic Scoring & Ranking
  const rankedCandidates: RankedCandidate[] = rankCandidates(successfulProfiles, jobRequirements);

  return {
    statusCode: 200,
    data: {
      success: true,
      message: 'Candidate matching and scoring completed successfully',
      jobRequirements,
      candidates: rankedCandidates,
      failedCandidates,
      unprocessedResumes,
    },
  };
}

/**
 * Standard Web Request handler (Next.js App Router compatible)
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const jobDescription = formData.get('jobDescription') as string;
    const rawResumes = formData.getAll('resumes');

    const resumeFiles: Array<{ name: string; buffer: Buffer }> = [];
    for (const item of rawResumes) {
      if (item instanceof File) {
        const arrayBuffer = await item.arrayBuffer();
        resumeFiles.push({
          name: item.name,
          buffer: Buffer.from(arrayBuffer),
        });
      }
    }

    const { statusCode, data } = await processAnalyzeWorkflow(jobDescription, resumeFiles);
    return Response.json(data, { status: statusCode });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        message: 'Server error',
        error: 'Something went wrong while processing the resumes. Please try again.',
        candidates: [],
        failedCandidates: [],
        unprocessedResumes: [],
      },
      { status: 500 }
    );
  }
}

/**
 * Express Route Handler (Node.js server.ts compatible)
 */
export async function handleAnalyzeExpress(req: ExpressRequest, res: ExpressResponse) {
  try {
    const jobDescription = req.body?.jobDescription;
    const files = (req.files as Express.Multer.File[]) || [];

    const resumeFiles: Array<{ name: string; buffer: Buffer }> = files.map((f) => ({
      name: f.originalname,
      buffer: f.buffer,
    }));

    const { statusCode, data } = await processAnalyzeWorkflow(jobDescription, resumeFiles);
    return res.status(statusCode).json(data);
  } catch (err: any) {
    console.error('Server error in handleAnalyzeExpress:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: 'Something went wrong while processing the resumes. Please try again.',
      candidates: [],
      failedCandidates: [],
      unprocessedResumes: [],
    });
  }
}
