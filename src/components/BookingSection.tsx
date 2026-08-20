import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Globe, CheckCircle2, Smartphone } from 'lucide-react';
import { CalendarSlot } from '../types/ghl';

export const BookingSection: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('EST (America/New_York)');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Aug 21');
  const [selectedSlot, setSelectedSlot] = useState<string>('02:30 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(true);

  const slots: CalendarSlot[] = [
    { id: '1', time: '09:00 AM', available: true },
    { id: '2', time: '10:30 AM', available: false },
    { id: '3', time: '01:00 PM', available: true },
    { id: '4', time: '02:30 PM', available: true },
    { id: '5', time: '04:00 PM', available: true },
    { id: '6', time: '05:30 PM', available: false },
  ];

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
    setBookingConfirmed(true);
  };

  return (
    <section id="smart-booking" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 bg-[#243B4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] mb-4 shadow-sm">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>04 // GHL SMART CALENDAR & AUTOMATED SMS REMINDER ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
            High-Intent <span className="font-serif italic font-normal text-[#87BCDE] pr-2">Smart Calendar</span> Booking & Instant SMS Sync.
          </h2>
        </div>

        {/* Asymmetric Split: Left 7 Calendar Slot Picker, Right 5 Live SMS Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Calendar Picker Container */}
          <div className="lg:col-span-7 bg-[#2D4654] border border-[#4E4D5C]/40 rounded-xl p-6 sm:p-8 space-y-6 font-mono text-xs shadow-md">
            
            {/* Header / Timezone Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4E4D5C]/30 pb-4">
              <div>
                <h3 className="font-bold text-[#F0F4F8] text-sm font-heading">Select Strategy Session Slot</h3>
                <p className="text-[#F0F4F8]/70 text-xs font-mono">GHL Calendar Sync: 2-way Google/Outlook Integration</p>
              </div>

              <div className="flex items-center gap-2 bg-[#243B4A] border border-[#4E4D5C]/40 px-3.5 py-2 rounded min-h-[44px]">
                <Globe className="w-4 h-4 text-[#87BCDE]" />
                <select
                  value={selectedTimezone}
                  onChange={e => setSelectedTimezone(e.target.value)}
                  className="bg-transparent text-[#F0F4F8] font-bold focus:outline-none text-xs"
                >
                  <option value="EST (America/New_York)">EST (UTC-5)</option>
                  <option value="PST (America/Los_Angeles)">PST (UTC-8)</option>
                  <option value="GMT (Europe/London)">GMT (UTC+0)</option>
                  <option value="AEST (Australia/Sydney)">AEST (UTC+10)</option>
                </select>
              </div>
            </div>

            {/* Date Picker Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['Today, Aug 20', 'Tomorrow, Aug 21', 'Friday, Aug 22', 'Monday, Aug 25'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-4 py-2.5 rounded text-xs whitespace-nowrap font-mono font-bold transition-all min-h-[44px] ${
                    selectedDate === d
                      ? 'bg-[#805E73] text-[#F0F4F8] shadow-sm'
                      : 'bg-[#243B4A] text-[#F0F4F8] border border-[#4E4D5C]/40 hover:border-[#87BCDE]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Time Slot Grid */}
            <div className="space-y-2">
              <span className="text-[#F0F4F8] text-[10px] uppercase font-bold">Available Slots for {selectedDate} ({selectedTimezone.split(' ')[0]})</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;

                  return (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => handleSlotSelect(slot.time)}
                      className={`p-3.5 rounded border font-mono text-xs flex items-center justify-between transition-all min-h-[44px] ${
                        !slot.available
                          ? 'opacity-40 border-[#4E4D5C]/20 bg-[#243B4A] cursor-not-allowed text-[#F0F4F8]/40'
                          : isSelected
                          ? 'border-[#87BCDE] bg-[#87BCDE] text-[#243B4A] font-bold shadow-sm ring-1 ring-[#87BCDE]'
                          : 'border-[#4E4D5C]/40 bg-[#243B4A] text-[#F0F4F8] hover:border-[#87BCDE]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#243B4A]' : 'text-[#87BCDE]'}`} />
                        {slot.time}
                      </span>
                      {!slot.available && <span className="text-[9px] uppercase font-bold">Booked</span>}
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#243B4A]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GHL Automated Calendar Sync Features */}
            <div className="pt-4 border-t border-[#4E4D5C]/30 flex flex-wrap gap-4 text-[11px] text-[#F0F4F8] font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#87BCDE]" />
                Zero Double-Booking Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#87BCDE]" />
                Automated SMS & Email Reminders (24h / 1h)
              </span>
            </div>

          </div>

          {/* Right Live SMS Confirmation Phone Preview */}
          <div className="lg:col-span-5 bg-[#2D4654] border border-[#4E4D5C]/40 rounded-xl p-6 font-mono text-xs space-y-4 shadow-md relative">
            <div className="flex items-center justify-between border-b border-[#4E4D5C]/30 pb-3">
              <span className="text-[#F0F4F8] font-bold tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#87BCDE]" />
                GHL AUTOMATED SMS PREVIEW
              </span>
              <span className="text-[#87BCDE] font-bold text-[10px]">DELIVERY: INSTANT</span>
            </div>

            {/* Phone Screen Mockup Container */}
            <div className="bg-[#243B4A] p-4 rounded-xl border border-[#4E4D5C]/40 space-y-4">
              <div className="text-center text-[10px] text-[#F0F4F8]/60 font-bold border-b border-[#4E4D5C]/20 pb-2">
                SMS THREAD WITH GHL AUTOMATION ENGINE
              </div>

              {/* Message Bubble 1 */}
              <div className="bg-[#2D4654] p-3.5 rounded-lg border border-[#4E4D5C]/30 text-[#F0F4F8] text-xs font-sans space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#87BCDE] font-bold">
                  <span>SENDER: GHL REVENUE SYSTEM</span>
                  <span>JUST NOW</span>
                </div>
                <p>
                  Hey <strong>Marcus</strong>! Your 30-min Strategy Session with Apex Growth is locked for{' '}
                  <strong className="text-[#F0F4F8]">{selectedDate}</strong> at <strong className="text-[#87BCDE]">{selectedSlot} ({selectedTimezone.split(' ')[0]})</strong>.
                </p>
                <p className="text-[11px] text-[#F0F4F8]/75 pt-1">
                  We'll text you a reminder 1 hour before. Reply 1 to confirm or 2 to reschedule.
                </p>
              </div>

              {/* Message Bubble 2 (Simulated Contact Reply) */}
              <div className="bg-[#805E73] p-3.5 rounded-lg text-[#F0F4F8] text-xs font-sans text-right space-y-1 ml-6 shadow-sm">
                <div className="text-[10px] font-mono text-[#F0F4F8]/80 font-bold">SENT BY PROSPECT</div>
                <p>1 (Confirmed! See you then.)</p>
              </div>
            </div>

            <div className="text-[11px] text-[#F0F4F8] bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg font-mono">
              <span className="text-[#87BCDE] font-bold block mb-1">GHL CUSTOM MERGE FIELDS USED:</span>
              <code>{'{{contact.first_name}}'}</code>, <code>{'{{appointment.start_time}}'}</code>, <code>{'{{location.company_name}}'}</code>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
