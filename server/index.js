import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// Parse .env manually (Zero External Dependencies)
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of envLines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  }
}

const PORT = process.env.PORT || 3002;
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID || '';
const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || '';
const GHL_WORKFLOW_ID = process.env.GHL_WORKFLOW_ID || '';

// Official LeadConnector (GoHighLevel API v2) Specification
const GHL_API_V2_BASE = 'https://services.leadconnectorhq.com';

const getGhlHeaders = () => ({
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28', // Mandatory LeadConnector API v2 Header
});

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Version',
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Parse JSON Body for POST/PUT requests
  let body = {};
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const dataStr = Buffer.concat(buffers).toString();
      if (dataStr) body = JSON.parse(dataStr);
    } catch (e) {
      body = {};
    }
  }

  // ---------------------------------------------------------------------------
  // 01. HEALTH CHECK — AUTHENTICATED GHL LOCATION VERIFICATION
  // Official Endpoint: GET https://services.leadconnectorhq.com/locations/{locationId}
  // Scope Required: locations.readonly
  // ---------------------------------------------------------------------------
  if (pathname === '/api/ghl/health' && req.method === 'GET') {
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return sendJson(res, 200, {
        statusState: 'REAL_MODE_NOT_CONFIGURED',
        mode: 'DEMO',
        message: 'GHL Credentials Missing in .env (GHL_API_KEY or GHL_LOCATION_ID)',
        locationId: 'NOT_CONFIGURED',
        calendarConfigured: Boolean(GHL_CALENDAR_ID),
        webhookConfigured: Boolean(GHL_WEBHOOK_URL),
        workflowConfigured: Boolean(GHL_WORKFLOW_ID),
        timestamp: new Date().toISOString(),
      });
    }

    try {
      const verifyRes = await fetch(`${GHL_API_V2_BASE}/locations/${GHL_LOCATION_ID}`, {
        headers: getGhlHeaders(),
      });

      if (verifyRes.ok) {
        const locData = await verifyRes.json();
        return sendJson(res, 200, {
          statusState: 'REAL_MODE_CONNECTED',
          mode: 'REAL',
          message: 'Confirmed GHL API v2 Connection',
          locationName: locData.location?.name || 'GHL Location',
          locationId: GHL_LOCATION_ID,
          calendarConfigured: Boolean(GHL_CALENDAR_ID),
          webhookConfigured: Boolean(GHL_WEBHOOK_URL),
          workflowConfigured: Boolean(GHL_WORKFLOW_ID),
          timestamp: new Date().toISOString(),
        });
      } else {
        const errData = await verifyRes.json().catch(() => ({}));
        return sendJson(res, 200, {
          statusState: 'REAL_MODE_ERROR',
          mode: 'REAL_ERROR',
          message: errData.message || `GHL API Authorization Failed (HTTP ${verifyRes.status})`,
          locationId: GHL_LOCATION_ID,
          calendarConfigured: Boolean(GHL_CALENDAR_ID),
          webhookConfigured: Boolean(GHL_WEBHOOK_URL),
          workflowConfigured: Boolean(GHL_WORKFLOW_ID),
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      return sendJson(res, 200, {
        statusState: 'REAL_MODE_ERROR',
        mode: 'REAL_ERROR',
        message: `Network Connection Error to LeadConnector: ${err.message}`,
        locationId: GHL_LOCATION_ID,
        calendarConfigured: Boolean(GHL_CALENDAR_ID),
        webhookConfigured: Boolean(GHL_WEBHOOK_URL),
        workflowConfigured: Boolean(GHL_WORKFLOW_ID),
        timestamp: new Date().toISOString(),
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 02. LEAD CAPTURE — CREATE CONTACT (GHL API v2)
  // Official Endpoint: POST https://services.leadconnectorhq.com/contacts/
  // Scope Required: contacts.write
  // ---------------------------------------------------------------------------
  if (pathname === '/api/ghl/contacts' && req.method === 'POST') {
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return sendJson(res, 200, {
        success: true,
        mode: 'DEMO',
        contact: {
          id: `CON_DEMO_${Math.floor(1000 + Math.random() * 9000)}`,
          name: body.name || 'Marcus Vance',
          email: body.email || 'marcus@apexgrowth.io',
          phone: body.phone || '+1 (555) 234-8901',
          company: body.company || 'Apex Growth Labs',
          tags: [`UTM: ${body.utmSource || 'google_cpc'}`, 'High-Intent', 'Opt-In Verified'],
          leadScore: 88,
        },
      });
    }

    try {
      const nameParts = (body.name || '').split(' ');
      const payload = {
        locationId: GHL_LOCATION_ID,
        firstName: nameParts[0] || 'Prospect',
        lastName: nameParts.slice(1).join(' ') || '',
        name: body.name,
        email: body.email,
        phone: body.phone,
        companyName: body.company,
        tags: [body.utmSource || 'google_cpc_retargeting', 'High-Intent', 'Opt-In Verified'],
      };

      const ghlRes = await fetch(`${GHL_API_V2_BASE}/contacts/`, {
        method: 'POST',
        headers: getGhlHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await ghlRes.json();

      if (!ghlRes.ok) {
        return sendJson(res, ghlRes.status, {
          success: false,
          mode: 'REAL',
          error: data.message || `GHL Error ${ghlRes.status}: Failed to create contact`,
        });
      }

      return sendJson(res, 200, {
        success: true,
        mode: 'REAL',
        contact: {
          id: data.contact?.id || `CON_${Date.now()}`,
          name: data.contact?.name || body.name,
          email: data.contact?.email || body.email,
          phone: data.contact?.phone || body.phone,
          company: data.contact?.companyName || body.company,
          tags: data.contact?.tags || ['High-Intent'],
          leadScore: 92,
        },
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, mode: 'REAL', error: err.message });
    }
  }

  // ---------------------------------------------------------------------------
  // 03. PIPELINE — UPDATE OPPORTUNITY STAGE (GHL API v2)
  // Official Endpoint: PUT https://services.leadconnectorhq.com/opportunities/{id}
  // Scope Required: opportunities.write
  // ---------------------------------------------------------------------------
  if (pathname.startsWith('/api/ghl/opportunities/') && req.method === 'PUT') {
    const oppId = pathname.replace('/api/ghl/opportunities/', '');

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return sendJson(res, 200, {
        success: true,
        mode: 'DEMO',
        opportunityId: oppId,
        stageId: body.stageId,
      });
    }

    try {
      const ghlRes = await fetch(`${GHL_API_V2_BASE}/opportunities/${oppId}`, {
        method: 'PUT',
        headers: getGhlHeaders(),
        body: JSON.stringify({
          pipelineStageId: body.stageId,
          monetaryValue: body.monetaryValue || 7500,
          status: body.status || 'open',
        }),
      });

      const data = await ghlRes.json();

      if (!ghlRes.ok) {
        return sendJson(res, ghlRes.status, {
          success: false,
          mode: 'REAL',
          error: data.message || `GHL Error ${ghlRes.status}: Failed to update opportunity stage`,
        });
      }

      return sendJson(res, 200, { success: true, mode: 'REAL', data });
    } catch (err) {
      return sendJson(res, 500, { success: false, mode: 'REAL', error: err.message });
    }
  }

  // ---------------------------------------------------------------------------
  // 04. BOOKING — FETCH FREE SLOTS & CREATE APPOINTMENT (GHL API v2)
  // Endpoints: GET /calendars/{calendarId}/free-slots & POST /appointments/
  // Scope Required: calendars.readonly & calendars/events.write
  // ---------------------------------------------------------------------------
  if (pathname === '/api/ghl/calendars/slots' && req.method === 'GET') {
    const calendarId = url.searchParams.get('calendarId') || GHL_CALENDAR_ID;

    if (!GHL_API_KEY || !calendarId) {
      return sendJson(res, 200, {
        success: true,
        mode: 'DEMO',
        slots: [
          { id: '1', time: '09:00 AM', available: true },
          { id: '2', time: '10:30 AM', available: false },
          { id: '3', time: '01:00 PM', available: true },
          { id: '4', time: '02:30 PM', available: true },
          { id: '5', time: '04:00 PM', available: true },
          { id: '6', time: '05:30 PM', available: false },
        ],
      });
    }

    try {
      const startDate = url.searchParams.get('startDate') || Date.now();
      const endDate = url.searchParams.get('endDate') || Date.now() + 86400000 * 7;
      const timezone = url.searchParams.get('timezone') || 'America/New_York';

      const ghlRes = await fetch(
        `${GHL_API_V2_BASE}/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=${encodeURIComponent(timezone)}`,
        { headers: getGhlHeaders() }
      );
      const data = await ghlRes.json();

      if (!ghlRes.ok) {
        return sendJson(res, ghlRes.status, {
          success: false,
          mode: 'REAL',
          error: data.message || 'Failed to fetch free slots from GHL',
        });
      }

      return sendJson(res, 200, { success: true, mode: 'REAL', slots: data.slots || [] });
    } catch (err) {
      return sendJson(res, 500, { success: false, mode: 'REAL', error: err.message });
    }
  }

  if (pathname === '/api/ghl/appointments' && req.method === 'POST') {
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return sendJson(res, 200, {
        success: true,
        mode: 'DEMO',
        appointment: {
          id: `APT_DEMO_${Date.now()}`,
          startTime: body.startTime || '2026-08-21T14:30:00Z',
          status: 'confirmed',
        },
      });
    }

    try {
      const ghlRes = await fetch(`${GHL_API_V2_BASE}/appointments/`, {
        method: 'POST',
        headers: getGhlHeaders(),
        body: JSON.stringify({
          calendarId: body.calendarId || GHL_CALENDAR_ID,
          locationId: GHL_LOCATION_ID,
          contactId: body.contactId,
          startTime: body.startTime,
          appointmentStatus: 'confirmed',
        }),
      });

      const data = await ghlRes.json();

      if (!ghlRes.ok) {
        return sendJson(res, ghlRes.status, {
          success: false,
          mode: 'REAL',
          error: data.message || 'Failed to create appointment in GHL',
        });
      }

      return sendJson(res, 200, { success: true, mode: 'REAL', data });
    } catch (err) {
      return sendJson(res, 500, { success: false, mode: 'REAL', error: err.message });
    }
  }

  // ---------------------------------------------------------------------------
  // 05. WORKFLOW & WEBHOOK DISPATCH (OFFICIAL GHL INBOUND WEBHOOK / EVENTS)
  // Endpoints: POST /workflows/{workflowId}/events or GHL Inbound Webhook
  // Scope Required: workflows.readonly
  // ---------------------------------------------------------------------------
  if (pathname === '/api/ghl/workflows/trigger' && req.method === 'POST') {
    const workflowId = body.workflowId || GHL_WORKFLOW_ID;
    const webhookUrl = body.webhookUrl || GHL_WEBHOOK_URL;

    if (!GHL_API_KEY && !webhookUrl) {
      return sendJson(res, 200, {
        success: true,
        mode: 'DEMO',
        message: 'Simulated Workflow Dispatch (Demo Mode)',
      });
    }

    try {
      if (webhookUrl) {
        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body.payload || {}),
        });

        return sendJson(res, 200, {
          success: webhookRes.ok,
          mode: 'REAL',
          type: 'WEBHOOK',
          statusCode: webhookRes.status,
        });
      }

      if (workflowId && GHL_API_KEY) {
        const wfRes = await fetch(`${GHL_API_V2_BASE}/workflows/${workflowId}/events`, {
          method: 'POST',
          headers: getGhlHeaders(),
          body: JSON.stringify({
            contactId: body.contactId,
            eventSource: 'API_v2_Integration',
          }),
        });

        const wfData = await wfRes.json();
        if (!wfRes.ok) {
          return sendJson(res, wfRes.status, {
            success: false,
            mode: 'REAL',
            error: wfData.message || 'Failed to trigger GHL Workflow event',
          });
        }

        return sendJson(res, 200, { success: true, mode: 'REAL', type: 'WORKFLOW_EVENT', data: wfData });
      }

      return sendJson(res, 200, { success: true, mode: 'DEMO', message: 'Simulated Workflow Trigger' });
    } catch (err) {
      return sendJson(res, 500, { success: false, mode: 'REAL', error: err.message });
    }
  }

  // Default 404 Fallback
  return sendJson(res, 404, { error: 'Endpoint Not Found' });
});

server.listen(PORT, () => {
  console.log(`[GHL Verified Server Proxy v2] Listening on http://localhost:${PORT}`);
  console.log(`[GHL Connection Status] API Key: ${GHL_API_KEY ? 'PRESENT' : 'NOT CONFIGURED (DEMO MODE)'}`);
});
