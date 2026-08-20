import React, { useState } from 'react';
import { Tag, Globe, CheckCircle2, ArrowRight, Database, AlertCircle } from 'lucide-react';
import { GHLContact } from '../types/ghl';
import { ghlApi } from '../services/ghlApi';

export const HeroSection: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: 'Marcus Vance',
    email: 'marcus@apexgrowth.io',
    phone: '+1 (555) 234-8901',
    company: 'Apex Growth Labs',
    utmSource: 'google_cpc_retargeting',
  });

  // Generated Contact State
  const [createdContact, setCreatedContact] = useState<GHLContact | null>({
    id: 'CON_GHL_9841',
    name: 'Marcus Vance',
    email: 'marcus@apexgrowth.io',
    phone: '+1 (555) 234-8901',
    company: 'Apex Growth Labs',
    leadScore: 88,
    tags: ['UTM: Google PPC', 'High-Intent', 'Revenue: $50k+'],
    utmSource: 'google_cpc_retargeting',
    pipelineStage: 'new_lead',
    dateCreated: 'Just now (Demo Data)',
    lastTouchpoint: 'Form Submission Opt-in',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingestionMode, setIngestionMode] = useState<string>('DEMO');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await ghlApi.createContact(formData);

      if (!res.success) {
        setErrorMessage(res.error || 'Failed to create GHL Contact');
        setIngestionMode('REAL_ERROR');
      } else if (res.contact) {
        setCreatedContact(res.contact);
        setIngestionMode(res.mode);
      }
    } catch (err: any) {
      setErrorMessage(`Network error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-capture" className="relative py-12 sm:py-16 lg:py-24 border-b border-[#4E4D5C]/40 grid-hairlines overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Hero Masthead Headline */}
        <div className="space-y-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2D4654] border border-[#4E4D5C]/50 rounded-full font-mono text-xs font-bold text-[#87BCDE] shadow-sm">
            <Database className="w-4 h-4 text-[#87BCDE]" />
            <span>01 // GHL LEAD CAPTURE & CONTACT INGESTION ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-[#F0F4F8] leading-[1.02] tracking-tight">
            Architecting Custom <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#87BCDE] pr-3">
              GoHighLevel
            </span>
            Revenue Systems.
          </h1>

          <p className="text-base sm:text-xl text-[#F0F4F8]/85 leading-relaxed font-sans font-normal max-w-2xl">
            Engineered pipelines, automated follow-up sequences, timezone smart calendars, and database reactivation designed for Upwork agency and SaaS clients.
          </p>

          {/* Key Capabilities Badges */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#F0F4F8] pt-2">
            <div className="flex items-center gap-2 bg-[#2D4654] px-4 py-2 border border-[#4E4D5C]/40 rounded font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#87BCDE]" />
              <span>Custom Form Webhooks</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2D4654] px-4 py-2 border border-[#4E4D5C]/40 rounded font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#87BCDE]" />
              <span>UTM Attribution Mapping</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2D4654] px-4 py-2 border border-[#4E4D5C]/40 rounded font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#87BCDE]" />
              <span>Auto-Tagging Logic</span>
            </div>
          </div>
        </div>

        {/* Asymmetric 60/40 Split: Left Intake Simulator, Right GHL Live Record */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Intake Engine */}
          <div className="lg:col-span-6 bg-[#2D4654] border border-[#4E4D5C]/40 p-6 sm:p-8 rounded-xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#4E4D5C]/30 pb-4">
              <h3 className="font-mono text-xs font-bold text-[#F0F4F8] tracking-wider uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#87BCDE] animate-pulse"></span>
                Test GHL Custom Form Intake Engine
              </h3>
              <span className="text-[10px] font-mono text-[#F0F4F8]/60 font-semibold">POST /api/v2/ghl/contacts</span>
            </div>

            {errorMessage && (
              <div className="bg-[#805E73]/30 border border-[#805E73] p-3.5 rounded text-xs font-mono text-[#F0F4F8] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#87BCDE] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F0F4F8]/80 font-bold mb-1.5">PROSPECT NAME</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#243B4A] border border-[#4E4D5C]/50 px-4 py-3 text-[#F0F4F8] focus:outline-none focus:border-[#87BCDE] rounded font-medium min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#F0F4F8]/80 font-bold mb-1.5">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#243B4A] border border-[#4E4D5C]/50 px-4 py-3 text-[#F0F4F8] focus:outline-none focus:border-[#87BCDE] rounded font-medium min-h-[44px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F0F4F8]/80 font-bold mb-1.5">COMPANY NAME</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#243B4A] border border-[#4E4D5C]/50 px-4 py-3 text-[#F0F4F8] focus:outline-none focus:border-[#87BCDE] rounded font-medium min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-[#F0F4F8]/80 font-bold mb-1.5">UTM SOURCE TAG</label>
                  <select
                    value={formData.utmSource}
                    onChange={e => setFormData({ ...formData, utmSource: e.target.value })}
                    className="w-full bg-[#243B4A] border border-[#4E4D5C]/50 px-4 py-3 text-[#F0F4F8] focus:outline-none focus:border-[#87BCDE] rounded font-medium min-h-[44px]"
                  >
                    <option value="google_cpc_retargeting">Google CPC Retargeting</option>
                    <option value="meta_lead_ad_v3">Meta Lead Ad V3</option>
                    <option value="cold_email_sequence">Cold Email Outreach</option>
                    <option value="organic_upwork_ref">Upwork Direct Referral</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#805E73] hover:bg-[#684A5D] text-[#F0F4F8] font-bold py-3.5 px-6 rounded transition-all flex items-center justify-center gap-2 text-xs tracking-wider uppercase shadow-md min-h-[48px]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#F0F4F8] border-t-transparent rounded-full animate-spin"></span>
                    Executing GHL Webhook...
                  </>
                ) : (
                  <>
                    Execute GHL Contact Ingestion
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Live Contact Record Telemetry */}
          <div className="lg:col-span-6 bg-[#2D4654] border border-[#4E4D5C]/40 rounded-xl overflow-hidden shadow-xl relative">
            <div className="bg-[#243B4A] px-5 py-4 border-b border-[#4E4D5C]/30 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#87BCDE]"></div>
                <span className="text-[#F0F4F8] font-bold">GHL CRM // CONTACT RECORD VIEW</span>
              </div>
              <span className="text-[#243B4A] bg-[#87BCDE] px-3 py-1 rounded text-[10px] font-bold">
                {ingestionMode === 'REAL' ? 'REAL GHL API CONNECTED' : 'DEMO ENGINE ACTIVE'}
              </span>
            </div>

            {createdContact && (
              <div className="p-6 sm:p-8 space-y-6 font-mono text-xs">
                
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-[#4E4D5C]/30 pb-5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#87BCDE] text-[#243B4A] rounded-full flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
                      {createdContact.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#F0F4F8] font-heading">{createdContact.name}</h4>
                      <p className="text-[#F0F4F8]/70 text-xs">{createdContact.company} • {createdContact.email}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] text-[#F0F4F8]/60 uppercase font-bold">LEAD SCORE</div>
                    <div className="text-2xl font-bold text-[#87BCDE]">{createdContact.leadScore}/100</div>
                  </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg">
                    <span className="text-[#F0F4F8]/60 block text-[10px] font-bold">GHL SYSTEM ID</span>
                    <span className="text-[#F0F4F8] font-bold">{createdContact.id}</span>
                  </div>
                  <div className="bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg">
                    <span className="text-[#F0F4F8]/60 block text-[10px] font-bold">PIPELINE STAGE</span>
                    <span className="text-[#87BCDE] font-bold uppercase">01. New Lead</span>
                  </div>
                  <div className="bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg">
                    <span className="text-[#F0F4F8]/60 block text-[10px] font-bold">PHONE</span>
                    <span className="text-[#F0F4F8] font-medium">{createdContact.phone}</span>
                  </div>
                  <div className="bg-[#243B4A] p-3.5 border border-[#4E4D5C]/30 rounded-lg">
                    <span className="text-[#F0F4F8]/60 block text-[10px] font-bold">ATTRIBUTION</span>
                    <span className="text-[#87BCDE] font-bold flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      {createdContact.utmSource}
                    </span>
                  </div>
                </div>

                {/* Auto-Assigned Tags */}
                <div>
                  <span className="text-[#F0F4F8] block mb-2 text-[10px] uppercase font-bold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#805E73]" />
                    Auto-Assigned GHL Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {createdContact.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#805E73] text-[#F0F4F8] px-3 py-1 rounded text-[11px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Automated Dispatch Log */}
                <div className="bg-[#243B4A] p-4 border border-[#4E4D5C]/30 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-[#F0F4F8]/60 border-b border-[#4E4D5C]/20 pb-2 font-bold">
                    <span>AUTOMATED WORKFLOW DISPATCH LOG</span>
                    <span className="text-[#87BCDE]">STATUS: SUCCESS</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-[#F0F4F8]">
                    <p className="flex items-center gap-2">
                      <span className="text-[#87BCDE] font-bold">✓</span>
                      Trigger: <code className="text-[#F0F4F8] font-bold">form_submission_received</code>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#87BCDE] font-bold">✓</span>
                      Action 1: Contact record created & tagged
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#87BCDE] font-bold">✓</span>
                      Action 2: Dispatched SMS follow-up sequence
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
