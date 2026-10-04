import React from 'react';

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

  return (
    <div className="space-y-3">
      {/* Template Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[#686A66] font-medium">Quick load requisition criteria:</span>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.title}
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange(tmpl.desc);
                if (onClearError) onClearError();
              }}
              className="px-2.5 py-1 text-xs bg-white hover:bg-[#F5F3EE] text-[#171817] border border-[#DDDCD6] rounded-md font-semibold cursor-pointer transition-colors"
            >
              {tmpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (onClearError) onClearError();
          }}
          disabled={disabled}
          placeholder="Paste full job description with required skills, minimum years of experience, and education criteria..."
          rows={9}
          className="w-full p-3.5 bg-white border border-[#DDDCD6] rounded-xl text-xs text-[#171817] placeholder:text-[#686A66] focus:outline-none focus:border-[#174C4A] focus:ring-1 focus:ring-[#174C4A] transition-all resize-y leading-relaxed font-sans"
        />
        {error && (
          <p className="text-xs text-red-600 mt-1">{error}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-[#686A66]">
        <span>Required skills, experience duration & degree criteria are evaluated.</span>
        <span className="font-mono text-[11px] font-bold">{wordCount} words</span>
      </div>
    </div>
  );
};
