'use client'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">Mixte Corporation</div>
          <p className="footer-tagline">
            Creative technology studio crafting innovative applications and digital solutions.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="GitHub">GH</a>
            <a href="#" aria-label="Instagram">IG</a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#apps">Apps</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#hiring">Hiring</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:mixtecorporation@gmail.com">Email Us</a></li>
            <li><a href="mailto:mixtecorporation@gmail.com">Careers</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Mixte Corporation. All rights reserved.
        </div>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
