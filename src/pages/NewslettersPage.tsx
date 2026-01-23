// SVG Icons
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const NEWSLETTERS = [
  {
    id: 'court-of-protection',
    name: 'Court of Protection',
    description: 'Mental Capacity Act 2005, deprivation of liberty, capacity assessments, best interests decisions, welfare and property applications',
    filename: 'Court-of-Protection-Legal-Update-January-2026.pdf',
    color: '#1e3a5f',
    topics: ['MCA 2005 key provisions', 'DoLS and LPS updates', 'Capacity assessment guidance', 'Best interests checklist', 'Recent case law']
  },
  {
    id: 'adult-social-care',
    name: 'Adult Social Care',
    description: 'Care Act 2014, section 117 aftercare, safeguarding adults, ordinary residence, charging and financial assessments',
    filename: 'Adult-Social-Care-Legal-Update-January-2026.pdf',
    color: '#2d5a3d',
    topics: ['Care Act duties', 'Section 117 aftercare', 'Safeguarding framework', 'Ordinary residence', 'Charging guidance']
  },
  {
    id: 'family-law',
    name: 'Family Law',
    description: 'Children Act 1989, private and public law proceedings, financial remedies, domestic abuse, special guardianship',
    filename: 'Family-Law-Legal-Update-January-2026.pdf',
    color: '#7c3aed',
    topics: ['Children Act welfare checklist', 'Public law outline', 'Financial remedies', 'Domestic Abuse Act 2021', 'Recent case law']
  },
  {
    id: 'private-client',
    name: 'Private Client & Chancery',
    description: 'Wills and probate, trusts, Lasting Powers of Attorney, estate administration, inheritance disputes',
    filename: 'Private-Client-Legal-Update-January-2026.pdf',
    color: '#5a3d2d',
    topics: ['LPA requirements', 'Probate procedure', 'Trust fundamentals', 'Inheritance Act claims', 'Estate administration']
  },
  {
    id: 'immigration',
    name: 'Immigration & Human Rights',
    description: 'Immigration Rules, asylum claims, human rights, NRPF, EU Settlement Scheme, deportation and removal',
    filename: 'Immigration-Legal-Update-January-2026.pdf',
    color: '#0d9488',
    topics: ['Immigration Rules changes', 'Asylum process', 'Human rights claims', 'NRPF duties', 'Recent tribunal decisions']
  },
  {
    id: 'public-law',
    name: 'Public Law & Judicial Review',
    description: 'Judicial review procedure, local authority duties, human rights challenges, ombudsman complaints',
    filename: 'Public-Law-Legal-Update-January-2026.pdf',
    color: '#dc2626',
    topics: ['JR grounds and procedure', 'Permission stage', 'Local authority duties', 'Human Rights Act', 'Recent judicial review cases']
  },
]

export default function NewslettersPage() {
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
        <h2>January 2026 Updates</h2>
        <p className="section-intro">
          Each guide provides a comprehensive overview of the key legal framework,
          recent developments, and practical resources for practitioners.
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
                href={`/newsletters/${newsletter.filename}`}
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
          Each guide summarises the key statutory framework, highlights important recent
          cases, and provides links to authoritative resources. They are intended as
          practical reference documents, not comprehensive legal advice.
        </p>
        <p>
          <strong>Updated quarterly.</strong> Check back for new editions with the latest
          legal developments.
        </p>
      </section>
    </div>
  )
}
