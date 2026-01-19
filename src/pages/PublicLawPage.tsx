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
  { name: 'Ministry of Justice', code: 'MoJ', url: 'https://www.gov.uk/government/organisations/ministry-of-justice.atom' },
  { name: 'Equality & Human Rights Commission', code: 'EHRC', url: 'https://www.gov.uk/government/organisations/equality-and-human-rights-commission.atom' },
  { name: 'Judiciary UK', code: 'Judiciary', url: 'https://www.judiciary.uk/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  jr: [
    { name: 'Judicial Review Guide', url: 'https://www.gov.uk/government/publications/administrative-court-judicial-review-guide' },
    { name: 'Admin Court Forms', url: 'https://www.gov.uk/government/collections/administrative-court-forms' },
    { name: 'Pre-Action Protocol', url: 'https://www.justice.gov.uk/courts/procedure-rules/civil/protocol/prot_jrv' },
    { name: 'CPR Part 54', url: 'https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part54' },
  ],
  bodies: [
    { name: 'Administrative Court', url: 'https://www.gov.uk/courts-tribunals/administrative-court' },
    { name: 'Ministry of Justice', url: 'https://www.gov.uk/government/organisations/ministry-of-justice' },
    { name: 'Law Commission', url: 'https://www.lawcom.gov.uk/' },
    { name: 'HMCTS', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service' },
  ],
  localGov: [
    { name: 'Local Government Association', url: 'https://www.local.gov.uk/' },
    { name: 'LG Ombudsman', url: 'https://www.lgo.org.uk/' },
    { name: 'DLUHC', url: 'https://www.gov.uk/government/organisations/department-for-levelling-up-housing-and-communities' },
    { name: 'CIPFA', url: 'https://www.cipfa.org/' },
  ],
  humanRights: [
    { name: 'Equality & Human Rights Commission', url: 'https://www.equalityhumanrights.com/' },
    { name: 'ECHR Case Law (HUDOC)', url: 'https://hudoc.echr.coe.int/' },
    { name: 'UN Human Rights (OHCHR)', url: 'https://www.ohchr.org/' },
    { name: 'Council of Europe', url: 'https://www.coe.int/en/web/human-rights-convention' },
  ],
  ombudsmen: [
    { name: 'Parliamentary Ombudsman', url: 'https://www.ombudsman.org.uk/' },
    { name: 'Local Government Ombudsman', url: 'https://www.lgo.org.uk/' },
    { name: 'Housing Ombudsman', url: 'https://www.housing-ombudsman.org.uk/' },
    { name: 'Legal Ombudsman', url: 'https://www.legalombudsman.org.uk/' },
  ],
}

export default function PublicLawPage() {
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
    try { return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }
    catch { return dateStr }
  }

  return (
    <div className="practice-area-page">
      <header className="practice-header public-header">
        <h1>Public Law & Judicial Review</h1>
        <p>Administrative Law | Local Government | Human Rights | Ombudsmen</p>
      </header>

      <div className="practice-content">
        {/* Free Tools */}
        <section className="free-tools-section">
          <div className="free-tools-content">
            <h2>Free Tools <span className="free-tools-badge">Free</span></h2>
            <p>Create professional court bundles in minutes. Merge PDFs, add page numbers, and generate clickable indexes.</p>
          </div>
          <a href="https://www.courtbundlebuilder.co.uk" target="_blank" rel="noopener noreferrer" className="free-tools-link">
            Court Bundle Builder
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </section>

        <div className="feeds-row">
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

        <div className="resources-grid">
          <section className="resource-section">
            <h2>Judicial Review</h2>
            <ul className="resource-list">
              {RESOURCES.jr.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Public Law Bodies</h2>
            <ul className="resource-list">
              {RESOURCES.bodies.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Local Government</h2>
            <ul className="resource-list">
              {RESOURCES.localGov.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Human Rights</h2>
            <ul className="resource-list">
              {RESOURCES.humanRights.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <div className="resources-grid">
          <section className="resource-section">
            <h2>Ombudsmen</h2>
            <ul className="resource-list">
              {RESOURCES.ombudsmen.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <section className="legislation-section">
          <h2>Key Legislation</h2>
          <div className="legislation-links">
            <a href="https://www.legislation.gov.uk/ukpga/1998/29/contents" target="_blank" rel="noopener noreferrer">Human Rights Act 1998</a>
            <a href="https://www.legislation.gov.uk/ukpga/2010/15/contents" target="_blank" rel="noopener noreferrer">Equality Act 2010</a>
            <a href="https://www.legislation.gov.uk/ukpga/2000/36/contents" target="_blank" rel="noopener noreferrer">Freedom of Information Act 2000</a>
            <a href="https://www.legislation.gov.uk/ukpga/2011/20/contents" target="_blank" rel="noopener noreferrer">Localism Act 2011</a>
          </div>
        </section>
      </div>
    </div>
  )
}
