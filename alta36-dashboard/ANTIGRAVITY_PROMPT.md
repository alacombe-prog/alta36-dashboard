# 🚀 Alta 36 - Sales Command Center | Prompt Antigravity

Copie ce prompt entier dans Antigravity pour construire le dashboard commercial d'Alta 36.

---

## 📋 Overview

Tu vas construire un **Sales Command Center** pour Alta 36, une agence d'automatisation IA spécialisée en prospection B2B.

### Ce que fait ce dashboard :
- **Inbox Réponses** : Voir et répondre aux réponses de prospection (via PlusVibe MCP)
- **Pipeline CRM** : Vue kanban des prospects avec toutes les infos enrichies
- **Meetings** : RDV à venir avec fiches de préparation pré-meeting
- **Agent IA** : Chat qui peut interroger les données et générer des réponses personnalisées
- **Métriques** : KPIs de prospection (emails envoyés, taux de réponse, meetings bookés)

### Stack technique :
- **Frontend** : Next.js 14, TypeScript, Tailwind CSS
- **Database** : Supabase (PostgreSQL)
- **AI** : Claude API avec MCPs (PlusVibe, Google Calendar)
- **Intégrations** : PlusVibe (prospection), Google Calendar, N8N (workflows background)

### Design :
- Style moderne et professionnel
- Couleurs : Bleu foncé (#1a1a2e), Accents dorés (#f5a623), Fond clair (#fafafa)
- UI épurée, focus sur l'efficacité

---

## ⚡ Étapes de Setup

### Étape 1 : Installation des dépendances
```bash
npm install
```

### Étape 2 : Configuration des variables d'environnement
Copie `.env.example` vers `.env.local` et remplis avec tes credentials.

### Étape 3 : Setup Supabase
1. Crée un projet sur https://supabase.com
2. Va dans SQL Editor
3. Copie le contenu de `supabase-schema.sql`
4. Exécute le SQL

### Étape 4 : Lancer le serveur
```bash
npm run dev
```

---

## 🔑 Étape 2 Détaillée : API Keys & Credentials

### 2.1 Supabase (Database) - REQUIS

**Pourquoi** : Stocke tous tes prospects, meetings, conversations, proposals.

**Comment l'obtenir** :
1. Va sur https://supabase.com
2. Crée un nouveau projet "alta36-dashboard"
3. Attends ~2 minutes que le projet s'initialise
4. Va dans **Settings → API**
5. Copie :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public key** : commence par `eyJ...`
   - **service_role key** : commence par `eyJ...`

### 2.2 PlusVibe / Pipl.ai (Prospection) - REQUIS

**Pourquoi** : Récupère les réponses de tes campagnes et permet d'envoyer des emails.

**Comment l'obtenir** :
1. Va dans PlusVibe → Settings → API Access (nécessite Business Plan)
2. Copie ton **API Key**
3. L'URL du MCP est : `https://mcp.plusvibe.ai/mcp?api_key=TA_CLE`

### 2.3 Claude API (Agent IA) - REQUIS

**Pourquoi** : L'agent IA qui génère des réponses et interroge tes données.

**Comment l'obtenir** :
1. Va sur https://console.anthropic.com
2. Crée un compte ou connecte-toi
3. Va dans **API Keys**
4. Crée une nouvelle clé
5. Copie la clé (commence par `sk-ant-...`)

### 2.4 Google Calendar (Meetings) - OPTIONNEL

**Pourquoi** : Voir tes RDV directement dans le dashboard.

**Comment l'obtenir** :
1. Va sur https://console.cloud.google.com
2. Crée un projet "alta36-dashboard"
3. Active **Google Calendar API**
4. Crée un **Service Account** dans IAM & Admin → Service Accounts
5. Crée une clé JSON pour ce service account
6. Partage ton calendrier avec l'email du service account

---

## 🔧 Étape 3 : Variables d'environnement

Crée un fichier `.env.local` avec :

```env
# ===========================================
# ALTA 36 SALES COMMAND CENTER - ENV VARIABLES
# ===========================================

# SUPABASE (Requis)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# PLUSVIBE / PIPL.AI (Requis)
PLUSVIBE_API_KEY=your-plusvibe-api-key
PLUSVIBE_MCP_URL=https://mcp.plusvibe.ai/mcp

# CLAUDE API (Requis)
ANTHROPIC_API_KEY=sk-ant-your-api-key

# GOOGLE CALENDAR (Optionnel)
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=a.lacombe@alta36.com

# N8N WEBHOOK (pour sync avec tes workflows existants)
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook

# APP CONFIG
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗄 Étape 4 : Structure de la Base de Données

Le fichier `supabase-schema.sql` crée les tables suivantes :

### Table `prospects`
Stocke tous tes prospects avec leurs infos enrichies.

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| prospect_name | TEXT | Nom du contact |
| company_name | TEXT | Nom de l'entreprise |
| email | TEXT | Email du prospect |
| website | TEXT | Site web |
| phone | TEXT | Téléphone |
| pipeline_stage | TEXT | Étape du pipeline |
| source | TEXT | Source (calendar, plusvibe, manual) |
| source_campaign | TEXT | Nom de la campagne PlusVibe |
| company_profile | TEXT | Profil entreprise (enrichi) |
| pre_meeting_brief | TEXT | Brief pré-meeting (enrichi) |
| linkedin_url | TEXT | URL LinkedIn |
| linkedin_posts | JSONB | Posts LinkedIn scrapés |
| created_at | TIMESTAMP | Date de création |

### Table `conversations`
Historique des échanges email.

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| prospect_id | UUID | Lien vers prospect |
| direction | TEXT | inbound/outbound |
| subject | TEXT | Sujet email |
| body | TEXT | Contenu email |
| sentiment | TEXT | positive/neutral/negative |
| plusvibe_message_id | TEXT | ID PlusVibe |
| campaign_name | TEXT | Campagne source |
| sent_at | TIMESTAMP | Date d'envoi |

### Table `meetings`
RDV et analyses post-meeting.

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| prospect_id | UUID | Lien vers prospect |
| meeting_type | TEXT | discovery/presentation/audit |
| scheduled_at | TIMESTAMP | Date du RDV |
| transcript_url | TEXT | Lien Google Doc transcript |
| strategic_focus | TEXT | Focus stratégique (analysé) |
| key_positioning_points | TEXT | Points de positionnement |
| objection_handling | TEXT | Gestion des objections |

### Table `proposals`
Propositions commerciales.

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| prospect_id | UUID | Lien vers prospect |
| meeting_id | UUID | Lien vers meeting |
| automation_name | TEXT | Nom de l'automatisation |
| goal | TEXT | Objectif |
| price | DECIMAL | Prix |
| status | TEXT | draft/sent/accepted/rejected |

---

## 🎯 Fonctionnalités à Construire

### Page 1 : Dashboard (`/dashboard`)

**Layout** : 
- Header avec logo Alta 36 et bouton "Sync All"
- 4 cards KPI en haut (Prospects actifs, Meetings cette semaine, Taux de réponse, Pipeline value)
- Section "Réponses récentes" (5 dernières)
- Section "Meetings à venir" (3 prochains)
- Agent IA en sidebar ou modal

**Fonctionnalités** :
- Afficher les métriques depuis Supabase
- Liste des réponses récentes avec sentiment (badge couleur)
- Liste des meetings avec countdown
- Bouton pour ouvrir l'agent IA

### Page 2 : Inbox Réponses (`/inbox`)

**Layout** :
- Liste des réponses à gauche (filtrable par campagne, sentiment, date)
- Détail de la conversation à droite
- Zone de réponse en bas avec bouton "Générer avec IA"

**Fonctionnalités** :
- Fetch réponses via MCP PlusVibe en temps réel
- Afficher historique conversation
- Générer réponse avec Claude (contexte = prospect + historique + enrichissement)
- Envoyer via MCP PlusVibe
- Marquer comme traité

**Agent IA pour génération de réponse** :
```
Tu es l'assistant commercial d'Alta 36, une agence d'automatisation IA spécialisée en prospection B2B.

Contexte du prospect :
- Nom : {prospect_name}
- Entreprise : {company_name}
- Brief : {pre_meeting_brief}

Historique de la conversation :
{conversation_history}

Génère une réponse professionnelle, personnalisée et orientée vers la prise de RDV.
Ton : professionnel mais chaleureux, direct, orienté valeur.
Longueur : 3-5 phrases max.
```

### Page 3 : Pipeline (`/pipeline`)

**Layout** :
- Vue Kanban avec colonnes : Nouveau → Répondu → Intéressé → Meeting Booké → Discovery Done → Proposal Sent → Won / Lost
- Cards prospects draggables
- Click sur card = modal avec détails complets

**Fonctionnalités** :
- Drag & drop pour changer de statut
- Filtres (source, date, campagne)
- Recherche par nom/entreprise
- Modal détail avec : infos, enrichissement, historique conversations, meetings, proposals

### Page 4 : Meetings (`/meetings`)

**Layout** :
- Calendrier mensuel à gauche
- Liste des meetings à droite
- Click sur meeting = fiche de préparation

**Fonctionnalités** :
- Sync Google Calendar (ou afficher depuis Supabase si sync N8N)
- Fiche meeting avec : infos prospect, brief pré-meeting, points clés
- Post-meeting : voir transcript, analyse, next steps

### Page 5 : Agent IA (`/agent` ou modal global)

**Layout** :
- Interface chat type ChatGPT
- Input en bas
- Historique conversation

**Fonctionnalités** :
- Interroger les données : "Combien de meetings cette semaine ?", "Liste les prospects intéressés"
- Générer du contenu : "Écris une relance pour [prospect]"
- Exécuter des actions via MCPs : "Envoie cet email", "Crée un RDV"

**System prompt de l'agent** :
```
Tu es l'assistant IA d'Alta 36, une agence d'automatisation IA spécialisée en prospection B2B pour les PME.

Tu as accès aux outils suivants :
- MCP PlusVibe : lire les réponses de campagne, envoyer des emails
- MCP Google Calendar : voir et créer des RDV
- Base Supabase : tous les prospects, conversations, meetings, proposals

Ton rôle :
1. Répondre aux questions sur les données (stats, listes, recherches)
2. Générer des contenus (emails, relances, briefs)
3. Exécuter des actions quand on te le demande

Style : professionnel, concis, orienté action.
```

### Page 6 : Settings (`/settings`)

**Layout** :
- Sections pour chaque intégration
- Formulaires pour API keys
- Boutons de test de connexion

**Fonctionnalités** :
- Configurer/modifier les API keys
- Tester les connexions (Supabase, PlusVibe, Calendar)
- Voir les logs de sync

---

## 🔌 Intégration des MCPs

### Dans le code, utiliser l'API Anthropic avec MCPs :

```typescript
// lib/claude-agent.ts

export async function askAgent(userMessage: string, context?: any) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: AGENT_SYSTEM_PROMPT,
      messages: [
        { role: "user", content: userMessage }
      ],
      mcp_servers: [
        {
          type: "url",
          url: `${process.env.PLUSVIBE_MCP_URL}?api_key=${process.env.PLUSVIBE_API_KEY}`,
          name: "plusvibe"
        }
      ]
    })
  });
  
  return response.json();
}
```

### Pour générer une réponse email :

```typescript
// app/api/generate-reply/route.ts

export async function POST(request: Request) {
  const { prospectId, conversationHistory } = await request.json();
  
  // Récupérer le contexte du prospect depuis Supabase
  const prospect = await supabase
    .from('prospects')
    .select('*')
    .eq('id', prospectId)
    .single();
  
  // Générer la réponse avec Claude
  const response = await askAgent(`
    Génère une réponse email pour ce prospect.
    
    Prospect: ${prospect.prospect_name} de ${prospect.company_name}
    Brief: ${prospect.pre_meeting_brief}
    
    Historique:
    ${conversationHistory}
    
    Génère une réponse courte et personnalisée orientée vers la prise de RDV.
  `);
  
  return Response.json({ reply: response });
}
```

---

## 📁 Structure des Fichiers

```
alta36-dashboard/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Redirect vers /dashboard
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard principal
│   ├── inbox/
│   │   └── page.tsx            # Inbox réponses
│   ├── pipeline/
│   │   └── page.tsx            # Pipeline CRM
│   ├── meetings/
│   │   └── page.tsx            # Meetings
│   ├── settings/
│   │   └── page.tsx            # Settings
│   └── api/
│       ├── prospects/
│       │   └── route.ts        # CRUD prospects
│       ├── conversations/
│       │   └── route.ts        # CRUD conversations
│       ├── meetings/
│       │   └── route.ts        # CRUD meetings
│       ├── agent/
│       │   └── route.ts        # Agent IA
│       ├── generate-reply/
│       │   └── route.ts        # Générer réponse email
│       ├── send-email/
│       │   └── route.ts        # Envoyer via PlusVibe
│       ├── sync/
│       │   ├── plusvibe/
│       │   │   └── route.ts    # Sync PlusVibe
│       │   └── calendar/
│       │       └── route.ts    # Sync Calendar
│       └── health/
│           └── route.ts        # Health check
├── components/
│   ├── ui/                     # Composants UI réutilisables
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── dashboard/
│   │   ├── kpi-card.tsx
│   │   ├── recent-replies.tsx
│   │   └── upcoming-meetings.tsx
│   ├── inbox/
│   │   ├── conversation-list.tsx
│   │   ├── conversation-detail.tsx
│   │   └── reply-composer.tsx
│   ├── pipeline/
│   │   ├── kanban-board.tsx
│   │   ├── prospect-card.tsx
│   │   └── prospect-modal.tsx
│   ├── meetings/
│   │   ├── calendar-view.tsx
│   │   └── meeting-card.tsx
│   ├── agent/
│   │   ├── chat-interface.tsx
│   │   └── message-bubble.tsx
│   └── layout/
│       ├── sidebar.tsx
│       ├── header.tsx
│       └── nav-link.tsx
├── lib/
│   ├── supabase.ts             # Client Supabase
│   ├── claude-agent.ts         # Client Claude avec MCPs
│   ├── plusvibe.ts             # Helpers PlusVibe
│   └── utils.ts                # Utilitaires
├── types/
│   └── index.ts                # Types TypeScript
├── public/
│   └── logo.svg                # Logo Alta 36
├── .env.example
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── supabase-schema.sql
```

---

## 🎨 Design System

### Couleurs

```typescript
// tailwind.config.ts
colors: {
  primary: {
    50: '#f0f4ff',
    100: '#e0e7ff',
    500: '#1a1a2e',  // Bleu foncé principal
    600: '#0f0f1a',
    700: '#0a0a12',
  },
  accent: {
    400: '#fdb913',
    500: '#f5a623',  // Doré accent
    600: '#e89b0c',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#fafafa',
  card: '#ffffff',
  border: '#e5e7eb',
}
```

### Composants UI

- **Cards** : Fond blanc, border subtle, shadow légère, radius 12px
- **Boutons** : Primary (bleu foncé), Secondary (outline), Accent (doré pour CTA)
- **Badges** : Pour les statuts et sentiments (vert=positif, jaune=neutre, rouge=négatif)
- **Inputs** : Border gris, focus ring bleu
- **Modal** : Overlay sombre, card centrée, animation fade

---

## 🚀 Commandes de Développement

```bash
# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Build production
npm run build

# Lancer en production
npm start

# Linter
npm run lint
```

---

## ✅ Checklist de Validation

Après construction, vérifier :

- [ ] Dashboard affiche les KPIs
- [ ] Inbox charge les réponses PlusVibe
- [ ] Pipeline affiche les prospects depuis Supabase
- [ ] Drag & drop fonctionne sur le kanban
- [ ] Agent IA répond aux questions
- [ ] Génération de réponse email fonctionne
- [ ] Envoi d'email via PlusVibe fonctionne
- [ ] Meetings s'affichent correctement
- [ ] Settings permettent de tester les connexions

---

## 🔗 Webhook N8N (pour sync)

Ton workflow N8N existant doit envoyer les données vers Supabase au lieu d'Airtable.

### Endpoint pour recevoir les données de N8N :

```typescript
// app/api/webhook/n8n/route.ts

export async function POST(request: Request) {
  const data = await request.json();
  const { action, payload } = data;
  
  switch (action) {
    case 'create_prospect':
      // Créer prospect enrichi
      await supabase.from('prospects').insert(payload);
      break;
    case 'update_prospect':
      // Mettre à jour prospect
      await supabase.from('prospects').update(payload).eq('id', payload.id);
      break;
    case 'create_meeting':
      // Créer meeting avec analyse
      await supabase.from('meetings').insert(payload);
      break;
    case 'create_proposal':
      // Créer proposal
      await supabase.from('proposals').insert(payload);
      break;
  }
  
  return Response.json({ success: true });
}
```

---

**Maintenant, commence à construire l'application en suivant ces spécifications !**
