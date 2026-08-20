import React, { useState } from 'react';
import { Cpu, Play, CheckCircle2, Clock, MessageSquare, Mail, Calendar, ArrowDown } from 'lucide-react';
import { WorkflowNode } from '../types/ghl';
import { ghlApi } from '../services/ghlApi';

export const WorkflowSection: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'node-1',
      type: 'trigger',
      title: '01. TRIGGER: FORM SUBMISSION',
      subtitle: 'Event: Lead Opt-In received via Google PPC',
      status: 'idle',
      payload: { event: 'form_submit', form_id: 'ghl_lead_form_01', lead_email: 'prospect@apex.io' },
    },
    {
      id: 'node-2',
      type: 'wait',
      title: '02. WAIT STEP: 2 MINUTES',
      subtitle: 'Delay step to make follow-up feel authentic & human',
      status: 'idle',
      payload: { delay_seconds: '120', status: 'pending' },
    },
    {
      id: 'node-3',
      type: 'action_sms',
      title: '03. ACTION: INSTANT SMS DISPATCH',
      subtitle: 'SMS: "Hey Marcus, thanks for requesting our growth audit! What time works best?"',
      status: 'idle',
      payload: { channel: 'SMS_Twilio', recipient: '+15552348901', status: 'queued' },
    },
    {
      id: 'node-4',
      type: 'condition',
      title: '04. CONDITIONAL LOGIC: USER REPLIED?',
      subtitle: 'If reply received within 24h → Branch A (Booking) | Else → Branch B (Email Drip)',
      status: 'idle',
      payload: { evaluate: 'contact.replied == true', timeout: '24h' },
    },
    {
      id: 'node-5',
      type: 'booking',
      title: '05. ACTION: SMART CALENDAR LINK DISPATCH',
      subtitle: 'Dispatches personalized 1-click booking link with timezone auto-detect',
      status: 'idle',
      payload: { calendar_id: 'strategy_call_30m', booking_url: 'https://ghl.app/book/apex' },
    },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [terminalLog, setTerminalLog] = useState<string[]>([
    'System ready. Click "Fire Live Workflow Simulation" to execute GHL engine pulse.',
  ]);

  const runWorkflowSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);
    setTerminalLog(['[00.00s] INIT: Triggering GHL Workflow #9042...']);

    // Call Workflow Dispatch Service
    const workflowRes = await ghlApi.triggerWorkflow({ workflow_id: 'WF_AUTO_9042', event: 'form_submit' });

    // Step 0
    setTimeout(() => {
      setNodes(prev => prev.map((n, idx) => (idx === 0 ? { ...n, status: 'completed' } : n)));
      setActiveStepIndex(1);
      setTerminalLog(prev => [...prev, `[00.40s] ✓ TRIGGER: Form submission parsed. (${workflowRes.mode} MODE)`]);
    }, 800);

    // Step 1
    setTimeout(() => {
      setNodes(prev => prev.map((n, idx) => (idx === 1 ? { ...n, status: 'completed' } : n)));
      setActiveStepIndex(2);
      setTerminalLog(prev => [...prev, '[01.20s] ✓ WAIT_STEP: 2-minute delay bypass simulated (0.8s execution).']);
    }, 1800);

    // Step 2
    setTimeout(() => {
      setNodes(prev => prev.map((n, idx) => (idx === 2 ? { ...n, status: 'completed' } : n)));
      setActiveStepIndex(3);
      setTerminalLog(prev => [...prev, '[02.40s] ✓ SMS_ACTION: Dispatched Twilio SMS to +1(555)234-8901 [Delivery 200 OK].']);
    }, 3000);

    // Step 3
    setTimeout(() => {
      setNodes(prev => prev.map((n, idx) => (idx === 3 ? { ...n, status: 'completed' } : n)));
      setActiveStepIndex(4);
      setTerminalLog(prev => [...prev, '[03.60s] ✓ CONDITION: Lead replied "Tomorrow works!" → Evaluated to TRUE.']);
    }, 4200);

    // Step 4
    setTimeout(() => {
      setNodes(prev => prev.map((n, idx) => (idx === 4 ? { ...n, status: 'completed' } : n)));
      setActiveStepIndex(null);
      setIsSimulating(false);
      setTerminalLog(prev => [
        ...prev,
        '[04.80s] ✓ WORKFLOW COMPLETE: Booking invite sent & CRM pipeline stage updated to "Booking Requested".',
      ]);
    }, 5400);
  };

  const resetWorkflow = () => {
    setNodes(nodes.map(n => ({ ...n, status: 'idle' })));
    setActiveStepIndex(null);
    setIsSimulating(false);
    setTerminalLog(['System reset. Ready for live workflow execution.']);
  };

  return (
    <section id="workflow-simulator" className="py-16 lg:py-28 border-b border-[#4E4D5C]/40 grid-hairlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] mb-4 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-[#87BCDE]" />
              <span>03 // GHL WORKFLOW AUTOMATION & LOGIC NODE ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F0F4F8] tracking-tight">
              Multi-Channel <span className="font-serif italic font-normal text-[#87BCDE] pr-2">Workflows</span> & Conditional Logic.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={runWorkflowSimulation}
              disabled={isSimulating}
              className="bg-[#805E73] hover:bg-[#684A5D] text-[#F0F4F8] font-mono text-xs font-bold py-3.5 px-6 rounded flex items-center gap-2 uppercase tracking-wider transition-all shadow-md disabled:opacity-50 min-h-[44px]"
            >
              {isSimulating ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#F0F4F8] border-t-transparent rounded-full animate-spin"></span>
                  Executing Signal Pulse...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Fire Live Workflow Simulation
                </>
              )}
            </button>
            <button
              onClick={resetWorkflow}
              className="font-mono text-xs text-[#87BCDE] hover:text-[#F0F4F8] font-bold border border-[#87BCDE] bg-[#2D4654] px-4 py-3.5 rounded min-h-[44px]"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Asymmetric Split: Left 7 Logic Matrix, Right 5 Execution Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Node Sequence List */}
          <div className="lg:col-span-7 space-y-3">
            {nodes.map((node, index) => {
              const isActive = activeStepIndex === index;
              const isCompleted = node.status === 'completed';

              return (
                <React.Fragment key={node.id}>
                  <div
                    className={`p-5 border rounded-xl transition-all font-mono text-xs space-y-2 relative ${
                      isActive
                        ? 'border-[#87BCDE] bg-[#805E73] text-[#F0F4F8] shadow-lg ring-2 ring-[#87BCDE]'
                        : isCompleted
                        ? 'border-[#87BCDE]/40 bg-[#2D4654] text-[#F0F4F8]'
                        : 'border-[#4E4D5C]/40 bg-[#2D4654] text-[#F0F4F8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {node.type === 'trigger' && <Play className={`w-4 h-4 ${isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`} />}
                        {node.type === 'wait' && <Clock className={`w-4 h-4 ${isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`} />}
                        {node.type === 'action_sms' && <MessageSquare className={`w-4 h-4 ${isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`} />}
                        {node.type === 'condition' && <Cpu className={`w-4 h-4 ${isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`} />}
                        {node.type === 'booking' && <Calendar className={`w-4 h-4 ${isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`} />}
                        
                        <span className="font-bold tracking-wider font-heading text-sm">{node.title}</span>
                      </div>

                      {isCompleted ? (
                        <span className={`flex items-center gap-1 font-bold text-[10px] ${isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          COMPLETED
                        </span>
                      ) : isActive ? (
                        <span className="text-[#F0F4F8] animate-pulse font-bold text-[10px]">EXECUTING...</span>
                      ) : (
                        <span className="text-[#F0F4F8]/60 font-bold text-[10px]">QUEUED</span>
                      )}
                    </div>

                    <p className={`text-xs font-sans pl-6 ${isActive ? 'text-[#F0F4F8]/90' : 'text-[#F0F4F8]/80'}`}>{node.subtitle}</p>

                    {/* Payload Details */}
                    {node.payload && (
                      <div className={`mt-2.5 pt-2.5 border-t text-[10px] flex flex-wrap gap-x-4 gap-y-1 ${
                        isActive ? 'border-[#F0F4F8]/20 text-[#F0F4F8]/80' : 'border-[#4E4D5C]/30 text-[#F0F4F8]/70'
                      }`}>
                        {Object.entries(node.payload).map(([k, v]) => (
                          <span key={k}>
                            <code className="font-bold">{k}:</code>{' '}
                            <code className={isActive ? 'text-[#F0F4F8]' : 'text-[#87BCDE]'}>{v}</code>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Flow Conduit Divider */}
                  {index < nodes.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowDown className={`w-4 h-4 ${isActive ? 'text-[#87BCDE] animate-bounce' : 'text-[#4E4D5C]'}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Live Execution Console */}
          <div className="lg:col-span-5 bg-[#1A2B37] text-[#F0F4F8] border border-[#4E4D5C]/40 rounded-xl p-6 font-mono text-xs space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#4E4D5C]/30 pb-3">
              <span className="text-[#F0F4F8] font-bold tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#87BCDE] animate-pulse"></span>
                GHL WORKFLOW TELEMETRY CONSOLE
              </span>
              <span className="text-[10px] text-[#F0F4F8]/60">LIVE LOG STREAM</span>
            </div>

            <div className="h-80 overflow-y-auto space-y-2 text-[11px] text-[#F0F4F8]/90 font-mono scrollbar-thin">
              {terminalLog.map((log, i) => (
                <div key={i} className="leading-relaxed border-b border-[#4E4D5C]/20 pb-1">
                  {log.includes('✓') ? (
                    <span className="text-[#87BCDE] font-bold">{log}</span>
                  ) : log.includes('INIT') ? (
                    <span className="text-[#805E73] font-bold">{log}</span>
                  ) : (
                    log
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#4E4D5C]/30 text-[10px] text-[#F0F4F8]/60 flex items-center justify-between">
              <span>WORKFLOW ID: WF_AUTO_9042</span>
              <span>LATENCY: 12ms</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
