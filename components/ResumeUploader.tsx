import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Check } from 'lucide-react';

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
        localError = `"${file.name}" has already been added.`;
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
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (index: number) => {
    if (disabled) return;
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const activeError = fileError || error;

  return (
    <div className="space-y-3">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-all ${
          disabled
            ? 'border-[#E5E7EB] bg-[#F9FAFB] cursor-not-allowed'
            : isDragOver
            ? 'border-[#202124] bg-[#F3F4F6]'
            : 'border-[#D1D5DB] bg-[#FAFBFC] hover:border-[#202124] hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          disabled={disabled}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#202124] shadow-2xs">
            <UploadCloud className="w-5 h-5 text-[#202124]" />
          </div>
          <div>
            <span className="font-semibold text-xs text-[#202124] block">
              Click to browse or drop candidate resumes
            </span>
            <span className="text-[11px] text-[#6B7280] block mt-0.5">
              PDF only · Up to 10 files · Max 5 MB per file
            </span>
          </div>
        </div>
      </div>

      {activeError && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{activeError}</span>
        </div>
      )}

      {/* Selected File List */}
      {files.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span className="font-medium">Uploaded resumes ({files.length}/{maxFiles}):</span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onFilesChange([])}
              className="text-[11px] text-[#6B7280] hover:text-[#202124] underline cursor-pointer"
            >
              Clear all
            </button>
          </div>

          <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-2 bg-white border border-[#E5E7EB] rounded text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                  <span className="truncate text-[#202124] font-medium">{file.name}</span>
                  <span className="text-[11px] text-[#9CA3AF] shrink-0 font-mono">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(idx);
                  }}
                  className="p-1 text-[#9CA3AF] hover:text-[#202124] rounded cursor-pointer"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
