/**
 * /api/analyze route handler
 * Stage 3: Real PDF text extraction & cleaning
 */

import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { extractTextFromPdf, PdfExtractionResult } from '../../../lib/parser';
import { AnalyzeStage3Response, ExtractedResumeItem } from '../../../lib/types';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Standard Web Request handler (Next.js App Router compatible)
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const jobDescription = formData.get('jobDescription');
    const rawResumes = formData.getAll('resumes');

    if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
      return Response.json(
        { success: false, error: 'No job description provided.' },
        { status: 400 }
      );
    }

    const resumes = rawResumes.filter((item): item is File => item instanceof File);

    if (resumes.length === 0) {
      return Response.json(
        { success: false, error: 'Please upload at least one resume.' },
        { status: 400 }
      );
    }

    if (resumes.length > MAX_FILES) {
      return Response.json(
        { success: false, error: `Maximum ${MAX_FILES} resumes allowed.` },
        { status: 400 }
      );
    }

    const results: ExtractedResumeItem[] = [];

    for (const file of resumes) {
      const isPdfName = file.name.toLowerCase().endsWith('.pdf');
      const isPdfType =
        file.type === 'application/pdf' ||
        file.type === 'application/x-pdf' ||
        file.type === '';

      if (!isPdfName && !isPdfType) {
        results.push({
          fileName: file.name,
          status: 'failed',
          reason: 'INVALID_FILE',
          message: 'Only PDF files are supported.',
        });
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        results.push({
          fileName: file.name,
          status: 'failed',
          reason: 'INVALID_FILE',
          message: `File exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`,
        });
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const extractRes: PdfExtractionResult = await extractTextFromPdf(buffer, file.name);

        if (extractRes.success) {
          results.push({
            fileName: file.name,
            status: 'processed',
            characterCount: extractRes.characterCount,
            wordCount: extractRes.wordCount,
            pageCount: extractRes.pageCount,
            textPreview: extractRes.textPreview,
            isTruncated: extractRes.isTruncated,
            message: extractRes.message,
          });
        } else {
          results.push({
            fileName: file.name,
            status: 'failed',
            reason: extractRes.reason,
            message: extractRes.message,
          });
        }
      } catch (err: any) {
        results.push({
          fileName: file.name,
          status: 'failed',
          reason: 'CORRUPTED',
          message: `Could not read "${file.name}". The PDF may be corrupted or invalid.`,
        });
      }
    }

    const processedCount = results.filter((r) => r.status === 'processed').length;
    const failedCount = results.filter((r) => r.status === 'failed').length;

    // If every uploaded resume failed extraction, return an overall error
    if (processedCount === 0) {
      return Response.json(
        {
          success: false,
          error: 'No readable text could be extracted from any of the uploaded resumes.',
          resumeCount: resumes.length,
          processedCount: 0,
          failedCount,
          jobDescriptionLength: jobDescription.trim().length,
          resumes: results,
        },
        { status: 400 }
      );
    }

    const responsePayload: AnalyzeStage3Response = {
      success: true,
      message: 'Resumes extracted successfully',
      jobDescriptionLength: jobDescription.trim().length,
      resumeCount: resumes.length,
      processedCount,
      failedCount,
      resumes: results,
    };

    return Response.json(responsePayload, { status: 200 });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: 'Something went wrong while processing the resumes. Please try again.',
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

    if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        error: 'No job description provided.',
      });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please upload at least one resume.',
      });
    }

    if (files.length > MAX_FILES) {
      return res.status(400).json({
        success: false,
        error: `Maximum ${MAX_FILES} resumes allowed.`,
      });
    }

    const results: ExtractedResumeItem[] = [];

    for (const file of files) {
      const isPdfName = file.originalname.toLowerCase().endsWith('.pdf');
      const isPdfMime =
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/x-pdf' ||
        file.mimetype === 'application/octet-stream';

      if (!isPdfName && !isPdfMime) {
        results.push({
          fileName: file.originalname,
          status: 'failed',
          reason: 'INVALID_FILE',
          message: 'Only PDF files are supported.',
        });
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        results.push({
          fileName: file.originalname,
          status: 'failed',
          reason: 'INVALID_FILE',
          message: `File exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`,
        });
        continue;
      }

      try {
        const extractRes: PdfExtractionResult = await extractTextFromPdf(
          file.buffer,
          file.originalname
        );

        if (extractRes.success) {
          results.push({
            fileName: file.originalname,
            status: 'processed',
            characterCount: extractRes.characterCount,
            wordCount: extractRes.wordCount,
            pageCount: extractRes.pageCount,
            textPreview: extractRes.textPreview,
            isTruncated: extractRes.isTruncated,
            message: extractRes.message,
          });
        } else {
          results.push({
            fileName: file.originalname,
            status: 'failed',
            reason: extractRes.reason,
            message: extractRes.message,
          });
        }
      } catch (err: any) {
        results.push({
          fileName: file.originalname,
          status: 'failed',
          reason: 'CORRUPTED',
          message: `Could not read "${file.originalname}". The PDF may be corrupted or invalid.`,
        });
      }
    }

    const processedCount = results.filter((r) => r.status === 'processed').length;
    const failedCount = results.filter((r) => r.status === 'failed').length;

    // If every resume failed, return overall error
    if (processedCount === 0) {
      return res.status(400).json({
        success: false,
        error: 'No readable text could be extracted from any of the uploaded resumes.',
        resumeCount: files.length,
        processedCount: 0,
        failedCount,
        jobDescriptionLength: jobDescription.trim().length,
        resumes: results,
      });
    }

    const responsePayload: AnalyzeStage3Response = {
      success: true,
      message: 'Resumes extracted successfully',
      jobDescriptionLength: jobDescription.trim().length,
      resumeCount: files.length,
      processedCount,
      failedCount,
      resumes: results,
    };

    return res.status(200).json(responsePayload);
  } catch (err: any) {
    console.error('Server error in handleAnalyzeExpress:', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while processing the resumes. Please try again.',
    });
  }
}
