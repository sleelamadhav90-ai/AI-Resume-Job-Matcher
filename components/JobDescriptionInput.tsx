import React from 'react';
import { Briefcase, Sparkles, FileText } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Senior Frontend Engineer (React/TypeScript)',
    text: `Job Title: Senior Frontend Engineer
Location: Remote
Experience Required: 4+ years

Responsibilities:
- Build and maintain modern, performant web applications using React, Next.js, and TypeScript.
- Architect reusable component libraries and maintain design system fidelity.
- Collaborate with product designers and backend engineers to integrate REST/GraphQL APIs.
- Optimize web vitals, bundle size, and rendering performance.

Required Skills:
- 4+ years of professional React experience with TypeScript.
- Deep understanding of Tailwind CSS, modern CSS, and component state management.
- Strong knowledge of responsive design, web accessibility (WCAG), and browser performance.
- Experience with testing tools such as Vitest, Jest, or Cypress.

Preferred Skills:
- Experience with Next.js App Router and server-side rendering.
- Familiarity with Cloud architectures (AWS/GCP), CI/CD pipelines, and Docker.
- Experience with AI API integration or LLM workflows.

Education:
- Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience.`
  },
  {
    title: 'AI / Full-Stack Developer',
    text: `Job Title: AI Full-Stack Developer
Location: Hybrid / San Francisco, CA
Experience Required: 3+ years

Key Responsibilities:
- Design and deploy AI-driven web features utilizing modern LLM APIs (Gemini, Claude, GPT).
- Develop robust backend endpoints with Node.js/Express or Next.js API routes.
- Implement efficient client state management and interactive dashboards.

Requirements:
- Hands-on experience developing with LLM SDKs, prompt engineering, and structured JSON output.
- 3+ years full-stack JavaScript/TypeScript experience with Node.js and React.
- Experience with vector search, embeddings, or retrieval systems is a plus.
- Degree in STEM or relevant industry experience.`
  }
];

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 transition-all hover:border-slate-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-medium">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
              1. Job Description
            </h2>
            <p className="text-xs text-slate-500">
              Paste the target job requirements or pick a quick template
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {value ? `${value.trim().split(/\s+/).filter(Boolean).length} words` : 'Empty'}
        </span>
      </div>

      {/* Quick sample pickers */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Try sample role:
        </span>
        {SAMPLE_JOB_DESCRIPTIONS.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onChange(sample.text)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors disabled:opacity-50"
          >
            {sample.title}
          </button>
        ))}
      </div>

      <div className="mt-3 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste full job description here (responsibilities, required skills, preferred qualifications, experience level, education)..."
          rows={9}
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all font-mono text-xs leading-relaxed"
        />
        {!value && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 gap-1.5 opacity-60">
            <FileText className="w-6 h-6 stroke-1" />
            <p className="text-xs">Paste text or choose a sample role above</p>
          </div>
        )}
      </div>
    </div>
  );
};
