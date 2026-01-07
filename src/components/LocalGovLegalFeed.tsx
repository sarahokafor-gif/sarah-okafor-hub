import { useState, useEffect } from 'react'
import './LocalGovLegalFeed.css'

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
  { name: 'UK Human Rights Blog', code: 'UKHR', url: 'https://ukhumanrightsblog.com/feed/' },
  { name: 'Public Law Project', code: 'PLP', url: 'https://publiclawproject.org.uk/feed/' },
  { name: 'Local Government Association', code: 'LGA', url: 'https://www.local.gov.uk/rss.xml' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function LocalGovLegalFeed() {
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
    <div className="localgov-feed">
      <div className="feed-header localgov-header">
        <div className="feed-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <h3>Local Government Law</h3>
        </div>
        <a
          href="https://ukhumanrightsblog.com"
          target="_blank"
          rel="noopener noreferrer"
          className="localgov-link"
        >
          UK HR Blog
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
            <p>Loading news...</p>
          </div>
        )}

        {error && (
          <div className="feed-error">
            <p>{error}</p>
            <a href="https://ukhumanrightsblog.com" target="_blank" rel="noopener noreferrer">
              Visit UK Human Rights Blog directly
            </a>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="feed-empty">No recent news available</p>
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

      <div className="feed-footer localgov-footer">
        <p>
          Public law, local authority, and administrative law news
        </p>
      </div>
    </div>
  )
}
