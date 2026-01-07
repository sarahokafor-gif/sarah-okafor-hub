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
  { name: 'Family Division (EWHC)', code: 'EWHC', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Fam.rss' },
  { name: 'Family Court (EWFC)', code: 'EWFC', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWFC.rss' },
  { name: 'Court of Appeal', code: 'EWCA', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss' },
]

const NEWS_FEEDS: FeedConfig[] = [
  { name: 'Pink Tape', code: 'Pink', url: 'https://pinktape.co.uk/feed/' },
  { name: 'Transparency Project', code: 'Transp', url: 'https://www.transparencyproject.org.uk/feed/' },
  { name: 'Family Law Week', code: 'FLW', url: 'https://www.familylawweek.co.uk/site.aspx?i=ed144742' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  courts: [
    { name: 'Family Court', url: 'https://www.gov.uk/courts-tribunals/family-court' },
    { name: 'Family Procedure Rules', url: 'https://www.justice.gov.uk/courts/procedure-rules/family' },
    { name: 'Family Court Forms', url: 'https://www.gov.uk/government/collections/family-court-forms' },
    { name: 'Practice Directions', url: 'https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions' },
  ],
  children: [
    { name: 'CAFCASS', url: 'https://www.cafcass.gov.uk/' },
    { name: 'Children & Family Court Advisory', url: 'https://www.cafcass.gov.uk/grown-ups/professionals/' },
    { name: 'Private Law Programme', url: 'https://www.judiciary.uk/guidance-and-resources/private-law/' },
    { name: 'Public Law Outline', url: 'https://www.judiciary.uk/guidance-and-resources/public-law-outline/' },
  ],
  domestic: [
    { name: 'National Domestic Abuse Helpline', url: 'https://www.nationaldahelpline.org.uk/' },
    { name: 'Refuge', url: 'https://www.refuge.org.uk/' },
    { name: 'Domestic Abuse Act Guidance', url: 'https://www.gov.uk/government/publications/domestic-abuse-act-2021' },
    { name: 'Clare\'s Law', url: 'https://www.gov.uk/guidance/domestic-violence-disclosure-scheme-guidance' },
  ],
  bodies: [
    { name: 'Family Law Bar Association', url: 'https://www.flba.co.uk/' },
    { name: 'Resolution', url: 'https://resolution.org.uk/' },
    { name: 'Family Justice Council', url: 'https://www.judiciary.uk/related-offices-and-bodies/advisory-bodies/fjc/' },
    { name: 'Law Society Family Law', url: 'https://www.lawsociety.org.uk/topics/family-and-children' },
  ],
  financial: [
    { name: 'Financial Remedies Court', url: 'https://www.judiciary.uk/guidance-and-resources/financial-remedies-court/' },
    { name: 'Form E', url: 'https://www.gov.uk/government/publications/form-e-financial-statement' },
    { name: 'Child Maintenance Service', url: 'https://www.gov.uk/child-maintenance-service' },
    { name: 'Pension Sharing', url: 'https://www.gov.uk/pension-sharing-on-divorce' },
  ],
  guidance: [
    { name: 'Judiciary Family Guidance', url: 'https://www.judiciary.uk/guidance-and-resources/family-resources/' },
    { name: 'President\'s Guidance', url: 'https://www.judiciary.uk/publications/?publication_type%5B%5D=guidance-family' },
    { name: 'Bundles Practice Direction', url: 'https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_27a' },
  ],
}

export default function FamilyLawPage() {
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
      <header className="practice-header family-header">
        <h1>Family Law</h1>
        <p>Children Act | Financial Remedies | Domestic Abuse | Private & Public Law</p>
      </header>

      <div className="practice-content">
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
            <h2>Courts & Procedure</h2>
            <ul className="resource-list">
              {RESOURCES.courts.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Children</h2>
            <ul className="resource-list">
              {RESOURCES.children.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Domestic Abuse</h2>
            <ul className="resource-list">
              {RESOURCES.domestic.map((item, index) => (
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
            <h2>Financial Remedies</h2>
            <ul className="resource-list">
              {RESOURCES.financial.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Guidance & Practice Directions</h2>
            <ul className="resource-list">
              {RESOURCES.guidance.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <section className="legislation-section">
          <h2>Key Legislation</h2>
          <div className="legislation-links">
            <a href="https://www.legislation.gov.uk/ukpga/1989/41/contents" target="_blank" rel="noopener noreferrer">Children Act 1989</a>
            <a href="https://www.legislation.gov.uk/ukpga/2002/38/contents" target="_blank" rel="noopener noreferrer">Adoption and Children Act 2002</a>
            <a href="https://www.legislation.gov.uk/ukpga/1973/18/contents" target="_blank" rel="noopener noreferrer">Matrimonial Causes Act 1973</a>
            <a href="https://www.legislation.gov.uk/ukpga/2021/17/contents" target="_blank" rel="noopener noreferrer">Domestic Abuse Act 2021</a>
            <a href="https://www.legislation.gov.uk/ukpga/1996/27/contents" target="_blank" rel="noopener noreferrer">Family Law Act 1996</a>
          </div>
        </section>
      </div>
    </div>
  )
}
