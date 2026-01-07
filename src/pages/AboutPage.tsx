export default function AboutPage() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <section className="page-header">
        <h1>About</h1>
        <p>
          Building tools to make formal processes more accessible.
        </p>
      </section>

      {/* About Content */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-layout">
            <div className="about-photo">
              <img
                src="/sarah-profile.jpg"
                alt="Sarah Okafor, Barrister"
                onError={(e) => {
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

      {/* Practice Areas */}
      <section className="practice-areas-section">
        <h2>Practice Areas</h2>
        <div className="practice-areas-grid">
          <div className="practice-area">
            <h3>Court of Protection</h3>
            <p>Mental capacity, deprivation of liberty, welfare and property affairs applications</p>
          </div>
          <div className="practice-area">
            <h3>Adult Social Care</h3>
            <p>Care Act assessments, s.117 aftercare, safeguarding, ordinary residence</p>
          </div>
          <div className="practice-area">
            <h3>Chancery</h3>
            <p>Trust disputes, breach of fiduciary duty, proprietary claims</p>
          </div>
          <div className="practice-area">
            <h3>Private Client</h3>
            <p>Wills, probate, trusts, estate administration</p>
          </div>
          <div className="practice-area">
            <h3>Property</h3>
            <p>Conveyancing disputes, easements, boundaries, charging orders</p>
          </div>
          <div className="practice-area">
            <h3>Local Government</h3>
            <p>Statutory duties, decision-making, judicial review</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy-section">
        <h2>Why Free Tools?</h2>
        <div className="philosophy-content">
          <p>
            Access to justice shouldn't depend on access to expensive software. The tools on this
            site are free because I believe everyone navigating formal processes deserves
            professional-quality resources.
          </p>
          <p>
            Whether you're preparing documents for court, responding to a complaint at work,
            or helping a family member with official paperwork - these tools are here to help
            you present your case clearly and professionally.
          </p>
        </div>
      </section>
    </div>
  )
}
