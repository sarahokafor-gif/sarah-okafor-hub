# CLAUDE.md - Sarah Okafor Hub

This file provides guidance to Claude Code when working with this repository.

## Overview

The **Sarah Okafor Hub** is a legal resources portal for UK legal practitioners, built as a React single-page application. It provides curated legal resources, live RSS feeds from courts and legal publishers, and practice area-specific content for barristers, solicitors, social workers, and legal professionals.

**Live URL:** https://sarah-okafor-hub.pages.dev/

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 7** | Build tool and dev server |
| **React Router 7** | Client-side routing |
| **Cloudflare Pages** | Hosting and deployment |

## Project Structure

```
sarah-okafor-hub/
├── src/
│   ├── App.tsx              # Main app with routing
│   ├── App.css              # Global styles
│   ├── main.tsx             # Entry point
│   ├── index.css            # Base styles
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Page layout wrapper
│   │   ├── BailiiRssFeed.tsx
│   │   ├── FindCaseLawFeed.tsx
│   │   └── [Other feed components]
│   └── pages/               # Route pages
│       ├── HomePage.tsx
│       ├── ResourcesPage.tsx
│       ├── CourtOfProtectionPage.tsx
│       ├── AdultSocialCarePage.tsx
│       ├── FamilyLawPage.tsx
│       ├── PrivateClientPage.tsx
│       ├── ImmigrationPage.tsx
│       ├── PublicLawPage.tsx
│       ├── ProfessionalPage.tsx
│       ├── LegislationPage.tsx
│       └── [Other pages]
├── public/                  # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── CLAUDE.md               # This file
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Landing page with overview |
| `/resources` | ResourcesPage | Hub linking to all practice areas |
| `/court-of-protection` | CourtOfProtectionPage | MCA 2005, DoLS, capacity cases |
| `/adult-social-care` | AdultSocialCarePage | Care Act 2014, safeguarding, s.117 |
| `/family-law` | FamilyLawPage | Children Act, financial remedies |
| `/private-client` | PrivateClientPage | Wills, probate, trusts, Chancery |
| `/immigration` | ImmigrationPage | Immigration, asylum, human rights |
| `/public-law` | PublicLawPage | Judicial review, admin law |
| `/professional` | ProfessionalPage | Bar Council, SRA, CPD, pro bono |
| `/legislation` | LegislationPage | Acts, SIs, Bills, Parliament |
| `/tools` | ToolsPage | Legal tools and calculators |
| `/blog` | BlogPage | Articles and updates |
| `/about` | AboutPage | About Sarah Okafor |
| `/contact` | ContactPage | Contact information |

## RSS Feed Architecture

### CORS Proxy

All RSS feeds are fetched via the **rss2json.com** API as a CORS proxy:

```typescript
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

// Usage
const response = await fetch(RSS2JSON_API + encodeURIComponent(feedUrl))
const data = await response.json()
```

### Feed Sources by Practice Area

| Practice Area | Case Law Feeds | News/Commentary Feeds |
|---------------|----------------|----------------------|
| **Court of Protection** | EWCOP (BAILII), Find Case Law, EWCA | 39 Essex Chambers |
| **Adult Social Care** | Admin Court, EWCA, UKSC | Community Care, Local Gov Lawyer |
| **Family Law** | EWHC Fam, EWFC, EWCA | Pink Tape, Transparency Project |
| **Private Client** | Chancery Division, EWCA, UKSC | STEP, ACTAPS |
| **Immigration** | UTIAC, EWCA, UKSC | Free Movement, Right to Remain |
| **Public Law** | Admin Court, EWCA, UKSC | UK Human Rights Blog, UKCLA |
| **Professional** | N/A | Law Society Gazette, Legal Futures |
| **Legislation** | N/A | Legislation.gov.uk, Parliament |

### BAILII RSS URL Patterns

```
https://www.bailii.org/rss/recent-accessions-ew_cases_EWCOP.rss      # Court of Protection
https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Admin.rss # Admin Court
https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Fam.rss   # Family Division
https://www.bailii.org/rss/recent-accessions-ew_cases_EWFC.rss       # Family Court
https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Ch.rss    # Chancery Division
https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss   # Court of Appeal
https://www.bailii.org/rss/recent-accessions-uk_cases_UKUT_IAC.rss   # Upper Tribunal IAC
https://www.bailii.org/rss/recent-accessions-uk_cases_UKSC.rss       # Supreme Court
```

### Dual-Feed Page Pattern

Each practice area page uses a dual-feed layout:

```typescript
// State for case law feed
const [caseFeed, setCaseFeed] = useState<FeedConfig>(CASE_LAW_FEEDS[0])
const [caseItems, setCaseItems] = useState<FeedItem[]>([])
const [caseLoading, setCaseLoading] = useState(true)
const [caseError, setCaseError] = useState<string | null>(null)

// State for news feed
const [newsFeed, setNewsFeed] = useState<FeedConfig>(NEWS_FEEDS[0])
const [newsItems, setNewsItems] = useState<FeedItem[]>([])
const [newsLoading, setNewsLoading] = useState(true)
const [newsError, setNewsError] = useState<string | null>(null)

// Separate useEffect for each feed
useEffect(() => { /* fetch case law */ }, [caseFeed])
useEffect(() => { /* fetch news */ }, [newsFeed])
```

### Feed Interface Types

```typescript
interface FeedItem {
  title: string
  link: string
  pubDate: string
}

interface FeedConfig {
  name: string   // Display name
  code: string   // Tab button label
  url: string    // RSS feed URL
}
```

## Styling

### CSS Structure

- `src/index.css` - Base styles, CSS reset
- `src/App.css` - Global layout, navigation, common components
- `src/pages/PracticeAreaPage.css` - Shared styles for all practice area pages

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.practice-area-page` | Container for practice area pages |
| `.practice-header` | Page header with title and subtitle |
| `.feeds-row` | Two-column layout for case law + news feeds |
| `.feed-section` | Individual feed container |
| `.feed-tabs` | Tab buttons for switching feeds |
| `.feed-tab.active` | Active tab styling |
| `.feed-list` | List of feed items |
| `.feed-item` | Individual feed item with title and date |
| `.resources-grid` | Grid layout for resource sections |
| `.resource-section` | Resource category container |
| `.legislation-section` | Key legislation links |
| `.featured-section` | Featured/highlighted cards |

### Practice Area Header Colors

Each practice area has a custom header color defined in CSS:

```css
.cop-header { background: linear-gradient(...) }      /* Court of Protection */
.asc-header { background: linear-gradient(...) }      /* Adult Social Care */
.family-header { background: linear-gradient(...) }   /* Family Law */
/* etc. */
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Deployment

### Cloudflare Pages (Current)

The site is deployed automatically via Cloudflare Pages:

1. Connected to GitHub repository `sarahokafor-gif/sarah-okafor-hub`
2. Auto-deploys on push to `main` branch
3. Build command: `npm run build`
4. Output directory: `dist`

**Production URL:** https://sarah-okafor-hub.pages.dev/

### Manual Deployment

To trigger a rebuild, push any commit to `main`:

```bash
git add -A && git commit -m "Trigger rebuild" && git push origin main
```

## Adding a New Practice Area Page

1. Create `src/pages/NewAreaPage.tsx`:

```typescript
import { useState, useEffect } from 'react'
import './PracticeAreaPage.css'

interface FeedItem { title: string; link: string; pubDate: string }
interface FeedConfig { name: string; code: string; url: string }

const CASE_LAW_FEEDS: FeedConfig[] = [
  { name: 'Court Name', code: 'CODE', url: 'https://www.bailii.org/rss/...' },
]

const NEWS_FEEDS: FeedConfig[] = [
  { name: 'News Source', code: 'CODE', url: 'https://example.com/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function NewAreaPage() {
  // ... state and effects (follow existing pattern)

  return (
    <div className="practice-area-page">
      <header className="practice-header newarea-header">
        <h1>New Practice Area</h1>
        <p>Subtitle describing the area</p>
      </header>
      {/* ... feeds and resources */}
    </div>
  )
}
```

2. Add route in `src/App.tsx`:

```typescript
import NewAreaPage from './pages/NewAreaPage'

// In Routes:
<Route path="new-area" element={<NewAreaPage />} />
```

3. Add link in `src/pages/ResourcesPage.tsx` PRACTICE_AREAS array

4. Add header color in `src/pages/PracticeAreaPage.css`:

```css
.newarea-header {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

## Git Workflow

```bash
# Check status
git status

# Stage and commit
git add -A
git commit -m "Description of changes"

# Push (triggers Cloudflare deployment)
git push origin main
```

### GitHub Authentication

GitHub CLI is configured for authentication:

```bash
# Check auth status
gh auth status

# If not authenticated
gh auth login -p https -h github.com -w
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies and scripts |
| `src/App.tsx` | Main routing configuration |
| `src/components/Layout.tsx` | Navigation and page wrapper |
| `src/pages/PracticeAreaPage.css` | Shared practice area styles |

## Troubleshooting

### RSS Feed Not Loading

1. Check if the feed URL is valid
2. Verify rss2json.com service is up
3. Check browser console for CORS errors
4. Try the feed URL directly in rss2json.com

### Build Failures

```bash
# Check for TypeScript errors
npm run build

# Common issues:
# - Missing imports
# - Type mismatches
# - Unused variables (warnings)
```

### Cloudflare Deployment Issues

1. Check Cloudflare Pages dashboard for build logs
2. Ensure `npm run build` succeeds locally
3. Verify `dist` folder is generated correctly
