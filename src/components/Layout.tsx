import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const PRACTICE_AREAS = [
  { path: '/court-of-protection', name: 'Court of Protection' },
  { path: '/adult-social-care', name: 'Adult Social Care' },
  { path: '/family-law', name: 'Family Law' },
  { path: '/private-client', name: 'Private Client & Chancery' },
  { path: '/immigration', name: 'Immigration & Human Rights' },
  { path: '/public-law', name: 'Public Law & JR' },
  { path: '/professional', name: 'Professional Development' },
  { path: '/legislation', name: 'Legislation & Parliament' },
]

export default function Layout() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path
  const isPracticeAreaActive = () => PRACTICE_AREAS.some(area => location.pathname === area.path)

  // Close mobile menu and dropdown when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setPracticeDropdownOpen(false)
  }, [location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.nav-dropdown')) {
        setPracticeDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="header-logo">Chambers of Sarah Okafor</Link>
          <nav className="header-nav">
            <Link to="/tools" className={isActive('/tools') ? 'active' : ''}>Tools</Link>
            <div className="nav-dropdown">
              <button
                className={`nav-dropdown-trigger ${isPracticeAreaActive() ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setPracticeDropdownOpen(!practiceDropdownOpen)
                }}
              >
                Practice Areas <ChevronDown />
              </button>
              {practiceDropdownOpen && (
                <div className="nav-dropdown-menu">
                  {PRACTICE_AREAS.map((area) => (
                    <Link
                      key={area.path}
                      to={area.path}
                      className={isActive(area.path) ? 'active' : ''}
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/resources" className={isActive('/resources') ? 'active' : ''}>Resources</Link>
            <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          </nav>
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />

      {/* Mobile Menu */}
      <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/tools" className={isActive('/tools') ? 'active' : ''}>Tools</Link>
        <div className="mobile-menu-section">
          <span className="mobile-menu-heading">Practice Areas</span>
          {PRACTICE_AREAS.map((area) => (
            <Link
              key={area.path}
              to={area.path}
              className={`mobile-menu-subitem ${isActive(area.path) ? 'active' : ''}`}
            >
              {area.name}
            </Link>
          ))}
        </div>
        <Link to="/resources" className={isActive('/resources') ? 'active' : ''}>Resources</Link>
        <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
      </nav>

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

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
