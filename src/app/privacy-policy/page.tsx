export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

        <p>
          Festival Countdown Central ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We believe in minimizing data collection. The information we store is saved directly in your web browser's local storage and is not transmitted to our servers. This includes:
        </p>
        <ul>
          <li><strong>Favorite Festivals:</strong> When you mark a festival as a "favorite," its ID is stored locally on your device to allow you to filter for your preferred events.</li>
          <li><strong>Custom Events:</strong> Any custom events you create (including name, date, and time) are stored locally in your browser. This data is not sent to us or any third party.</li>
          <li><strong>Language Preference:</strong> Your selected language is saved locally to ensure the site is displayed in your preferred language on subsequent visits.</li>
        </ul>

        <h2>Information We Do Not Collect</h2>
        <p>
          We do not collect any personally identifiable information (PII) such as your name, email address, IP address, or location. We do not use cookies for tracking purposes.
        </p>
        
        <h2>Third-Party Services</h2>
        <p>We use Vercel Analytics for simple, privacy-friendly website analytics. This service does not use cookies and does not collect personal data or IP addresses. It helps us understand our website traffic in an aggregated manner. For more details, you can view the <a href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer">Vercel Analytics</a> documentation.</p>

        <h2>How We Use Your Information</h2>
        <p>
          The information stored in your browser's local storage is used solely to provide and enhance your user experience on our site. It allows the features you use to function correctly across sessions. Since this data is not sent to us, we cannot access, use, or share it.
        </p>

        <h2>Your Control Over Your Data</h2>
        <p>
          You have full control over the data stored in your browser. You can clear your browser's local storage at any time to remove all your favorited events, custom events, and language preferences.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the "Last Updated" date at the top of this policy.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our website.
        </p>
      </article>
    </div>
  );
}
