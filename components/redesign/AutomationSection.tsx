import React from 'react';
import { Clock, Check, Calendar, Sparkles, UserCheck } from 'lucide-react';
import { useCountUp } from '../../lib/useCountUp';

export const AutomationSection: React.FC = () => {
  const autoPercent = useCountUp(87, 800, true);

  return (
    <section className="py-20 sm:py-28 bg-[#0D3834] text-white relative overflow-hidden">
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 45%: Copy & Headlines */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/30 inline-block">
              EFFICIENCY
            </span>

            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.05]">
              Get Your<br />
              Time Back.
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed font-normal">
              Admin, scheduling, and follow-ups run on automation, so you can focus on the decisions that actually move hiring forward.
            </p>

            <div className="pt-2 flex flex-col gap-3 text-xs text-emerald-200/90 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Instant automated resume extraction & candidate ranking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Automated interview sync agendas & debrief summaries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero manual spreadsheet tracking required</span>
              </div>
            </div>
          </div>

          {/* RIGHT 55%: Floating Dashboard UI Cards (Recreating Screenshot 2 Top Right) */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center">
            
            <div className="relative w-full max-w-[560px] h-[460px] sm:h-[500px]">
              
              {/* CARD 1: "12h saved this week" (Top Left) */}
              <div className="absolute top-0 left-0 bg-white text-[#0F172A] rounded-2xl p-4 sm:p-5 shadow-2xl z-20 w-[240px] sm:w-[260px] border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-extrabold text-xl text-[#0F172A]">12h</span>
                      <span className="text-xs text-slate-500 font-medium">saved this week</span>
                    </div>
                    <div className="w-full h-1.5 bg-emerald-100 rounded-full mt-2 overflow-hidden">
                      <div className="w-[82%] h-full bg-emerald-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: "Today" Agenda Card (Top Right) */}
              <div className="absolute top-4 right-0 bg-white text-[#0F172A] rounded-2xl p-4 sm:p-5 shadow-2xl z-20 w-[240px] sm:w-[270px] border border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Today</span>

                <div className="space-y-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>9:00 Panel Interview</span>
                    </div>
                    <p className="text-emerald-800 text-[10px]">3 interviewers confirmed</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>11:30 Hiring Sync</span>
                    </div>
                    <p className="text-slate-500 text-[10px]">Auto-generated agenda ready</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>2:00 Debrief</span>
                    </div>
                    <p className="text-slate-500 text-[10px]">Scorecard summary auto-prepared</p>
                  </div>
                </div>
              </div>

              {/* CARD 3: "Running on Autopilot" (Bottom Left Stacked) */}
              <div className="absolute bottom-4 left-0 sm:left-4 bg-white text-[#0F172A] rounded-2xl p-5 shadow-2xl z-30 w-[300px] sm:w-[340px] border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-xs text-[#0F172A]">Running on Autopilot</span>
                  <span className="text-[10px] text-slate-400 font-mono">Tasks handled automatically</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Follow-ups sent to 14 candidates</p>
                      <p className="text-[10px] text-slate-500">Day-3 nurture sequence · 2 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">3 interviews auto-scheduled</p>
                      <p className="text-[10px] text-slate-500">Calendar invites sent · 18 min ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Offer letter generated for Priya N.</p>
                      <p className="text-[10px] text-slate-500">Template auto-filled · 1 hr ago</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    <span>Screening 12 applicants — in progress...</span>
                  </div>
                </div>
              </div>

              {/* CARD 4: "87% Automated" Accent Badge (Bottom Right) */}
              <div className="absolute bottom-8 right-0 sm:right-2 bg-[#14524C] text-white rounded-2xl p-4 shadow-2xl z-30 w-[200px] sm:w-[220px] border border-emerald-400/30 space-y-1">
                <div className="text-3xl font-black font-mono text-emerald-300">
                  {autoPercent}%
                </div>
                <span className="text-xs font-bold block text-white">automated</span>
                <p className="text-[10px] text-emerald-200/80 leading-snug">
                  You handled strategy. HireMe AI did the rest.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
