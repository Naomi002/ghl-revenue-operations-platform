import { GHLContact } from '../types/ghl';

const PROXY_BASE = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GHL_API_PROXY_URL || 'http://localhost:3002';

export type GhlStatusState = 
  | 'REAL_MODE_CONNECTED'
  | 'REAL_MODE_ERROR'
  | 'REAL_MODE_NOT_CONFIGURED'
  | 'DEMO';

export interface GhlHealthResponse {
  statusState: GhlStatusState;
  mode: 'REAL' | 'REAL_ERROR' | 'DEMO';
  message: string;
  locationId: string;
  locationName?: string;
  calendarConfigured: boolean;
  webhookConfigured: boolean;
  workflowConfigured: boolean;
  timestamp: string;
}

export const ghlApi = {
  /**
   * Health Check to determine exact GHL API v2 connection status
   */
  async checkHealth(): Promise<GhlHealthResponse> {
    try {
      const res = await fetch(`${PROXY_BASE}/api/ghl/health`);
      if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        statusState: 'REAL_MODE_NOT_CONFIGURED',
        mode: 'DEMO',
        message: 'Public Demo Engine Active (Real API Ready)',
        locationId: 'DEMO_MODE',
        calendarConfigured: false,
        webhookConfigured: false,
        workflowConfigured: false,
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Create Contact (GHL API v2: POST /contacts/ or Demo Mode)
   */
  async createContact(contactData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    utmSource: string;
  }): Promise<{ success: boolean; mode: string; contact?: GHLContact; error?: string }> {
    try {
      const res = await fetch(`${PROXY_BASE}/api/ghl/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          mode: data.mode || 'REAL',
          error: data.error || 'Failed to create GHL Contact',
        };
      }

      return {
        success: true,
        mode: data.mode || 'DEMO',
        contact: {
          id: data.contact?.id || `CON_DEMO_${Math.floor(1000 + Math.random() * 9000)}`,
          name: data.contact?.name || contactData.name,
          email: data.contact?.email || contactData.email,
          phone: data.contact?.phone || contactData.phone,
          company: data.contact?.company || contactData.company,
          leadScore: data.contact?.leadScore || 88,
          tags: data.contact?.tags || [`UTM: ${contactData.utmSource}`, 'High-Intent', 'Opt-In Verified'],
          utmSource: contactData.utmSource,
          pipelineStage: 'new_lead',
          dateCreated: 'Just now (Demo Data)',
          lastTouchpoint: 'Form Submission Opt-in',
        },
      };
    } catch (err: any) {
      return {
        success: true,
        mode: 'DEMO',
        contact: {
          id: `CON_DEMO_${Math.floor(1000 + Math.random() * 9000)}`,
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          leadScore: 88,
          tags: [`UTM: ${contactData.utmSource}`, 'High-Intent', 'Opt-In Verified'],
          utmSource: contactData.utmSource,
          pipelineStage: 'new_lead',
          dateCreated: 'Just now (Demo Data)',
          lastTouchpoint: 'Form Submission Opt-in',
        },
      };
    }
  },

  /**
   * Move Opportunity Stage (GHL API v2 or Demo Mode)
   */
  async updateOpportunityStage(opportunityId: string, stageId: string, value: number) {
    try {
      const res = await fetch(`${PROXY_BASE}/api/ghl/opportunities/${opportunityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stageId, monetaryValue: value }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: true, mode: 'DEMO', opportunityId, stageId };
    }
  },

  /**
   * Fetch Free Calendar Slots (GHL API v2 or Demo Mode)
   */
  async fetchCalendarSlots(calendarId?: string, startDate?: number, endDate?: number, timezone?: string) {
    try {
      const params = new URLSearchParams();
      if (calendarId) params.append('calendarId', calendarId);
      if (startDate) params.append('startDate', startDate.toString());
      if (endDate) params.append('endDate', endDate.toString());
      if (timezone) params.append('timezone', timezone);

      const res = await fetch(`${PROXY_BASE}/api/ghl/calendars/slots?${params.toString()}`);
      return await res.json();
    } catch (err: any) {
      return { success: true, mode: 'DEMO', slots: [] };
    }
  },

  /**
   * Book Appointment (GHL API v2 or Demo Mode)
   */
  async bookAppointment(appointmentData: {
    calendarId?: string;
    contactId?: string;
    startTime: string;
  }) {
    try {
      const res = await fetch(`${PROXY_BASE}/api/ghl/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });
      return await res.json();
    } catch (err: any) {
      return {
        success: true,
        mode: 'DEMO',
        appointment: {
          id: `APT_DEMO_${Date.now()}`,
          startTime: appointmentData.startTime,
          status: 'confirmed',
        },
      };
    }
  },

  /**
   * Trigger Official GHL Workflow / Webhook (or Demo Mode)
   */
  async triggerWorkflow(payload: Record<string, unknown>, workflowId?: string, webhookUrl?: string) {
    try {
      const res = await fetch(`${PROXY_BASE}/api/ghl/workflows/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflowId, webhookUrl, payload }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: true, mode: 'DEMO', message: 'Simulated Workflow Dispatch (Demo Mode)' };
    }
  },
};
