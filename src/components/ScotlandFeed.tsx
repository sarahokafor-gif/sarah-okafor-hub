import { useState, useEffect } from 'react'
import './ScotlandFeed.css'

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
  { name: 'Scottish Legal News', code: 'SLN', url: 'https://www.scottishlegal.com/feed' },
  { name: 'Law Society of Scotland', code: 'LSS', url: 'https://www.lawscot.org.uk/news/feed/' },
  { name: 'Scottish Government News', code: 'SG', url: 'https://www.gov.scot/feeds/news/' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function ScotlandFeed() {
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
    <div className="scotland-feed">
      <div className="feed-header scotland-header">
        <div className="feed-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
          <h3>Scotland</h3>
        </div>
        <a
          href="https://www.scottishlegal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="scotland-link"
        >
          Scottish Legal
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
            <p>Loading updates...</p>
          </div>
        )}

        {error && (
          <div className="feed-error">
            <p>{error}</p>
            <a href="https://www.scottishlegal.com" target="_blank" rel="noopener noreferrer">
              Visit Scottish Legal News directly
            </a>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="feed-empty">No recent updates available</p>
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

      <div className="feed-footer scotland-footer">
        <p>
          Scottish legal resources, courts, and legislation
        </p>
      </div>
    </div>
  )
}
