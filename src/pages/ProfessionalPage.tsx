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
  { name: 'Judiciary UK', code: 'Judiciary', url: 'https://www.judiciary.uk/feed/' },
  { name: 'Legal Futures', code: 'Futures', url: 'https://www.legalfutures.co.uk/feed' },
  { name: 'Legal Cheek', code: 'Cheek', url: 'https://www.legalcheek.com/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  bar: [
    { name: 'Bar Council', url: 'https://www.barcouncil.org.uk/' },
    { name: 'Bar Standards Board', url: 'https://www.barstandardsboard.org.uk/' },
    { name: 'BSB Handbook', url: 'https://www.barstandardsboard.org.uk/the-bsb-handbook.html' },
    { name: 'Pupillage Gateway', url: 'https://www.pupillagegateway.com/' },
    { name: 'Inns of Court', url: 'https://www.innertemple.org.uk/' },
  ],
  lawSociety: [
    { name: 'Law Society', url: 'https://www.lawsociety.org.uk/' },
    { name: 'SRA', url: 'https://www.sra.org.uk/' },
    { name: 'SRA Standards & Regulations', url: 'https://www.sra.org.uk/solicitors/standards-regulations/' },
    { name: 'Find a Solicitor', url: 'https://solicitors.lawsociety.org.uk/' },
  ],
  cpd: [
    { name: 'Bar Council CPD', url: 'https://www.barcouncil.org.uk/training-development.html' },
    { name: 'Inner Temple Training', url: 'https://www.innertemple.org.uk/education-training/' },
    { name: 'Law Society CPD', url: 'https://www.lawsociety.org.uk/career-advice/cpd' },
    { name: 'CILEX', url: 'https://www.cilex.org.uk/' },
  ],
  legal: [
    { name: 'Legal Aid Agency', url: 'https://www.gov.uk/government/organisations/legal-aid-agency' },
    { name: 'Legal Ombudsman', url: 'https://www.legalombudsman.org.uk/' },
    { name: 'Ministry of Justice', url: 'https://www.gov.uk/government/organisations/ministry-of-justice' },
    { name: 'Judicial Appointments Commission', url: 'https://judicialappointments.gov.uk/' },
  ],
  wellbeing: [
    { name: 'LawCare', url: 'https://www.lawcare.org.uk/' },
    { name: 'Wellbeing at the Bar', url: 'https://www.barcouncil.org.uk/support-for-barristers/wellbeing.html' },
    { name: 'Junior Lawyers Division', url: 'https://communities.lawsociety.org.uk/junior-lawyers/' },
    { name: 'Bridging the Bar', url: 'https://www.bridgingthebar.org/' },
  ],
  probeono: [
    { name: 'Advocate (Bar Pro Bono)', url: 'https://weareadvocate.org.uk/' },
    { name: 'LawWorks', url: 'https://www.lawworks.org.uk/' },
    { name: 'Free Representation Unit', url: 'https://www.thefru.org.uk/' },
    { name: 'Citizens Advice', url: 'https://www.citizensadvice.org.uk/' },
  ],
}

export default function ProfessionalPage() {
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
      <header className="practice-header professional-header">
        <h1>Professional Development</h1>
        <p>Bar Council | BSB | Law Society | SRA | CPD | Pro Bono</p>
      </header>

      <div className="practice-content">
        {/* Featured */}
        <section className="featured-section">
          <h2>Regulatory Bodies</h2>
          <div className="featured-grid">
            <a href="https://www.barcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Bar Council</h3>
              <p>Representative body for barristers in England and Wales</p>
            </a>
            <a href="https://www.barstandardsboard.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Bar Standards Board</h3>
              <p>Independent regulator of barristers</p>
            </a>
            <a href="https://www.lawsociety.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Law Society</h3>
              <p>Professional body for solicitors</p>
            </a>
            <a href="https://www.sra.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>SRA</h3>
              <p>Solicitors Regulation Authority</p>
            </a>
          </div>
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
            <h2>Legal News</h2>
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
            <h2>The Bar</h2>
            <ul className="resource-list">
              {RESOURCES.bar.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Solicitors</h2>
            <ul className="resource-list">
              {RESOURCES.lawSociety.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Training & CPD</h2>
            <ul className="resource-list">
              {RESOURCES.cpd.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Legal System</h2>
            <ul className="resource-list">
              {RESOURCES.legal.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <div className="resources-grid">
          <section className="resource-section">
            <h2>Wellbeing</h2>
            <ul className="resource-list">
              {RESOURCES.wellbeing.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Pro Bono & Access to Justice</h2>
            <ul className="resource-list">
              {RESOURCES.probeono.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
