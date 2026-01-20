// ===========================================
// ALTA 36 SALES COMMAND CENTER - TYPES
// ===========================================

// ===========================================
// Database Types (mirrors Supabase schema)
// ===========================================

export type PipelineStage = 
  | 'new'
  | 'contacted'
  | 'replied'
  | 'interested'
  | 'meeting_booked'
  | 'lead_enriched'
  | 'discovery_completed'
  | 'presentation_scheduled'
  | 'presentation_completed'
  | 'proposal_sent'
  | 'contract_sent'
  | 'won'
  | 'lost';

export type ProspectSource = 'calendar' | 'plusvibe' | 'manual' | 'n8n';

export type CompanySize = 
  | 'Startup (1-10)'
  | 'Small (11-50)'
  | 'Medium (51-200)'
  | 'Large (201-1000)'
  | 'Enterprise (1000+)';

export type GrowthStage = 
  | 'Pre-seed'
  | 'Seed'
  | 'Series A'
  | 'Series B+'
  | 'Mature'
  | 'Public';

export type DecisionAuthority = 
  | 'Influencer'
  | 'Recommender'
  | 'Decision Maker'
  | 'Executive Sponsor'
  | 'Gatekeeper';

export type Sentiment = 
  | 'positive'
  | 'neutral'
  | 'negative'
  | 'interested'
  | 'not_interested'
  | 'out_of_office';

export type MeetingType = 'discovery' | 'presentation' | 'audit' | 'closing' | 'other';

export type MeetingStatus = 'scheduled' | 'completed' | 'no_show' | 'cancelled' | 'rescheduled';

export type ProposalStatus = 'draft' | 'review' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';

export type PriceFrequency = 'one-off' | 'retainer' | 'performance' | 'hybrid';

// ===========================================
// Prospect
// ===========================================

export interface Prospect {
  id: string;
  
  // Basic info
  prospect_name: string | null;
  company_name: string | null;
  email: string | null;
  website: string | null;
  phone: string | null;
  linkedin_url: string | null;
  visio_link: string | null;
  
  // Pipeline
  pipeline_stage: PipelineStage;
  source: ProspectSource;
  source_campaign: string | null;
  google_event_id: string | null;
  plusvibe_lead_id: string | null;
  
  // Company enrichment
  company_profile: string | null;
  company_size: CompanySize | null;
  growth_stage: GrowthStage | null;
  annual_revenue_range: string | null;
  
  // Contact enrichment
  contact_profile: string | null;
  decision_authority: DecisionAuthority | null;
  professional_background: string | null;
  skills_interests: string | null;
  content_interests: string | null;
  
  // Sales analysis
  conversation_starters: string | null;
  potential_pain_points: string | null;
  competitive_analysis: string | null;
  pre_meeting_brief: string | null;
  
  // LinkedIn data
  linkedin_posts: LinkedInPost[] | null;
  
  // Deal info
  expected_deal_value: number | null;
  probability: number | null;
  
  // Notes
  notes: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_contact_date: string | null;
}

export interface LinkedInPost {
  id: string;
  content: string;
  posted_at: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  url: string;
}

// ===========================================
// Conversation
// ===========================================

export interface Conversation {
  id: string;
  prospect_id: string;
  
  // Message info
  direction: 'inbound' | 'outbound';
  channel: 'email' | 'linkedin' | 'phone' | 'meeting';
  subject: string | null;
  body: string | null;
  
  // PlusVibe specific
  plusvibe_message_id: string | null;
  campaign_name: string | null;
  sequence_step: number | null;
  
  // Analysis
  sentiment: Sentiment | null;
  requires_response: boolean;
  response_generated: boolean;
  
  // Timestamps
  sent_at: string | null;
  read_at: string | null;
  responded_at: string | null;
  created_at: string;
  
  // Joined data (optional)
  prospect?: Prospect;
}

// ===========================================
// Meeting
// ===========================================

export interface Meeting {
  id: string;
  prospect_id: string;
  
  // Meeting info
  meeting_title: string | null;
  meeting_type: MeetingType | null;
  scheduled_at: string | null;
  duration_minutes: number;
  status: MeetingStatus;
  
  // Google Calendar
  google_event_id: string | null;
  visio_link: string | null;
  
  // Fireflies
  fireflies_meeting_id: string | null;
  transcript_url: string | null;
  transcript_content: string | null;
  
  // Discovery analysis
  strategic_focus: string | null;
  key_positioning_points: string | null;
  objection_handling: string | null;
  technical_considerations: string | null;
  value_conversation_guide: string | null;
  client_questions_ideas: string | null;
  
  // Presentation prep
  presentation_prep: string | null;
  
  // Notes
  meeting_notes: string | null;
  next_steps: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Joined data (optional)
  prospect?: Prospect;
}

// ===========================================
// Proposal
// ===========================================

export interface Proposal {
  id: string;
  prospect_id: string;
  meeting_id: string | null;
  
  // Content
  automation_name: string | null;
  goal: string | null;
  introductory_paragraph: string | null;
  logical_phase: string | null;
  tech_stack: string | null;
  timeline_overview: string | null;
  total_timeline: string | null;
  deliverables: string | null;
  
  // Pricing
  price: number | null;
  price_frequency: PriceFrequency | null;
  setup_fee: number | null;
  
  // Document
  document_id: string | null;
  proposal_url: string | null;
  
  // Status
  status: ProposalStatus;
  
  // Timestamps
  sent_at: string | null;
  viewed_at: string | null;
  signed_at: string | null;
  created_at: string;
  updated_at: string;
  
  // Joined data (optional)
  prospect?: Prospect;
  meeting?: Meeting;
}

// ===========================================
// Campaign Stats
// ===========================================

export interface CampaignStats {
  id: string;
  campaign_name: string;
  date: string;
  
  // Volume
  emails_sent: number;
  emails_delivered: number;
  emails_opened: number;
  
  // Engagement
  replies_received: number;
  positive_replies: number;
  negative_replies: number;
  interested_replies: number;
  
  // Conversions
  meetings_booked: number;
  proposals_sent: number;
  deals_won: number;
  
  // Revenue
  revenue_generated: number;
  
  created_at: string;
}

// ===========================================
// Dashboard Stats (View)
// ===========================================

export interface DashboardStats {
  active_prospects: number;
  interested_prospects: number;
  upcoming_meetings: number;
  meetings_this_week: number;
  pending_responses: number;
  proposals_pending: number;
  pipeline_value: number;
  deals_won_month: number;
}

// ===========================================
// Agent Types
// ===========================================

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  related_prospect_id?: string;
  tools_used?: string[];
  created_at: string;
}

export interface AgentRequest {
  message: string;
  context?: {
    prospect_id?: string;
    conversation_id?: string;
    meeting_id?: string;
  };
}

export interface AgentResponse {
  message: string;
  tools_used?: string[];
  data?: any;
}

// ===========================================
// API Types
// ===========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ===========================================
// N8N Webhook Types
// ===========================================

export type N8NAction = 
  | 'create_prospect'
  | 'update_prospect'
  | 'create_meeting'
  | 'update_meeting'
  | 'create_proposal'
  | 'update_proposal';

export interface N8NWebhookPayload {
  action: N8NAction;
  payload: Partial<Prospect | Meeting | Proposal>;
}

// ===========================================
// PlusVibe Types (from MCP)
// ===========================================

export interface PlusVibeReply {
  id: string;
  campaign_id: string;
  campaign_name: string;
  lead_email: string;
  lead_name: string;
  subject: string;
  body: string;
  received_at: string;
  sentiment: Sentiment;
  thread_id: string;
}

export interface PlusVibeCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    replied: number;
    bounced: number;
  };
}

// ===========================================
// UI Types
// ===========================================

export interface KanbanColumn {
  id: PipelineStage;
  title: string;
  color: string;
  prospects: Prospect[];
}

export interface FilterState {
  search: string;
  source: ProspectSource | 'all';
  campaign: string | 'all';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface SortState {
  field: keyof Prospect;
  direction: 'asc' | 'desc';
}
