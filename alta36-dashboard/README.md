# 🚀 Alta 36 - Sales Command Center

Dashboard commercial centralisé pour Alta 36, agence d'automatisation IA spécialisée en prospection B2B.

## ✨ Fonctionnalités

- **📥 Inbox Réponses** : Voir et répondre aux réponses de prospection PlusVibe
- **📊 Pipeline CRM** : Vue kanban des prospects avec drag & drop
- **📅 Meetings** : RDV à venir avec fiches de préparation pré-meeting
- **🤖 Agent IA** : Chat intelligent pour interroger les données et générer des réponses
- **📈 Métriques** : KPIs de prospection en temps réel

## 🛠 Stack Technique

- **Frontend** : Next.js 14, TypeScript, Tailwind CSS
- **Database** : Supabase (PostgreSQL)
- **AI** : Claude API avec MCPs
- **Intégrations** : PlusVibe (prospection), Google Calendar, N8N

---

## 🚀 Quick Start

### 1. Prérequis

- Node.js 18+
- Compte Supabase (gratuit)
- Compte PlusVibe (Business Plan pour API)
- Clé API Anthropic

### 2. Installation

```bash
# Cloner ou extraire le projet
cd alta36-dashboard

# Installer les dépendances
npm install
```

### 3. Configuration

```bash
# Copier le fichier d'environnement
cp .env.example .env.local

# Éditer .env.local avec tes credentials
```

### 4. Setup Database

1. Crée un projet sur [Supabase](https://supabase.com)
2. Va dans SQL Editor
3. Copie le contenu de `supabase-schema.sql`
4. Exécute le SQL

### 5. Lancer

```bash
# Mode développement
npm run dev

# Ouvrir http://localhost:3000
```

---

## 🔑 Obtenir les Credentials

### Supabase

1. Va sur https://supabase.com
2. Crée un nouveau projet
3. Attends ~2 minutes
4. Va dans **Settings → API**
5. Copie :
   - Project URL
   - anon public key
   - service_role key

### PlusVibe / Pipl.ai

1. Va dans PlusVibe → Settings → API Access
2. (Nécessite Business Plan)
3. Copie ton API Key
4. URL MCP : `https://mcp.plusvibe.ai/mcp?api_key=TA_CLE`

### Claude API

1. Va sur https://console.anthropic.com
2. Crée une clé API
3. Copie la clé (commence par `sk-ant-...`)

### Google Calendar (Optionnel)

1. Va sur https://console.cloud.google.com
2. Crée un projet
3. Active Google Calendar API
4. Crée un Service Account
5. Télécharge la clé JSON
6. Partage ton calendrier avec l'email du service account

---

## 📁 Structure du Projet

```
alta36-dashboard/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Redirect vers /dashboard
│   ├── dashboard/              # Dashboard principal
│   ├── inbox/                  # Inbox réponses
│   ├── pipeline/               # Pipeline CRM
│   ├── meetings/               # Meetings
│   ├── settings/               # Settings
│   └── api/                    # API Routes
├── components/
│   ├── ui/                     # Composants UI
│   ├── dashboard/              # Composants dashboard
│   ├── inbox/                  # Composants inbox
│   ├── pipeline/               # Composants pipeline
│   └── agent/                  # Composants agent IA
├── lib/
│   ├── supabase.ts             # Client Supabase
│   ├── claude-agent.ts         # Client Claude
│   └── utils.ts                # Utilitaires
├── types/
│   └── index.ts                # Types TypeScript
├── .env.example
├── package.json
├── tailwind.config.ts
├── supabase-schema.sql
└── ANTIGRAVITY_PROMPT.md       # Prompt pour Antigravity
```

---

## 🔌 Intégration N8N

Ton workflow N8N existant doit envoyer les données vers Supabase.

### Endpoint webhook

```
POST /api/webhook/n8n
```

### Payload attendu

```json
{
  "action": "create_prospect",
  "payload": {
    "prospect_name": "John Doe",
    "company_name": "Acme Inc",
    "email": "john@acme.com",
    "pipeline_stage": "lead_enriched",
    "pre_meeting_brief": "..."
  }
}
```

### Actions supportées

- `create_prospect` : Créer un nouveau prospect
- `update_prospect` : Mettre à jour un prospect
- `create_meeting` : Créer un meeting avec analyse
- `create_proposal` : Créer une proposal

---

## 🎨 Design System

### Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Primary | `#1a1a2e` | Texte, sidebar, éléments principaux |
| Accent | `#f5a623` | CTAs, highlights, badges |
| Success | `#10b981` | Statuts positifs |
| Warning | `#f59e0b` | Alertes |
| Error | `#ef4444` | Erreurs |
| Background | `#fafafa` | Fond de page |

### Composants

- **Cards** : `bg-white rounded-xl shadow-card`
- **Boutons Primary** : `bg-primary-500 text-white`
- **Boutons Accent** : `bg-accent-500 text-white`
- **Badges** : `px-2 py-1 rounded-full text-xs`

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/prospects` | GET, POST | CRUD prospects |
| `/api/prospects/[id]` | GET, PATCH, DELETE | Prospect spécifique |
| `/api/conversations` | GET, POST | Historique conversations |
| `/api/meetings` | GET, POST | Meetings |
| `/api/agent` | POST | Agent IA |
| `/api/generate-reply` | POST | Générer réponse email |
| `/api/send-email` | POST | Envoyer via PlusVibe |
| `/api/webhook/n8n` | POST | Webhook N8N |
| `/api/health` | GET | Health check |

---

## 🚢 Déploiement

### Vercel (Recommandé)

1. Push le code sur GitHub
2. Va sur https://vercel.com
3. Importe ton repository
4. Ajoute les variables d'environnement
5. Deploy !

### Autres plateformes

- Assure-toi d'avoir Node.js 18+
- Configure toutes les variables d'environnement
- `npm run build` puis `npm start`

---

## 🐛 Troubleshooting

### Erreur Supabase

- Vérifie que les clés sont correctes dans `.env.local`
- Vérifie que le schéma SQL a été exécuté

### PlusVibe ne répond pas

- Vérifie que tu as le Business Plan
- Vérifie ton API key
- Teste l'URL MCP directement

### Agent IA lent

- Normal pour les premières requêtes
- Utilise `claude-sonnet-4-20250514` pour plus de rapidité

---

## 📝 Licence

MIT - Projet interne Alta 36

---

## 🤝 Support

Pour toute question, contacte l'équipe technique Alta 36.
