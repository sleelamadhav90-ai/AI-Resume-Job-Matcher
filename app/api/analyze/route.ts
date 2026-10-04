/**
 * /api/analyze route handler
 * Stage 4: Real PDF text extraction + Gemini AI structured extraction
 * Handles job requirements extraction and per-candidate factual profiling.
 */

import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { extractTextFromPdf, PdfExtractionResult } from '../../../lib/parser';
import { extractCandidateFromResume, extractJobRequirements } from '../../../lib/ai';
import {
  AnalyzeStage4Response,
  CandidateExtractionItem,
  ExtractedResumeItem,
  JobRequirements
} from '../../../lib/types';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Core business workflow for Stage 4 analysis:
 * 1. Extract raw PDF text and filter valid resumes
 * 2. Verify Gemini API configuration
 * 3. Extract structured job requirements via Gemini (1 call)
 * 4. Extract structured candidate profiles via Gemini (1 call per valid resume)
 */
async function processAnalyzeWorkflow(
  jobDescription: string,
  pdfFiles: Array<{ name: string; buffer: Buffer }>
): Promise<{ statusCode: number; data: AnalyzeStage4Response }> {
  // 1. Validate inputs
  if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Validation failed',
        error: 'No job description provided.',
        candidates: [],
        unprocessedResumes: [],
      },
    };
  }

  if (!pdfFiles || pdfFiles.length === 0) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Validation failed',
        error: 'Please upload at least one resume.',
        candidates: [],
        unprocessedResumes: [],
      },
    };
  }

  if (pdfFiles.length > MAX_FILES) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Validation failed',
        error: `Maximum ${MAX_FILES} resumes allowed.`,
        candidates: [],
        unprocessedResumes: [],
      },
    };
  }

  // 2. Stage 3: PDF Text Extraction
  const textExtractionResults: Array<{
    name: string;
    text: string;
    extraction: PdfExtractionResult;
  }> = [];
  const unprocessedResumes: ExtractedResumeItem[] = [];

  for (const file of pdfFiles) {
    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      unprocessedResumes.push({
        fileName: file.name,
        status: 'failed',
        reason: 'INVALID_FILE',
        message: 'Only PDF files are supported.',
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
      const extraction = await extractTextFromPdf(file.buffer, file.name);
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
        message: `Could not read "${file.name}". The PDF may be corrupted or invalid.`,
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
        unprocessedResumes,
      },
    };
  }

  // 5. Extract Structured Candidate Profiles (1 Gemini request per resume)
  const candidateResults: CandidateExtractionItem[] = [];

  for (let i = 0; i < textExtractionResults.length; i++) {
    const item = textExtractionResults[i];
    const candidateId = `candidate-${i + 1}-${Date.now().toString(36)}`;

    try {
      const profile = await extractCandidateFromResume(item.text, item.name, candidateId);
      candidateResults.push({
        id: candidateId,
        fileName: item.name,
        status: 'processed',
        profile,
      });
    } catch (err: any) {
      console.error(`AI extraction failed for ${item.name}:`, err);
      candidateResults.push({
        id: candidateId,
        fileName: item.name,
        status: 'failed',
        reason: 'AI_EXTRACTION_FAILED',
        message: err.message || 'AI extraction temporarily failed for this resume.',
      });
    }
  }

  const processedCandidatesCount = candidateResults.filter((c) => c.status === 'processed').length;

  if (processedCandidatesCount === 0 && candidateResults.length > 0) {
    return {
      statusCode: 502,
      data: {
        success: false,
        message: 'AI processing error',
        error: 'AI extraction temporarily failed for all candidate resumes. Please try again.',
        jobRequirements,
        candidates: candidateResults,
        unprocessedResumes,
      },
    };
  }

  return {
    statusCode: 200,
    data: {
      success: true,
      message: 'AI structured extraction completed successfully',
      jobRequirements,
      candidates: candidateResults,
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

    const pdfFiles: Array<{ name: string; buffer: Buffer }> = [];
    for (const item of rawResumes) {
      if (item instanceof File) {
        const arrayBuffer = await item.arrayBuffer();
        pdfFiles.push({
          name: item.name,
          buffer: Buffer.from(arrayBuffer),
        });
      }
    }

    const { statusCode, data } = await processAnalyzeWorkflow(jobDescription, pdfFiles);
    return Response.json(data, { status: statusCode });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        message: 'Server error',
        error: 'Something went wrong while processing the resumes. Please try again.',
        candidates: [],
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

    const pdfFiles: Array<{ name: string; buffer: Buffer }> = files.map((f) => ({
      name: f.originalname,
      buffer: f.buffer,
    }));

    const { statusCode, data } = await processAnalyzeWorkflow(jobDescription, pdfFiles);
    return res.status(statusCode).json(data);
  } catch (err: any) {
    console.error('Server error in handleAnalyzeExpress:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: 'Something went wrong while processing the resumes. Please try again.',
      candidates: [],
      unprocessedResumes: [],
    });
  }
}
