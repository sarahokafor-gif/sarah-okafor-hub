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

const LEGISLATION_FEEDS: FeedConfig[] = [
  { name: 'UK Public General Acts', code: 'Acts', url: 'https://www.legislation.gov.uk/ukpga/data.feed' },
  { name: 'UK Statutory Instruments', code: 'SIs', url: 'https://www.legislation.gov.uk/uksi/data.feed' },
  { name: 'All New Legislation', code: 'New', url: 'https://www.legislation.gov.uk/new/data.feed' },
]

const PARLIAMENT_FEEDS: FeedConfig[] = [
  { name: 'Bills Before Parliament', code: 'Bills', url: 'https://bills.parliament.uk/rss/allbills.rss' },
  { name: 'Commons Library Research', code: 'Commons', url: 'https://commonslibrary.parliament.uk/feed/' },
  { name: 'Lords Library Research', code: 'Lords', url: 'https://lordslibrary.parliament.uk/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  legislation: [
    { name: 'Legislation.gov.uk', url: 'https://www.legislation.gov.uk/' },
    { name: 'New Legislation', url: 'https://www.legislation.gov.uk/new' },
    { name: 'Draft Legislation', url: 'https://www.gov.uk/government/collections/draft-bills' },
    { name: 'Secondary Legislation', url: 'https://www.legislation.gov.uk/uksi' },
  ],
  parliament: [
    { name: 'UK Parliament', url: 'https://www.parliament.uk/' },
    { name: 'Bills & Acts', url: 'https://bills.parliament.uk/' },
    { name: 'Hansard', url: 'https://hansard.parliament.uk/' },
    { name: 'Select Committees', url: 'https://committees.parliament.uk/' },
    { name: 'Justice Committee', url: 'https://committees.parliament.uk/committee/102/justice-committee/' },
  ],
  govuk: [
    { name: 'GOV.UK', url: 'https://www.gov.uk/' },
    { name: 'Ministry of Justice', url: 'https://www.gov.uk/government/organisations/ministry-of-justice' },
    { name: 'Home Office', url: 'https://www.gov.uk/government/organisations/home-office' },
    { name: 'DHSC', url: 'https://www.gov.uk/government/organisations/department-of-health-and-social-care' },
  ],
  lawcommission: [
    { name: 'Law Commission', url: 'https://www.lawcom.gov.uk/' },
    { name: 'Current Projects', url: 'https://www.lawcom.gov.uk/our-work/' },
    { name: 'Consultations', url: 'https://www.lawcom.gov.uk/consultations/' },
    { name: 'Reports', url: 'https://www.lawcom.gov.uk/our-work/completed-reports/' },
  ],
  devolved: [
    { name: 'Scottish Parliament', url: 'https://www.parliament.scot/' },
    { name: 'Senedd Cymru', url: 'https://senedd.wales/' },
    { name: 'NI Assembly', url: 'https://www.niassembly.gov.uk/' },
    { name: 'Scottish Legislation', url: 'https://www.legislation.gov.uk/asp' },
    { name: 'Welsh Legislation', url: 'https://www.legislation.gov.uk/anaw' },
  ],
}

export default function LegislationPage() {
  const [legFeed, setLegFeed] = useState<FeedConfig>(LEGISLATION_FEEDS[0])
  const [parlFeed, setParlFeed] = useState<FeedConfig>(PARLIAMENT_FEEDS[0])
  const [legItems, setLegItems] = useState<FeedItem[]>([])
  const [parlItems, setParlItems] = useState<FeedItem[]>([])
  const [legLoading, setLegLoading] = useState(true)
  const [parlLoading, setParlLoading] = useState(true)
  const [legError, setLegError] = useState<string | null>(null)
  const [parlError, setParlError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeed = async () => {
      setLegLoading(true)
      setLegError(null)
      try {
        const response = await fetch(RSS2JSON_API + encodeURIComponent(legFeed.url))
        const data = await response.json()
        if (data.status === 'ok' && data.items) {
          setLegItems(data.items.slice(0, 8).map((item: any) => ({
            title: item.title, link: item.link, pubDate: item.pubDate
          })))
        } else { setLegError('Unable to load') }
      } catch { setLegError('Unable to load') }
      finally { setLegLoading(false) }
    }
    fetchFeed()
  }, [legFeed])

  useEffect(() => {
    const fetchFeed = async () => {
      setParlLoading(true)
      setParlError(null)
      try {
        const response = await fetch(RSS2JSON_API + encodeURIComponent(parlFeed.url))
        const data = await response.json()
        if (data.status === 'ok' && data.items) {
          setParlItems(data.items.slice(0, 8).map((item: any) => ({
            title: item.title, link: item.link, pubDate: item.pubDate
          })))
        } else { setParlError('Unable to load') }
      } catch { setParlError('Unable to load') }
      finally { setParlLoading(false) }
    }
    fetchFeed()
  }, [parlFeed])

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }
    catch { return dateStr }
  }

  return (
    <div className="practice-area-page">
      <header className="practice-header legislation-header">
        <h1>Legislation & Parliament</h1>
        <p>Acts | Statutory Instruments | Bills | Parliamentary Research</p>
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
            <h2>Legislation.gov.uk</h2>
            <div className="feed-tabs">
              {LEGISLATION_FEEDS.map((feed) => (
                <button key={feed.code} className={`feed-tab ${legFeed.code === feed.code ? 'active' : ''}`} onClick={() => setLegFeed(feed)}>
                  {feed.code}
                </button>
              ))}
            </div>
            <p className="feed-source">{legFeed.name}</p>
            <div className="feed-content">
              {legLoading && <div className="feed-loading"><div className="spinner"></div><p>Loading...</p></div>}
              {legError && <div className="feed-error"><p>{legError}</p></div>}
              {!legLoading && !legError && legItems.length > 0 && (
                <ul className="feed-list">
                  {legItems.map((item, index) => (
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
            <h2>UK Parliament</h2>
            <div className="feed-tabs">
              {PARLIAMENT_FEEDS.map((feed) => (
                <button key={feed.code} className={`feed-tab ${parlFeed.code === feed.code ? 'active' : ''}`} onClick={() => setParlFeed(feed)}>
                  {feed.code}
                </button>
              ))}
            </div>
            <p className="feed-source">{parlFeed.name}</p>
            <div className="feed-content">
              {parlLoading && <div className="feed-loading"><div className="spinner"></div><p>Loading...</p></div>}
              {parlError && <div className="feed-error"><p>{parlError}</p></div>}
              {!parlLoading && !parlError && parlItems.length > 0 && (
                <ul className="feed-list">
                  {parlItems.map((item, index) => (
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
            <h2>Legislation</h2>
            <ul className="resource-list">
              {RESOURCES.legislation.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Parliament</h2>
            <ul className="resource-list">
              {RESOURCES.parliament.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Government</h2>
            <ul className="resource-list">
              {RESOURCES.govuk.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Law Commission</h2>
            <ul className="resource-list">
              {RESOURCES.lawcommission.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <section className="resource-section" style={{ marginBottom: '2rem' }}>
          <h2>Devolved Legislatures</h2>
          <ul className="resource-list">
            {RESOURCES.devolved.map((item, index) => (
              <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
