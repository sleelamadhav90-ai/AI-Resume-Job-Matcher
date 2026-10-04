import React from 'react';
import { Briefcase, Sparkles, FileText, Check } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  onClearError?: () => void;
}

const SAMPLE_TEMPLATES = [
  {
    title: 'Software Engineer',
    desc: `Role: Software Engineer
Requirements:
- 3+ years experience with Java, Spring Boot, and AWS cloud infrastructure.
- Solid understanding of PostgreSQL database design, REST APIs, and microservices.
- Bachelor's degree in Computer Science, Information Technology, or equivalent.
Preferred:
- Kubernetes, Docker, and CI/CD pipelines (Jenkins / GitHub Actions).
- Experience in financial technology or high-throughput transaction systems.`,
  },
  {
    title: 'Frontend Developer',
    desc: `Role: Frontend Developer
Requirements:
- 3+ years hands-on experience with React, TypeScript, and modern JavaScript (ES6+).
- Strong command of HTML5, CSS3, responsive UI design, and state management.
- Degree in Computer Science, Software Engineering, or related discipline.
Preferred:
- Next.js, Tailwind CSS, Webpack/Vite, and unit testing with Jest/Vitest.`,
  },
  {
    title: 'Backend Developer',
    desc: `Role: Backend Developer
Requirements:
- 3+ years backend development using Python (FastAPI/Django) or Node.js.
- Strong SQL proficiency (PostgreSQL / MySQL) and Redis caching.
- B.Tech / B.E. in Computer Science or equivalent.
Preferred:
- Docker, AWS Lambda, microservices architecture, and message queues (Kafka/RabbitMQ).`,
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

  return (
    <div className="bg-white rounded border border-[#E5E7EB] p-4 flex flex-col h-full shadow-2xs">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#202124]" />
          <h2 className="text-xs font-bold text-[#202124] uppercase tracking-wider">
            Job Requisition Criteria
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[#6B7280]">
          {wordCount} words
        </span>
      </div>

      {/* Preset template quick picks */}
      <div className="py-2 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[#6B7280] text-[11px] font-medium shrink-0">Sample Templates:</span>
        {SAMPLE_TEMPLATES.map((tpl) => (
          <button
            key={tpl.title}
            type="button"
            disabled={disabled}
            onClick={() => {
              onChange(tpl.desc);
              if (onClearError) onClearError();
            }}
            className="px-2 py-0.5 rounded bg-[#F9FAFB] hover:bg-[#FDF2F7] hover:text-[#E83E8C] border border-[#D1D5DB] text-[#202124] text-[11px] font-medium transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            {tpl.title}
          </button>
        ))}
      </div>

      <div className="mt-1 flex-1 flex flex-col">
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (error && onClearError) onClearError();
          }}
          disabled={disabled}
          placeholder="Enter job requirements, core skills, minimum experience, and qualifications..."
          className={`w-full flex-1 min-h-[160px] p-3 bg-[#F9FAFB] border rounded text-xs font-normal text-[#202124] leading-relaxed resize-none focus:outline-none focus:border-[#E83E8C] focus:bg-white placeholder:text-[#9CA3AF] ${
            error ? 'border-red-400 bg-red-50/20' : 'border-[#D1D5DB]'
          }`}
        />

        {error && (
          <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      <div className="mt-2.5 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
        <span>Required vs Preferred skills weighted automatically</span>
        {value.trim() && (
          <span className="text-[#10B981] font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Requisition loaded
          </span>
        )}
      </div>
    </div>
  );
};
