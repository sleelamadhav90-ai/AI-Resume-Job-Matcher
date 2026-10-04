import React, { useRef } from 'react';
import { UploadCloud, FileText, X, AlertCircle } from 'lucide-react';

interface ResumeUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  files,
  onFilesChange,
  disabled = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    // Combine and deduplicate by filename
    const combined = [...files];
    for (const file of selected) {
      if (!combined.some(f => f.name === file.name)) {
        combined.push(file);
      }
    }
    onFilesChange(combined);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 transition-all hover:border-slate-300">
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
              Select multiple PDF resumes to analyze and match
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {files.length} {files.length === 1 ? 'file' : 'files'} selected
        </span>
      </div>

      {/* Drop/Click Zone */}
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          disabled
            ? 'opacity-60 cursor-not-allowed border-slate-200 bg-slate-50'
            : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/20 bg-slate-50/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          disabled={disabled}
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">
              Click to browse or drag and drop PDF resumes
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Supports multiple PDF documents (Up to 10MB each)
            </p>
          </div>
        </div>
      </div>

      {/* Selected File Badges / List */}
      {files.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-medium text-slate-600 mb-2 flex items-center justify-between">
            <span>Queued Resumes ({files.length})</span>
            <button
              type="button"
              onClick={() => onFilesChange([])}
              className="text-slate-400 hover:text-rose-600 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
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
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  disabled={disabled}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
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
