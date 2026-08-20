import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#243B4A] border-t border-[#4E4D5C]/40 py-12 font-mono text-xs text-[#F0F4F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#4E4D5C]/30 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#87BCDE] text-[#243B4A] flex items-center justify-center font-heading font-extrabold text-sm shadow-sm">
              GHL
            </div>
            <div>
              <span className="text-[#F0F4F8] font-heading text-xl block leading-none font-bold">
                Revenue Operations
              </span>
              <span className="text-[10px] text-[#F0F4F8]/60 uppercase font-semibold">
                GoHighLevel Architecture Showcase
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 text-[11px] font-bold text-[#F0F4F8]/80">
            <a href="#lead-capture" className="hover:text-[#87BCDE] py-1">01. Lead Capture</a>
            <a href="#pipeline-engine" className="hover:text-[#87BCDE] py-1">02. Pipeline</a>
            <a href="#workflow-simulator" className="hover:text-[#87BCDE] py-1">03. Workflows</a>
            <a href="#smart-booking" className="hover:text-[#87BCDE] py-1">04. Booking</a>
            <a href="#lead-nurturing" className="hover:text-[#87BCDE] py-1">05. Nurturing</a>
            <a href="#reactivation-blast" className="hover:text-[#87BCDE] py-1">06. Reactivation</a>
            <a href="#crm-lifecycle" className="hover:text-[#87BCDE] py-1">07. CRM 360</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#F0F4F8]/60 font-semibold text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} GoHighLevel Revenue Operations Platform. Designed specifically for Upwork Portfolio Demonstration.
          </div>
          <div className="text-[#F0F4F8]/70">
            SYSTEM_ID: SYS_GHL_REV_OPS // PALETTE: #243B4A, #2D4654, #4E4D5C, #805E73, #87BCDE
          </div>
        </div>

      </div>
    </footer>
  );
};
