import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Check, ShieldCheck } from 'lucide-react';

interface ResumeUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSizeBytes?: number;
  error?: string;
  onClearError?: () => void;
}

const MAX_FILE_SIZE_DEFAULT = 5 * 1024 * 1024; // 5 MB
const MAX_FILES_DEFAULT = 10;

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  files,
  onFilesChange,
  disabled = false,
  maxFiles = MAX_FILES_DEFAULT,
  maxSizeBytes = MAX_FILE_SIZE_DEFAULT,
  error,
  onClearError,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateAndAddFiles = (incomingFiles: FileList | File[]) => {
    setFileError(null);
    if (onClearError) onClearError();

    const validFiles: File[] = [];
    const currentCount = files.length;
    let localError: string | null = null;
    const fileArray = Array.from(incomingFiles);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      if (currentCount + validFiles.length >= maxFiles) {
        localError = `Maximum limit of ${maxFiles} resumes reached.`;
        break;
      }

      if (
        file.type !== 'application/pdf' &&
        !file.name.toLowerCase().endsWith('.pdf')
      ) {
        localError = `"${file.name}" is not a PDF. Only PDF resumes are accepted.`;
        continue;
      }

      if (file.size > maxSizeBytes) {
        localError = `"${file.name}" exceeds 5 MB limit.`;
        continue;
      }

      const isDuplicate =
        files.some((f) => f.name === file.name && f.size === file.size) ||
        validFiles.some((f) => f.name === file.name && f.size === file.size);

      if (isDuplicate) {
        localError = `"${file.name}" already added.`;
        continue;
      }

      validFiles.push(file);
    }

    if (localError) setFileError(localError);
    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    if (disabled) return;
    onFilesChange(files.filter((_, i) => i !== index));
    if (fileError) setFileError(null);
    if (onClearError) onClearError();
  };

  return (
    <div className="bg-white rounded border border-[#E5E7EB] p-4 flex flex-col h-full shadow-2xs">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-[#202124]" />
          <h2 className="text-xs font-bold text-[#202124] uppercase tracking-wider">
            Applicant Resume Batch
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {files.length > 0 && !disabled && (
            <button
              type="button"
              onClick={() => onFilesChange([])}
              className="text-[11px] text-[#6B7280] hover:text-red-600 cursor-pointer"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono text-[#6B7280]">
            {files.length} / {maxFiles} files
          </span>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`mt-2.5 p-4 border border-dashed rounded flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-[#E83E8C] bg-[#FDF2F7]'
            : 'border-[#D1D5DB] hover:border-[#9CA3AF] bg-[#F9FAFB]'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          disabled={disabled}
          onChange={handleFileChange}
          className="hidden"
        />

        <UploadCloud className="w-5 h-5 text-[#6B7280] mb-1" />
        <p className="text-xs font-semibold text-[#202124]">
          Click to upload resumes <span className="font-normal text-[#6B7280]">or drag and drop</span>
        </p>
        <p className="text-[11px] text-[#6B7280]">
          PDF format (up to 5 MB per file)
        </p>
      </div>

      {(fileError || error) && (
        <div className="mt-2 text-[11px] text-red-600 font-medium flex items-center gap-1 p-2 rounded bg-red-50 border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{fileError || error}</span>
        </div>
      )}

      {/* File list */}
      <div className="mt-2.5 flex-1 min-h-[90px] max-h-[140px] overflow-y-auto space-y-1 pr-1 text-xs">
        {files.length > 0 ? (
          files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-1.5 rounded bg-[#F9FAFB] border border-[#E5E7EB]"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <FileText className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                <span className="font-medium text-[#202124] truncate text-[11px]">
                  {file.name}
                </span>
                <span className="text-[10px] text-[#6B7280] font-mono shrink-0">
                  ({formatFileSize(file.size)})
                </span>
              </div>

              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(idx);
                  }}
                  className="p-0.5 text-[#6B7280] hover:text-red-600 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-3 text-[11px] text-[#6B7280]">
            <span>No resumes in queue</span>
            <span className="text-[10px] text-[#9CA3AF]">
              Upload PDF resumes to run AI evaluation
            </span>
          </div>
        )}
      </div>

      <div className="mt-2.5 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
        <span>Batch candidate evaluation</span>
        {files.length > 0 && (
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> {files.length} ready
          </span>
        )}
      </div>
    </div>
  );
};
