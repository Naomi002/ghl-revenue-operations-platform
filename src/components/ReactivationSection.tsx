import React, { useState } from 'react';
import { Zap, DollarSign, Users, MessageSquare, Calendar, RefreshCcw } from 'lucide-react';

export const ReactivationSection: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    processed: 0,
    delivered: 0,
    replies: 0,
    bookings: 0,
    recoveredRevenue: 0,
  });

  const triggerReactivationBlast = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setMetrics({ processed: 0, delivered: 0, replies: 0, bookings: 0, recoveredRevenue: 0 });

    let current = 0;
    const totalLeads = 500;
    const interval = setInterval(() => {
      current += 25;
      const pct = Math.min(100, Math.floor((current / totalLeads) * 100));
      setProgress(pct);

      setMetrics({
        processed: current,
        delivered: Math.floor(current * 0.988),
        replies: Math.floor(current * 0.142),
        bookings: Math.floor(current * 0.036),
        recoveredRevenue: Math.floor(current * 0.036) * 2500,
      });

      if (current >= totalLeads) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 150);
  };

  return (
    <section id="reactivation-blast" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 bg-[#243B4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#87BCDE]" />
              <span>06 // GHL DATABASE REACTIVATION PULSE GENERATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
              Unlocking Dead Database Revenue with <span className="font-serif italic font-normal text-[#87BCDE] pr-2">Automated SMS Reactivation</span>.
            </h2>
          </div>

          <button
            onClick={triggerReactivationBlast}
            disabled={isRunning}
            className="bg-[#805E73] hover:bg-[#684A5D] text-[#F0F4F8] font-mono text-xs font-bold py-3.5 px-7 rounded flex items-center gap-2 uppercase tracking-wider transition-all shadow-md disabled:opacity-50 self-start md:self-auto min-h-[44px]"
          >
            {isRunning ? (
              <>
                <RefreshCcw className="w-4 h-4 animate-spin" />
                Processing 500 Cold Leads...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                Run 500-Lead Reactivation Blast
              </>
            )}
          </button>
        </div>

        {/* Tactical Control Panel Dashboard */}
        <div className="bg-[#2D4654] border border-[#4E4D5C]/40 rounded-xl p-6 lg:p-8 space-y-8 font-mono text-xs shadow-md">
          
          {/* Top Progress Meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#F0F4F8] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#87BCDE] animate-ping"></span>
                GHL DRIP MODE BATCH PROCESSING (RATE: 50 MSG/MIN)
              </span>
              <span className="text-[#87BCDE] font-bold">{progress}% COMPLETE</span>
            </div>

            <div className="w-full bg-[#243B4A] border border-[#4E4D5C]/40 h-4 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-[#87BCDE] h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Metric Telemetry Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-[#243B4A] p-5 border border-[#4E4D5C]/30 rounded-xl space-y-2">
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#87BCDE]" />
                Cold Contacts Processed
              </span>
              <div className="text-3xl font-bold text-[#F0F4F8] font-mono">{metrics.processed} / 500</div>
              <span className="text-[#F0F4F8]/70 text-[10px] font-bold">Delivered: {metrics.delivered} (98.8%)</span>
            </div>

            <div className="bg-[#243B4A] p-5 border border-[#4E4D5C]/30 rounded-xl space-y-2">
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#87BCDE]" />
                Inbound SMS Replies
              </span>
              <div className="text-3xl font-bold text-[#87BCDE] font-mono">{metrics.replies}</div>
              <span className="text-[#F0F4F8]/70 text-[10px] font-bold">Reply Rate: 14.2% Avg</span>
            </div>

            <div className="bg-[#243B4A] p-5 border border-[#4E4D5C]/30 rounded-xl space-y-2">
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#87BCDE]" />
                Appointments Booked
              </span>
              <div className="text-3xl font-bold text-[#87BCDE] font-mono">{metrics.bookings}</div>
              <span className="text-[#F0F4F8]/70 text-[10px] font-bold">Synced to GHL Calendar</span>
            </div>

            <div className="bg-[#243B4A] p-5 border border-[#4E4D5C]/30 rounded-xl space-y-2">
              <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#805E73]" />
                Recovered Pipeline Value
              </span>
              <div className="text-3xl font-bold text-[#87BCDE] font-mono">
                ${metrics.recoveredRevenue.toLocaleString()}
              </div>
              <span className="text-[#F0F4F8]/70 text-[10px] font-bold">Based on $2.5k LTV per deal</span>
            </div>

          </div>

          {/* Campaign Script Teardown */}
          <div className="bg-[#243B4A] p-5 border border-[#4E4D5C]/30 rounded-xl space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-[#F0F4F8]/60 text-[10px] border-b border-[#4E4D5C]/20 pb-2 font-bold">
              <span>REACTIVATION SMS TEMPLATE (9-WORD SCRIPT)</span>
              <span className="text-[#87BCDE]">HIGHEST CONVERTING GHL SCRIPT</span>
            </div>
            <p className="text-[#F0F4F8] font-sans text-sm font-medium pt-1">
              "Hey <code>{'{{contact.first_name}}'}</code>, are you still looking for help with <code>{'{{contact.custom_field_service}}'}</code> this month?"
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
