import { Link } from 'react-router-dom';
import { RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Refund() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mx-auto mb-6">
            <RefreshCcw className="w-10 h-10 text-[#f97316]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Return & <span className="text-[#f97316]">Refund Policy</span>
          </h1>
          <p className="text-white/60">Effective Date: March 1, 2026</p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            <section className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <h2 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                5.1 General Return Policy
              </h2>
              <p className="text-white/70 leading-relaxed">
                Due to the nature of research chemicals and peptides and to maintain product integrity and safety, <strong className="text-white">all sales are generally considered final</strong>. Pep.Center cannot accept returns of opened, used, or compromised products, as we cannot verify that returned research materials have been stored or handled in accordance with required conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5.2 Defective or Incorrect Products</h2>
              <p className="text-white/70 leading-relaxed">
                If you receive a product that is defective, damaged during shipping, or incorrect (not matching your order), please contact us within <strong className="text-white">7 days of receipt</strong>. We will work with you to resolve the issue through replacement or refund at our discretion.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                You may be required to provide photographic evidence of the defect or damage and to return the product in its original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5.3 Quality Concerns</h2>
              <p className="text-white/70 leading-relaxed">
                If you have concerns about the quality or purity of a product, please contact us within <strong className="text-white">7 days of receipt</strong>. We take quality seriously and will review your concern.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                We may request that you provide supporting documentation or analytical data to substantiate your claim. Resolution may include replacement, store credit, or refund at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5.4 Cancellations</h2>
              <p className="text-white/70 leading-relaxed">
                Orders may be cancelled before they have been shipped by contacting our customer support team. Once an order has been shipped, it cannot be cancelled and the standard return policy applies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5.5 Refund Processing</h2>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/70 leading-relaxed">
                  Approved refunds will be processed using the original payment method within <strong className="text-white">7 to 14 business days</strong>.
                </p>
                <p className="text-white/70 leading-relaxed mt-3">
                  Shipping costs are <strong className="text-white">non-refundable</strong> unless the return is due to an error on our part or a defective product.
                </p>
              </div>
            </section>

            <section className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Subscription Cancellations
              </h3>
              <p className="text-white/70">
                You may cancel your subscription at any time. However, please note that canceling before completing 3 subscription orders means you forfeit the subscription pricing tier and any accumulated loyalty benefits. Future orders will be charged at standard retail prices.
              </p>
            </section>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={200} className="text-center mt-12">
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-[#f97316] text-white rounded-xl font-medium hover:bg-[#ea580c] transition-colors">
            Return to Store
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
