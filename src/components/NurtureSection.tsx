import React, { useState } from 'react';
import { Sliders, CheckCircle, Sparkles } from 'lucide-react';

export const NurtureSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(7);

  const nurtureTimeline = [
    { day: 1, title: 'Day 01: Instant Welcome SMS', channel: 'SMS', detail: 'Dispatched 2 mins after form submission. 98% open rate.', score: 35, status: 'Sent' },
    { day: 3, title: 'Day 03: High-Value Case Study Email', channel: 'Email', detail: 'Delivered case study PDF on how Client X gained $120k MRR.', score: 48, status: 'Opened & Clicked' },
    { day: 5, title: 'Day 05: Automated Ringless Voicemail', channel: 'Voicemail', detail: 'Custom voicemail drop from Agency CEO.', score: 62, status: 'Listened' },
    { day: 7, title: 'Day 07: Calendar Invitation Follow-up', channel: 'SMS', detail: '"Hey Marcus, saw you checked our case study! Grab a slot here."', score: 76, status: 'Link Clicked' },
    { day: 10, title: 'Day 10: Value Email & Video Teardown', channel: 'Email', detail: 'Loom video audit showing customized GHL pipeline walkthrough.', score: 88, status: 'Watched 80%' },
    { day: 14, title: 'Day 14: Final Booking Incentive SMS', channel: 'SMS', detail: 'Limited bonus offer for bookings completed this week.', score: 95, status: 'Appointment Booked' },
  ];

  const currentTimelinePoint = nurtureTimeline.find(t => t.day <= selectedDay) || nurtureTimeline[0];

  return (
    <section id="lead-nurturing" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 grid-hairlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] mb-4 shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-[#87BCDE]" />
            <span>05 // MULTI-TOUCH LEAD NURTURING & ENGAGEMENT SCORING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
            14-Day <span className="font-serif italic font-normal text-[#87BCDE] pr-2">Multi-Touch Nurture</span> & Lead Score Escalation.
          </h2>
        </div>

        {/* Interactive Timeline Scrubber Widget */}
        <div className="bg-[#2D4654] border border-[#4E4D5C]/40 rounded-xl p-6 lg:p-8 space-y-8 font-mono text-xs shadow-md">
          
          {/* Top Scrubber Control */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[#F0F4F8] font-bold text-sm font-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#87BCDE]" />
                Drag Scrubber to Inspect 14-Day Nurture Sequence
              </span>
              <span className="text-[#F0F4F8] bg-[#805E73] font-bold text-xs border border-[#805E73] px-3.5 py-1 rounded self-start sm:self-auto">
                SELECTED: DAY {selectedDay} OF 14
              </span>
            </div>

            {/* Range Input Slider */}
            <input
              type="range"
              min={1}
              max={14}
              value={selectedDay}
              onChange={e => setSelectedDay(parseInt(e.target.value))}
              className="w-full h-3 bg-[#243B4A] border border-[#4E4D5C]/40 rounded-lg appearance-none cursor-pointer accent-[#87BCDE]"
            />

            <div className="flex justify-between text-[10px] text-[#F0F4F8]/60 font-mono font-bold">
              <span>Day 1 (Opt-in)</span>
              <span>Day 5 (Voicemail)</span>
              <span>Day 7 (SMS Follow-up)</span>
              <span>Day 14 (Booked)</span>
            </div>
          </div>

          {/* Timeline Nodes Visual Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nurtureTimeline.map((item) => {
              const isPastOrPresent = item.day <= selectedDay;
              const isCurrent = item.day === selectedDay;

              return (
                <div
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`cursor-pointer p-4 rounded-lg border font-mono transition-all space-y-2 ${
                    isCurrent
                      ? 'border-[#87BCDE] bg-[#805E73] text-[#F0F4F8] shadow-md ring-2 ring-[#87BCDE]'
                      : isPastOrPresent
                      ? 'border-[#87BCDE]/40 bg-[#243B4A] text-[#F0F4F8]'
                      : 'border-[#4E4D5C]/20 bg-[#243B4A]/50 text-[#F0F4F8]/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold">DAY {item.day}</span>
                    <span className={isCurrent ? 'text-[#F0F4F8]/80' : 'text-[#F0F4F8]/60'}>{item.channel}</span>
                  </div>

                  <p className={`text-xs font-sans font-medium leading-snug ${isCurrent ? 'text-[#F0F4F8]' : 'text-[#F0F4F8]'}`}>
                    {item.title}
                  </p>

                  <div className={`pt-2 border-t flex items-center justify-between text-[10px] ${
                    isCurrent ? 'border-[#F0F4F8]/20' : 'border-[#4E4D5C]/30'
                  }`}>
                    <span className={isCurrent ? 'text-[#F0F4F8]/70' : 'text-[#F0F4F8]/50'}>SCORE:</span>
                    <span className={`font-bold ${isCurrent ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`}>{item.score}/100</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Detail Display */}
          <div className="bg-[#243B4A] p-6 border border-[#4E4D5C]/40 rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block mb-1">ACTIVE TOUCHPOINT DELIVERED</span>
              <h4 className="text-base font-bold text-[#F0F4F8] font-heading">{currentTimelinePoint.title}</h4>
              <p className="text-[#F0F4F8]/80 font-sans text-xs mt-1">{currentTimelinePoint.detail}</p>
            </div>

            <div>
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block mb-1">RECIPIENT ENGAGEMENT STATUS</span>
              <div className="inline-flex items-center gap-2 bg-[#87BCDE] text-[#243B4A] px-3.5 py-1.5 rounded-lg font-bold">
                <CheckCircle className="w-4 h-4 text-[#243B4A]" />
                {currentTimelinePoint.status}
              </div>
            </div>

            <div>
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block mb-1">GHL LEAD SCORE ESCALATION</span>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#87BCDE]">{currentTimelinePoint.score}</span>
                <div className="flex-1 bg-[#2D4654] h-3 rounded-full overflow-hidden border border-[#4E4D5C]/40">
                  <div
                    className="bg-[#87BCDE] h-full transition-all duration-300"
                    style={{ width: `${currentTimelinePoint.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
