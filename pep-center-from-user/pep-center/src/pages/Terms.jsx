import { Link } from 'react-router-dom';
import { FileText, Scale, AlertTriangle } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-[#f97316]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Terms and <span className="text-[#f97316]">Conditions</span>
          </h1>
          <p className="text-white/60">Effective Date: March 1, 2026</p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            <p className="text-white/70 leading-relaxed">
              Welcome to Pep.Center. These Terms and Conditions ("Terms") govern your access to and use of the Pep.Center website, including any purchases made through the site. By accessing, browsing, or purchasing from Pep.Center, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree with these Terms, you must immediately discontinue use of this website.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.1 Eligibility and Account Requirements</h2>
              <p className="text-white/70 leading-relaxed">
                You must be at least 18 years of age to use this website and purchase products. By using this website, you represent and warrant that you are at least 18 years old. You further represent that you are a qualified researcher, academic institution representative, laboratory professional, or other individual lawfully permitted to purchase and handle research chemicals and peptides in your jurisdiction.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                If you create an account with Pep.Center, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Pep.Center immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.2 Intended Use of Products</h2>
              <p className="text-white/70 leading-relaxed mb-3">
                All products sold by Pep.Center are intended exclusively for legitimate in vitro laboratory research, pre clinical research, and educational purposes. Products are sold as research chemicals and are not drugs, pharmaceuticals, dietary supplements, food products, or cosmetics. By purchasing from Pep.Center, you certify and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>You will use all products solely for lawful research purposes in an appropriate laboratory or research setting.</li>
                <li>You will not use any product for human or animal consumption, therapeutic purposes, diagnostic purposes, or any form of self administration.</li>
                <li>You possess the necessary qualifications, equipment, facilities, and knowledge to safely handle research peptides and chemicals.</li>
                <li>You will comply with all applicable local, state, federal, and international laws and regulations regarding the purchase, handling, storage, and use of research materials.</li>
                <li>You will not resell, redistribute, or transfer any product for purposes other than lawful research.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.3 Product Information and Accuracy</h2>
              <p className="text-white/70 leading-relaxed">
                Pep.Center strives to provide accurate product descriptions, specifications, and imagery. However, we do not warrant that product descriptions, pricing, or any other content on this website is accurate, complete, reliable, current, or error free. Product information is provided for informational and research reference purposes only and does not constitute medical, pharmaceutical, therapeutic, or professional advice of any kind.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                In the event a product is listed at an incorrect price or with incorrect information, Pep.Center reserves the right to refuse or cancel any orders placed for that product, regardless of whether the order has been confirmed or your payment method has been charged.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.4 Pricing, Payment, and Orders</h2>
              <p className="text-white/70 leading-relaxed">
                All prices displayed on the website are in United States Dollars (USD) unless otherwise noted. Pep.Center reserves the right to change prices at any time without prior notice. Payment must be made in full at the time of purchase. We accept the payment methods displayed at checkout.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                Placing an order does not guarantee acceptance. Pep.Center reserves the right to refuse, cancel, or limit any order for any reason, including but not limited to: suspected unauthorized or fraudulent activity, inability to verify customer identity or research purpose, product unavailability, or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.5 Intellectual Property</h2>
              <p className="text-white/70 leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, trademarks, images, product descriptions, software, and underlying code, is the property of Pep.Center or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, display, or create derivative works from any content on this website without prior written consent from Pep.Center.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                2.6 Limitation of Liability
              </h2>
              <p className="text-white/70 leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PEP.CENTER, ITS OWNERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OR INABILITY TO USE THE WEBSITE OR PRODUCTS; (B) ANY UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (C) ANY THIRD PARTY CONDUCT ON THE WEBSITE; (D) ANY PRODUCT MISUSE, WHETHER INTENTIONAL OR UNINTENTIONAL; OR (E) ANY OTHER MATTER RELATING TO THE WEBSITE OR PRODUCTS.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                IN NO EVENT SHALL THE TOTAL LIABILITY OF PEP.CENTER TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED THE AMOUNT PAID BY YOU TO PEP.CENTER FOR THE SPECIFIC PRODUCT(S) GIVING RISE TO THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.7 Indemnification</h2>
              <p className="text-white/70 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Pep.Center, its owners, officers, directors, employees, agents, suppliers, and affiliates from and against any and all claims, demands, actions, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising out of or related to: (a) your use or misuse of any product purchased from Pep.Center; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; (d) your violation of any rights of a third party; or (e) any claim that your use of products caused damage to a third party.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                This indemnification obligation shall survive the termination of these Terms and your use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.8 Disclaimer of Warranties</h2>
              <p className="text-white/70 leading-relaxed">
                ALL PRODUCTS AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON INFRINGEMENT.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                PEP.CENTER DOES NOT WARRANT THAT THE PRODUCTS WILL MEET YOUR SPECIFIC RESEARCH REQUIREMENTS, THAT THE WEBSITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.
              </p>
              <p className="text-white/70 leading-relaxed mt-3">
                Pep.Center provides Certificates of Analysis (COAs) for products where available. While we strive for accuracy in our analytical testing, COAs are provided for informational purposes and do not constitute a guarantee or warranty beyond what is expressly stated therein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.9 Governing Law and Dispute Resolution</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or your use of the website or products shall be resolved exclusively in the state or federal courts located in Santa Clara County, California. You consent to the personal jurisdiction of such courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.10 Severability</h2>
              <p className="text-white/70 leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.11 Modifications to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                Pep.Center reserves the right to update, modify, or replace these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes acceptance of those changes. It is your responsibility to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2.12 Contact Information</h2>
              <p className="text-white/70 leading-relaxed">
                For questions or concerns regarding these Terms, please contact us through the contact information provided on the Pep.Center website.
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
