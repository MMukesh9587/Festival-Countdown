export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose prose-invert max-w-none">
        <h1>Terms and Conditions</h1>
        <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

        <p>
          Please read these Terms and Conditions ("Terms") carefully before using the Festival Countdown Central website (the "Service").
        </p>

        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>

        <h2>Content</h2>
        <p>
          Our Service allows you to create and store custom event information ("User Content"). You are responsible for the User Content that you create, including its legality, reliability, and appropriateness. All User Content is stored locally on your device and is not uploaded to our servers.
        </p>

        <h2>Use of Service</h2>
        <p>
          You agree not to use the Service:
        </p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
          <li>To create any content that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Festival Countdown Central and its licensors.
        </p>
        
        <h2>Disclaimer</h2>
        <p>
          The information provided by the Service is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us.
        </p>
      </article>
    </div>
  );
}
