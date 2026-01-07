import { useState, useEffect } from 'react'
import './FindCaseLawFeed.css'

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

const BASE_URL = 'https://caselaw.nationalarchives.gov.uk/atom.xml'

const FEEDS: FeedConfig[] = [
  { name: 'Court of Protection', code: 'EWCOP', url: `${BASE_URL}?court=ewcop&order=-date&per_page=10` },
  { name: 'UK Supreme Court', code: 'UKSC', url: `${BASE_URL}?court=uksc&order=-date&per_page=10` },
  { name: 'Court of Appeal', code: 'EWCA', url: `${BASE_URL}?court=ewca&order=-date&per_page=10` },
]

// Using rss2json.com as a CORS proxy to convert Atom to JSON
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='

export default function FindCaseLawFeed() {
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
    <div className="fcl-feed">
      <div className="feed-header fcl-header">
        <div className="feed-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/>
            <path d="M3 16.2V21h4.8"/>
            <path d="M21 7.8V3h-4.8"/>
            <path d="M3 7.8V3h4.8"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <h3>Find Case Law</h3>
        </div>
        <a
          href="https://caselaw.nationalarchives.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="fcl-link"
        >
          Search Cases
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

      <p className="feed-subtitle">{selectedFeed.name} - The National Archives</p>

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
            <a href="https://caselaw.nationalarchives.gov.uk" target="_blank" rel="noopener noreferrer">
              Search directly on Find Case Law
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

      <div className="feed-footer fcl-footer">
        <p>
          Data provided by <a href="https://caselaw.nationalarchives.gov.uk" target="_blank" rel="noopener noreferrer">Find Case Law</a> -
          The National Archives
        </p>
      </div>
    </div>
  )
}
