# Cahier des charges — Portfolio Mamath Yacine Niang

## 1. Présentation

### 1.1 Contexte
Site portfolio personnel d'un étudiant en école d'ingénieur (École Centrale Casablanca) à profil **Data / IA / Développement Web**, destiné à valoriser ses compétences, projets et expériences auprès de recruteurs en vue de l'obtention de stages.

### 1.2 Objectifs
- **Vitrine professionnelle** unique pour candidatures (LinkedIn, mails, CV).
- **Mise en avant des projets** avec captures, descriptions détaillées et rapports PDF.
- **Canal de contact direct** pour les recruteurs.
- **Auto-administrable** : ajout/modification de contenu sans toucher au code.

### 1.3 Cible utilisateurs

| Profil | Besoin | Parcours type |
|---|---|---|
| Recruteur tech | Évaluer rapidement les compétences | Home → Projets → Détail projet → Contact |
| RH / chargé de recrutement | Vérifier l'identité et le sérieux | Home → CV → Contact |
| Pair / collaborateur | Voir le code, échanger | Détail projet → GitHub |
| Propriétaire (admin) | Gérer le contenu | /admin |

---

## 2. Périmètre fonctionnel

### 2.1 Pages publiques

| Page | URL | Contenu |
|---|---|---|
| Accueil | `/` | Hero, à propos, skills par catégorie, projets featured, expériences, formations, certifs |
| Projets | `/projets/` | Grille filtrable par catégorie (dev, data, IA, académique) |
| Détail projet | `/projets/<slug>/` | Description, tech stack, galerie, rapport PDF intégré, projets liés |
| Rapport PDF | `/projets/<slug>/rapport.pdf` | Proxy PDF.js (Cloudinary) |
| Contact | `/contact/` | Formulaire (nom, email, sujet, message) |

### 2.2 Espace admin

| Fonction | Description |
|---|---|
| Gestion `About` | Bio, photo, CV, contacts, liens sociaux |
| Gestion `Skill` | 5 catégories (dev, data, IA, tools, langages), niveau %, ordre |
| Gestion `Project` | CRUD complet + galerie images inline + image cover + rapport PDF |
| Gestion `Experience` | Pro / projet / formation, dates en texte libre |
| Gestion `Education` / `Certification` | Diplômes, écoles, certifs |
| Lecture `ContactMessage` | Messages reçus, marquage lu/non-lu |

### 2.3 Fonctionnalités transverses
- **Slugs auto** sur projets.
- **Image cover unique** par projet (logique dans `ProjectImage.save`).
- **Envoi email** sur réception d'un message de contact (SMTP).
- **Filtrage par catégorie** sur la page projets (`?category=`).
- **Proxy PDF** signé pour contourner les restrictions Cloudinary.

---

## 3. Spécifications techniques

### 3.1 Stack

| Couche | Technologie | Version |
|---|---|---|
| Backend | Django | 6.0.5 |
| Langage | Python | 3.10+ |
| Base de données | PostgreSQL (prod) / SQLite (dev) | — |
| Stockage médias | Cloudinary | 1.42.1 |
| Stockage statique | WhiteNoise (compressed manifest) | 6.8.2 |
| Serveur WSGI | Gunicorn | 22.0.0 |
| Hébergement | Railway | nixpacks |
| Frontend | HTML/CSS/JS + Tailwind + DaisyUI + PDF.js | — |

### 3.2 Modèles de données

```
About ────── 1
Skill ────── N (catégorisé)
Project ──── N ──┬── ProjectImage (galerie + cover)
                 └── report_pdf (FileField raw)
Experience ─ N
Education ── N
Certification ─ N
ContactMessage ─ N
```

### 3.3 Configuration (variables d'environnement)

| Variable | Obligatoire | Description |
|---|---|---|
| `SECRET_KEY` | ✅ | Clé Django |
| `DEBUG` | ✅ | `False` en prod |
| `ALLOWED_HOSTS` | ✅ | Liste CSV |
| `DATABASE_URL` | ⚠️ | URL PostgreSQL Railway |
| `CLOUDINARY_URL` | ⚠️ | `cloudinary://KEY:SECRET@CLOUD` |
| `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` | ⚠️ | SMTP Gmail |
| `CSRF_TRUSTED_ORIGINS` | ✅ | Domaines Railway |

---

## 4. Exigences non-fonctionnelles

### 4.1 Performance
- **TTFB** < 500 ms sur les pages statiques.
- **`prefetch_related('images')`** à ajouter sur la liste projets (N+1 actuel sur `get_main_image`).
- Compression manifeste des statiques (WhiteNoise).
- Images servies via CDN Cloudinary.

### 4.2 Sécurité
- `DEBUG=False` en production.
- `CSRF_TRUSTED_ORIGINS` configuré pour Railway.
- `SECRET_KEY` jamais commitée (via `python-decouple`).
- Validateurs de mots de passe Django activés.
- `XFrameOptionsMiddleware` (anti clickjacking).
- **À ajouter** : `SECURE_SSL_REDIRECT=True`, `SESSION_COOKIE_SECURE=True`, `CSRF_COOKIE_SECURE=True` en prod.

### 4.3 Accessibilité / UX
- Responsive (mobile-first).
- `LANGUAGE_CODE='fr-fr'`.
- Timezone `Africa/Casablanca`.

### 4.4 SEO
- **À ajouter** : balises `<meta description>`, Open Graph, `sitemap.xml`, `robots.txt`.

### 4.5 Disponibilité
- Healthcheck Railway sur `/` (`railway.toml`).
- Restart automatique `on_failure`.
- 2 workers Gunicorn.

---

## 5. Architecture

```
┌──────────────┐     HTTPS      ┌─────────────────────┐
│   Visiteur   │───────────────▶│  Railway (gunicorn) │
└──────────────┘                │  Django app         │
                                │  - WhiteNoise       │
                                │  - 2 workers        │
                                └──────┬──────────────┘
                                       │
                  ┌────────────────────┼────────────────────┐
                  ▼                    ▼                    ▼
            ┌──────────┐         ┌──────────┐         ┌──────────┐
            │ Postgres │         │Cloudinary│         │   SMTP   │
            │ (Railway)│         │ (médias) │         │  (Gmail) │
            └──────────┘         └──────────┘         └──────────┘
```

---

## 6. Livrables

### 6.1 Existants ✅
- Code source Django (app `portfolio` + projet `portfolio_project`).
- 5 templates HTML.
- 5 migrations dont 1 de données (`0005_add_project_experiences.py`).
- Fixtures initiales (`fixtures/initial_data.json`).
- Scripts utilitaires : `create_db.py`, `upload_to_cloudinary.py`.
- Configuration déploiement : `Procfile`, `railway.toml`.

### 6.2 Manquants ⚠️
- **Tests unitaires** (`tests.py` vide).
- **README** d'installation et de déploiement.
- **Sitemap / robots.txt**.
- **Open Graph / favicon** complets.
- **Analytics** (Plausible, GA4) pour mesurer le trafic recruteur.
- **CI/CD** (GitHub Actions : lint, tests, deploy).
- **Backup auto** de la base Postgres Railway.

---

## 7. Roadmap d'évolution proposée

### 7.1 Phase 1 — Stabilisation (1 semaine)
1. Activer livraison PDF Cloudinary + finaliser PR `fix/pdf-proxy-cloudinary`.
2. Ajouter `prefetch_related('images')` sur la vue `projects`.
3. Activer `SECURE_*` flags en prod.
4. Ajouter `requirements-dev.txt` (pytest, ruff, django-debug-toolbar).
5. Sortir le dossier `env/` du repo + `.gitignore` propre.

### 7.2 Phase 2 — Qualité (1–2 semaines)
1. Tests pytest : modèles + vues critiques (`pdf_proxy`, `contact`, slug auto).
2. CI GitHub Actions (lint + tests + check migrations).
3. SEO : meta tags, OG, sitemap, robots.
4. Analytics light (Plausible).

### 7.3 Phase 3 — Croissance (selon besoin)
1. **Blog** (django app `blog`) : articles techniques sur les projets.
2. **i18n EN** pour candidatures internationales.
3. **Dark mode** (toggle DaisyUI).
4. **CV en ligne dynamique** (génération PDF depuis la base).
5. **Page `/now`** (méthode de Derek Sivers) → état actuel.

---

## 8. Contraintes & risques

| Risque | Impact | Mitigation |
|---|---|---|
| Quota Cloudinary gratuit dépassé | Médias inaccessibles | Surveiller usage, optimiser images |
| Railway free tier limité | App endormie / arrêtée | Healthcheck + plan payant |
| `report_pdf.url` lève en cas de mauvaise config | 500 | Try/except + logger (fix en cours) |
| Spam sur formulaire contact | Boîte mail polluée | Ajouter honeypot + reCAPTCHA v3 |
| Perte de données (pas de backup) | Données projets perdues | Activer backup Postgres Railway |

---

## 9. Maintenance

- **Mise à jour Django** : trimestrielle (sécurité).
- **Mise à jour dépendances** : surveiller avec Dependabot.
- **Sauvegarde** : dump Postgres + dump Cloudinary mensuel.
- **Monitoring** : logs Railway + alertes email sur erreur 5xx.
