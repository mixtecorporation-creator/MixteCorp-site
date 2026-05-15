import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="page page-narrow">
      <Link href="/" className="page-back">&larr; Back</Link>
      <h1 className="page-title">Privacy Policy</h1>

      <div className="legal-content">
        <p><strong>Last updated:</strong> May 2026</p>

        <h3>1. Information We Collect</h3>
        <p>We collect information you provide when signing in via Google or GitHub (name, email, avatar). We also collect your username, birthdate, and country during onboarding.</p>

        <h3>2. How We Use Your Data</h3>
        <p>Your data is used to provide and improve our services, personalize your experience, and communicate with you.</p>

        <h3>3. Data Storage</h3>
        <p>Your data is stored securely via Supabase. We do not sell or share your personal information with third parties.</p>

        <h3>4. Your Rights</h3>
        <p>You can view, edit, or delete your data at any time from your profile and settings pages.</p>

        <h3>5. Contact</h3>
        <p>Email us at <a href="mailto:mixtecorporation@gmail.com">mixtecorporation@gmail.com</a> with any privacy concerns.</p>
      </div>
    </div>
  )
}
