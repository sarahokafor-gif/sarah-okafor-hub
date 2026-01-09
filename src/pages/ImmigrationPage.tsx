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
  { name: 'Upper Tribunal (IAC)', code: 'UTIAC', url: 'https://www.bailii.org/rss/recent-accessions-uk_cases_UKUT_IAC.rss' },
  { name: 'Court of Appeal', code: 'EWCA', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss' },
  { name: 'UK Supreme Court', code: 'UKSC', url: 'https://www.bailii.org/rss/recent-accessions-uk_cases_UKSC.rss' },
]

const NEWS_FEEDS: FeedConfig[] = [
  { name: 'Free Movement', code: 'FreeMvmt', url: 'https://freemovement.org.uk/feed/' },
  { name: 'Right to Remain', code: 'R2R', url: 'https://righttoremain.org.uk/feed/' },
  { name: 'UK Human Rights Blog', code: 'UKHR', url: 'https://ukhumanrightsblog.com/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  guidance: [
    { name: 'Immigration Rules', url: 'https://www.gov.uk/guidance/immigration-rules' },
    { name: 'Home Office Guidance', url: 'https://www.gov.uk/government/collections/immigration-operational-guidance' },
    { name: 'Asylum Policy Guidance', url: 'https://www.gov.uk/government/collections/asylum-decision-making-guidance' },
    { name: 'UKVI Caseworker Guidance', url: 'https://www.gov.uk/government/collections/ukvi-guidance' },
  ],
  nrpf: [
    { name: 'NRPF Network', url: 'https://www.nrpfnetwork.org.uk/' },
    { name: 'NRPF Connect Database', url: 'https://www.nrpfnetwork.org.uk/nrpf-connect' },
    { name: 'Practice Guidance', url: 'https://www.nrpfnetwork.org.uk/guidance' },
    { name: 'Local Authority Duties', url: 'https://www.nrpfnetwork.org.uk/information-and-resources/rights-and-entitlements/local-authority-duties' },
  ],
  humanRights: [
    { name: 'Liberty', url: 'https://www.libertyhumanrights.org.uk/' },
    { name: 'Amnesty International UK', url: 'https://www.amnesty.org.uk/' },
    { name: 'UK Human Rights Blog', url: 'https://ukhumanrightsblog.com/' },
    { name: 'ECHR Portal', url: 'https://www.echr.coe.int/Pages/home.aspx?p=caselaw' },
    { name: 'Equality & Human Rights Commission', url: 'https://www.equalityhumanrights.com/' },
  ],
  bodies: [
    { name: 'ILPA - Immigration Law Practitioners\' Assoc', url: 'https://ilpa.org.uk/' },
    { name: 'Immigration Law Committee', url: 'https://www.lawsociety.org.uk/topics/immigration' },
    { name: 'OISC', url: 'https://www.gov.uk/government/organisations/office-of-the-immigration-services-commissioner' },
    { name: 'Electronic Immigration Network', url: 'https://www.ein.org.uk/' },
  ],
  asylum: [
    { name: 'UNHCR UK', url: 'https://www.unhcr.org/uk/' },
    { name: 'Asylum Aid', url: 'https://asylumaid.org.uk/' },
    { name: 'Refugee Action', url: 'https://www.refugee-action.org.uk/' },
    { name: 'Migrant Help', url: 'https://www.migranthelpuk.org/' },
    { name: 'British Red Cross', url: 'https://www.redcross.org.uk/get-help/get-help-as-a-refugee' },
  ],
  tribunals: [
    { name: 'First-tier Tribunal (IAC)', url: 'https://www.gov.uk/courts-tribunals/first-tier-tribunal-immigration-and-asylum' },
    { name: 'Upper Tribunal (IAC)', url: 'https://www.gov.uk/courts-tribunals/upper-tribunal-immigration-and-asylum-chamber' },
    { name: 'Tribunal Procedure Rules', url: 'https://www.gov.uk/government/collections/tribunal-procedure-rules' },
    { name: 'UT Reported Decisions', url: 'https://tribunalsdecisions.service.gov.uk/utiac' },
  ],
  legal: [
    { name: 'Legal Aid for Immigration', url: 'https://www.gov.uk/legal-aid/eligibility' },
    { name: 'Find an Immigration Lawyer', url: 'https://www.gov.uk/find-an-immigration-adviser' },
    { name: 'Exceptional Case Funding', url: 'https://www.gov.uk/government/publications/legal-aid-exceptional-case-funding-form-and-guidance' },
  ],
}

export default function ImmigrationPage() {
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
      <header className="practice-header immigration-header">
        <h1>Immigration & Human Rights</h1>
        <p>Immigration Rules | Asylum | NRPF | Human Rights | Refugee Law</p>
      </header>

      <div className="practice-content">
        {/* Featured */}
        <section className="featured-section">
          <h2>Key Resources</h2>
          <div className="featured-grid">
            <a href="https://freemovement.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Free Movement</h3>
              <p>Leading immigration law blog and resources</p>
            </a>
            <a href="https://www.nrpfnetwork.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>NRPF Network</h3>
              <p>No Recourse to Public Funds guidance for LAs</p>
            </a>
            <a href="https://ilpa.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>ILPA</h3>
              <p>Immigration Law Practitioners' Association</p>
            </a>
            <a href="https://righttoremain.org.uk/" target="_blank" rel="noopener noreferrer" className="featured-card">
              <h3>Right to Remain</h3>
              <p>Immigration toolkit and guidance</p>
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
            <h2>NRPF & Local Authority Duties</h2>
            <ul className="resource-list">
              {RESOURCES.nrpf.map((item, index) => (
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

          <section className="resource-section">
            <h2>Asylum & Refugees</h2>
            <ul className="resource-list">
              {RESOURCES.asylum.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Professional Bodies</h2>
            <ul className="resource-list">
              {RESOURCES.bodies.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <div className="resources-grid">
          <section className="resource-section">
            <h2>Home Office Guidance</h2>
            <ul className="resource-list">
              {RESOURCES.guidance.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Tribunals</h2>
            <ul className="resource-list">
              {RESOURCES.tribunals.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Legal Aid & Advice</h2>
            <ul className="resource-list">
              {RESOURCES.legal.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <section className="legislation-section">
          <h2>Key Legislation</h2>
          <div className="legislation-links">
            <a href="https://www.legislation.gov.uk/ukpga/1971/77/contents" target="_blank" rel="noopener noreferrer">Immigration Act 1971</a>
            <a href="https://www.legislation.gov.uk/ukpga/2002/41/contents" target="_blank" rel="noopener noreferrer">Nationality, Immigration and Asylum Act 2002</a>
            <a href="https://www.legislation.gov.uk/ukpga/2016/19/contents" target="_blank" rel="noopener noreferrer">Immigration Act 2016</a>
            <a href="https://www.legislation.gov.uk/ukpga/1998/29/contents" target="_blank" rel="noopener noreferrer">Human Rights Act 1998</a>
            <a href="https://www.legislation.gov.uk/ukpga/1951/0/contents" target="_blank" rel="noopener noreferrer">Refugee Convention 1951</a>
          </div>
        </section>
      </div>
    </div>
  )
}
