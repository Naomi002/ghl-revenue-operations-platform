import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, ArrowUpRight, Menu, X, Database } from 'lucide-react';
import { ghlApi, GhlHealthResponse } from '../services/ghlApi';

export const HeaderTelemetry: React.FC = () => {
  const [leadCounter, setLeadCounter] = useState(4892);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [health, setHealth] = useState<GhlHealthResponse>({
    statusState: 'REAL_MODE_NOT_CONFIGURED',
    mode: 'DEMO',
    message: 'Checking GHL API Status...',
    locationId: 'NOT_CONFIGURED',
    calendarConfigured: false,
    webhookConfigured: false,
    workflowConfigured: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    ghlApi.checkHealth().then(setHealth);

    const interval = setInterval(() => {
      setLeadCounter(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: '01. CAPTURE', href: '#lead-capture' },
    { label: '02. PIPELINE', href: '#pipeline-engine' },
    { label: '03. WORKFLOWS', href: '#workflow-simulator' },
    { label: '04. BOOKING', href: '#smart-booking' },
    { label: '05. NURTURE', href: '#lead-nurturing' },
    { label: '06. REACTIVATION', href: '#reactivation-blast' },
    { label: '07. CRM 360', href: '#crm-lifecycle' },
  ];

  const getStatusBadge = () => {
    switch (health.statusState) {
      case 'REAL_MODE_CONNECTED':
        return {
          dotColor: 'bg-[#87BCDE]',
          text: `REAL GHL API — CONNECTED (${health.locationName || health.locationId})`,
          textColor: 'text-[#87BCDE]',
        };
      case 'REAL_MODE_ERROR':
        return {
          dotColor: 'bg-[#805E73]',
          text: `REAL GHL API — ERROR (${health.message})`,
          textColor: 'text-[#805E73]',
        };
      default:
        return {
          dotColor: 'bg-[#87BCDE]',
          text: 'DEMO ENGINE — ACTIVE (REAL GHL API READY)',
          textColor: 'text-[#87BCDE]',
        };
    }
  };

  const status = getStatusBadge();

  return (
    <header className="sticky top-0 z-50 bg-[#243B4A]/95 backdrop-blur-md border-b border-[#4E4D5C]/40 font-mono text-xs text-[#F0F4F8]">
      {/* Top Technical Telemetry Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between border-b border-[#4E4D5C]/30 text-[10px] sm:text-xs">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-[#F0F4F8] font-bold tracking-wider">
            <span className={`w-2 h-2 rounded-full ${status.dotColor} animate-pulse`}></span>
            <span className={status.textColor}>{status.text}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[#F0F4F8]/70 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#87BCDE]" />
            <span>ARCHITECTURE: GHL API v2 PROXY</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 text-[#F0F4F8]">
            <Activity className="w-3.5 h-3.5 text-[#87BCDE]" />
            <span>ACTIVE_LEADS: <strong className="text-[#87BCDE] font-mono font-bold">{leadCounter.toLocaleString()}</strong></span>
          </div>
          <a
            href="#upwork-contact"
            className="hidden sm:inline-flex items-center gap-1 text-[#F0F4F8] bg-[#805E73] hover:bg-[#684A5D] transition-colors border border-[#805E73] px-3.5 py-1.5 rounded text-[11px] font-bold min-h-[36px]"
          >
            HIRE ON UPWORK
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#87BCDE] text-[#243B4A] flex items-center justify-center font-heading text-sm font-extrabold rounded-xs shadow-sm">
            GHL
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl text-[#F0F4F8] leading-none font-bold tracking-tight group-hover:text-[#87BCDE] transition-colors">
              Revenue Operations
            </span>
            <span className="text-[9px] text-[#F0F4F8]/60 tracking-widest uppercase font-mono font-semibold">
              GoHighLevel Systems Showcase
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-bold tracking-wider text-[#F0F4F8]/80 hover:text-[#87BCDE] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#87BCDE] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 text-[#F0F4F8] hover:text-[#87BCDE] min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2D4654] border-b border-[#4E4D5C]/40 px-4 py-4 space-y-2 font-mono">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold tracking-wider text-[#F0F4F8] hover:text-[#87BCDE] py-3 border-b border-[#4E4D5C]/20 min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#upwork-contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-bold text-[#F0F4F8] bg-[#805E73] py-3.5 rounded mt-4 min-h-[44px] flex items-center justify-center"
          >
            DISCUSS GHL PROJECT ON UPWORK
          </a>
        </div>
      )}
    </header>
  );
};
