import './App.css'
import BailiiRssFeed from './components/BailiiRssFeed'
import FindCaseLawFeed from './components/FindCaseLawFeed'

// SVG Icons as components
const FileStackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 7h-3a2 2 0 0 1-2-2V2"/>
    <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z"/>
    <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15"/>
    <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

function App() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <a href="/" className="header-logo">Chambers of Sarah Okafor</a>
          <nav className="header-nav">
            <a href="#tools">Tools</a>
            <a href="#resources">Resources</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

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
          <a href="#tools" className="hero-cta">
            Explore Free Tools
            <ArrowRightIcon />
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="tools-section">
        <div className="section-header">
          <h2>Free Tools</h2>
          <p>
            Professional-grade tools for courts, tribunals, complaints, and formal documentation.
            Free to use with registration. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="tools-grid">
          {/* Court Bundle Builder */}
          <div className="tool-card">
            <div className="tool-icon">
              <FileStackIcon />
            </div>
            <h3>
              Court Bundle Builder
              <span className="tool-badge">Live</span>
            </h3>
            <p>
              Create professional court bundles in minutes. Merge PDFs, add page numbers,
              generate clickable indexes, and produce court-ready documents.
            </p>
            <ul className="tool-features">
              <li>Drag-and-drop PDF merging</li>
              <li>Automatic page numbering</li>
              <li>Clickable index generation</li>
              <li>Section dividers with custom prefixes</li>
              <li>Secure local processing</li>
            </ul>
            <a
              href="https://courtbundlebuilder.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              Open Court Bundle Builder
              <ArrowRightIcon />
            </a>
          </div>

          {/* Future Tool Placeholder */}
          <div className="tool-card">
            <div className="tool-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
              </svg>
            </div>
            <h3>
              More Tools
              <span className="tool-badge coming-soon">Coming Soon</span>
            </h3>
            <p>
              Additional legal technology tools are in development. Sign up to be notified
              when new tools are released.
            </p>
            <ul className="tool-features">
              <li>Document templates</li>
              <li>Legal calculators</li>
              <li>Practice management aids</li>
              <li>And more...</li>
            </ul>
            <a href="#contact" className="tool-link">
              Get Notified
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Legal Resources Section */}
      <section id="resources" className="resources-section">
        <div className="section-header">
          <h2>Legal Resources</h2>
          <p>
            Stay up to date with the latest case law from UK courts and tribunals.
          </p>
        </div>

        <div className="resources-grid">
          <BailiiRssFeed />
          <FindCaseLawFeed />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About</h2>
          <div className="about-layout">
            <div className="about-photo">
              <img
                src="/sarah-profile.jpg"
                alt="Sarah Okafor, Barrister"
                onError={(e) => {
                  // Hide image container if photo not found
                  (e.target as HTMLImageElement).parentElement!.style.display = 'none'
                }}
              />
            </div>
            <div className="about-text">
              <p>
                I'm Sarah Okafor, a barrister practising in England and Wales. I was called to
                the Bar in 2001. I practise in various areas of law including advising local
                authority and private clients in areas of chancery and Court of Protection work
                for adults. I previously practised as a qualified and registered social worker
                with vulnerable adults and families.
              </p>
              <p>
                These tools are born from my experience of how important clear, well-organised
                documentation is when navigating formal processes. Whether you're a solicitor,
                a litigant in person, someone responding to a workplace grievance, or a student
                learning advocacy - everyone deserves access to professional-quality tools.
              </p>
              <p>
                All tools process data locally in your browser. Your documents never leave your
                device, ensuring complete confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>
            Have feedback on the tools? Suggestions for new features? I'd love to hear from you.
          </p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/sarah.okafor"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/sarah-okafor-barrister/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="mailto:contact@courtbundlebuilder.co.uk"
              className="social-link"
            >
              <MailIcon />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-copyright">
            &copy; {currentYear} Chambers of Sarah Okafor. All rights reserved.
          </p>
          <p className="footer-tagline">
            Free legal technology tools for professionals
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
