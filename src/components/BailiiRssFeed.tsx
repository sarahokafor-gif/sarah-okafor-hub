import { useState, useEffect } from 'react'
import './BailiiRssFeed.css'

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

const FEEDS: FeedConfig[] = [
  { name: 'Court of Protection', code: 'EWCOP', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCOP.rss' },
  { name: 'Court of Appeal (Civil)', code: 'EWCA Civ', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWCA_Civ.rss' },
  { name: 'High Court (Chancery)', code: 'EWHC Ch', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Ch.rss' },
  { name: 'High Court (Family)', code: 'EWHC Fam', url: 'https://www.bailii.org/rss/recent-accessions-ew_cases_EWHC_Fam.rss' },
  { name: 'UK Supreme Court', code: 'UKSC', url: 'https://www.bailii.org/rss/recent-accessions-uk_cases_UKSC.rss' },
]

// Using rss2json.com as a CORS proxy to convert RSS to JSON
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function BailiiRssFeed() {
  const [selectedFeed, setSelectedFeed] = useState<FeedConfig>(FEEDS[0])
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
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="bailii-feed">
      <div className="feed-header">
        <div className="feed-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9"/>
            <path d="M4 4a16 16 0 0 1 16 16"/>
            <circle cx="5" cy="19" r="1"/>
          </svg>
          <h3>Latest Cases from BAILII</h3>
        </div>
        <a
          href="https://www.bailii.org"
          target="_blank"
          rel="noopener noreferrer"
          className="bailii-link"
        >
          Visit BAILII
        </a>
      </div>

      <div className="feed-selector">
        {FEEDS.map((feed) => (
          <button
            key={feed.code}
            className={`feed-tab ${selectedFeed.code === feed.code ? 'active' : ''}`}
            onClick={() => setSelectedFeed(feed)}
          >
            {feed.code}
          </button>
        ))}
      </div>

      <p className="feed-subtitle">{selectedFeed.name}</p>

      <div className="feed-content">
        {loading && (
          <div className="feed-loading">
            <div className="spinner"></div>
            <p>Loading cases...</p>
          </div>
        )}

        {error && (
          <div className="feed-error">
            <p>{error}</p>
            <a href={selectedFeed.url} target="_blank" rel="noopener noreferrer">
              View feed directly on BAILII
            </a>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="feed-empty">No recent cases available</p>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="feed-list">
            {items.map((item, index) => (
              <li key={index} className="feed-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <span className="feed-date">{formatDate(item.pubDate)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="feed-footer">
        <p>
          Data provided by <a href="https://www.bailii.org" target="_blank" rel="noopener noreferrer">BAILII</a> -
          British and Irish Legal Information Institute
        </p>
      </div>
    </div>
  )
}
