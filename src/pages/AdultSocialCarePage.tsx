import { useState, useEffect } from 'react'
import './PracticeAreaPage.css'

interface FeedItem {
  title: string
  link: string
  pubDate: string
}

interface FeedConfig {
  name: string
  code: string
  url: string
}

const CASE_LAW_FEEDS: FeedConfig[] = [
  { name: 'Admin Court (EWHC)', code: 'Admin', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Admin.rss' },
  { name: 'Court of Appeal', code: 'EWCA', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss' },
  { name: 'UK Supreme Court', code: 'UKSC', url: 'https://www.bailii.org/rss/recent-accessions-uk_cases_UKSC.rss' },
]

const NEWS_FEEDS: FeedConfig[] = [
  { name: 'SCIE News', code: 'SCIE', url: 'https://www.scie.org.uk/feed' },
  { name: 'UK Human Rights Blog', code: 'UKHR', url: 'https://ukhumanrightsblog.com/feed/' },
  { name: 'Public Law Project', code: 'PLP', url: 'https://publiclawproject.org.uk/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  scie: [
    { name: 'SCIE - Social Care Institute for Excellence', url: 'https://www.scie.org.uk/', desc: 'Leading improvement agency for social care and social work' },
    { name: 'Care Act 2014 Resources', url: 'https://www.scie.org.uk/care-act-2014', desc: 'Comprehensive Care Act guidance and tools' },
    { name: 'Mental Capacity Resources', url: 'https://www.scie.org.uk/mca', desc: 'MCA training and implementation support' },
    { name: 'Safeguarding Adults', url: 'https://www.scie.org.uk/safeguarding/adults', desc: 'Safeguarding guidance and resources' },
    { name: 'Research & Evidence', url: 'https://www.scie.org.uk/research', desc: 'Evidence-based practice resources' },
  ],
  workforce: [
    { name: 'Skills for Care', url: 'https://www.skillsforcare.org.uk/', desc: 'Workforce development for adult social care' },
    { name: 'Workforce Data & Intelligence', url: 'https://www.skillsforcare.org.uk/adult-social-care-workforce-data/', desc: 'ASC workforce statistics and trends' },
    { name: 'Qualifications & Training', url: 'https://www.skillsforcare.org.uk/Developing-your-workforce/Qualifications/Qualifications.aspx', desc: 'Care qualifications framework' },
    { name: 'Leadership Development', url: 'https://www.skillsforcare.org.uk/Leadership-management/', desc: 'Leadership programmes for social care' },
    { name: 'Registered Manager Resources', url: 'https://www.skillsforcare.org.uk/Regulated-managers/', desc: 'Support for registered managers' },
  ],
  professional: [
    { name: 'BASW - British Association of Social Workers', url: 'https://www.basw.co.uk/', desc: 'Professional association for social workers' },
    { name: 'Social Work England', url: 'https://www.socialworkengland.org.uk/', desc: 'Social work regulator' },
    { name: 'Professional Capabilities Framework', url: 'https://www.basw.co.uk/professional-development/professional-capabilities-framework-pcf', desc: 'Professional standards for social work' },
    { name: 'BASW Code of Ethics', url: 'https://www.basw.co.uk/about-basw/code-ethics', desc: 'Ethical framework for practice' },
    { name: 'Social Work CPD', url: 'https://www.socialworkengland.org.uk/cpd/', desc: 'Continuing professional development' },
  ],
  research: [
    { name: 'Research in Practice', url: 'https://www.researchinpractice.org.uk/', desc: 'Evidence-informed practice resources' },
    { name: 'NIHR School for Social Care Research', url: 'https://www.sscr.nihr.ac.uk/', desc: 'Social care research evidence' },
    { name: 'Kings Fund - Social Care', url: 'https://www.kingsfund.org.uk/topics/social-care', desc: 'Health and social care policy research' },
    { name: 'Nuffield Trust', url: 'https://www.nuffieldtrust.org.uk/topics/social-care', desc: 'Independent health and care analysis' },
    { name: 'Health Foundation', url: 'https://www.health.org.uk/topics/social-care', desc: 'Research for better health and care' },
  ],
  directors: [
    { name: 'ADASS', url: 'https://www.adass.org.uk/', desc: 'Association of Directors of Adult Social Services' },
    { name: 'Local Government Association', url: 'https://www.local.gov.uk/topics/social-care-health-and-integration', desc: 'LGA social care resources' },
    { name: 'LGA Care & Health Improvement', url: 'https://www.local.gov.uk/our-support/our-improvement-offer/care-and-health-improvement', desc: 'Improvement programmes for councils' },
    { name: 'Think Local Act Personal', url: 'https://www.thinklocalactpersonal.org.uk/', desc: 'Personalisation and community-based support' },
  ],
  regulation: [
    { name: 'Care Quality Commission', url: 'https://www.cqc.org.uk/', desc: 'Independent regulator of health and social care' },
    { name: 'CQC Provider Guidance', url: 'https://www.cqc.org.uk/guidance-providers', desc: 'Guidance for care providers' },
    { name: 'CQC Inspection Reports', url: 'https://www.cqc.org.uk/care-services', desc: 'Search inspection reports' },
    { name: 'Fundamental Standards', url: 'https://www.cqc.org.uk/guidance-providers/regulations-enforcement/regulations-service-providers-managers', desc: 'Regulations for care services' },
  ],
  safeguarding: [
    { name: 'Ann Craft Trust', url: 'https://www.anncrafttrust.org/', desc: 'Safeguarding disabled adults and children' },
    { name: 'Local Safeguarding Adults Boards', url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance#safeguarding-1', desc: 'SAB statutory guidance' },
    { name: 'Making Safeguarding Personal', url: 'https://www.local.gov.uk/msp', desc: 'Person-centred safeguarding approach' },
    { name: 'Hourglass (Elder Abuse)', url: 'https://wearehourglass.org/', desc: 'Safer ageing - stopping abuse' },
  ],
  guidance: [
    { name: 'Care Act 2014 Statutory Guidance', url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance', desc: 'Official Care Act guidance' },
    { name: 'Mental Health Act Code of Practice', url: 'https://www.gov.uk/government/publications/code-of-practice-mental-health-act-1983', desc: 'MHA 1983 Code of Practice' },
    { name: 'S.117 Aftercare Guidance', url: 'https://www.gov.uk/government/publications/mental-health-act-1983-code-of-practice', desc: 'Section 117 aftercare duties' },
    { name: 'Ordinary Residence Guidance', url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance', desc: 'Ordinary residence disputes' },
    { name: 'Charging Guidance', url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance#charging-and-financial-assessment', desc: 'Charging for care and support' },
  ],
  courses: [
    { name: 'Open University - Social Work', url: 'https://www.open.ac.uk/courses/social-work', desc: 'Social work qualifications' },
    { name: 'SCIE Learning', url: 'https://www.scie.org.uk/e-learning', desc: 'Free e-learning resources' },
    { name: 'Skills for Care Learning', url: 'https://www.skillsforcare.org.uk/Learning-development/', desc: 'Workforce learning programmes' },
    { name: 'Research in Practice Learning', url: 'https://www.researchinpractice.org.uk/all/content-pages/learning/', desc: 'Evidence-based learning' },
    { name: 'Edge Training', url: 'https://www.edgetraining.org.uk/', desc: 'MCA and DoLS training' },
    { name: 'Bond Solon', url: 'https://www.bondsolon.com/', desc: 'Legal training for experts' },
  ],
}

export default function AdultSocialCarePage() {
  const [caseFeed, setCaseFeed] = useState<FeedConfig>(CASE_LAW_FEEDS[0])
  const [caseItems, setCaseItems] = useState<FeedItem[]>([])
  const [caseLoading, setCaseLoading] = useState(true)
  const [caseError, setCaseError] = useState<string | null>(null)

  const [newsFeed, setNewsFeed] = useState<FeedConfig>(NEWS_FEEDS[0])
  const [newsItems, setNewsItems] = useState<FeedItem[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [newsError, setNewsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeed = async () => {
      setCaseLoading(true)
      setCaseError(null)
      try {
        const response = await fetch(RSS2JSON_API + encodeURIComponent(caseFeed.url))
        const data = await response.json()
        if (data.status === 'ok' && data.items) {
          setCaseItems(data.items.slice(0, 8).map((item: any) => ({
            title: item.title, link: item.link, pubDate: item.pubDate
          })))
        } else { setCaseError('Unable to load') }
      } catch { setCaseError('Unable to load') }
      finally { setCaseLoading(false) }
    }
    fetchFeed()
  }, [caseFeed])

  useEffect(() => {
    const fetchFeed = async () => {
      setNewsLoading(true)
      setNewsError(null)
      try {
        const response = await fetch(RSS2JSON_API + encodeURIComponent(newsFeed.url))
        const data = await response.json()
        if (data.status === 'ok' && data.items) {
          setNewsItems(data.items.slice(0, 8).map((item: any) => ({
            title: item.title, link: item.link, pubDate: item.pubDate
          })))
        } else { setNewsError('Unable to load') }
      } catch { setNewsError('Unable to load') }
      finally { setNewsLoading(false) }
    }
    fetchFeed()
  }, [newsFeed])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch { return dateStr }
  }

  return (
    <div className="practice-area-page">
      <header className="practice-header asc-header">
        <h1>Adult Social Care Law & Practice</h1>
        <p>Care Act 2014 | Safeguarding | Section 117 Aftercare | Ordinary Residence | Charging</p>
      </header>

      <div className="practice-content">
        {/* Featured Resources */}
        <section className="featured-section">
          <h2>Key Organisations</h2>
          <div className="featured-grid">
            <a href="https://www.scie.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>SCIE</h3>
              <p>Social Care Institute for Excellence - leading improvement agency</p>
            </a>
            <a href="https://www.skillsforcare.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Skills for Care</h3>
              <p>Workforce development and training resources</p>
            </a>
            <a href="https://www.basw.co.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>BASW</h3>
              <p>British Association of Social Workers</p>
            </a>
            <a href="https://www.cqc.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>CQC</h3>
              <p>Care Quality Commission - independent regulator</p>
            </a>
            <a href="https://www.adass.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>ADASS</h3>
              <p>Association of Directors of Adult Social Services</p>
            </a>
            <a href="https://www.researchinpractice.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Research in Practice</h3>
              <p>Evidence-informed resources for practitioners</p>
            </a>
          </div>
        </section>

        <div className="feeds-row">
          {/* Case Law Feed */}
          <section className="feed-section">
            <h2>Case Law</h2>
            <div className="feed-tabs">
              {CASE_LAW_FEEDS.map((feed) => (
                <button key={feed.code} className={`feed-tab ${caseFeed.code === feed.code ? 'active' : ''}`} onClick={() => setCaseFeed(feed)}>
                  {feed.code}
                </button>
              ))}
            </div>
            <p className="feed-source">{caseFeed.name}</p>
            <div className="feed-content">
              {caseLoading && <div className="feed-loading"><div className="spinner"></div><p>Loading...</p></div>}
              {caseError && <div className="feed-error"><p>{caseError}</p></div>}
              {!caseLoading && !caseError && caseItems.length > 0 && (
                <ul className="feed-list">
                  {caseItems.map((item, index) => (
                    <li key={index} className="feed-item">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                      <span className="feed-date">{formatDate(item.pubDate)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* News Feed */}
          <section className="feed-section">
            <h2>News & Commentary</h2>
            <div className="feed-tabs">
              {NEWS_FEEDS.map((feed) => (
                <button key={feed.code} className={`feed-tab ${newsFeed.code === feed.code ? 'active' : ''}`} onClick={() => setNewsFeed(feed)}>
                  {feed.code}
                </button>
              ))}
            </div>
            <p className="feed-source">{newsFeed.name}</p>
            <div className="feed-content">
              {newsLoading && <div className="feed-loading"><div className="spinner"></div><p>Loading...</p></div>}
              {newsError && <div className="feed-error"><p>{newsError}</p></div>}
              {!newsLoading && !newsError && newsItems.length > 0 && (
                <ul className="feed-list">
                  {newsItems.map((item, index) => (
                    <li key={index} className="feed-item">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                      <span className="feed-date">{formatDate(item.pubDate)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        {/* SCIE Resources */}
        <div className="resources-grid">
          <section className="resource-section">
            <h2>SCIE Resources</h2>
            <ul className="resource-list">
              {RESOURCES.scie.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Workforce Development</h2>
            <ul className="resource-list">
              {RESOURCES.workforce.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Professional Bodies</h2>
            <ul className="resource-list">
              {RESOURCES.professional.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Research & Evidence</h2>
            <ul className="resource-list">
              {RESOURCES.research.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <div className="resources-grid">
          <section className="resource-section">
            <h2>Directors & Local Government</h2>
            <ul className="resource-list">
              {RESOURCES.directors.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Regulation & Inspection</h2>
            <ul className="resource-list">
              {RESOURCES.regulation.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Safeguarding</h2>
            <ul className="resource-list">
              {RESOURCES.safeguarding.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Statutory Guidance</h2>
            <ul className="resource-list">
              {RESOURCES.guidance.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        {/* Training & Courses */}
        <section className="resource-section" style={{ marginBottom: '2rem' }}>
          <h2>Training & CPD Courses</h2>
          <ul className="resource-list">
            {RESOURCES.courses.map((item, index) => (
              <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
            ))}
          </ul>
        </section>

        {/* Legislation */}
        <section className="legislation-section">
          <h2>Key Legislation</h2>
          <div className="legislation-links">
            <a href="https://www.legislation.gov.uk/ukpga/2014/23/contents" target="_blank" rel="noopener noreferrer">Care Act 2014</a>
            <a href="https://www.legislation.gov.uk/ukpga/1983/20/contents" target="_blank" rel="noopener noreferrer">Mental Health Act 1983</a>
            <a href="https://www.legislation.gov.uk/ukpga/2005/9/contents" target="_blank" rel="noopener noreferrer">Mental Capacity Act 2005</a>
            <a href="https://www.legislation.gov.uk/ukpga/1998/29/contents" target="_blank" rel="noopener noreferrer">Human Rights Act 1998</a>
            <a href="https://www.legislation.gov.uk/ukpga/2010/15/contents" target="_blank" rel="noopener noreferrer">Equality Act 2010</a>
            <a href="https://www.legislation.gov.uk/ukpga/2022/31/contents" target="_blank" rel="noopener noreferrer">Health & Care Act 2022</a>
          </div>
        </section>
      </div>
    </div>
  )
}
