// SVG Icons
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

export default function ContactPage() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <h1>Get in Touch</h1>
        <p>
          Have feedback on the tools? Suggestions for new features? I'd love to hear from you.
        </p>
      </section>

      {/* Contact Options */}
      <section className="contact-section">
        <div className="contact-content">
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

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>
          Sign up to be notified when new tools and features are released.
        </p>
        <div className="newsletter-form">
          <p className="newsletter-note">
            Newsletter signup coming soon. In the meantime, follow on social media or send an email.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Are the tools really free?</h3>
            <p>
              Yes. All tools are free to use with registration. There are no subscriptions,
              no hidden fees, and no premium tiers.
            </p>
          </div>
          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>
              Absolutely. All document processing happens locally in your browser.
              Your files never leave your device or get uploaded to any server.
            </p>
          </div>
          <div className="faq-item">
            <h3>Can I suggest a new tool?</h3>
            <p>
              Yes! I'd love to hear what tools would help you. Send your suggestions
              via email or social media.
            </p>
          </div>
          <div className="faq-item">
            <h3>Do you provide legal advice?</h3>
            <p>
              These tools help with document preparation, not legal advice. For specific
              legal questions, please consult a qualified legal professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
