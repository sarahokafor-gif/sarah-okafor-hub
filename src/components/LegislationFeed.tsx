import { useState, useEffect } from 'react'
import './LegislationFeed.css'

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
  { name: 'UK Public General Acts', code: 'Acts', url: 'https://www.legislation.gov.uk/ukpga/data.feed' },
  { name: 'UK Statutory Instruments', code: 'SIs', url: 'https://www.legislation.gov.uk/uksi/data.feed' },
  { name: 'All New Legislation', code: 'New', url: 'https://www.legislation.gov.uk/new/data.feed' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function LegislationFeed() {
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
    <div className="legislation-feed">
      <div className="feed-header legislation-header">
        <div className="feed-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <h3>Legislation.gov.uk</h3>
        </div>
        <a
          href="https://www.legislation.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="legislation-link"
        >
          Search Legislation
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
            <p>Loading legislation...</p>
          </div>
        )}

        {error && (
          <div className="feed-error">
            <p>{error}</p>
            <a href="https://www.legislation.gov.uk" target="_blank" rel="noopener noreferrer">
              Browse directly on Legislation.gov.uk
            </a>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="feed-empty">No recent legislation available</p>
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

      <div className="feed-footer legislation-footer">
        <p>
          Data from <a href="https://www.legislation.gov.uk" target="_blank" rel="noopener noreferrer">Legislation.gov.uk</a> -
          The National Archives
        </p>
      </div>
    </div>
  )
}
