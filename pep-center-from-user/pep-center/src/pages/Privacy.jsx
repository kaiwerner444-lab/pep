import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm text-scientific-orange hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
            <p>We collect information you provide directly to us, including name, email address, shipping address, billing information, and order history. We also collect technical data such as IP address and browser information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
            <p>We use your information to process orders, communicate about purchases, improve our services, and comply with legal obligations. We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:research@pep.center" className="text-scientific-orange hover:underline">research@pep.center</a> to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>For privacy-related inquiries, contact <a href="mailto:research@pep.center" className="text-scientific-orange hover:underline">research@pep.center</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
