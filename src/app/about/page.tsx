import { FounderBio } from '@/components/FounderBio';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose prose-invert max-w-none">
        <h1>About Festival Countdown Central</h1>
        <p>
          Welcome to Festival Countdown Central, your ultimate destination for tracking the most anticipated festivals and events from around the world. Our mission is to build excitement and help you never miss a moment of celebration.
        </p>

        <FounderBio />

        <h2>Our Story</h2>
        <p>
          Born from a passion for cultural events and the shared joy of anticipation, Festival Countdown Central was created to be a simple, beautiful, and functional tool for everyone. Whether it's a world-renowned music festival, a traditional cultural celebration, or a personal event you're looking forward to, our platform is here to help you count down every second.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Live Countdowns:</strong> Real-time clocks ticking down to major festivals and holidays.</li>
          <li><strong>Custom Events:</strong> Add your own personal events—birthdays, anniversaries, or private parties—and create your own countdowns.</li>
          <li><strong>Shareable Content:</strong> Share countdowns with friends and family via social media or a direct link. You can even generate a custom image to share!</li>
          <li><strong>Embeddable Widgets:</strong> Add a live countdown widget directly to your own website or blog with a simple copy-paste.</li>
        </ul>
        <p>
          We are constantly working to add new features and improve your experience. Thank you for being a part of our community!
        </p>
      </article>
    </div>
  );
}
