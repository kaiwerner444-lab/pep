import { Link } from 'react-router-dom';
import { Truck, Package, Globe } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Shipping() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-[#f97316]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Shipping <span className="text-[#f97316]">Policy</span>
          </h1>
          <p className="text-white/60">Effective Date: March 1, 2026</p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4.1 Shipping Eligibility</h2>
              <p className="text-white/70 leading-relaxed">
                Pep.Center ships research peptides and materials exclusively to verified customers for legitimate research purposes. We reserve the right to request verification of research credentials or institutional affiliation before processing shipments. Orders may be refused or cancelled if we are unable to verify the intended research use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4.2 Shipping Destinations</h2>
              <p className="text-white/70 leading-relaxed">
                We currently ship within the United States. International shipping availability may vary based on the specific product and the regulations of the destination country. It is the responsibility of the customer to ensure that the importation of research peptides complies with all applicable laws and regulations in the destination jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4.3 Processing and Delivery Times</h2>
              <p className="text-white/70 leading-relaxed">
                Orders are typically processed within 1 to 3 business days. Delivery times vary depending on the shipping method selected at checkout and the delivery destination. Estimated delivery times are provided for reference purposes only and are not guaranteed.
              </p>
              
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Standard Shipping</h3>
                  <p className="text-white/60 text-sm">5-7 business days</p>
                  <p className="text-[#f97316] font-bold mt-2">$15.00</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Express Shipping</h3>
                  <p className="text-white/60 text-sm">2-3 business days</p>
                  <p className="text-[#f97316] font-bold mt-2">$35.00</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Overnight Shipping</h3>
                  <p className="text-white/60 text-sm">Next business day</p>
                  <p className="text-[#f97316] font-bold mt-2">$65.00</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4.4 Packaging and Handling</h2>
              <p className="text-white/70 leading-relaxed">
                All products are packaged in accordance with applicable safety and regulatory standards for the shipment of research chemicals. Products requiring temperature controlled shipping will be packaged appropriately to maintain stability during transit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4.5 Risk of Loss</h2>
              <p className="text-white/70 leading-relaxed">
                Title and risk of loss for all products pass to you upon delivery to the shipping carrier. Pep.Center is not responsible for delays, damage, or loss caused by the shipping carrier after the product has been tendered for shipment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4.6 Shipping Restrictions</h2>
              <p className="text-white/70 leading-relaxed">
                Certain products may be subject to shipping restrictions based on federal, state, or local regulations. Pep.Center reserves the right to refuse shipment of any product to any location where such shipment would violate applicable law. We do not ship to P.O. Boxes for certain products that require signature confirmation.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-400 mb-2">Free Shipping on Subscriptions</h3>
              <p className="text-white/70">
                Starting with your second subscription order, enjoy FREE shipping on all subscription items. Your first subscription order includes 5% off, and from order 2 onward, you get 5% off + FREE shipping. Loyalty tier members (3+ orders) receive 10% off + FREE shipping.
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
