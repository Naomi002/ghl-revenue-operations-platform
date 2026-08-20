import React, { useState } from 'react';
import { User, Activity } from 'lucide-react';
import { AuditLogItem } from '../types/ghl';

export const CRM360Section: React.FC = () => {
  const [selectedLogIndex, setSelectedLogIndex] = useState(4);

  const auditLogs: AuditLogItem[] = [
    {
      id: 'log-1',
      timestamp: 'Aug 01, 2026 - 10:14:02 AM',
      type: 'optin',
      title: '01. Inbound Form Opt-In Received',
      detail: 'Submitted GHL custom survey via Google PPC retargeting campaign. Contact record created with GHL ID: CON_9841.',
      channel: 'Web',
    },
    {
      id: 'log-2',
      timestamp: 'Aug 01, 2026 - 10:16:00 AM',
      type: 'sms_sent',
      title: '02. Automated SMS Sequence Dispatched',
      detail: 'Twilio SMS sent: "Hey Marcus, thanks for requesting our growth audit! What time works best?" [Status: Delivered].',
      channel: 'SMS',
    },
    {
      id: 'log-3',
      timestamp: 'Aug 02, 2026 - 02:45:18 PM',
      type: 'reply_received',
      title: '03. Contact Replied via SMS',
      detail: 'Inbound message received: "Tomorrow 2:30 PM works for me." GHL Workflow evaluated condition to TRUE.',
      channel: 'SMS',
    },
    {
      id: 'log-4',
      timestamp: 'Aug 02, 2026 - 02:46:00 PM',
      type: 'booked',
      title: '04. Strategy Session Booked',
      detail: 'Calendar slot locked for Aug 03 at 02:30 PM EST. Sync token created and GHL Opportunity stage updated.',
      channel: 'GHL Workflow',
    },
    {
      id: 'log-5',
      timestamp: 'Aug 03, 2026 - 03:00:00 PM',
      type: 'stage_changed',
      title: '05. Pipeline Stage Updated to "Proposal Sent"',
      detail: 'Sales call completed. High-ticket growth retainer proposal dispatched via GHL Documents & Contracts.',
      channel: 'System',
    },
    {
      id: 'log-6',
      timestamp: 'Aug 05, 2026 - 11:20:10 AM',
      type: 'won',
      title: '06. Deal Won — GHL Stripe Payment Collected',
      detail: 'Retainer payment collected ($12,500 MRR). Opportunity stage updated to "Closed Won". Onboarding workflow fired.',
      channel: 'System',
    },
  ];

  return (
    <section id="crm-lifecycle" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 grid-hairlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-[#87BCDE]" />
            <span>07 // 360° GHL CRM CONTACT LIFECYCLE & AUDIT SCRUBBER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
            Complete <span className="font-serif italic font-normal text-[#87BCDE] pr-2">Audit Trail</span> from First Click to Closed Deal.
          </h2>
        </div>

        {/* Audit Scrubber Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 6 Audit Log Selector */}
          <div className="lg:col-span-6 space-y-3 font-mono text-xs">
            <div className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold mb-2">30-DAY LIFECYCLE EVENT SCRUBBER (CLICK EVENT BELOW)</div>
            
            {auditLogs.map((log, index) => {
              const isSelected = index === selectedLogIndex;

              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLogIndex(index)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all space-y-1.5 ${
                    isSelected
                      ? 'border-[#87BCDE] bg-[#805E73] text-[#F0F4F8] shadow-md ring-2 ring-[#87BCDE]'
                      : 'border-[#4E4D5C]/40 bg-[#2D4654] text-[#F0F4F8] hover:border-[#87BCDE]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={isSelected ? 'text-[#F0F4F8] font-bold' : 'text-[#87BCDE] font-bold'}>{log.timestamp}</span>
                    <span className={`px-2.5 py-0.5 rounded font-bold ${isSelected ? 'bg-[#87BCDE] text-[#243B4A]' : 'bg-[#243B4A] text-[#F0F4F8]'}`}>{log.channel}</span>
                  </div>

                  <h4 className="text-sm font-bold font-heading">{log.title}</h4>
                </div>
              );
            })}
          </div>

          {/* Right 6 Expanded Event Inspection Telemetry Panel */}
          <div className="lg:col-span-6 bg-[#2D4654] border border-[#4E4D5C]/40 rounded-xl p-6 font-mono text-xs space-y-6 shadow-md sticky top-24">
            <div className="flex items-center justify-between border-b border-[#4E4D5C]/30 pb-4">
              <span className="text-[#F0F4F8] font-bold flex items-center gap-2 text-sm font-heading">
                <User className="w-4 h-4 text-[#87BCDE]" />
                CONTACT: MARCUS VANCE (CON_9841)
              </span>
              <span className="text-[#243B4A] bg-[#87BCDE] px-3 py-1 rounded text-[10px] font-bold">
                STAGE: CLOSED WON ($12.5k MRR)
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block mb-1">SELECTED EVENT DETAILS</span>
                <h3 className="text-lg font-bold text-[#F0F4F8] font-heading">{auditLogs[selectedLogIndex].title}</h3>
                <p className="text-[#F0F4F8] font-sans text-xs mt-2 leading-relaxed bg-[#243B4A] p-4 border border-[#4E4D5C]/30 rounded-lg font-medium">
                  {auditLogs[selectedLogIndex].detail}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg">
                  <span className="text-[#F0F4F8]/60 block text-[10px] font-bold">TIMESTAMP</span>
                  <span className="text-[#F0F4F8] font-bold">{auditLogs[selectedLogIndex].timestamp}</span>
                </div>
                <div className="bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg">
                  <span className="text-[#F0F4F8]/60 block text-[10px] font-bold">CHANNEL SOURCE</span>
                  <span className="text-[#87BCDE] font-bold">{auditLogs[selectedLogIndex].channel}</span>
                </div>
              </div>

              {/* Attribution summary */}
              <div className="bg-[#243B4A] p-4 border border-[#4E4D5C]/30 rounded-lg space-y-2">
                <span className="text-[#F0F4F8] text-[10px] font-bold uppercase block">GHL VALUE ATTRIBUTION SUMMARY</span>
                <div className="flex items-center justify-between text-xs text-[#F0F4F8] font-bold">
                  <span>Customer Lifetime Value (LTV):</span>
                  <span className="text-[#87BCDE]">$150,000 / Year</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#F0F4F8]">
                  <span>Time to Conversion:</span>
                  <span className="font-bold">5 Days, 1 Hour</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
