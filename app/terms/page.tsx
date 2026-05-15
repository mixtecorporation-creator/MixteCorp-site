import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="page page-narrow">
      <Link href="/" className="page-back">&larr; Back</Link>
      <h1 className="page-title">Terms of Service</h1>

      <div className="legal-content">
        <p><strong>Last updated:</strong> May 2026</p>

        <h3>1. Acceptance</h3>
        <p>By using Mixte Corporation services, you agree to these terms. If you do not agree, do not use our services.</p>

        <h3>2. Eligibility</h3>
        <p>You must be at least 18 years old to use our services.</p>

        <h3>3. Account</h3>
        <p>You are responsible for maintaining the security of your account. You must provide accurate information.</p>

        <h3>4. Acceptable Use</h3>
        <p>You agree not to misuse our services for illegal activities, harassment, or any prohibited purpose.</p>

        <h3>5. Termination</h3>
        <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

        <h3>6. Contact</h3>
        <p>Questions? Email <a href="mailto:mixtecorporation@gmail.com">mixtecorporation@gmail.com</a>.</p>
      </div>
    </div>
  )
}
