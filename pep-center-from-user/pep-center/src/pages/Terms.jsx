import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm text-scientific-orange hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Eligibility</h2>
            <p>You must be at least 18 years old to purchase products from pep.center. You represent that you have the necessary qualifications and authorization to conduct research with the products you purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Product Use</h2>
            <p>All products sold by pep.center are intended for laboratory research use only. Products are not intended for human or animal consumption, diagnostic purposes, or any clinical applications.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Product Information</h2>
            <p>Product descriptions, specifications, and purity statements are provided for informational purposes. While we strive for accuracy, pep.center makes no warranties regarding the completeness or reliability of product information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
            <p>pep.center shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our products or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>For questions regarding these Terms, contact <a href="mailto:research@pep.center" className="text-scientific-orange hover:underline">research@pep.center</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
