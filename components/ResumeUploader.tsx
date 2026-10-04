import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Check, RefreshCw } from 'lucide-react';

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

      const lowerName = file.name.toLowerCase();
      const isPdf = lowerName.endsWith('.pdf');
      const isDocx = lowerName.endsWith('.docx') || lowerName.endsWith('.doc');

      if (!isPdf && !isDocx) {
        localError = `"${file.name}" is not supported. Please upload a PDF or DOCX resume.`;
        continue;
      }

      if (file.size === 0) {
        localError = `"${file.name}" is empty (0 bytes). Please upload a valid resume.`;
        continue;
      }

      if (file.size > maxSizeBytes) {
        localError = `"${file.name}" exceeds the 5 MB size limit.`;
        continue;
      }

      const isDuplicate =
        files.some((f) => f.name === file.name && f.size === file.size) ||
        validFiles.some((f) => f.name === file.name && f.size === file.size);

      if (isDuplicate) {
        localError = `"${file.name}" has already been selected.`;
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
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
          disabled
            ? 'border-[#DDDCD6] bg-[#F5F3EE] cursor-not-allowed opacity-60'
            : isDragOver
            ? 'border-[#174C4A] bg-[#DCEAE6]/30 shadow-sm'
            : 'border-[#DDDCD6] bg-[#F5F3EE]/50 hover:border-[#174C4A] hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
          multiple
          disabled={disabled}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white border border-[#DDDCD6] flex items-center justify-center text-[#174C4A] shadow-2xs">
            <UploadCloud className="w-6 h-6 text-[#174C4A]" />
          </div>
          <div className="space-y-1">
            <span className="font-extrabold text-sm text-[#171817] block">
              Click to upload or drag & drop resume files
            </span>
            <span className="text-xs text-[#686A66] block">
              Supports <strong className="text-[#171817]">PDF</strong> and <strong className="text-[#171817]">DOCX</strong> formats · Max 5 MB per file
            </span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {activeError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{activeError}</span>
        </div>
      )}

      {/* Selected File List */}
      {files.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-[#686A66]">
            <span className="font-bold text-[#171817]">
              Selected Resumes ({files.length}/{maxFiles}):
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && fileInputRef.current?.click()}
                className="text-xs text-[#174C4A] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Change / Add More</span>
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onFilesChange([])}
                className="text-xs text-[#686A66] hover:text-[#171817] underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
            {files.map((file, idx) => {
              const isDocx = file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc');

              return (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between p-3 bg-white border border-[#DDDCD6] rounded-lg text-xs shadow-2xs group hover:border-[#174C4A] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded bg-[#DCEAE6] text-[#174C4A] flex items-center justify-center shrink-0 font-mono text-[10px] font-extrabold uppercase">
                      {isDocx ? 'DOCX' : 'PDF'}
                    </div>
                    <div className="min-w-0">
                      <span className="truncate text-[#171817] font-bold block leading-tight">
                        {file.name}
                      </span>
                      <span className="text-[11px] text-[#686A66] font-mono block">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={disabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(idx);
                    }}
                    className="p-1.5 text-[#686A66] hover:text-red-600 rounded cursor-pointer transition-colors"
                    title="Remove resume"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
