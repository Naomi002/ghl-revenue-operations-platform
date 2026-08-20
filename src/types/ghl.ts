export interface GHLContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  leadScore: number;
  tags: string[];
  utmSource: string;
  pipelineStage: 'new_lead' | 'contacted' | 'booking_requested' | 'appointment_booked' | 'deal_won';
  dateCreated: string;
  lastTouchpoint: string;
}

export interface PipelineStage {
  id: 'new_lead' | 'contacted' | 'booking_requested' | 'appointment_booked' | 'deal_won';
  title: string;
  description: string;
  count: number;
  totalValue: number;
  conversionRate: string;
  badgeColor: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'wait' | 'action_sms' | 'action_email' | 'condition' | 'booking';
  title: string;
  subtitle: string;
  status: 'idle' | 'executing' | 'completed';
  payload?: Record<string, string>;
}

export interface CalendarSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  type: 'optin' | 'sms_sent' | 'reply_received' | 'stage_changed' | 'booked' | 'won';
  title: string;
  detail: string;
  channel: 'Web' | 'SMS' | 'Email' | 'GHL Workflow' | 'System';
}
