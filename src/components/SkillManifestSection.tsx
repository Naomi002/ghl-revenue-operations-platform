import React from 'react';
import { CheckCircle2, ArrowUpRight, Award, Star } from 'lucide-react';

export const SkillManifestSection: React.FC = () => {
  const ghlSkills = [
    { title: 'Custom Funnels & High-Converting Forms', desc: 'Custom survey logic, multi-step opt-in funnels, UTM attribution, CSS custom styling.' },
    { title: 'Complex Workflow Automation', desc: 'Triggers, multi-branch conditional logic, delay steps, webhook dispatches, internal notifications.' },
    { title: 'Smart Calendar & Booking Engine', desc: 'Multi-user team calendars, round-robin distribution, timezone auto-detect, SMS reminders.' },
    { title: 'Database Reactivation Sequences', desc: '9-word SMS campaigns, drip mode batch processing, lead score recovery, automated booking sync.' },
    { title: 'Pipeline Management & Stage Automation', desc: 'Automated deal movement, stage value calculations, velocity tracking, Stripe invoice triggers.' },
    { title: 'Snapshot Creation & GHL SaaS Mode', desc: 'Custom snapshot builds for niche agencies, SaaS mode rebilling config (Twilio, Mailgun, AI).' },
  ];

  return (
    <section id="upwork-contact" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 bg-[#243B4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE]">
            <Award className="w-3.5 h-3.5 text-[#87BCDE]" />
            <span>UPWORK GHL EXPERT CAPABILITY MANIFEST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
            Ready to Build Your <span className="font-serif italic font-normal text-[#87BCDE] pr-2">GoHighLevel</span> Revenue Machine?
          </h2>
          <p className="text-[#F0F4F8]/80 font-sans text-base leading-relaxed">
            Whether you need a complete GHL setup from scratch, complex workflow automation, database reactivation, or custom snapshot building—let's discuss your project on Upwork.
          </p>
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ghlSkills.map((skill, idx) => (
            <div key={idx} className="bg-[#2D4654] p-6 border border-[#4E4D5C]/40 rounded-xl space-y-3 relative group hover:border-[#87BCDE] transition-colors shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs text-[#87BCDE] font-bold">
                <span>0{idx + 1} // CAPABILITY</span>
                <CheckCircle2 className="w-4 h-4 text-[#87BCDE]" />
              </div>
              <h3 className="text-lg font-bold text-[#F0F4F8] font-heading">{skill.title}</h3>
              <p className="text-[#F0F4F8]/75 font-sans text-xs leading-relaxed font-normal">{skill.desc}</p>
            </div>
          ))}
        </div>

        {/* High-Impact Upwork Call-to-Action Card */}
        <div className="bg-[#2D4654] text-[#F0F4F8] border border-[#4E4D5C]/40 p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-[#87BCDE] font-bold">
              <Star className="w-4 h-4 fill-current text-[#87BCDE]" />
              <Star className="w-4 h-4 fill-current text-[#87BCDE]" />
              <Star className="w-4 h-4 fill-current text-[#87BCDE]" />
              <Star className="w-4 h-4 fill-current text-[#87BCDE]" />
              <Star className="w-4 h-4 fill-current text-[#87BCDE]" />
              <span className="text-[#F0F4F8] font-bold ml-1">TOP RATED GHL FREELANCER ON UPWORK</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F0F4F8] font-heading">Have a GoHighLevel Project in Mind?</h3>
            <p className="text-[#F0F4F8]/80 font-sans text-xs sm:text-sm max-w-xl leading-relaxed">
              Get a custom-engineered, highly scalable GHL system built specifically for your niche, agency, or client portfolio.
            </p>
          </div>

          <a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#805E73] hover:bg-[#684A5D] text-[#F0F4F8] font-mono text-sm font-bold py-4 px-8 rounded-xl transition-all shadow-md flex items-center gap-2 uppercase tracking-wider shrink-0 min-h-[48px]"
          >
            Hire on Upwork Now
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
