import { Link } from 'react-router-dom';

export default function Refund() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm text-scientific-orange hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Returns</h2>
            <p>Due to the nature of research compounds, all sales are final. We do not accept returns for products that have left our facility to ensure the integrity and safety of our research materials.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Order Cancellation</h2>
            <p>Orders may be cancelled within 2 hours of placement if they have not yet been processed. Contact <a href="mailto:research@pep.center" className="text-scientific-orange hover:underline">research@pep.center</a> immediately to request cancellation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Refund Processing</h2>
            <p>Approved refunds will be processed to the original payment method within 5-10 business days. The time for funds to appear in your account depends on your financial institution.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Disputes</h2>
            <p>We encourage customers to contact us directly to resolve any issues before initiating chargebacks or disputes. We are committed to customer satisfaction within the constraints of research compound sales.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>For refund-related inquiries, contact <a href="mailto:research@pep.center" className="text-scientific-orange hover:underline">research@pep.center</a> with your order number.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
