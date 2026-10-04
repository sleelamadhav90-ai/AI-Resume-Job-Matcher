import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ShieldCheck, Users, Phone, Building, Briefcase, Mail, User } from 'lucide-react';
import recruiterHeroImg from '../../src/assets/images/hireme_recruiter_hero_1791118025119.jpg';
import { useCountUp } from '../../lib/useCountUp';

interface HeroSectionProps {
  onStartMatching: () => void;
  onSeeHowItWorks?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartMatching, onSeeHowItWorks }) => {
  const matchScore = useCountUp(94, 800, true);
  
  // Interactive form state
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
        {/* TOP HERO HEADINGS & BULLET FEATURES (Zoho Recruit Style) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Column: Big Bold Headings & Subtitle */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAE6] text-[#174C4A] text-xs font-mono font-extrabold border border-[#174C4A]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#174C4A]" />
              <span>INTELLIGENT CANDIDATE MATCHING PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-heading text-[#171817] tracking-tight leading-[1.08] uppercase">
              GET STARTED WITH A FREE<br />
              <span className="text-[#174C4A]">PRODUCT TOUR</span>
            </h1>

            <p className="text-base sm:text-lg text-[#686A66] leading-relaxed max-w-2xl font-sans">
              Let's dive deep into the features and nuances of how HireMe AI can help recruiters track candidates, parse resumes with zero hallucination, and make hiring easy.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartMatching}
                className="px-7 py-3.5 rounded-xl bg-[#174C4A] hover:bg-[#123B39] text-white font-extrabold text-xs tracking-wider uppercase inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>TRY HIREME AI FREE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onSeeHowItWorks || onStartMatching}
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-[#F0EEE8] text-[#171817] border border-[#DDDCD6] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <span>SEE HOW IT WORKS</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Key Feature Checkmarks */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#DDDCD6] shadow-2xs space-y-4 self-center">
            <h3 className="font-black text-sm text-[#171817] uppercase tracking-wider font-heading border-b border-[#DDDCD6] pb-3">
              WHAT YOU'LL GET IN THE TOUR
            </h3>

            <div className="space-y-3 text-xs text-[#171817] font-semibold">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#DCEAE6] text-[#28745D] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#28745D]" />
                </div>
                <span>A complete tour of how HireMe AI works and how it speeds up your recruitment pipeline.</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#DCEAE6] text-[#28745D] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#28745D]" />
                </div>
                <span>Interactive 100-point rubric breakdown & verbatim resume claim verification.</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#DCEAE6] text-[#28745D] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#28745D]" />
                </div>
                <span>Live Q&A session with our recruitment engineering experts & custom team pricing.</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MARKET LEADER BRAND LOGOS BANNER (Matching Reference Image) */}
        {/* ========================================================================= */}
        <div className="pt-4 pb-2 border-y border-[#DDDCD6]">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-85">
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-extrabold">
              <span>🏆 Over 10 years as market leaders</span>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-xs font-mono font-black text-[#171817] uppercase tracking-widest">
              <span className="hover:text-[#174C4A] transition-colors">STELLANTIS</span>
              <span className="hover:text-[#174C4A] transition-colors">BOSCH</span>
              <span className="hover:text-[#174C4A] transition-colors">DELOITTE</span>
              <span className="hover:text-[#174C4A] transition-colors">SRILANKAN AIRLINES</span>
              <span className="hover:text-[#174C4A] transition-colors">VINFAST</span>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPLIT HERO SECTION WITH AESTHETIC PICTURE & INTERACTIVE TOUR FORM */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* LEFT: Aesthetic Image with Floating Candidate Card Overlay */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#DDDCD6] bg-[#E8E6DF] min-h-[440px] flex items-center justify-center group shadow-xl">
            {/* High Quality Recruiter Photo */}
            <img
              src={recruiterHeroImg}
              alt="Professional Recruiter using HireMe AI"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Top AI Candidate Badge */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl max-w-xs space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#171817] text-white flex items-center justify-center font-bold text-xs font-mono">
                    SK
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#171817]">Sarah Kim</h4>
                    <p className="text-[10px] text-[#686A66]">Senior Full Stack Engineer</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-lg text-[#174C4A] block leading-none">{matchScore}%</span>
                  <span className="text-[8px] font-mono font-bold text-[#174C4A] uppercase">AI FIT</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#28745D] bg-[#DCEAE6] px-2 py-1 rounded-md">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Java, Spring Boot, AWS Verified</span>
              </div>
            </div>

            {/* Floating Bottom Quote */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[#7FAEA7] tracking-wider block">
                INTELLIGENT CANDIDATE MATCHING
              </span>
              <h3 className="font-extrabold text-lg font-heading leading-snug">
                "HireMe AI replaced hours of manual resume screening with instant, evidence-backed candidate rankings."
              </h3>
            </div>
          </div>

          {/* RIGHT: Product Tour Registration Form Card (Matching Reference Screenshot) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#DDDCD6] shadow-xl p-6 sm:p-8 space-y-5">
            <div className="border-b border-[#DDDCD6] pb-4 space-y-1">
              <h2 className="text-xl sm:text-2xl font-black font-heading text-[#171817] uppercase tracking-tight">
                SCHEDULE YOUR FREE PRODUCT TOUR
              </h2>
              <p className="text-xs text-[#686A66]">
                Fill in your details below to instantly access our interactive recruitment tour & matching console.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center bg-[#DCEAE6]/50 rounded-2xl border border-[#28745D]/30 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#28745D] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-black text-base text-[#171817] uppercase">Product Tour Unlocked!</h3>
                <p className="text-xs text-[#28745D] font-medium">Launching HireMe AI candidate matching console now...</p>
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

      </div>
    </section>
  );
};
