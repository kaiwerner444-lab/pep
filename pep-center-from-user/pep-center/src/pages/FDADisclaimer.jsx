import { Link } from 'react-router-dom';
import { AlertTriangle, FileText, Scale, Beaker, Shield, Clock } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function FDADisclaimer() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
            <Scale className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Legal Policies, Disclaimers, and Terms
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Last Updated: March 1, 2026
          </p>
        </AnimatedSection>

        {/* Main Content */}
        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12">
            
            {/* Section 1: FDA Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">1. FDA Disclaimer</h2>
              </div>
              
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  The statements made within this website have not been evaluated by the United States Food and Drug Administration (FDA). The products and statements of Pep.Center are not intended to diagnose, treat, cure, or prevent any disease or medical condition. All products offered by Pep.Center are intended strictly for laboratory and in vitro research purposes only. Products are not intended for human consumption, veterinary use, food use, cosmetic use, or any form of bodily introduction into humans or animals.
                </p>
                
                <p>
                  Pep.Center is a chemical and research material supplier. Pep.Center is not a pharmacy, compounding pharmacy, or compounding facility as defined under Section 503A of the Federal Food, Drug, and Cosmetic Act (FD&C Act). Pep.Center is not an outsourcing facility as defined under Section 503B of the FD&C Act. Pep.Center does not manufacture, compound, or dispense medications, drugs, or pharmaceutical preparations of any kind.
                </p>
                
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 my-6">
                  <p className="text-red-400 font-bold">
                    THE PRODUCTS OFFERED ON THIS WEBSITE ARE NOT INTENDED FOR HUMAN OR ANIMAL USE. THEY ARE INTENDED EXCLUSIVELY FOR IN VITRO LABORATORY RESEARCH, PRE CLINICAL RESEARCH, AND EDUCATIONAL PURPOSES ONLY.
                  </p>
                </div>
                
                <p>
                  BY PURCHASING ANY PRODUCT FROM PEP.CENTER, THE CUSTOMER ACKNOWLEDGES AND AGREES THAT THESE PRODUCTS WILL NOT BE USED FOR ANY PURPOSE OTHER THAN LEGITIMATE, LAWFUL RESEARCH CONDUCTED IN ACCORDANCE WITH ALL APPLICABLE LOCAL, STATE, FEDERAL, AND INTERNATIONAL LAWS AND REGULATIONS.
                </p>
                
                <p>
                  THE CUSTOMER ACKNOWLEDGES THAT THERE ARE INHERENT RISKS IN THE HANDLING, USE, STORAGE, AND DISTRIBUTION OF RESEARCH CHEMICALS AND PEPTIDES, AND CERTIFIES THAT IT HAS THE PROPER EQUIPMENT, FACILITIES, TRAINING, AND QUALIFIED PERSONNEL FOR MANAGING THOSE RISKS. THE CUSTOMER KNOWINGLY AND VOLUNTARILY ACCEPTS ALL SUCH RISKS.
                </p>
                
                <p>
                  THESE PRODUCTS SHALL NOT BE USED IN ANY INAPPROPRIATE OR UNAUTHORIZED APPLICATIONS, INCLUDING BUT NOT LIMITED TO: FOOD ADDITIVES, DIETARY SUPPLEMENTS, DRUGS, THERAPEUTICS, COSMETICS, HOUSEHOLD CHEMICALS, AGRICULTURAL PRODUCTS, OR ANY APPLICATION INVOLVING INTRODUCTION INTO HUMANS OR ANIMALS, WHETHER ORALLY, INTRAVENOUSLY, TOPICALLY, SUBCUTANEOUSLY, OR BY ANY OTHER ROUTE OF ADMINISTRATION.
                </p>
                
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 my-6">
                  <p className="text-amber-400/90">
                    IN THE EVENT THAT A CUSTOMER UTILIZES OR CAUSES OTHERS TO UTILIZE THESE PRODUCTS OUTSIDE OF THE ABOVE STATED RESTRICTIONS, THE CUSTOMER ASSUMES ALL RISKS ASSOCIATED WITH SUCH USE, ABSOLVES PEP.CENTER OF ANY AND ALL RESPONSIBILITY FOR SUCH ACTIONS, AND SPECIFICALLY AGREES TO INDEMNIFY, DEFEND, AND HOLD PEP.CENTER, ITS OWNERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES HARMLESS FROM AND AGAINST ANY AND ALL CLAIMS, DAMAGES, LOSSES, LIABILITIES, COSTS, AND EXPENSES (INCLUDING REASONABLE ATTORNEY FEES) ARISING FROM OR RELATED TO SUCH UNAUTHORIZED USE.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Terms and Conditions */}
            <div className="mb-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-[#f97316]" />
                <h2 className="text-2xl font-bold text-white">2. Terms and Conditions of Use</h2>
              </div>
              <p className="text-white/50 text-sm mb-6">Effective Date: March 1, 2026</p>
              
              <p className="text-white/70 leading-relaxed mb-6">
                Welcome to Pep.Center. These Terms and Conditions ("Terms") govern your access to and use of the Pep.Center website, including any purchases made through the site. By accessing, browsing, or purchasing from Pep.Center, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree with these Terms, you must immediately discontinue use of this website.
              </p>

              {/* 2.1 Eligibility */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.1 Eligibility and Account Requirements</h3>
                <div className="space-y-3 text-white/70 leading-relaxed">
                  <p>
                    You must be at least 18 years of age to use this website and purchase products. By using this website, you represent and warrant that you are at least 18 years old. You further represent that you are a qualified researcher, academic institution representative, laboratory professional, or other individual lawfully permitted to purchase and handle research chemicals and peptides in your jurisdiction.
                  </p>
                  <p>
                    If you create an account with Pep.Center, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Pep.Center immediately of any unauthorized use of your account.
                  </p>
                </div>
              </div>

              {/* 2.2 Intended Use */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.2 Intended Use of Products</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  All products sold by Pep.Center are intended exclusively for legitimate in vitro laboratory research, pre clinical research, and educational purposes. Products are sold as research chemicals and are not drugs, pharmaceuticals, dietary supplements, food products, or cosmetics. By purchasing from Pep.Center, you certify and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                  <li>You will use all products solely for lawful research purposes in an appropriate laboratory or research setting.</li>
                  <li>You will not use any product for human or animal consumption, therapeutic purposes, diagnostic purposes, or any form of self administration.</li>
                  <li>You possess the necessary qualifications, equipment, facilities, and knowledge to safely handle research peptides and chemicals.</li>
                  <li>You will comply with all applicable local, state, federal, and international laws and regulations regarding the purchase, handling, storage, and use of research materials.</li>
                  <li>You will not resell, redistribute, or transfer any product for purposes other than lawful research.</li>
                </ul>
              </div>

              {/* 2.3 Product Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.3 Product Information and Accuracy</h3>
                <p className="text-white/70 leading-relaxed">
                  Pep.Center strives to provide accurate product descriptions, specifications, and imagery. However, we do not warrant that product descriptions, pricing, or any other content on this website is accurate, complete, reliable, current, or error free. Product information is provided for informational and research reference purposes only and does not constitute medical, pharmaceutical, therapeutic, or professional advice of any kind.
                </p>
                <p className="text-white/70 leading-relaxed mt-3">
                  In the event a product is listed at an incorrect price or with incorrect information, Pep.Center reserves the right to refuse or cancel any orders placed for that product, regardless of whether the order has been confirmed or your payment method has been charged.
                </p>
              </div>

              {/* 2.4 Pricing and Payment */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.4 Pricing, Payment, and Orders</h3>
                <p className="text-white/70 leading-relaxed">
                  All prices displayed on the website are in United States Dollars (USD) unless otherwise noted. Pep.Center reserves the right to change prices at any time without prior notice. Payment must be made in full at the time of purchase. We accept the payment methods displayed at checkout.
                </p>
                <p className="text-white/70 leading-relaxed mt-3">
                  Placing an order does not guarantee acceptance. Pep.Center reserves the right to refuse, cancel, or limit any order for any reason, including but not limited to: suspected unauthorized or fraudulent activity, inability to verify customer identity or research purpose, product unavailability, or violation of these Terms.
                </p>
              </div>

              {/* 2.5 Intellectual Property */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.5 Intellectual Property</h3>
                <p className="text-white/70 leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, trademarks, images, product descriptions, software, and underlying code, is the property of Pep.Center or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, display, or create derivative works from any content on this website without prior written consent from Pep.Center.
                </p>
              </div>

              {/* 2.6 Limitation of Liability */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.6 Limitation of Liability</h3>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-white/70 leading-relaxed">
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PEP.CENTER, ITS OWNERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mt-3">
                    <li>Your use or inability to use the website or products;</li>
                    <li>Any unauthorized access to or alteration of your transmissions or data;</li>
                    <li>Any third party conduct on the website;</li>
                    <li>Any product misuse, whether intentional or unintentional; or</li>
                    <li>Any other matter relating to the website or products.</li>
                  </ul>
                  <p className="text-white/70 leading-relaxed mt-3">
                    IN NO EVENT SHALL THE TOTAL LIABILITY OF PEP.CENTER TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED THE AMOUNT PAID BY YOU TO PEP.CENTER FOR THE SPECIFIC PRODUCT(S) GIVING RISE TO THE CLAIM.
                  </p>
                </div>
              </div>

              {/* 2.7 Indemnification */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.7 Indemnification</h3>
                <p className="text-white/70 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Pep.Center, its owners, officers, directors, employees, agents, suppliers, and affiliates from and against any and all claims, demands, actions, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising out of or related to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mt-3">
                  <li>Your use or misuse of any product purchased from Pep.Center;</li>
                  <li>Your violation of these Terms;</li>
                  <li>Your violation of any applicable law or regulation;</li>
                  <li>Your violation of any rights of a third party; or</li>
                  <li>Any claim that your use of products caused damage to a third party.</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-3">
                  This indemnification obligation shall survive the termination of these Terms and your use of this website.
                </p>
              </div>

              {/* 2.8 Disclaimer of Warranties */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">2.8 Disclaimer of Warranties</h3>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <p className="text-white/70 leading-relaxed">
                    ALL PRODUCTS AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                  </p>
                  <p className="text-white/70 leading-relaxed mt-3">
                    PEP.CENTER DOES NOT WARRANT THAT: (A) THE WEBSITE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE WEBSITE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (D) THE RESULTS OF USING THE WEBSITE OR PRODUCTS WILL MEET YOUR REQUIREMENTS.
                  </p>
                </div>
              </div>
            </div>

            {/* Federal References */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#f97316]" />
                Federal Law References
              </h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Federal Food, Drug, and Cosmetic Act (FD&C Act) - Section 503A (Compounding Pharmacy)</li>
                <li>• Federal Food, Drug, and Cosmetic Act (FD&C Act) - Section 503B (Outsourcing Facility)</li>
                <li>• 21 U.S.C. § 301 et seq. (Federal Food, Drug, and Cosmetic Act)</li>
                <li>• 21 CFR Part 216 (Pharmacy Compounding)</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#f97316]" />
                Questions or Concerns?
              </h3>
              <p className="text-white/60 text-sm">
                If you have any questions about these Terms and Conditions or our FDA Disclaimer, please contact us at{' '}
                <a href="mailto:support@pep.center" className="text-[#f97316] hover:underline">
                  support@pep.center
                </a>
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Back Link */}
        <AnimatedSection animation="fadeUp" delay={200} className="text-center mt-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#f97316] text-white rounded-xl font-medium hover:bg-[#ea580c] transition-colors"
          >
            Return to Store
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
