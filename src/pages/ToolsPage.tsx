// SVG Icons
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

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
  </svg>
)

export default function ToolsPage() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <h1>Free Tools</h1>
        <p>
          Professional-grade tools for courts, tribunals, complaints, and formal documentation.
          Free to use with registration. No subscriptions, no hidden fees.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="tools-section">
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
              href="https://www.courtbundlebuilder.co.uk"
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
              <EditIcon />
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
            <a href="/contact" className="tool-link">
              Get Notified
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create a free account to access all tools and save your preferences.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload</h3>
            <p>Upload your documents securely. All processing happens locally in your browser.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Download</h3>
            <p>Download your professionally formatted documents, ready for submission.</p>
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="privacy-note">
        <h2>Your Privacy Matters</h2>
        <p>
          All tools process data locally in your browser. Your documents never leave your
          device, ensuring complete confidentiality. We don't store, read, or have access
          to any of your files.
        </p>
      </section>
    </div>
  )
}
