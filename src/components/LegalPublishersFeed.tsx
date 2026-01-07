import { useState, useEffect } from 'react'
import './LegalPublishersFeed.css'

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
  { name: 'Law Society Gazette', code: 'Gazette', url: 'https://www.lawgazette.co.uk/feed' },
  { name: 'Legal Cheek', code: 'Cheek', url: 'https://www.legalcheek.com/feed/' },
  { name: 'RollOnFriday', code: 'RoF', url: 'https://www.rollonfriday.com/rss.xml' },
]

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function LegalPublishersFeed() {
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
    <div className="publishers-feed">
      <div className="feed-header publishers-header">
        <div className="feed-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <h3>Legal Publishers</h3>
        </div>
        <a
          href="https://www.lawgazette.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="publishers-link"
        >
          Law Gazette
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

      <p className="feed-subtitle">{selectedFeed.name} - Free Resources</p>

      <div className="feed-content">
        {loading && (
          <div className="feed-loading">
            <div className="spinner"></div>
            <p>Loading resources...</p>
          </div>
        )}

        {error && (
          <div className="feed-error">
            <p>{error}</p>
            <a href="https://www.lawgazette.co.uk" target="_blank" rel="noopener noreferrer">
              Visit Law Gazette directly
            </a>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="feed-empty">No recent content available</p>
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

      <div className="feed-footer publishers-footer">
        <p>
          Legal news and industry updates
        </p>
      </div>
    </div>
  )
}
