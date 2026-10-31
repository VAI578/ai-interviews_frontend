import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <a className="brand" href="/"><span className="brand-mark">✳</span><span className="brand-name">prepwise</span></a>
        <nav className="landing-links" aria-label="Landing navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <Link to="/login">Log in</Link>
          <Link className="btn btn-small" to="/register">Get started <span aria-hidden="true">→</span></Link>
        </nav>
      </header>
      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <span className="eyebrow"><span aria-hidden="true">✦</span> PRACTICE WITH PURPOSE</span>
            <h1>Your next interview.<br /><span>Your best one yet.</span></h1>
            <p>Build confidence at your own pace. Practice role-specific interview questions, organize your sessions, and feel ready for what comes next.</p>
            <div className="hero-buttons">
              <Link className="btn" to="/register">Start practicing <span aria-hidden="true">→</span></Link>
              <a className="btn btn-outline" href="#how-it-works">See how it works</a>
            </div>
            <div className="hero-proof"><div className="proof-avatars"><i>A</i><i>J</i><i>M</i></div><span>A calm space to prepare for your next big step</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orb" />
            <div className="mock-window">
              <div className="mock-head"><span>Practice session</span><span className="status-pill">Question 2 of 5</span></div>
              <div className="mock-progress"><span /></div>
              <div className="mock-question">Tell me about a project you’re proud of. What was your role, and what did you learn?</div>
              <div className="mock-answer">I recently worked on a project where I had the opportunity to...</div>
              <div className="mock-footer"><span className="mock-stars">★★★★★</span><button className="btn btn-small" type="button">Next question →</button></div>
            </div>
            <div className="hero-float"><strong>One question at a time</strong><span>Make practice feel manageable.</span></div>
          </div>
        </section>
        <section className="landing-section" id="features">
          <h2>Preparation that feels a little less daunting</h2>
          <p>Simple tools to help you show up as your most prepared self.</p>
          <div className="feature-grid">
            <article className="feature-card"><span className="stat-icon">✳</span><h3>Practice on your terms</h3><p>Set up a session for the role, experience level, and interview style you want to focus on.</p></article>
            <article className="feature-card"><span className="stat-icon">◷</span><h3>Keep your progress close</h3><p>Review your past sessions and revisit the answers you have worked through.</p></article>
            <article className="feature-card"><span className="stat-icon">▤</span><h3>Stay organized</h3><p>Keep your interview preparation in one calm, easy-to-use workspace.</p></article>
          </div>
        </section>
        <section className="landing-section" id="how-it-works" style={{ background: '#fff' }}>
          <h2>Start with one good practice session</h2>
          <p>Create an account, choose what to practice, and work through questions at your own pace.</p>
          <div style={{ marginTop: 24 }}><Link className="btn" to="/register">Create your practice space →</Link></div>
        </section>
      </main>
      <footer className="landing-bottom"><span>© {currentYear} Prepwise</span><span>Built for your next opportunity.</span></footer>
    </div>
  )
}
