import { Link } from 'react-router-dom'

// SVG Icons
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="external-icon">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const PRACTICE_AREAS = [
  {
    path: '/court-of-protection',
    name: 'Court of Protection',
    description: 'MCA 2005, DoLS, capacity assessments, best interests decisions, welfare and property applications',
    color: '#1e3a5f'
  },
  {
    path: '/adult-social-care',
    name: 'Adult Social Care',
    description: 'Care Act 2014, s.117 aftercare, safeguarding, SCIE, Skills for Care, workforce development',
    color: '#2d5a3d'
  },
  {
    path: '/family-law',
    name: 'Family Law',
    description: 'Children Act, financial remedies, domestic abuse, CAFCASS, private and public law proceedings',
    color: '#7c3aed'
  },
  {
    path: '/private-client',
    name: 'Private Client & Chancery',
    description: 'Wills, probate, trusts, LPAs, estate administration, STEP, inheritance tax',
    color: '#5a3d2d'
  },
  {
    path: '/immigration',
    name: 'Immigration & Human Rights',
    description: 'Immigration Rules, asylum, NRPF, human rights, ECHR, tribunals, UKVI',
    color: '#0d9488'
  },
  {
    path: '/public-law',
    name: 'Public Law & Judicial Review',
    description: 'Administrative law, JR, local government, human rights, ombudsmen, CPR Part 54',
    color: '#dc2626'
  },
  {
    path: '/professional',
    name: 'Professional Development',
    description: 'Bar Council, BSB, Law Society, SRA, CPD, pro bono, legal aid, wellbeing',
    color: '#1e3a5f'
  },
  {
    path: '/legislation',
    name: 'Legislation & Parliament',
    description: 'Acts, Statutory Instruments, Bills, Hansard, Law Commission, devolved legislatures',
    color: '#7c3aed'
  },
]

export default function ResourcesPage() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <h1>Legal Resources Hub</h1>
        <p>
          The most comprehensive free legal resource hub for UK practitioners.
          Live RSS feeds, curated resources, statutory guidance, and professional tools
          organised by practice area.
        </p>
      </section>

      {/* Practice Areas Grid */}
      <section className="resources-section">
        <h2>Practice Areas</h2>
        <p className="section-intro">
          Select a practice area to access curated feeds, resources, guidance, and legislation.
        </p>
        <div className="practice-hub-grid">
          {PRACTICE_AREAS.map((area) => (
            <Link
              key={area.path}
              to={area.path}
              className="practice-hub-card"
              style={{ '--accent-color': area.color } as React.CSSProperties}
            >
              <h3>{area.name}</h3>
              <p>{area.description}</p>
              <span className="practice-hub-link">
                Explore <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="external-resources">
        <h2>Essential Quick Links</h2>
        <p className="section-intro">
          Direct access to frequently used legal resources and forms.
        </p>
        <div className="resources-links-grid">
          <a
            href="https://www.gov.uk/government/collections/court-of-protection-forms"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>Court of Protection Forms <ExternalLinkIcon /></h3>
            <p>COP1, COP3, COP9, COPDOL11, and all other CoP forms</p>
          </a>

          <a
            href="https://www.gov.uk/government/collections/hmcts-civil-and-family-court-forms"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>Civil & Family Forms <ExternalLinkIcon /></h3>
            <p>N-series forms for civil proceedings, family court forms</p>
          </a>

          <a
            href="https://www.justice.gov.uk/courts/procedure-rules"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>Procedure Rules <ExternalLinkIcon /></h3>
            <p>CPR, FPR, CoP Rules, and tribunal procedure rules</p>
          </a>

          <a
            href="https://www.gov.uk/legal-aid"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>Legal Aid <ExternalLinkIcon /></h3>
            <p>Check eligibility and apply for legal aid</p>
          </a>

          <a
            href="https://www.nrpfnetwork.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>NRPF Network <ExternalLinkIcon /></h3>
            <p>No Recourse to Public Funds guidance and resources</p>
          </a>

          <a
            href="https://www.gov.uk/government/publications/mental-capacity-act-code-of-practice"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>MCA Code of Practice <ExternalLinkIcon /></h3>
            <p>Official Mental Capacity Act statutory guidance</p>
          </a>

          <a
            href="https://www.gov.uk/government/publications/code-of-practice-mental-health-act-1983"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>MHA Code of Practice <ExternalLinkIcon /></h3>
            <p>Official Mental Health Act statutory guidance</p>
          </a>

          <a
            href="https://www.scie.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            <h3>SCIE <ExternalLinkIcon /></h3>
            <p>Social Care Institute for Excellence - research and guidance</p>
          </a>
        </div>
      </section>

      {/* About the Hub */}
      <section className="resources-section" style={{ marginTop: '2rem' }}>
        <div className="hub-about">
          <h2>About This Hub</h2>
          <p>
            The Sarah Okafor Chambers Hub brings together the most important legal resources
            for practitioners working in Court of Protection, Adult Social Care, Family Law,
            Immigration, Public Law, and related practice areas.
          </p>
          <p>
            Each practice area page features live RSS feeds from authoritative sources,
            curated links to statutory guidance and professional bodies, and direct access
            to key legislation. All resources are free to access.
          </p>
          <p>
            <strong>For Local Authorities, solicitors, social workers, and legal professionals</strong> who
            need quick access to reliable legal resources without subscription fees or paywalls.
          </p>
        </div>
      </section>
    </div>
  )
}
