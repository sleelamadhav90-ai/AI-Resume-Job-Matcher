/**
 * /api/analyze route handler
 * Accepts multipart/form-data with:
 * - jobDescription: string
 * - resumes: File[] (multiple PDF files, max 10, max 5MB each)
 */

import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export interface FileSummary {
  name: string;
  size: number;
}

export interface AnalyzeSuccessResponse {
  success: true;
  message: string;
  jobDescriptionLength: number;
  resumeCount: number;
  files: FileSummary[];
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 10;

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

    const invalidFiles: string[] = [];
    const validFiles: FileSummary[] = [];

    for (const file of resumes) {
      const isPdfName = file.name.toLowerCase().endsWith('.pdf');
      const isPdfType =
        file.type === 'application/pdf' ||
        file.type === 'application/x-pdf' ||
        file.type === '';

      if (!isPdfName && !isPdfType) {
        invalidFiles.push(`${file.name} (not a PDF)`);
      }
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(
          `${file.name} exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
        );
      }

      validFiles.push({
        name: file.name,
        size: file.size,
      });
    }

    if (invalidFiles.length > 0) {
      return Response.json(
        {
          success: false,
          error: `Invalid file(s): ${invalidFiles.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const responseData: AnalyzeSuccessResponse = {
      success: true,
      message: 'Files received successfully',
      jobDescriptionLength: jobDescription.trim().length,
      resumeCount: resumes.length,
      files: validFiles,
    };

    return Response.json(responseData, { status: 200 });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: 'Something went wrong while uploading the resumes. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * Express Route Handler (Node.js server.ts compatible)
 */
export function handleAnalyzeExpress(req: ExpressRequest, res: ExpressResponse) {
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

    const invalidFiles: string[] = [];
    const validFiles: FileSummary[] = [];

    for (const file of files) {
      const isPdfName = file.originalname.toLowerCase().endsWith('.pdf');
      const isPdfMime =
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/x-pdf' ||
        file.mimetype === 'application/octet-stream';

      if (!isPdfName && !isPdfMime) {
        invalidFiles.push(`${file.originalname} (not a PDF)`);
      }
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(
          `${file.originalname} exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
        );
      }

      validFiles.push({
        name: file.originalname,
        size: file.size,
      });
    }

    if (invalidFiles.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid file(s): ${invalidFiles.join(', ')}`,
      });
    }

    const responseData: AnalyzeSuccessResponse = {
      success: true,
      message: 'Files received successfully',
      jobDescriptionLength: jobDescription.trim().length,
      resumeCount: files.length,
      files: validFiles,
    };

    return res.status(200).json(responseData);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while uploading the resumes. Please try again.',
    });
  }
}
