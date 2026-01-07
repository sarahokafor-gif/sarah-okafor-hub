import { Link } from 'react-router-dom'

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
)

export default function BlogPage() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <h1>Blog & Guides</h1>
        <p>
          Articles, videos, and practical guides for navigating legal processes.
        </p>
      </section>

      {/* Coming Soon */}
      <section className="coming-soon-section">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <h2>Coming Soon</h2>
          <p>
            We're working on articles and video guides to help you navigate formal processes
            with confidence. Topics will include:
          </p>
          <ul className="coming-soon-list">
            <li>How to prepare a court bundle</li>
            <li>Understanding court procedures</li>
            <li>Writing effective witness statements</li>
            <li>Responding to formal complaints</li>
            <li>Preparing for tribunal hearings</li>
            <li>Working with legal documents</li>
          </ul>
          <Link to="/contact" className="notify-button">
            Get Notified When We Launch
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </div>
  )
}
