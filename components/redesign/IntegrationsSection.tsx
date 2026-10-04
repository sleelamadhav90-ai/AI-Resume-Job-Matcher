import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'Google Meet', category: 'Video Interviews', icon: '📹' },
  { name: 'Microsoft Teams', category: 'Collaboration', icon: '💬' },
  { name: 'Slack', category: 'Notifications', icon: '⚡' },
  { name: 'Gmail', category: 'Candidate Email', icon: '✉️' },
  { name: 'Google Calendar', category: 'Auto Scheduling', icon: '📅' },
  { name: 'LinkedIn', category: 'Talent Sourcing', icon: '💼' },
  { name: 'Greenhouse', category: 'ATS Sync', icon: '🌿' },
  { name: 'Workday', category: 'HR Enterprise', icon: '🏢' },
  { name: 'BambooHR', category: 'People Ops', icon: '🎋' },
];

export const IntegrationsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white text-[#111318] border-t border-[#E2E8F0]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 50%: Large Bold Typography (Recreating Screenshot 1) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-[#111318] tracking-tight leading-[1.08]">
              We like<br />
              building<br />
              teams<br />
              together
            </h2>

            <p className="text-base sm:text-lg text-[#525866] leading-relaxed">
              HireMe AI comes integrated out-of-the-box with over 200 applications that your organization uses daily like Google Meet, MS Teams, Slack, Gmail, Google Calendar, LinkedIn, and more.
            </p>

            <div className="pt-2">
              <a
                href="#integrations"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 font-bold text-sm text-[#0D3834] hover:text-[#082825] transition-colors group cursor-pointer"
              >
                <span>Explore more integrations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT 50%: Structured Integration Grid / Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {INTEGRATIONS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0D3834] transition-all hover:shadow-md flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A] leading-snug">{item.name}</h4>
                  <p className="text-[10px] text-[#64748B] font-mono">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
