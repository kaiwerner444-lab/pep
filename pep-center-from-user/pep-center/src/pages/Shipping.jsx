import { Link } from 'react-router-dom';

export default function Shipping() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm text-scientific-orange hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Processing Time</h2>
            <p>Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Shipping Options</h2>
            <p>Choose from multiple shipping options including overnight express delivery.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Standard Shipping: 5-10 business days (Free on orders over $100)</li>
              <li>Express Shipping: 2-3 business days</li>
              <li>Overnight Express: Next business day</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">International Shipping</h2>
            <p>We ship to over 100 countries worldwide. International orders may be subject to customs fees, import duties, and taxes which are the responsibility of the recipient.</p>
            <p>Some jurisdictions may have restrictions on the import of research compounds. It is the customer's responsibility to ensure compliance with local regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Packaging</h2>
            <p>All orders are shipped in secure, discreet packaging to protect your privacy. Research compounds are packaged to maintain stability during transit.</p>
            <p>We ensure your peptides arrive in perfect condition with our specialized cold-chain shipping and temperature-controlled packaging.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Tracking</h2>
            <p>Tracking information will be provided via email once your order ships. Please allow 24-48 hours for tracking information to update.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Lost or Damaged Packages</h2>
            <p>If your package is lost or damaged during shipping, contact us within 7 days of the expected delivery date. We will work with the carrier to resolve the issue.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>For shipping inquiries, contact <a href="mailto:research@pep.center" className="text-scientific-orange hover:underline">research@pep.center</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
