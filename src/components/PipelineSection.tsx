import React, { useState } from 'react';
import { Layers, ArrowRight, DollarSign, TrendingUp, Users, CheckCircle, RefreshCw } from 'lucide-react';
import { PipelineStage } from '../types/ghl';
import { ghlApi } from '../services/ghlApi';

export const PipelineSection: React.FC = () => {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: 'new_lead', title: '01. New Lead', description: 'Inbound opt-ins waiting for auto-SMS', count: 18, totalValue: 45000, conversionRate: '100%', badgeColor: '#87BCDE' },
    { id: 'contacted', title: '02. Contacted', description: 'SMS/Email sequence dispatched', count: 12, totalValue: 36000, conversionRate: '66.7%', badgeColor: '#87BCDE' },
    { id: 'booking_requested', title: '03. Booking Requested', description: 'Calendar invite clicked by lead', count: 7, totalValue: 28000, conversionRate: '38.8%', badgeColor: '#87BCDE' },
    { id: 'appointment_booked', title: '04. Appointment Booked', description: 'Calendar slot locked & synced', count: 5, totalValue: 25000, conversionRate: '27.7%', badgeColor: '#87BCDE' },
    { id: 'deal_won', title: '05. Closed Won', description: 'Payment collected via GHL Stripe integration', count: 3, totalValue: 18000, conversionRate: '16.6%', badgeColor: '#87BCDE' },
  ]);

  const [activeLeadName, setActiveLeadName] = useState('Apex Corp ($12.5k)');
  const [currentStageId, setCurrentStageId] = useState<'new_lead' | 'contacted' | 'booking_requested' | 'appointment_booked' | 'deal_won'>('contacted');
  const [syncStatus, setSyncStatus] = useState<string>('READY');

  const totalPipelineValue = stages.reduce((acc, curr) => acc + curr.totalValue, 0);

  const moveLeadToStage = async (targetStageId: PipelineStage['id']) => {
    if (targetStageId === currentStageId) return;

    setSyncStatus('SYNCING_STAGE...');
    setStages(prevStages =>
      prevStages.map(stage => {
        if (stage.id === currentStageId) {
          return { ...stage, count: Math.max(0, stage.count - 1), totalValue: Math.max(0, stage.totalValue - 7500) };
        }
        if (stage.id === targetStageId) {
          return { ...stage, count: stage.count + 1, totalValue: stage.totalValue + 7500 };
        }
        return stage;
      })
    );
    setCurrentStageId(targetStageId);

    // Call GHL API v2 / Demo Mode
    const res = await ghlApi.updateOpportunityStage('OPP_APEX_9042', targetStageId, 12500);
    setSyncStatus(res.mode === 'REAL' ? 'LIVE GHL OPPORTUNITY UPDATED' : 'DEMO MODE SYNCED');
  };

  const resetPipeline = () => {
    setStages([
      { id: 'new_lead', title: '01. New Lead', description: 'Inbound opt-ins waiting for auto-SMS', count: 18, totalValue: 45000, conversionRate: '100%', badgeColor: '#87BCDE' },
      { id: 'contacted', title: '02. Contacted', description: 'SMS/Email sequence dispatched', count: 12, totalValue: 36000, conversionRate: '66.7%', badgeColor: '#87BCDE' },
      { id: 'booking_requested', title: '03. Booking Requested', description: 'Calendar invite clicked by lead', count: 7, totalValue: 28000, conversionRate: '38.8%', badgeColor: '#87BCDE' },
      { id: 'appointment_booked', title: '04. Appointment Booked', description: 'Calendar slot locked & synced', count: 5, totalValue: 25000, conversionRate: '27.7%', badgeColor: '#87BCDE' },
      { id: 'deal_won', title: '05. Closed Won', description: 'Payment collected via GHL Stripe integration', count: 3, totalValue: 18000, conversionRate: '16.6%', badgeColor: '#87BCDE' },
    ]);
    setCurrentStageId('contacted');
    setSyncStatus('READY');
  };

  return (
    <section id="pipeline-engine" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 bg-[#243B4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] mb-4 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#87BCDE]" />
              <span>02 // PIPELINE STAGE MIGRATION & VELOCITY ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
              Kinetic <span className="font-serif italic font-normal text-[#87BCDE] pr-2">Revenue Runway</span> & Stage Automation.
            </h2>
          </div>

          <button
            onClick={resetPipeline}
            className="self-start md:self-auto font-mono text-xs text-[#87BCDE] hover:text-[#F0F4F8] font-bold flex items-center gap-2 border border-[#87BCDE] px-4 py-2.5 rounded bg-[#2D4654] transition-colors min-h-[44px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Pipeline Simulation
          </button>
        </div>

        {/* High-Impact Revenue Metrics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
          <div className="bg-[#2D4654] p-6 border border-[#4E4D5C]/40 rounded-xl space-y-2 shadow-md">
            <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#87BCDE]" />
              Total Active Pipeline Value
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-[#87BCDE] font-mono">${totalPipelineValue.toLocaleString()}</div>
            <span className="text-[#F0F4F8]/70 text-[10px] font-semibold block">Calculated across 5 active stages</span>
          </div>

          <div className="bg-[#2D4654] p-6 border border-[#4E4D5C]/40 rounded-xl space-y-2 shadow-md">
            <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
              <Users className="w-4 h-4 text-[#805E73]" />
              Active Opportunities
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] font-mono">
              {stages.reduce((acc, curr) => acc + curr.count, 0)} Contacts
            </div>
            <span className="text-[#F0F4F8]/70 text-[10px] font-semibold block">GHL Sync Status: {syncStatus}</span>
          </div>

          <div className="bg-[#2D4654] p-6 border border-[#4E4D5C]/40 rounded-xl space-y-2 shadow-md">
            <span className="text-[#F0F4F8]/60 text-[10px] uppercase font-bold block flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#87BCDE]" />
              Booking Conversion Velocity
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-[#87BCDE] font-mono">27.7% Avg</div>
            <span className="text-[#F0F4F8]/70 text-[10px] font-semibold block">Opt-in to strategy session booked</span>
          </div>
        </div>

        {/* Kinetic Stage Migration Track */}
        <div className="space-y-4 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#F0F4F8] bg-[#2D4654] p-4 border border-[#4E4D5C]/40 rounded-lg font-bold gap-2">
            <span>MIGRATION ENGINE: CLICK STAGE TO SLIDE ACTIVE TEST LEAD LIVE</span>
            <span className="text-[#87BCDE] uppercase">CURRENT POSITION: {activeLeadName}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((stage) => {
              const isCurrentStage = stage.id === currentStageId;

              return (
                <div
                  key={stage.id}
                  onClick={() => moveLeadToStage(stage.id)}
                  className={`cursor-pointer p-5 rounded-xl border transition-all space-y-4 relative group ${
                    isCurrentStage
                      ? 'bg-[#805E73] text-[#F0F4F8] border-[#805E73] shadow-xl ring-2 ring-[#87BCDE]'
                      : 'bg-[#2D4654] border-[#4E4D5C]/40 text-[#F0F4F8] hover:border-[#87BCDE]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{stage.title}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] ${
                      isCurrentStage ? 'bg-[#87BCDE] text-[#243B4A]' : 'bg-[#243B4A] text-[#F0F4F8]'
                    }`}>
                      {stage.count} Leads
                    </span>
                  </div>

                  <p className={`text-xs font-sans leading-relaxed ${isCurrentStage ? 'text-[#F0F4F8]/90' : 'text-[#F0F4F8]/75'}`}>
                    {stage.description}
                  </p>

                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono ${
                    isCurrentStage ? 'border-[#F0F4F8]/20' : 'border-[#4E4D5C]/30'
                  }`}>
                    <span className="text-[10px] text-[#F0F4F8]/60 uppercase font-bold">STAGE VALUE</span>
                    <span className="font-bold text-[#87BCDE]">${stage.totalValue.toLocaleString()}</span>
                  </div>

                  {isCurrentStage && (
                    <div className="bg-[#87BCDE] text-[#243B4A] p-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-between shadow-md animate-pulse">
                      <span className="truncate">{activeLeadName}</span>
                      <CheckCircle className="w-4 h-4 text-[#243B4A]" />
                    </div>
                  )}

                  {!isCurrentStage && (
                    <div className="text-[10px] text-[#F0F4F8]/50 group-hover:text-[#87BCDE] font-bold flex items-center justify-end gap-1 transition-colors pt-1">
                      Migrate lead here
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
