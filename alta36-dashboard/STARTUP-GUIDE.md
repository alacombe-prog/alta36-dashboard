# 🚀 Alta 36 Dashboard - Guide de Démarrage Rapide

Ce document t'explique comment lancer le dashboard en 5 minutes.

---

## ✅ Checklist Pré-Démarrage

Avant de commencer, assure-toi d'avoir :

- [ ] Node.js 18+ installé
- [ ] Un compte Supabase (gratuit)
- [ ] Un compte PlusVibe avec Business Plan
- [ ] Une clé API Anthropic

---

## 📦 Étape 1 : Installation

```bash
# Dans le dossier du projet
npm install
```

Durée : ~2-3 minutes

---

## 🔑 Étape 2 : Configuration des Credentials

### 2.1 Créer le fichier .env.local

```bash
cp .env.example .env.local
```

### 2.2 Remplir les credentials

Ouvre `.env.local` et remplis :

```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# PLUSVIBE
PLUSVIBE_API_KEY=ton-api-key

# CLAUDE
ANTHROPIC_API_KEY=sk-ant-...
```

**Où trouver ces infos :**

| Credential | Où le trouver |
|------------|---------------|
| Supabase URL | Supabase Dashboard → Settings → API |
| Supabase Keys | Supabase Dashboard → Settings → API |
| PlusVibe API | PlusVibe → Settings → API Access |
| Anthropic Key | console.anthropic.com → API Keys |

---

## 🗄 Étape 3 : Setup Database

1. Va sur https://supabase.com/dashboard
2. Sélectionne ton projet
3. Clique sur **SQL Editor** (icône terminal)
4. Clique sur **New query**
5. Ouvre le fichier `supabase-schema.sql` dans ce projet
6. Copie TOUT le contenu (Ctrl+A, Ctrl+C)
7. Colle dans l'éditeur SQL de Supabase
8. Clique sur **RUN** ou Ctrl+Enter
9. Attends le message "Success"

**Vérification :** Va dans **Table Editor**, tu devrais voir :
- prospects
- conversations
- meetings
- proposals
- campaign_stats
- settings
- agent_conversations

---

## 🚀 Étape 4 : Lancer l'Application

```bash
npm run dev
```

**Résultat attendu :**
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2s
```

**Ouvre ton navigateur :** http://localhost:3000

---

## ✅ Étape 5 : Vérification

### Dashboard
- [ ] La page se charge sans erreur
- [ ] Les KPIs s'affichent (même à 0)

### Inbox
- [ ] La page Inbox se charge
- [ ] La connexion PlusVibe fonctionne

### Pipeline
- [ ] La vue Kanban s'affiche
- [ ] Les colonnes sont visibles

### Agent IA
- [ ] Le chat s'ouvre
- [ ] L'agent répond aux messages

---

## 🔄 Commandes Utiles

```bash
# Démarrer en dev
npm run dev

# Build pour production
npm run build

# Démarrer en production
npm start

# Lint
npm run lint
```

---

## 🛑 Problèmes Courants

### "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### "Supabase connection error"

1. Vérifie que les clés sont bonnes dans `.env.local`
2. Vérifie que le projet Supabase est actif
3. Vérifie que le schéma SQL a été exécuté

### Port 3000 déjà utilisé

```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /F /PID <PID>
```

### Agent IA ne répond pas

1. Vérifie ta clé API Anthropic
2. Vérifie que tu as des crédits sur ton compte
3. Essaie avec un message simple : "Bonjour"

---

## 📱 Accès Mobile

Le dashboard est responsive. Tu peux y accéder depuis ton téléphone sur le même réseau :

1. Trouve ton IP locale : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
2. Accède à `http://[TON_IP]:3000` depuis ton téléphone

---

## 🔗 Connexion N8N

Pour que ton workflow N8N envoie les données au dashboard :

### URL Webhook

```
POST http://localhost:3000/api/webhook/n8n
```

En production (Vercel) :
```
POST https://ton-domaine.vercel.app/api/webhook/n8n
```

### Exemple de payload

```json
{
  "action": "create_prospect",
  "payload": {
    "prospect_name": "Jean Dupont",
    "company_name": "Acme Corp",
    "email": "jean@acme.com",
    "pipeline_stage": "lead_enriched",
    "source": "n8n",
    "pre_meeting_brief": "Prospect intéressé par l'automatisation..."
  }
}
```

---

## 🎉 C'est parti !

Ton dashboard est prêt. Explore les différentes pages et commence à gérer tes prospects !

**Prochaines étapes suggérées :**
1. Ajoute quelques prospects de test
2. Teste l'agent IA
3. Connecte ton workflow N8N
4. Déploie sur Vercel pour un accès permanent
