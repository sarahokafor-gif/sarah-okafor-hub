import { Link } from 'react-router-dom'

// SVG Icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
)

const FileStackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 7h-3a2 2 0 0 1-2-2V2"/>
    <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z"/>
    <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15"/>
    <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"/>
  </svg>
)

const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/>
    <path d="M12 3v18"/>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
)

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Free Tools - Registration Required</span>
          <h1>Chambers of Sarah Okafor</h1>
          <p className="hero-subtitle">
            Free tools for anyone navigating formal processes - whether you're a legal professional,
            representing yourself in court, responding to a complaint, or preparing documents
            for any official matter that's important to you.
          </p>
          <Link to="/tools" className="hero-cta">
            Explore Free Tools
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>What We Offer</h2>
          <p>Professional-grade tools and resources, free to use with registration.</p>
        </div>

        <div className="featured-grid">
          <Link to="/tools" className="featured-card">
            <div className="featured-icon">
              <FileStackIcon />
            </div>
            <h3>Free Tools</h3>
            <p>Professional document preparation tools for courts, tribunals, and formal processes.</p>
            <span className="featured-link">
              View Tools <ArrowRightIcon />
            </span>
          </Link>

          <Link to="/resources" className="featured-card">
            <div className="featured-icon">
              <ScaleIcon />
            </div>
            <h3>Legal Resources</h3>
            <p>Latest case law from UK courts via BAILII and Find Case Law feeds.</p>
            <span className="featured-link">
              Browse Resources <ArrowRightIcon />
            </span>
          </Link>

          <Link to="/blog" className="featured-card">
            <div className="featured-icon">
              <BookOpenIcon />
            </div>
            <h3>Blog & Guides</h3>
            <p>Articles, videos, and practical guides for navigating legal processes.</p>
            <span className="featured-link">
              Read Blog <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Access professional-grade tools designed to help you prepare documents with confidence.</p>
          <Link to="/tools" className="cta-button">
            Get Started
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </>
  )
}
