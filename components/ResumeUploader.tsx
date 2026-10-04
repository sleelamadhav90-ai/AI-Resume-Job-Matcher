import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, AlertTriangle } from 'lucide-react';

interface ResumeUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
  error?: string;
  onClearError?: () => void;
}

const MAX_FILES = 10;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  files,
  onFilesChange,
  disabled = false,
  error,
  onClearError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [rejectionMessages, setRejectionMessages] = useState<string[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processIncomingFiles = (incomingList: FileList | File[]) => {
    const rawFiles = Array.from(incomingList);
    const newRejections: string[] = [];
    const validToAdd: File[] = [];

    let currentCount = files.length;

    for (const file of rawFiles) {
      // 1. PDF Check
      const isPdfName = file.name.toLowerCase().endsWith('.pdf');
      const isPdfType = !file.type || file.type === 'application/pdf';
      if (!isPdfName || !isPdfType) {
        newRejections.push(`"${file.name}" rejected: Only PDF files are supported.`);
        continue;
      }

      // 2. Size Check (5MB max)
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        newRejections.push(`"${file.name}" rejected: File size (${sizeMb} MB) exceeds the 5 MB limit.`);
        continue;
      }

      // 3. Duplicate Check
      const isDuplicate =
        files.some((f) => f.name === file.name && f.size === file.size) ||
        validToAdd.some((f) => f.name === file.name && f.size === file.size);

      if (isDuplicate) {
        newRejections.push(`"${file.name}" skipped: File is already in the queue.`);
        continue;
      }

      // 4. Max Count Check (10 resumes max)
      if (currentCount + validToAdd.length >= MAX_FILES) {
        newRejections.push(`Maximum limit of ${MAX_FILES} resumes reached. Additional files were not added.`);
        break;
      }

      validToAdd.push(file);
    }

    if (newRejections.length > 0) {
      setRejectionMessages(newRejections);
    } else {
      setRejectionMessages([]);
    }

    if (validToAdd.length > 0) {
      onFilesChange([...files, ...validToAdd]);
      if (error && onClearError) {
        onClearError();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    processIncomingFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const clearAllFiles = () => {
    onFilesChange([]);
    setRejectionMessages([]);
  };

  return (
    <div
      className={`bg-white rounded-xl border shadow-xs p-6 transition-all ${
        error
          ? 'border-rose-400 ring-2 ring-rose-500/10'
          : 'border-slate-200/80 hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-medium">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
              2. Upload Candidate Resumes
            </h2>
            <p className="text-xs text-slate-500">
              PDF only · Up to 10 resumes · Max 5 MB each
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {files.length}/{MAX_FILES} {files.length === 1 ? 'file' : 'files'}
        </span>
      </div>

      {/* Validation / External Error */}
      {error && (
        <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Rejection / Warning Box */}
      {rejectionMessages.length > 0 && (
        <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Upload Notices:
            </span>
            <button
              type="button"
              onClick={() => setRejectionMessages([])}
              className="text-amber-700 hover:text-amber-900 text-[11px]"
            >
              Dismiss
            </button>
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
            {rejectionMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Drop / Click Zone */}
      <div
        onClick={() => !disabled && files.length < MAX_FILES && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          disabled
            ? 'opacity-60 cursor-not-allowed border-slate-200 bg-slate-50'
            : files.length >= MAX_FILES
            ? 'opacity-70 cursor-not-allowed border-slate-200 bg-slate-50'
            : isDragOver
            ? 'border-indigo-600 bg-indigo-50/50 cursor-pointer'
            : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/20 bg-slate-50/50 cursor-pointer'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          disabled={disabled || files.length >= MAX_FILES}
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDragOver ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
            }`}
          >
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">
              {files.length >= MAX_FILES
                ? 'Maximum 10 resumes reached'
                : isDragOver
                ? 'Drop PDF resumes here'
                : 'Click to browse or drag & drop PDF resumes'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict PDF enforcement · Max 5 MB per file
            </p>
          </div>
        </div>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-medium text-slate-600 mb-2 flex items-center justify-between">
            <span>Queued Resumes ({files.length})</span>
            {!disabled && (
              <button
                type="button"
                onClick={clearAllFiles}
                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                    title={`Remove ${file.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Upload one or more candidate resumes to begin comparison.</span>
        </div>
      )}
    </div>
  );
};
