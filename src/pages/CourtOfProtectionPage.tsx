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
  { name: 'CoP Cases (BAILII)', code: 'BAILII', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCOP.rss' },
  { name: 'CoP Cases (Find Case Law)', code: 'FCL', url: 'https://caselaw.nationalarchives.gov.uk/atom.xml?court=ewcop&order=-date&per_page=10' },
  { name: 'Court of Appeal', code: 'EWCA', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  guidance: [
    { name: 'Mental Capacity Act 2005 Code of Practice', url: 'https://www.gov.uk/government/publications/mental-capacity-act-code-of-practice' },
    { name: 'Court of Protection Rules 2017', url: 'https://www.legislation.gov.uk/uksi/2017/1035/contents' },
    { name: 'Practice Direction 9E - CoP', url: 'https://www.judiciary.uk/guidance-and-resources/court-of-protection-practice-directions/' },
    { name: 'COPDOL11 Guidance', url: 'https://www.gov.uk/government/publications/apply-to-the-court-of-protection-form-copdol11' },
  ],
  forms: [
    { name: 'COP1 - Application Form', url: 'https://www.gov.uk/government/publications/apply-to-the-court-of-protection-form-cop1' },
    { name: 'COP3 - Assessment of Capacity', url: 'https://www.gov.uk/government/publications/apply-to-the-court-of-protection-form-cop3' },
    { name: 'COP9 - Application Notice', url: 'https://www.gov.uk/government/publications/apply-to-the-court-of-protection-form-cop9' },
    { name: 'COP24 - Witness Statement', url: 'https://www.gov.uk/government/publications/apply-to-the-court-of-protection-form-cop24' },
    { name: 'COPDOL11 - Deprivation of Liberty', url: 'https://www.gov.uk/government/publications/apply-to-the-court-of-protection-form-copdol11' },
    { name: 'All CoP Forms', url: 'https://www.gov.uk/government/collections/court-of-protection-forms' },
  ],
  bodies: [
    { name: 'Office of the Public Guardian', url: 'https://www.gov.uk/government/organisations/office-of-the-public-guardian' },
    { name: 'Court of Protection', url: 'https://www.gov.uk/courts-tribunals/court-of-protection' },
    { name: 'Official Solicitor', url: 'https://www.gov.uk/government/organisations/official-solicitor-and-public-trustee' },
    { name: 'Legal Aid Agency', url: 'https://www.gov.uk/government/organisations/legal-aid-agency' },
  ],
  learning: [
    { name: 'Mental Capacity Law & Policy', url: 'https://www.mentalcapacitylawandpolicy.org.uk/' },
    { name: 'Court of Protection Handbook', url: 'https://www.lawsociety.org.uk/topics/private-client/court-of-protection' },
    { name: 'Edge Training - MCA Courses', url: 'https://www.edgetraining.org.uk/' },
  ],
}

export default function CourtOfProtectionPage() {
  const [selectedFeed, setSelectedFeed] = useState<FeedConfig>(CASE_LAW_FEEDS[0])
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(RSS2JSON_API + encodeURIComponent(selectedFeed.url))
        const data = await response.json()

        if (data.status === 'ok' && data.items) {
          setItems(data.items.slice(0, 10).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate
          })))
        } else {
          setError('Unable to load feed')
        }
      } catch (err) {
        setError('Unable to load feed')
      } finally {
        setLoading(false)
      }
    }

    fetchFeed()
  }, [selectedFeed])

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="practice-area-page">
      <header className="practice-header cop-header">
        <h1>Court of Protection</h1>
        <p>Mental Capacity Act 2005 | Deprivation of Liberty | Best Interests | Property & Affairs</p>
      </header>

      <div className="practice-content">
        {/* Case Law Feed */}
        <section className="feed-section">
          <h2>Latest Case Law</h2>
          <div className="feed-tabs">
            {CASE_LAW_FEEDS.map((feed) => (
              <button
                key={feed.code}
                className={`feed-tab ${selectedFeed.code === feed.code ? 'active' : ''}`}
                onClick={() => setSelectedFeed(feed)}
              >
                {feed.code}
              </button>
            ))}
          </div>
          <p className="feed-source">{selectedFeed.name}</p>

          <div className="feed-content">
            {loading && <div className="feed-loading"><div className="spinner"></div><p>Loading cases...</p></div>}
            {error && <div className="feed-error"><p>{error}</p></div>}
            {!loading && !error && items.length > 0 && (
              <ul className="feed-list">
                {items.map((item, index) => (
                  <li key={index} className="feed-item">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    <span className="feed-date">{formatDate(item.pubDate)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Resources Grid */}
        <div className="resources-grid">
          <section className="resource-section">
            <h2>Guidance & Practice Directions</h2>
            <ul className="resource-list">
              {RESOURCES.guidance.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Court Forms</h2>
            <ul className="resource-list">
              {RESOURCES.forms.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Key Bodies</h2>
            <ul className="resource-list">
              {RESOURCES.bodies.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Learning & CPD</h2>
            <ul className="resource-list">
              {RESOURCES.learning.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Legislation Quick Links */}
        <section className="legislation-section">
          <h2>Key Legislation</h2>
          <div className="legislation-links">
            <a href="https://www.legislation.gov.uk/ukpga/2005/9/contents" target="_blank" rel="noopener noreferrer">Mental Capacity Act 2005</a>
            <a href="https://www.legislation.gov.uk/ukpga/2019/18/contents" target="_blank" rel="noopener noreferrer">Mental Capacity (Amendment) Act 2019</a>
            <a href="https://www.legislation.gov.uk/uksi/2017/1035/contents" target="_blank" rel="noopener noreferrer">CoP Rules 2017</a>
            <a href="https://www.legislation.gov.uk/ukpga/1983/20/contents" target="_blank" rel="noopener noreferrer">Mental Health Act 1983</a>
          </div>
        </section>
      </div>
    </div>
  )
}
