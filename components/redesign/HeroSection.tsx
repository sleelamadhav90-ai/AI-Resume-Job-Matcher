import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  Phone,
  Building,
  Briefcase,
  Mail,
  User,
  Mic,
  TrendingUp,
  Zap,
  Bell,
  AlertCircle,
  Volume2,
  X
} from 'lucide-react';
import recruiterHeroImg from '../../src/assets/images/hireme_recruiter_hero_1791118025119.jpg';
import candidateSpotlightImg from '../../src/assets/images/hireme_candidate_spotlight_1791118452584.jpg';
import { useCountUp } from '../../lib/useCountUp';

interface HeroSectionProps {
  onStartMatching: () => void;
  onSeeHowItWorks?: () => void;
  onOpenVoiceAI?: () => void;
  onOpenJobAlert?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartMatching,
  onSeeHowItWorks,
  onOpenVoiceAI,
  onOpenJobAlert
}) => {
  const matchScore = useCountUp(94, 800, true);
  
  // Interactive platform view mode toggle
  const [platformMode, setPlatformMode] = useState<'voice' | 'matching'>('matching');
  
  // Interactive product tour registration form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    company: '',
    recruitersCount: '1-5',
    jobTitle: 'Senior Recruiter',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Audio preview playback simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onStartMatching();
    }, 800);
  };

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden bg-[#F5F3EE]">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* ========================================================================= */}
        {/* TOP FLOATING FEATURE BADGES */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onStartMatching}
            className="px-4 py-2 rounded-full bg-white border border-[#DDDCD6] text-[#171817] text-xs font-bold shadow-2xs hover:border-[#174C4A] hover:bg-[#DCEAE6]/40 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#174C4A]" />
            <span>Make decisions faster</span>
          </button>

          <button
            type="button"
            onClick={onSeeHowItWorks || onStartMatching}
            className="px-4 py-2 rounded-full bg-white border border-[#DDDCD6] text-[#171817] text-xs font-bold shadow-2xs hover:border-[#174C4A] hover:bg-[#DCEAE6]/40 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#174C4A]" />
            <span>Get data-backed insights</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MAIN HERO TYPOGRAPHY (Greenhouse "Human judgment. One platform." Style) */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-2">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black font-heading text-[#171817] tracking-tight leading-[1.05] uppercase">
            HUMAN JUDGMENT.<br />
            <span className="text-[#174C4A]">ONE PLATFORM.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#686A66] leading-relaxed max-w-2xl mx-auto font-sans">
            AI has amplified the noise in hiring. HireMe AI cuts through it at every step with responsible innovation and governance, helping connect jobs to people — and people to jobs.
          </p>

          {/* Center Pill Toggle Buttons (Voice AI vs Recruiting Platform) */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPlatformMode('voice');
                if (onOpenVoiceAI) onOpenVoiceAI();
              }}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                platformMode === 'voice'
                  ? 'bg-[#174C4A] text-white ring-2 ring-[#174C4A]/30'
                  : 'bg-white text-[#171817] border border-[#DDDCD6] hover:bg-[#F0EEE8]'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Voice AI & Briefings</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPlatformMode('matching');
                onStartMatching();
              }}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                platformMode === 'matching'
                  ? 'bg-[#174C4A] text-white ring-2 ring-[#174C4A]/30'
                  : 'bg-white text-[#171817] border border-[#DDDCD6] hover:bg-[#F0EEE8]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Recruiting Platform</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3-CARD FEATURE GRID WITH PICTURES & FLOATING OVERLAYS (Greenhouse Style) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* CARD 1: Voice AI / Speaking Briefing Picture Card */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDDCD6] bg-white shadow-xl h-[340px] group flex flex-col justify-between p-6">
            <img
              src={recruiterHeroImg}
              alt="Recruiter using Voice AI Briefings"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#171817] font-mono text-[10px] font-extrabold uppercase tracking-wider inline-block border border-white/40 shadow-xs">
                AI AUDIO BRIEFINGS
              </span>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="text-white space-y-1">
                <h3 className="font-extrabold text-base font-heading uppercase">
                  VERBAL CANDIDATE SUMMARIES
                </h3>
                <p className="text-xs text-[#DDDCD6]">
                  Listen to instant AI audio overviews of candidate strengths and red flags.
                </p>
              </div>

              {/* Floating Speaking Pill Badge */}
              <button
                type="button"
                onClick={() => {
                  setIsPlayingAudio(!isPlayingAudio);
                  if (onOpenVoiceAI) onOpenVoiceAI();
                }}
                className="w-full py-2.5 px-4 rounded-full bg-white/95 backdrop-blur-md text-[#171817] border border-white/40 shadow-lg flex items-center justify-between text-xs font-extrabold cursor-pointer hover:bg-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPlayingAudio ? 'bg-[#28745D] animate-ping' : 'bg-[#174C4A]'}`} />
                  <span className="font-mono">{isPlayingAudio ? 'Playing Summary...' : '• Speaking AI Briefing'}</span>
                </div>
                <Volume2 className="w-4 h-4 text-[#174C4A]" />
              </button>
            </div>
          </div>

          {/* CARD 2: Candidate Carousel & Risk Audit Card (Middle Dark Teal) */}
          <div className="relative rounded-3xl overflow-hidden border border-[#174C4A] bg-[#123B39] text-white shadow-xl h-[340px] p-6 flex flex-col justify-between group">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#7FAEA7] border border-white/15 font-mono text-[10px] font-extrabold uppercase tracking-wider inline-block">
                4-TIER CLAIM VERIFICATION
              </span>
              <h3 className="font-black text-xl font-heading uppercase tracking-tight">
                GHOST RESUME PROTECTION
              </h3>
              <p className="text-xs text-[#DDDCD6]">
                Every claim is verified against verbatim resume evidence.
              </p>
            </div>

            {/* Candidate Carousel Focus Card */}
            <div
              onClick={onStartMatching}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-3 cursor-pointer hover:bg-white/15 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#171817] flex items-center justify-center font-bold font-mono text-xs">
                    SK
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Sarah Kim</h4>
                    <span className="text-[10px] text-[#7FAEA7] font-mono">Senior Full Stack Engineer</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xl font-black text-[#7FAEA7] block leading-none">{matchScore}%</span>
                  <span className="text-[9px] text-white/80 font-bold">RUBRIC MATCH</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-mono font-bold text-[#7FAEA7]">
                <span>Status: SUPPORTED</span>
                <span>Verbatim Evidence Verified ✓</span>
              </div>
            </div>
          </div>

          {/* CARD 3: Candidate Spotlight & Job Alert Card */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDDCD6] bg-white shadow-xl h-[340px] group flex flex-col justify-between p-6">
            <img
              src={candidateSpotlightImg}
              alt="Candidate Spotlight & Match Notifications"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#171817] font-mono text-[10px] font-extrabold uppercase tracking-wider inline-block border border-white/40 shadow-xs">
                AUTOMATED TALENT ALERTS
              </span>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="text-white space-y-1">
                <h3 className="font-extrabold text-base font-heading uppercase">
                  INSTANT MATCH NOTIFICATIONS
                </h3>
                <p className="text-xs text-[#DDDCD6]">
                  Get alerted immediately when a 90%+ match resume is uploaded.
                </p>
              </div>

              {/* Floating Create Job Alert Button */}
              <button
                type="button"
                onClick={onOpenJobAlert || onStartMatching}
                className="w-full py-2.5 px-4 rounded-full bg-white/95 backdrop-blur-md text-[#171817] border border-white/40 shadow-lg flex items-center justify-between text-xs font-extrabold cursor-pointer hover:bg-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#174C4A]" />
                  <span>Create a Job Alert</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#174C4A]" />
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MARKET LEADER BRAND LOGOS BANNER */}
        {/* ========================================================================= */}
        <div className="pt-4 pb-2 border-y border-[#DDDCD6]">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-85">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-extrabold">
              <span>🏆 Over 10 years as market leaders</span>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-xs font-mono font-black text-[#171817] uppercase tracking-widest">
              <span className="hover:text-[#174C4A] transition-colors cursor-pointer">STELLANTIS</span>
              <span className="hover:text-[#174C4A] transition-colors cursor-pointer">BOSCH</span>
              <span className="hover:text-[#174C4A] transition-colors cursor-pointer">DELOITTE</span>
              <span className="hover:text-[#174C4A] transition-colors cursor-pointer">SRILANKAN AIRLINES</span>
              <span className="hover:text-[#174C4A] transition-colors cursor-pointer">VINFAST</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRODUCT TOUR REGISTRATION FORM CARD (Zoho Style) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-[#DDDCD6] shadow-xl p-6 sm:p-10 space-y-6">
          <div className="border-b border-[#DDDCD6] pb-4 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#171817] uppercase tracking-tight">
              SCHEDULE YOUR FREE PRODUCT TOUR
            </h2>
            <p className="text-xs text-[#686A66]">
              Fill in your details below to instantly launch our interactive candidate matching console & tour.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center bg-[#DCEAE6]/50 rounded-2xl border border-[#28745D]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#28745D] text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-[#171817] uppercase">Product Tour Unlocked!</h3>
              <p className="text-xs text-[#28745D] font-bold">Redirecting to live resume upload console...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-[#171817] block">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#686A66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-8 pr-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A]"
                    />
                  </div>
                </div>

                {/* Business Email */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-[#171817] block">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-[#686A66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full pl-8 pr-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A]"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#171817] block">
                  Phone Number (with country code) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="px-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] font-mono focus:bg-white focus:outline-none focus:border-[#174C4A]"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                  </select>

                  <div className="relative flex-1">
                    <Phone className="w-3.5 h-3.5 text-[#686A66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="555-0199"
                      className="w-full pl-8 pr-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-[#171817] block">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-[#686A66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full pl-8 pr-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A]"
                    />
                  </div>
                </div>

                {/* No of Recruiters */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-[#171817] block">
                    No of Recruiters <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.recruitersCount}
                    onChange={(e) => setFormData({ ...formData, recruitersCount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A]"
                  >
                    <option value="1-5">1 - 5 Recruiters</option>
                    <option value="6-20">6 - 20 Recruiters</option>
                    <option value="21-50">21 - 50 Recruiters</option>
                    <option value="50+">50+ Recruiters</option>
                  </select>
                </div>
              </div>

              {/* Job Title */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#171817] block">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 text-[#686A66] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="Talent Acquisition Lead"
                    className="w-full pl-8 pr-3 py-2 bg-[#F5F3EE] border border-[#DDDCD6] rounded-xl text-xs text-[#171817] focus:bg-white focus:outline-none focus:border-[#174C4A]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#174C4A] hover:bg-[#123B39] text-white font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span>GET FREE PRODUCT TOUR</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
