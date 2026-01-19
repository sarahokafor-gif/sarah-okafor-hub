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
  { name: 'Chancery Division (BAILII)', code: 'Ch', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Ch.rss' },
  { name: 'Court of Appeal (Civil)', code: 'EWCA', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss' },
  { name: 'UK Supreme Court', code: 'UKSC', url: 'https://www.bailii.org/rss/recent-accessions-uk_cases_UKSC.rss' },
]

const NEWS_FEEDS: FeedConfig[] = [
  { name: 'Office of the Public Guardian', code: 'OPG', url: 'https://www.gov.uk/government/organisations/office-of-the-public-guardian.atom' },
  { name: 'HMRC', code: 'HMRC', url: 'https://www.gov.uk/government/organisations/hm-revenue-customs.atom' },
  { name: 'Law Commission', code: 'LawCom', url: 'https://www.lawcom.gov.uk/feed/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

const RESOURCES = {
  probate: [
    { name: 'HMCTS Probate Service', url: 'https://www.gov.uk/applying-for-probate' },
    { name: 'Apply for Probate Online', url: 'https://www.gov.uk/applying-for-probate/apply-for-probate' },
    { name: 'Probate Registry Forms', url: 'https://www.gov.uk/government/collections/probate-forms' },
    { name: 'Inheritance Tax Guidance', url: 'https://www.gov.uk/inheritance-tax' },
    { name: 'Excepted Estates', url: 'https://www.gov.uk/government/publications/inheritance-tax-excepted-estates' },
  ],
  wills: [
    { name: 'Making a Will', url: 'https://www.gov.uk/make-will' },
    { name: 'Intestacy Rules', url: 'https://www.gov.uk/inherits-someone-dies-without-will' },
    { name: 'Inheritance Act Claims', url: 'https://www.legislation.gov.uk/ukpga/1975/63' },
    { name: 'Testamentary Capacity Guidance', url: 'https://www.lawsociety.org.uk/topics/private-client/assessing-capacity' },
    { name: 'Will Validity Challenges', url: 'https://www.judiciary.uk/guidance-and-resources/' },
  ],
  trusts: [
    { name: 'Trust Registration Service', url: 'https://www.gov.uk/guidance/register-your-trust' },
    { name: 'HMRC Trusts Manual', url: 'https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual' },
    { name: 'Trust Forms', url: 'https://www.gov.uk/government/collections/trust-and-estate-forms' },
    { name: 'Charities & Trusts', url: 'https://www.gov.uk/government/organisations/charity-commission' },
  ],
  bodies: [
    { name: 'STEP - Society of Trust & Estate Practitioners', url: 'https://www.step.org/' },
    { name: 'Law Society Private Client Section', url: 'https://www.lawsociety.org.uk/topics/private-client' },
    { name: 'HMCTS Probate', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service' },
    { name: 'Charity Commission', url: 'https://www.gov.uk/government/organisations/charity-commission' },
  ],
  opg: [
    { name: 'Office of the Public Guardian', url: 'https://www.gov.uk/government/organisations/office-of-the-public-guardian' },
    { name: 'Register a Lasting Power of Attorney', url: 'https://www.gov.uk/power-of-attorney' },
    { name: 'LPA Forms', url: 'https://www.gov.uk/government/collections/lasting-power-of-attorney-forms' },
    { name: 'Become a Deputy', url: 'https://www.gov.uk/become-deputy' },
    { name: 'OPG Safeguarding', url: 'https://www.gov.uk/government/organisations/office-of-the-public-guardian/about' },
  ],
  tax: [
    { name: 'Inheritance Tax Manual', url: 'https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual' },
    { name: 'Capital Gains Tax', url: 'https://www.gov.uk/capital-gains-tax' },
    { name: 'Trusts & Estates Tax', url: 'https://www.gov.uk/trusts-taxes' },
    { name: 'IHT400 Forms', url: 'https://www.gov.uk/government/collections/inheritance-tax-forms' },
    { name: 'Business Property Relief', url: 'https://www.gov.uk/business-relief-inheritance-tax' },
  ],
}

export default function PrivateClientPage() {
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
      <header className="practice-header private-header">
        <h1>Private Client & Chancery</h1>
        <p>Wills | Probate | Trusts | Estate Administration | Lasting Powers of Attorney</p>
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
            <h2>Probate & Estate Administration</h2>
            <ul className="resource-list">
              {RESOURCES.probate.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Wills & Testamentary Matters</h2>
            <ul className="resource-list">
              {RESOURCES.wills.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Trusts</h2>
            <ul className="resource-list">
              {RESOURCES.trusts.map((item, index) => (
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
            <h2>Office of the Public Guardian</h2>
            <ul className="resource-list">
              {RESOURCES.opg.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>

          <section className="resource-section">
            <h2>Tax & IHT</h2>
            <ul className="resource-list">
              {RESOURCES.tax.map((item, index) => (
                <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <section className="legislation-section">
          <h2>Key Legislation</h2>
          <div className="legislation-links">
            <a href="https://www.legislation.gov.uk/ukpga/Geo5/15-16/23" target="_blank" rel="noopener noreferrer">Administration of Estates Act 1925</a>
            <a href="https://www.legislation.gov.uk/ukpga/1837/26" target="_blank" rel="noopener noreferrer">Wills Act 1837</a>
            <a href="https://www.legislation.gov.uk/ukpga/1975/63" target="_blank" rel="noopener noreferrer">Inheritance (Provision for Family and Dependants) Act 1975</a>
            <a href="https://www.legislation.gov.uk/ukpga/2000/16/contents" target="_blank" rel="noopener noreferrer">Trustee Act 2000</a>
            <a href="https://www.legislation.gov.uk/ukpga/2005/9/contents" target="_blank" rel="noopener noreferrer">Mental Capacity Act 2005</a>
          </div>
        </section>
      </div>
    </div>
  )
}
