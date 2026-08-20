import React from 'react';
import { HeaderTelemetry } from './components/HeaderTelemetry';
import { HeroSection } from './components/HeroSection';
import { PipelineSection } from './components/PipelineSection';
import { WorkflowSection } from './components/WorkflowSection';
import { BookingSection } from './components/BookingSection';
import { NurtureSection } from './components/NurtureSection';
import { ReactivationSection } from './components/ReactivationSection';
import { CRM360Section } from './components/CRM360Section';
import { SkillManifestSection } from './components/SkillManifestSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#243B4A] text-[#F0F4F8] font-sans antialiased flex flex-col selection:bg-[#805E73] selection:text-white">
      {/* 00. Persistent Telemetry & Navigation */}
      <HeaderTelemetry />

      <main className="flex-1">
        {/* 01. Hero & Interactive Lead Capture Visualizer */}
        <HeroSection />

        {/* 02. Kinetic Pipeline Stage Migration Board */}
        <PipelineSection />

        {/* 03. Multi-Channel Workflow & Logic Node Simulator */}
        <WorkflowSection />

        {/* 04. Smart Calendar Booking & Instant SMS Sync */}
        <BookingSection />

        {/* 05. 14-Day Multi-Touch Nurturing & Engagement Scrubber */}
        <NurtureSection />

        {/* 06. 500-Lead Database Reactivation Pulse Generator */}
        <ReactivationSection />

        {/* 07. 360° CRM Contact Lifecycle & Audit Trail */}
        <CRM360Section />

        {/* 08. Upwork GHL Expert Capability Manifest & CTA */}
        <SkillManifestSection />
      </main>

      {/* 09. Architectural Blueprint Footer */}
      <Footer />
    </div>
  );
};

export default App;
