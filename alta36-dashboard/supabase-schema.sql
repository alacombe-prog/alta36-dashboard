-- ===========================================
-- ALTA 36 SALES COMMAND CENTER - SUPABASE SCHEMA
-- ===========================================
-- Exécute ce script dans Supabase SQL Editor
-- 
-- Tables :
-- - prospects : Tous les prospects avec enrichissement
-- - conversations : Historique des échanges email
-- - meetings : RDV et analyses post-meeting
-- - proposals : Propositions commerciales
-- - campaign_stats : Métriques par campagne
-- - settings : Configuration de l'app
-- ===========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- TABLE: prospects
-- ===========================================
-- Stocke tous les prospects avec leurs infos enrichies
-- Source : Google Calendar (RDV), PlusVibe (réponses), Manuel

CREATE TABLE IF NOT EXISTS prospects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Infos de base (extraites de Google Calendar ou PlusVibe)
    prospect_name TEXT,
    company_name TEXT,
    email TEXT UNIQUE,
    website TEXT,
    phone TEXT,
    linkedin_url TEXT,
    visio_link TEXT,
    
    -- Pipeline
    pipeline_stage TEXT DEFAULT 'new' CHECK (pipeline_stage IN (
        'new',
        'contacted',
        'replied',
        'interested',
        'meeting_booked',
        'lead_enriched',
        'discovery_completed',
        'presentation_scheduled',
        'presentation_completed',
        'proposal_sent',
        'contract_sent',
        'won',
        'lost'
    )),
    
    -- Source
    source TEXT DEFAULT 'manual' CHECK (source IN ('calendar', 'plusvibe', 'manual', 'n8n')),
    source_campaign TEXT,
    google_event_id TEXT,
    plusvibe_lead_id TEXT,
    
    -- Enrichissement entreprise (généré par LLM via N8N)
    company_profile TEXT,
    company_size TEXT CHECK (company_size IN (
        'Startup (1-10)',
        'Small (11-50)',
        'Medium (51-200)',
        'Large (201-1000)',
        'Enterprise (1000+)',
        NULL
    )),
    growth_stage TEXT CHECK (growth_stage IN (
        'Pre-seed',
        'Seed',
        'Series A',
        'Series B+',
        'Mature',
        'Public',
        NULL
    )),
    annual_revenue_range TEXT CHECK (annual_revenue_range IN (
        '<$1M',
        '$1M-$10M',
        '$10M-$50M',
        '$50M-$100M',
        '$100M-$500M',
        '$500M+',
        NULL
    )),
    
    -- Enrichissement contact (généré par LLM via N8N)
    contact_profile TEXT,
    decision_authority TEXT CHECK (decision_authority IN (
        'Influencer',
        'Recommender',
        'Decision Maker',
        'Executive Sponsor',
        'Gatekeeper',
        NULL
    )),
    professional_background TEXT,
    skills_interests TEXT,
    content_interests TEXT,
    
    -- Analyse commerciale (généré par LLM via N8N)
    conversation_starters TEXT,
    potential_pain_points TEXT,
    competitive_analysis TEXT,
    pre_meeting_brief TEXT,
    
    -- LinkedIn data (scrapé via N8N)
    linkedin_posts JSONB DEFAULT '[]'::jsonb,
    
    -- Deal info
    expected_deal_value DECIMAL,
    probability INTEGER CHECK (probability BETWEEN 0 AND 100),
    
    -- Notes
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_contact_date TIMESTAMPTZ
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_prospects_company ON prospects(company_name);
CREATE INDEX IF NOT EXISTS idx_prospects_stage ON prospects(pipeline_stage);
CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source);
CREATE INDEX IF NOT EXISTS idx_prospects_campaign ON prospects(source_campaign);

-- ===========================================
-- TABLE: conversations
-- ===========================================
-- Historique des échanges email (PlusVibe + autres)

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    
    -- Email info
    direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    channel TEXT DEFAULT 'email' CHECK (channel IN ('email', 'linkedin', 'phone', 'meeting')),
    subject TEXT,
    body TEXT,
    
    -- PlusVibe specific
    plusvibe_message_id TEXT UNIQUE,
    campaign_name TEXT,
    sequence_step INTEGER,
    
    -- Analyse
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative', 'interested', 'not_interested', 'out_of_office')),
    requires_response BOOLEAN DEFAULT false,
    response_generated BOOLEAN DEFAULT false,
    
    -- Timestamps
    sent_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_conversations_prospect ON conversations(prospect_id);
CREATE INDEX IF NOT EXISTS idx_conversations_sentiment ON conversations(sentiment);
CREATE INDEX IF NOT EXISTS idx_conversations_campaign ON conversations(campaign_name);
CREATE INDEX IF NOT EXISTS idx_conversations_date ON conversations(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_requires_response ON conversations(requires_response) WHERE requires_response = true;

-- ===========================================
-- TABLE: meetings
-- ===========================================
-- RDV et analyses post-meeting (Discovery, Presentation, Audit)

CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    
    -- Meeting info
    meeting_title TEXT,
    meeting_type TEXT CHECK (meeting_type IN ('discovery', 'presentation', 'audit', 'closing', 'other')),
    scheduled_at TIMESTAMPTZ,
    duration_minutes INTEGER DEFAULT 30,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'no_show', 'cancelled', 'rescheduled')),
    
    -- Google Calendar
    google_event_id TEXT UNIQUE,
    visio_link TEXT,
    
    -- Fireflies transcript
    fireflies_meeting_id TEXT,
    transcript_url TEXT,
    transcript_content TEXT,
    
    -- Analyse Discovery (généré par LLM après discovery call)
    strategic_focus TEXT,
    key_positioning_points TEXT,
    objection_handling TEXT,
    technical_considerations TEXT,
    value_conversation_guide TEXT,
    client_questions_ideas TEXT,
    
    -- Préparation Presentation
    presentation_prep TEXT,
    
    -- Notes
    meeting_notes TEXT,
    next_steps TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_meetings_prospect ON meetings(prospect_id);
CREATE INDEX IF NOT EXISTS idx_meetings_type ON meetings(meeting_type);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_scheduled ON meetings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_meetings_google ON meetings(google_event_id);

-- ===========================================
-- TABLE: proposals
-- ===========================================
-- Propositions commerciales générées

CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    meeting_id UUID REFERENCES meetings(id) ON DELETE SET NULL,
    
    -- Proposal content (généré par LLM)
    automation_name TEXT,
    goal TEXT,
    introductory_paragraph TEXT,
    logical_phase TEXT,
    tech_stack TEXT,
    timeline_overview TEXT,
    total_timeline TEXT,
    deliverables TEXT,
    
    -- Pricing
    price DECIMAL,
    price_frequency TEXT CHECK (price_frequency IN ('one-off', 'retainer', 'performance', 'hybrid')),
    setup_fee DECIMAL,
    
    -- Document
    document_id TEXT, -- PandaDoc ID
    proposal_url TEXT,
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
    
    -- Timestamps
    sent_at TIMESTAMPTZ,
    viewed_at TIMESTAMPTZ,
    signed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_proposals_prospect ON proposals(prospect_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_meeting ON proposals(meeting_id);

-- ===========================================
-- TABLE: campaign_stats
-- ===========================================
-- Métriques par campagne PlusVibe

CREATE TABLE IF NOT EXISTS campaign_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_name TEXT NOT NULL,
    date DATE NOT NULL,
    
    -- Volume
    emails_sent INTEGER DEFAULT 0,
    emails_delivered INTEGER DEFAULT 0,
    emails_opened INTEGER DEFAULT 0,
    
    -- Engagement
    replies_received INTEGER DEFAULT 0,
    positive_replies INTEGER DEFAULT 0,
    negative_replies INTEGER DEFAULT 0,
    interested_replies INTEGER DEFAULT 0,
    
    -- Conversions
    meetings_booked INTEGER DEFAULT 0,
    proposals_sent INTEGER DEFAULT 0,
    deals_won INTEGER DEFAULT 0,
    
    -- Revenue
    revenue_generated DECIMAL DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(campaign_name, date)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_campaign_stats_name ON campaign_stats(campaign_name);
CREATE INDEX IF NOT EXISTS idx_campaign_stats_date ON campaign_stats(date DESC);

-- ===========================================
-- TABLE: settings
-- ===========================================
-- Configuration de l'application

CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer les settings par défaut
INSERT INTO settings (key, description) VALUES
    ('plusvibe_api_key', 'PlusVibe API Key'),
    ('plusvibe_connected', 'PlusVibe connection status'),
    ('google_calendar_connected', 'Google Calendar connection status'),
    ('n8n_webhook_url', 'N8N webhook base URL'),
    ('default_agent_model', 'Default Claude model for agent'),
    ('last_sync_plusvibe', 'Last PlusVibe sync timestamp'),
    ('last_sync_calendar', 'Last Calendar sync timestamp')
ON CONFLICT DO NOTHING;

-- ===========================================
-- TABLE: agent_conversations
-- ===========================================
-- Historique des conversations avec l'agent IA

CREATE TABLE IF NOT EXISTS agent_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Message
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    
    -- Context
    related_prospect_id UUID REFERENCES prospects(id) ON DELETE SET NULL,
    tools_used JSONB DEFAULT '[]'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_agent_conversations_date ON agent_conversations(created_at DESC);

-- ===========================================
-- VIEWS
-- ===========================================

-- Vue dashboard stats
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM prospects WHERE pipeline_stage NOT IN ('won', 'lost')) as active_prospects,
    (SELECT COUNT(*) FROM prospects WHERE pipeline_stage = 'interested') as interested_prospects,
    (SELECT COUNT(*) FROM meetings WHERE scheduled_at > NOW() AND status = 'scheduled') as upcoming_meetings,
    (SELECT COUNT(*) FROM meetings WHERE scheduled_at > NOW() AND scheduled_at < NOW() + INTERVAL '7 days' AND status = 'scheduled') as meetings_this_week,
    (SELECT COUNT(*) FROM conversations WHERE requires_response = true AND response_generated = false) as pending_responses,
    (SELECT COUNT(*) FROM proposals WHERE status = 'sent') as proposals_pending,
    (SELECT COALESCE(SUM(expected_deal_value * probability / 100), 0) FROM prospects WHERE pipeline_stage NOT IN ('won', 'lost')) as pipeline_value,
    (SELECT COUNT(*) FROM prospects WHERE pipeline_stage = 'won' AND created_at > NOW() - INTERVAL '30 days') as deals_won_month;

-- Vue réponses récentes nécessitant action
CREATE OR REPLACE VIEW pending_replies AS
SELECT 
    c.*,
    p.prospect_name,
    p.company_name,
    p.pre_meeting_brief
FROM conversations c
JOIN prospects p ON c.prospect_id = p.id
WHERE c.requires_response = true 
AND c.response_generated = false
AND c.direction = 'inbound'
ORDER BY c.sent_at DESC;

-- Vue prospects actifs avec dernier contact
CREATE OR REPLACE VIEW active_prospects_view AS
SELECT 
    p.*,
    (SELECT MAX(sent_at) FROM conversations WHERE prospect_id = p.id) as last_conversation_date,
    (SELECT COUNT(*) FROM conversations WHERE prospect_id = p.id) as total_conversations,
    (SELECT COUNT(*) FROM meetings WHERE prospect_id = p.id) as total_meetings
FROM prospects p
WHERE p.pipeline_stage NOT IN ('won', 'lost')
ORDER BY p.updated_at DESC;

-- ===========================================
-- TRIGGERS
-- ===========================================

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer aux tables
DROP TRIGGER IF EXISTS update_prospects_timestamp ON prospects;
CREATE TRIGGER update_prospects_timestamp 
    BEFORE UPDATE ON prospects 
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_meetings_timestamp ON meetings;
CREATE TRIGGER update_meetings_timestamp 
    BEFORE UPDATE ON meetings 
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_proposals_timestamp ON proposals;
CREATE TRIGGER update_proposals_timestamp 
    BEFORE UPDATE ON proposals 
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Mettre à jour last_contact_date quand nouvelle conversation
CREATE OR REPLACE FUNCTION update_last_contact()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE prospects 
    SET last_contact_date = NEW.sent_at
    WHERE id = NEW.prospect_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_prospect_last_contact ON conversations;
CREATE TRIGGER update_prospect_last_contact 
    AFTER INSERT ON conversations 
    FOR EACH ROW EXECUTE FUNCTION update_last_contact();

-- ===========================================
-- ROW LEVEL SECURITY
-- ===========================================

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_conversations ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for now - single user app)
DROP POLICY IF EXISTS "Allow all prospects" ON prospects;
CREATE POLICY "Allow all prospects" ON prospects FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all conversations" ON conversations;
CREATE POLICY "Allow all conversations" ON conversations FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all meetings" ON meetings;
CREATE POLICY "Allow all meetings" ON meetings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all proposals" ON proposals;
CREATE POLICY "Allow all proposals" ON proposals FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all campaign_stats" ON campaign_stats;
CREATE POLICY "Allow all campaign_stats" ON campaign_stats FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all settings" ON settings;
CREATE POLICY "Allow all settings" ON settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow all agent_conversations" ON agent_conversations;
CREATE POLICY "Allow all agent_conversations" ON agent_conversations FOR ALL USING (true);

-- ===========================================
-- SAMPLE DATA (optionnel - pour tester)
-- ===========================================

-- Décommente pour insérer des données de test

/*
INSERT INTO prospects (prospect_name, company_name, email, website, pipeline_stage, source, company_profile, pre_meeting_brief)
VALUES 
    ('Lionel Fauquier', 'We Smart NoCode', 'lionel@wesmart-nocode.fr', 'www.wesmart-nocode.fr', 'meeting_booked', 'calendar', 
     'Agence NoCode spécialisée dans la création d''outils sur mesure (CRM, ERP, automatisations). Basée à Marseille.',
     'Expert CRM et automatisations, co-fondateur de We Smart NoCode. Intéressé par les solutions d''IA pour améliorer leurs services clients.'),
    ('Marie Dupont', 'Tech Startup', 'marie@techstartup.fr', 'www.techstartup.fr', 'interested', 'plusvibe',
     'Startup tech en série A, 25 employés, développe une solution SaaS B2B.',
     'Directrice commerciale, cherche à automatiser leur prospection outbound.');

INSERT INTO conversations (prospect_id, direction, channel, subject, body, sentiment, sent_at, requires_response)
SELECT id, 'inbound', 'email', 'Re: Automatisation prospection', 
       'Bonjour, merci pour votre message. Effectivement, nous cherchons à améliorer notre processus de prospection. Pouvez-vous me donner plus de détails sur vos solutions ?',
       'interested', NOW() - INTERVAL '2 hours', true
FROM prospects WHERE email = 'marie@techstartup.fr';

INSERT INTO meetings (prospect_id, meeting_title, meeting_type, scheduled_at, status)
SELECT id, 'Discovery Call - We Smart NoCode', 'discovery', NOW() + INTERVAL '2 days', 'scheduled'
FROM prospects WHERE email = 'lionel@wesmart-nocode.fr';
*/

-- ===========================================
-- FIN DU SCHEMA
-- ===========================================
