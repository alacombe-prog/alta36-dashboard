# 🔌 Intégration N8N - Guide de Migration

Ce document explique comment adapter ton workflow N8N existant pour envoyer les données vers Supabase (au lieu d'Airtable).

---

## 📋 Changements à faire

### 1. Remplacer les nodes Airtable par des HTTP Request vers le dashboard

Au lieu de :
```
Airtable Node → Create Record
```

Tu vas utiliser :
```
HTTP Request → POST /api/webhook/n8n
```

### 2. URL du webhook

**En local (dev) :**
```
http://localhost:3000/api/webhook/n8n
```

**En production (Vercel) :**
```
https://ton-domaine.vercel.app/api/webhook/n8n
```

---

## 🔄 Mapping des Actions

### Créer un prospect (après enrichissement)

**Avant (Airtable) :**
```
Node: Update Pipeline
Table: Pipeline
```

**Après (Dashboard) :**
```
Node: HTTP Request
Method: POST
URL: {{$env.DASHBOARD_WEBHOOK_URL}}/api/webhook/n8n
Body:
{
  "action": "create_prospect",
  "payload": {
    "prospect_name": "={{ $json.prospectName }}",
    "company_name": "={{ $json.companyName }}",
    "email": "={{ $json.email }}",
    "website": "={{ $json.website }}",
    "phone": "={{ $json.phone }}",
    "visio_link": "={{ $json.visioLink }}",
    "google_event_id": "={{ $json.eventId }}",
    "pipeline_stage": "lead_enriched",
    "source": "calendar",
    "company_profile": "={{ $json.output['Company Profile'] }}",
    "company_size": "={{ $json.output['Company Size'] }}",
    "growth_stage": "={{ $json.output['Growth Stage'] }}",
    "annual_revenue_range": "={{ $json.output['Annual Revenue Range'] }}",
    "contact_profile": "={{ $json.output['Contact Profile'] }}",
    "decision_authority": "={{ $json.output['Decision Authority'] }}",
    "professional_background": "={{ $json.output['Professional Background'] }}",
    "skills_interests": "={{ $json.output['Skills & Interests'] }}",
    "content_interests": "={{ $json.output['Content Interests'] }}",
    "conversation_starters": "={{ $json.output['Conversation Starters'] }}",
    "potential_pain_points": "={{ $json.output['Potential Pain Points'] }}",
    "competitive_analysis": "={{ $json.output['Competitive Analysis'] }}",
    "pre_meeting_brief": "={{ $json.output['Pre-Meeting Brief'] }}",
    "linkedin_url": "={{ $json.linkedInUrl }}",
    "linkedin_posts": {{ $json.linkedinPosts }}
  }
}
```

### Créer un meeting (après Fireflies)

**Avant (Airtable) :**
```
Node: Create Discovery
Table: Discovery Phase
```

**Après (Dashboard) :**
```
Node: HTTP Request
Method: POST
URL: {{$env.DASHBOARD_WEBHOOK_URL}}/api/webhook/n8n
Body:
{
  "action": "create_meeting",
  "payload": {
    "prospect_email": "={{ $('Get Firefiles Transcript').item.json.data.transcript.participants[0] }}",
    "meeting_title": "={{ $json.data.transcript.title }}",
    "meeting_type": "={{ $('Meeting Classifier').item.json.output.meetingType === 'Discovery Call' ? 'discovery' : 'presentation' }}",
    "scheduled_at": "={{ $json.data.transcript.dateString }}",
    "status": "completed",
    "fireflies_meeting_id": "={{ $('Webhook').item.json.body.body.body.meetingId }}",
    "transcript_url": "=https://docs.google.com/document/d/{{ $('Create Doc').item.json.id }}"
  }
}
```

### Mettre à jour l'analyse Discovery

**Avant (Airtable) :**
```
Node: Update Presentation Context
Table: Discovery Phase
```

**Après (Dashboard) :**
```
Node: HTTP Request
Method: POST
URL: {{$env.DASHBOARD_WEBHOOK_URL}}/api/webhook/n8n
Body:
{
  "action": "update_meeting",
  "payload": {
    "id": "={{ $json.meetingId }}",
    "strategic_focus": "={{ $('Presentation Content Generator').item.json.output.strategic_focus }}",
    "key_positioning_points": "={{ $('Presentation Content Generator').item.json.output.key_positioning_points }}",
    "objection_handling": "={{ $('Presentation Content Generator').item.json.output.objection_handling }}",
    "technical_considerations": "={{ $('Presentation Content Generator').item.json.output.technical_considerations }}",
    "value_conversation_guide": "={{ $('Presentation Content Generator').item.json.output.value_conversation_guide }}",
    "client_questions_ideas": "={{ $('Presentation Content Generator').item.json.output.client_questions_ideas }}",
    "presentation_prep": "={{ $('Presentation Content Generator').item.json.output.presentation_preparation }}"
  }
}
```

### Créer une proposal

**Avant (Airtable) :**
```
Node: Create Proposal
Table: Proposal Phase
```

**Après (Dashboard) :**
```
Node: HTTP Request
Method: POST
URL: {{$env.DASHBOARD_WEBHOOK_URL}}/api/webhook/n8n
Body:
{
  "action": "create_proposal",
  "payload": {
    "prospect_email": "={{ $json.Email }}",
    "meeting_id": "={{ $json.meetingId }}",
    "automation_name": "={{ $('Proposal Component Generator').item.json.output.automation_name }}",
    "goal": "={{ $('Proposal Component Generator').item.json.output.goal }}",
    "introductory_paragraph": "={{ $('Proposal Component Generator').item.json.output.introductory_paragraph }}",
    "logical_phase": "={{ $('Proposal Component Generator').item.json.output.logical_phase }}",
    "tech_stack": "={{ $('Proposal Component Generator').item.json.output.tech_stack }}",
    "timeline_overview": "={{ $('Proposal Component Generator').item.json.output.timeline_overview }}",
    "total_timeline": "={{ $('Proposal Component Generator').item.json.output.total_timeline }}",
    "price": {{ $('Proposal Component Generator').item.json.output.price }},
    "price_frequency": "={{ $('Proposal Component Generator').item.json.output.price_frequency }}",
    "deliverables": "={{ $('Proposal Component Generator').item.json.output.deliverables }}",
    "status": "draft"
  }
}
```

---

## 🔍 Trouver le prospect par email

Le webhook utilise l'email pour trouver ou créer le prospect. 

Pour les meetings et proposals, envoie `prospect_email` dans le payload et le système trouvera automatiquement le prospect correspondant.

---

## ⚙️ Configuration N8N

### Ajouter la variable d'environnement

Dans N8N, ajoute une variable :
```
DASHBOARD_WEBHOOK_URL=https://ton-domaine.vercel.app
```

Ou en local :
```
DASHBOARD_WEBHOOK_URL=http://localhost:3000
```

### Headers optionnels

Tu peux ajouter un header d'authentification si tu veux sécuriser le webhook :

```
Headers:
  X-Webhook-Secret: ton-secret-partagé
```

---

## 📝 Exemple complet de node HTTP Request

```json
{
  "parameters": {
    "method": "POST",
    "url": "={{$env.DASHBOARD_WEBHOOK_URL}}/api/webhook/n8n",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "sendBody": true,
    "specifyBody": "json",
    "jsonBody": "={\n  \"action\": \"create_prospect\",\n  \"payload\": {\n    \"prospect_name\": \"{{ $json.prospectName }}\",\n    \"company_name\": \"{{ $json.companyName }}\",\n    \"email\": \"{{ $json.email }}\",\n    \"pipeline_stage\": \"lead_enriched\",\n    \"source\": \"calendar\",\n    \"pre_meeting_brief\": \"{{ $json.output['Pre-Meeting Brief'] }}\"\n  }\n}",
    "options": {}
  },
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2,
  "position": [1000, 500],
  "name": "Send to Dashboard"
}
```

---

## 🔄 Migration Progressive

Tu peux migrer progressivement :

1. **Phase 1** : Garde Airtable ET envoie au dashboard (double écriture)
2. **Phase 2** : Vérifie que le dashboard reçoit bien les données
3. **Phase 3** : Supprime les nodes Airtable

Pour la double écriture, ajoute simplement les nouveaux HTTP Request nodes en parallèle des nodes Airtable existants.

---

## ❓ Troubleshooting

### Le webhook ne répond pas

1. Vérifie que le dashboard tourne (`npm run dev`)
2. Vérifie l'URL dans la variable d'environnement
3. Regarde les logs du dashboard dans le terminal

### Erreur "Prospect not found"

Pour les actions `update_*` et `create_meeting`, assure-toi que le prospect existe déjà.

### Données manquantes

Vérifie le mapping des champs entre ton workflow et le payload attendu.

---

## 📊 Vérifier l'intégration

Après avoir configuré le webhook, tu peux vérifier dans le dashboard :

1. Va sur `/pipeline` → les nouveaux prospects doivent apparaître
2. Va sur `/meetings` → les meetings doivent s'afficher
3. Utilise l'agent IA → "Combien de prospects créés aujourd'hui ?"
