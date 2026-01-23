import React, { useMemo } from 'react'

// SVG Icons
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

// Helper function to get ISO week number
function getISOWeek(date: Date): { week: number; year: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return { week, year: d.getUTCFullYear() }
}

// Newsletter configuration - all 8 practice areas
const NEWSLETTERS = [
  {
    id: 'Court-of-Protection',
    name: 'Court of Protection',
    description: 'Mental Capacity Act 2005, deprivation of liberty, capacity assessments, best interests decisions, welfare and property applications',
    color: '#1e3a5f',
    topics: ['MCA 2005 key provisions', 'DoLS and LPS updates', 'Capacity assessment guidance', 'Best interests checklist', 'Recent case law']
  },
  {
    id: 'Adult-Social-Care',
    name: 'Adult Social Care',
    description: 'Care Act 2014, section 117 aftercare, safeguarding adults, ordinary residence, charging and financial assessments',
    color: '#2d5a3d',
    topics: ['Care Act duties', 'Section 117 aftercare', 'Safeguarding framework', 'Ordinary residence', 'Charging guidance']
  },
  {
    id: 'Family-Law',
    name: 'Family Law',
    description: 'Children Act 1989, private and public law proceedings, financial remedies, domestic abuse, special guardianship',
    color: '#7c3aed',
    topics: ['Children Act welfare checklist', 'Public law outline', 'Financial remedies', 'Domestic Abuse Act 2021', 'Recent case law']
  },
  {
    id: 'Private-Client',
    name: 'Private Client & Chancery',
    description: 'Wills and probate, trusts, Lasting Powers of Attorney, estate administration, inheritance disputes',
    color: '#5a3d2d',
    topics: ['LPA requirements', 'Probate procedure', 'Trust fundamentals', 'Inheritance Act claims', 'Estate administration']
  },
  {
    id: 'Immigration',
    name: 'Immigration & Human Rights',
    description: 'Immigration Rules, asylum claims, human rights, NRPF, EU Settlement Scheme, deportation and removal',
    color: '#0d9488',
    topics: ['Immigration Rules changes', 'Asylum process', 'Human rights claims', 'NRPF duties', 'Recent tribunal decisions']
  },
  {
    id: 'Public-Law',
    name: 'Public Law & Judicial Review',
    description: 'Judicial review procedure, local authority duties, human rights challenges, ombudsman complaints',
    color: '#dc2626',
    topics: ['JR grounds and procedure', 'Permission stage', 'Local authority duties', 'Human Rights Act', 'Recent judicial review cases']
  },
  {
    id: 'Professional',
    name: 'Professional Development',
    description: 'Bar Standards Board, SRA updates, CPD requirements, pro bono opportunities, wellbeing and practice management',
    color: '#6366f1',
    topics: ['BSB regulatory updates', 'SRA guidance', 'CPD requirements', 'Pro bono opportunities', 'Practice management']
  },
  {
    id: 'Legislation',
    name: 'Legislation & Parliament',
    description: 'Bills tracking, Statutory Instruments, Law Commission projects, Parliamentary committees, commencement orders',
    color: '#059669',
    topics: ['Current Bills in Parliament', 'Recent Statutory Instruments', 'Law Commission projects', 'Committee reports', 'Commencement orders']
  },
]

export default function NewslettersPage() {
  // Calculate current week dynamically
  const { week, year } = useMemo(() => getISOWeek(new Date()), [])

  // Generate filename for each newsletter
  const getFilename = (id: string) => {
    return `${id}-Legal-Update-Week-${week}-${year}.pdf`
  }

  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <h1>Legal Updates</h1>
        <p>
          Downloadable PDF guides for each practice area. Essential legislation,
          key cases, practical guidance, and useful resources - all in one document.
        </p>
      </section>

      {/* Newsletter Downloads */}
      <section className="newsletters-section">
        <h2>Week {week}, {year}</h2>
        <p className="section-intro">
          Each guide provides a comprehensive overview of the key legal framework,
          recent case law from BAILII feeds, news updates, and practical resources
          for practitioners. Updated automatically every Monday.
        </p>

        <div className="newsletters-grid">
          {NEWSLETTERS.map((newsletter) => (
            <div
              key={newsletter.id}
              className="newsletter-card"
              style={{ '--accent-color': newsletter.color } as React.CSSProperties}
            >
              <div className="newsletter-header">
                <h3>{newsletter.name}</h3>
                <span className="newsletter-badge">PDF</span>
              </div>
              <p className="newsletter-description">{newsletter.description}</p>
              <div className="newsletter-topics">
                <strong>Includes:</strong>
                <ul>
                  {newsletter.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              <a
                href={`/newsletters/${getFilename(newsletter.id)}`}
                download
                className="newsletter-download"
              >
                <DownloadIcon />
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="newsletters-about">
        <h2>About These Guides</h2>
        <p>
          These legal update guides are designed for legal professionals, local authority
          lawyers, social workers, and anyone who needs a clear overview of the law in
          these practice areas.
        </p>
        <p>
          Each guide summarises the key statutory framework, includes recent cases
          pulled from BAILII and court RSS feeds, and provides links to authoritative
          resources. They are intended as practical reference documents, not comprehensive
          legal advice.
        </p>
        <p>
          <strong>Updated automatically every Monday</strong> via GitHub Actions.
          The dynamic content is fetched from official court and government RSS feeds
          to ensure you have the latest case law and news.
        </p>
      </section>
    </div>
  )
}
