import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, RotateCcw, HelpCircle, Layers, Sliders, Settings } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  onClearError?: () => void;
}

const SAMPLE_TEMPLATES = [
  {
    title: 'Senior Full Stack',
    desc: `Role: Senior Full Stack Engineer
Requirements:
- 3+ years experience with Java, Spring Boot, and AWS cloud infrastructure.
- Solid understanding of PostgreSQL database design, REST APIs, and microservices.
- Bachelor's degree in Computer Science, Information Technology, or equivalent.
Preferred:
- Kubernetes, Docker, and CI/CD pipelines (Jenkins / GitHub Actions).
- Experience in high-throughput transaction systems.`,
  },
  {
    title: 'Lead Frontend',
    desc: `Role: Lead Frontend Developer
Requirements:
- 3+ years hands-on experience with React, TypeScript, and modern JavaScript (ES6+).
- Strong command of HTML5, CSS3, responsive UI design, and state management.
- Degree in Computer Science, Software Engineering, or related discipline.
Preferred:
- Next.js, Tailwind CSS, Webpack/Vite, and unit testing with Jest.`,
  },
  {
    title: 'Senior Data Analyst',
    desc: `Role: Senior Data Analyst
Requirements:
- 2+ years of professional experience in data analysis, SQL querying, and Python.
- Proven dashboard design in Tableau or PowerBI.
- Bachelor's degree in quantitative field.
Preferred:
- Snowflake, dbt, ETL workflows, and statistical modeling.`,
  }
];

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  disabled = false,
  error,
  onClearError,
}) => {
  const wordCount = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const lines = value.split('\n');

  // Interactive local states for premium feel
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4">
      
      {/* 1. Quick Load Template Bar with Light Reflection Glow */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#0D3834]" />
          <span className="text-[#525866] font-extrabold uppercase tracking-wide">
            Load Requisition Standards:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.title}
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange(tmpl.desc);
                if (onClearError) onClearError();
              }}
              className="px-3.5 py-1.5 text-xs bg-white hover:bg-[#FAF7F2] text-[#0D3834] font-black border border-[#E5E2DC] hover:border-[#0D3834] rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-xs active:scale-95 duration-150"
            >
              {tmpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Premium Editor container with Magic UI Glow border and Glassmorphism feel */}
      <div
        className={`relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col bg-white ${
          isFocused
            ? 'border-[#0D3834] ring-4 ring-[#0D3834]/10 shadow-lg translate-y-[-2px]'
            : 'border-[#E5E2DC] shadow-sm'
        }`}
      >
        
        {/* Editor Top Control Bar (IDE Style) */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#E5E2DC] flex items-center justify-between text-[11px] font-mono text-[#525866]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
            <span className="h-4 w-px bg-[#E5E2DC] mx-1" />
            <FileText className="w-3.5 h-3.5 text-[#0D3834] shrink-0" />
            <span className="font-extrabold text-[#0D3834] uppercase tracking-wide font-sans">
              requisition_spec.md
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline bg-white px-2 py-0.5 rounded border border-[#E5E2DC] text-[10px] font-bold">
              UTF-8
            </span>
            <div className="flex items-center gap-1 text-[#059669] font-sans font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Criteria Auto-Saved</span>
            </div>
          </div>
        </div>

        {/* Text Area split with professional Line Numbers */}
        <div className="flex flex-1 min-h-[220px]">
          
          {/* Mock line numbers */}
          <div className="bg-[#FAF7F2] border-r border-[#E5E2DC] px-3.5 py-4 text-right text-[11px] font-mono text-[#A1A1AA] select-none space-y-1 flex flex-col items-end min-w-[40px]">
            {Array.from({ length: Math.max(lines.length, 9) }).map((_, lIdx) => (
              <span key={lIdx} className="block leading-relaxed h-5">
                {lIdx + 1}
              </span>
            ))}
          </div>

          {/* Real Textarea with editorial serif styling for content */}
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (onClearError) onClearError();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder="Paste raw job criteria description containing required skills, min years experience tenure, and degree expectations..."
            rows={9}
            className="flex-1 p-4 bg-white text-xs font-semibold text-[#18181B] placeholder:text-[#525866] focus:outline-none transition-all resize-none leading-relaxed h-full font-sans"
            style={{ minHeight: '220px' }}
          />

        </div>

        {/* Editor Bottom Meta Bar */}
        <div className="px-4 py-2 bg-[#FAF7F2] border-t border-[#E5E2DC] flex items-center justify-between text-[11px] font-mono text-[#525866]">
          <div className="flex items-center gap-1.5 font-sans font-extrabold uppercase text-[10px] tracking-wider text-[#0D3834]">
            <Layers className="w-3.5 h-3.5 text-[#0D3834]" />
            <span>Deterministic Parsing Activated</span>
          </div>

          <div className="flex items-center gap-4">
            <span>{lines.length} lines</span>
            <span className="font-extrabold text-[#0D3834] font-sans">{wordCount} words</span>
          </div>
        </div>

      </div>

      {error && (
        <p className="text-xs text-red-600 font-extrabold uppercase tracking-wide flex items-center gap-1.5">
          <span>⚠️ {error}</span>
        </p>
      )}

      {/* 3. Evaluated Dimensions indicators with Premium Glow Labels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1.5">
        <div className="p-3 bg-white border border-[#E5E2DC] rounded-xl flex items-center gap-2 text-[11px] font-bold text-[#18181B] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#0D3834]" />
          <span>Extracted Required Skills (30%)</span>
        </div>

        <div className="p-3 bg-white border border-[#E5E2DC] rounded-xl flex items-center gap-2 text-[11px] font-bold text-[#18181B] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#0D3834]" />
          <span>Minimum Tenure curve (25%)</span>
        </div>

        <div className="p-3 bg-white border border-[#E5E2DC] rounded-xl flex items-center gap-2 text-[11px] font-bold text-[#18181B] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#0D3834]" />
          <span>STEM Degree Match (15%)</span>
        </div>
      </div>

    </div>
  );
};
