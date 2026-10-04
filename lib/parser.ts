/**
 * Real PDF & DOCX text extraction module
 * Converts PDF / DOCX Buffer to cleaned, structured text.
 * Handles normal text PDFs, DOCX documents, scanned/empty files, and corrupted files gracefully.
 */

import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export interface PdfExtractionResult {
  success: boolean;
  fileName: string;
  rawText?: string;
  cleanedText?: string;
  textPreview?: string;
  characterCount?: number;
  wordCount?: number;
  pageCount?: number;
  isTruncated?: boolean;
  reason?: 'NO_TEXT_FOUND' | 'CORRUPTED' | 'INVALID_FILE' | 'UNKNOWN';
  message?: string;
}

const MAX_EXTRACTED_CHARACTERS = 100000; // 100k character limit per resume
const MIN_MEANINGFUL_CHAR_LENGTH = 30;   // Threshold to detect scanned / empty resumes
const MIN_MEANINGFUL_WORD_COUNT = 5;

/**
 * Safely cleans raw extracted text:
 * - Normalizes excessive inline whitespace
 * - Normalizes repeated blank lines (preserves paragraph breaks)
 * - Strips page footers/markers (e.g. "-- 1 of 2 --", "Page 1 of 3")
 * - Preserves bullet points, section headings, dates, skills, URLs, emails, and punctuation
 */
export function cleanExtractedText(raw: string): string {
  if (!raw) return '';

  return (
    raw
      // Remove null bytes and unprintable control characters (keep \t, \n)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Remove standalone page markers like "-- 1 of 2 --" or "Page 1 of 3"
      .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, '')
      .replace(/\bPage\s+\d+(\s+of\s+\d+)?\b/gi, '')
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      // Normalize multiple horizontal spaces/tabs into a single space (preserve newlines)
      .replace(/[^\S\n]+/g, ' ')
      // Normalize excessive consecutive blank lines down to double newline
      .replace(/\n{3,}/g, '\n\n')
      // Trim surrounding whitespace
      .trim()
  );
}

/**
 * Generates a clean preview snippet of the extracted text (first 250 characters).
 */
export function generateTextPreview(text: string, maxLength: number = 250): string {
  if (!text) return '';
  const singleLine = text.replace(/\s+/g, ' ').trim();
  if (singleLine.length <= maxLength) return singleLine;
  return singleLine.slice(0, maxLength).trim() + '...';
}

/**
 * Extracts and cleans text from a PDF Buffer.
 * Does NOT throw errors - returns structured success/failure details.
 */
export async function extractTextFromPdf(
  buffer: Buffer,
  fileName: string = 'resume.pdf'
): Promise<PdfExtractionResult> {
  let parser: any = null;

  try {
    if (!buffer || buffer.length === 0) {
      return {
        success: false,
        fileName,
        reason: 'INVALID_FILE',
        message: `No data found in "${fileName}". The file is empty.`,
      };
    }

    // Initialize PDF parser with data Buffer
    parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

    const rawText = result?.text || '';
    const pageCount = result?.total || result?.pages?.length || 1;

    // Clean text
    let cleanedText = cleanExtractedText(rawText);

    // Check for oversized text and truncate safely if needed
    let isTruncated = false;
    if (cleanedText.length > MAX_EXTRACTED_CHARACTERS) {
      cleanedText =
        cleanedText.slice(0, MAX_EXTRACTED_CHARACTERS) +
        '\n\n[Extracted text truncated at 100,000 characters]';
      isTruncated = true;
    }

    const words = cleanedText.trim() ? cleanedText.trim().split(/\s+/).filter(Boolean) : [];
    const characterCount = cleanedText.length;
    const wordCount = words.length;

    // Detect scanned / image-only PDFs with no selectable text
    if (characterCount < MIN_MEANINGFUL_CHAR_LENGTH || wordCount < MIN_MEANINGFUL_WORD_COUNT) {
      return {
        success: false,
        fileName,
        pageCount,
        characterCount,
        wordCount,
        reason: 'NO_TEXT_FOUND',
        message: `This PDF appears to be scanned or image-based and contains no extractable text.`,
      };
    }

    return {
      success: true,
      fileName,
      rawText,
      cleanedText,
      textPreview: generateTextPreview(cleanedText),
      characterCount,
      wordCount,
      pageCount,
      isTruncated,
      message: 'Text extracted successfully',
    };
  } catch (err: any) {
    return {
      success: false,
      fileName,
      reason: 'CORRUPTED',
      message: `Could not read "${fileName}". The PDF may be corrupted or invalid.`,
    };
  } finally {
    if (parser && typeof parser.destroy === 'function') {
      try {
        await parser.destroy();
      } catch {
        // Ignore parser cleanup errors
      }
    }
  }
}

/**
 * Extracts and cleans text from a DOCX Buffer using mammoth.
 */
export async function extractTextFromDocx(
  buffer: Buffer,
  fileName: string = 'resume.docx'
): Promise<PdfExtractionResult> {
  try {
    if (!buffer || buffer.length === 0) {
      return {
        success: false,
        fileName,
        reason: 'INVALID_FILE',
        message: `No data found in "${fileName}". The file is empty.`,
      };
    }

    const result = await mammoth.extractRawText({ buffer });
    const rawText = result.value || '';
    let cleanedText = cleanExtractedText(rawText);

    let isTruncated = false;
    if (cleanedText.length > MAX_EXTRACTED_CHARACTERS) {
      cleanedText =
        cleanedText.slice(0, MAX_EXTRACTED_CHARACTERS) +
        '\n\n[Extracted text truncated at 100,000 characters]';
      isTruncated = true;
    }

    const words = cleanedText.trim() ? cleanedText.trim().split(/\s+/).filter(Boolean) : [];
    const characterCount = cleanedText.length;
    const wordCount = words.length;

    if (characterCount < MIN_MEANINGFUL_CHAR_LENGTH || wordCount < MIN_MEANINGFUL_WORD_COUNT) {
      return {
        success: false,
        fileName,
        characterCount,
        wordCount,
        reason: 'NO_TEXT_FOUND',
        message: `"${fileName}" contains no extractable text.`,
      };
    }

    return {
      success: true,
      fileName,
      rawText,
      cleanedText,
      textPreview: generateTextPreview(cleanedText),
      characterCount,
      wordCount,
      pageCount: 1,
      isTruncated,
      message: 'Text extracted successfully',
    };
  } catch (err: any) {
    return {
      success: false,
      fileName,
      reason: 'CORRUPTED',
      message: `Could not read "${fileName}". The file may be corrupted or invalid.`,
    };
  }
}

/**
 * Automatically routes PDF or DOCX file to the appropriate text extractor.
 */
export async function extractTextFromResume(
  buffer: Buffer,
  fileName: string
): Promise<PdfExtractionResult> {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.docx') || lower.endsWith('.doc')) {
    return extractTextFromDocx(buffer, fileName);
  }
  return extractTextFromPdf(buffer, fileName);
}
