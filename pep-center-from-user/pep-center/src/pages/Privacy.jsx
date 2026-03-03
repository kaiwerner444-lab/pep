import { Link } from 'react-router-dom';
import { Shield, Lock, Eye } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-[#f97316]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Privacy <span className="text-[#f97316]">Policy</span>
          </h1>
          <p className="text-white/60">Effective Date: March 1, 2026</p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            <p className="text-white/70 leading-relaxed">
              Pep.Center ("we," "us," "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website and make purchases.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.1 Information We Collect</h2>
              <div className="space-y-3 text-white/70">
                <p><strong className="text-white">Personal Information:</strong> When you create an account, place an order, or contact us, we may collect your name, email address, phone number, billing address, shipping address, and payment information.</p>
                <p><strong className="text-white">Order Information:</strong> We collect details about your purchases, including products ordered, order dates, shipping information, and transaction history.</p>
                <p><strong className="text-white">Automatically Collected Information:</strong> When you visit our website, we may automatically collect certain information, including your IP address, browser type, operating system, referring URLs, pages viewed, access times, and clickstream data through cookies and similar tracking technologies.</p>
                <p><strong className="text-white">Research Verification Information:</strong> We may collect information related to your research credentials, institutional affiliation, or intended research purpose to verify that products are being purchased for legitimate research use.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.2 How We Use Your Information</h2>
              <p className="text-white/70 mb-3">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Processing and fulfilling your orders</li>
                <li>Communicating with you about your orders, account, and inquiries</li>
                <li>Verifying the legitimacy of purchases and intended research use</li>
                <li>Improving our website, products, and customer experience</li>
                <li>Complying with legal obligations and regulatory requirements</li>
                <li>Preventing fraud and unauthorized transactions</li>
                <li>Sending promotional communications (only with your consent, and you may opt out at any time)</li>
                <li>Maintaining records as required by applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.3 How We Share Your Information</h2>
              <p className="text-white/70 mb-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Payment processors and financial institutions to process transactions</li>
                <li>Shipping carriers to deliver your orders</li>
                <li>Service providers who assist with website operations, analytics, and customer support</li>
                <li>Law enforcement or regulatory authorities when required by law, subpoena, or court order</li>
                <li>Professional advisors including attorneys, accountants, and auditors as needed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.4 Data Security</h2>
              <p className="text-white/70">
                We implement reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.5 Cookies and Tracking Technologies</h2>
              <p className="text-white/70">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand how visitors interact with our website. You may configure your browser to reject cookies, but doing so may limit certain functionality of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.6 Third Party Links</h2>
              <p className="text-white/70">
                Our website may contain links to third party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third party websites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.7 Your Rights</h2>
              <p className="text-white/70">
                Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, delete, or port your data, or to opt out of certain processing activities. California residents may have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). To exercise any of these rights, please contact us using the information provided on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.8 Data Retention</h2>
              <p className="text-white/70">
                We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Transaction records may be retained for a minimum period as required by applicable tax and business regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.9 Children's Privacy</h2>
              <p className="text-white/70">
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3.10 Changes to This Privacy Policy</h2>
              <p className="text-white/70">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the website after changes are posted constitutes acceptance of the revised Privacy Policy.
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
