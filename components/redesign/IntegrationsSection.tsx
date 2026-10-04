import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import teamCollabImg from '../../src/assets/images/hireme_team_collaboration_1791118047814.jpg';

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
    <section className="py-20 sm:py-28 bg-white text-[#171817] border-t border-[#DDDCD6]">
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 space-y-16">
        
        {/* TOP ROW: Team Picture Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Aesthetic Team Collaboration Picture */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#DDDCD6] shadow-xl group">
            <img
              src={teamCollabImg}
              alt="Recruitment Team Collaborating on Candidate Profiles"
              className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7FAEA7]">
                COLLABORATIVE RECRUITMENT OPERATIONS
              </span>
              <h3 className="text-2xl font-black font-heading leading-tight uppercase">
                BUILT FOR MODERN HIRING TEAMS
              </h3>
              <p className="text-xs text-[#DDDCD6] leading-relaxed">
                Review candidate fit scores, share evidence dossiers, and align hiring managers with 100-point transparent rubrics.
              </p>
            </div>
          </div>

          {/* Right: Big Bold Headings & Key Value Drivers */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#174C4A] bg-[#DCEAE6] px-3.5 py-1 rounded-full border border-[#174C4A]/20 inline-block">
              ENTERPRISE TEAM COLLABORATION
            </span>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#171817] tracking-tight uppercase leading-tight">
              WE LIKE BUILDING<br />
              <span className="text-[#174C4A]">TEAMS TOGETHER</span>
            </h2>

            <p className="text-base sm:text-lg text-[#686A66] leading-relaxed">
              HireMe AI connects seamlessly with over 200 software tools your talent team uses daily including Google Workspace, Microsoft Teams, Slack, LinkedIn, and major ATS platforms.
            </p>

            <div className="space-y-2 pt-2 text-xs font-bold text-[#171817]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#DCEAE6] text-[#28745D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Automated candidate dossier export for panel interviews</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#DCEAE6] text-[#28745D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Real-time email and calendar sync for hiring syncs</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Integrations Grid */}
        <div className="space-y-6 pt-6 border-t border-[#DDDCD6]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-black font-heading text-[#171817] uppercase">
              CONNECTED WORKSPACE INTEGRATIONS
            </h3>
            <span className="text-xs font-mono text-[#686A66] font-bold">200+ APPS SUPPORTED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {INTEGRATIONS.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#F5F3EE] border border-[#DDDCD6] hover:border-[#174C4A] transition-all hover:bg-white text-center space-y-1.5 group cursor-pointer shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#DDDCD6] flex items-center justify-center text-lg mx-auto shrink-0 group-hover:scale-110 transition-transform shadow-2xs">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-[11px] text-[#171817] leading-snug truncate">{item.name}</h4>
                  <p className="text-[9px] text-[#686A66] font-mono truncate">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
