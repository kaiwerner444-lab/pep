import { Link } from 'react-router-dom';
import { AlertTriangle, FileText, Scale, Beaker } from 'lucide-react';
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
            FDA Disclaimer & <span className="text-[#f97316]">Research Use Policy</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Important legal information regarding the purchase and use of research peptides
          </p>
        </AnimatedSection>

        {/* Main Content */}
        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12">
            {/* FDA Notice */}
            <div className="mb-10 p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-amber-400 mb-3">
                    Food and Drug Administration Notice
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    The statements made within this website have not been evaluated by the US Food and Drug Administration. 
                    The statements and the products of this company are not intended to diagnose, treat, cure or prevent any disease.
                  </p>
                </div>
              </div>
            </div>

            {/* Research Use Only */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Beaker className="w-6 h-6 text-[#f97316]" />
                <h2 className="text-2xl font-bold text-white">Research Use Only</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 leading-relaxed mb-4">
                  All products are for <strong className="text-[#f97316]">laboratory developmental research USE ONLY</strong>. 
                  Products are <strong className="text-red-400">NOT for human consumption</strong>.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  PEP.CENTER is a chemical supplier. PEP.CENTER is <strong>not</strong> a compounding pharmacy or 
                  chemical compounding facility as defined under <strong>503A</strong> of the Federal Food, Drug, and Cosmetic Act. 
                  PEP.CENTER is <strong>not</strong> an outsourcing facility as defined under <strong>503B</strong> of the 
                  Federal Food, Drug, and Cosmetic Act.
                </p>
              </div>
            </div>

            {/* Intended Use */}
            <div className="mb-10 p-6 rounded-xl bg-red-500/10 border border-red-500/30">
              <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                NOT INTENDED FOR HUMAN USE
              </h2>
              <p className="text-white/70 leading-relaxed">
                THE PRODUCTS WE OFFER ARE <strong className="text-red-400">NOT INTENDED FOR HUMAN USE</strong>. 
                THEY ARE INTENDED FOR <strong className="text-[#f97316]">IN-VITRO AND PRE-CLINICAL RESEARCH PURPOSES ONLY</strong>.
              </p>
            </div>

            {/* Customer Acknowledgment */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-[#f97316]" />
                <h2 className="text-2xl font-bold text-white">Customer Acknowledgment</h2>
              </div>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  THE CUSTOMER ACKNOWLEDGES THAT THERE ARE RISKS IN THE HANDLING, USE, AND DISTRIBUTION 
                  OF THESE PRODUCTS, AND CERTIFIES THAT IT HAS THE PROPER EQUIPMENT, FACILITIES, AND 
                  PERSONNEL FOR MANAGING THOSE RISKS; AND THE CUSTOMER KNOWINGLY ACCEPTS THESE RISKS.
                </p>
                <p>
                  THESE CHEMICALS ARE NOT INTENDED TO BE USED AND SHOULD NOT BE USED IN INAPPROPRIATE 
                  APPLICATIONS, SUCH AS, WITHOUT LIMITATION, FOOD ADDITIVES, DRUGS, COSMETICS, HOUSEHOLD 
                  CHEMICALS, OR OTHER APPLICATIONS OUTSIDE OF IN-VITRO LABORATORY RESEARCH, PRE-CLINICAL 
                  RESEARCH, OR IN LABORATORY CHEMICAL SYNTHESIS OR TESTING OF DIFFERENT MATERIALS.
                </p>
              </div>
            </div>

            {/* Legal Agreement */}
            <div className="mb-10 p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Legal Agreement & Indemnification</h2>
              <p className="text-white/70 leading-relaxed">
                SELLER IS AWARE THAT IN PURCHASING THESE PRODUCTS, CUSTOMER IS AGREEING TO THE ABOVE. 
                HOWEVER, IN THE EVENT THAT CUSTOMER UTILIZES OR CAUSES OTHERS TO USE THESE PRODUCTS 
                OUTSIDE OF THE ABOVE RESTRICTIONS, CUSTOMER IS ACCEPTING SUCH RISKS OF DOING SO ON 
                ITSELF, <strong className="text-white">ABSOLVING SELLER OF ANY RESPONSIBILITY</strong> FOR SUCH CUSTOMER ACTIONS, 
                AND SPECIFICALLY AGREES TO <strong className="text-white">INDEMNIFY AND HOLD SELLER HARMLESS</strong> FOR ANY 
                CLAIMS MADE BY ANY THIRD PARTY BECAUSE OF SUCH CUSTOMER ACTION.
              </p>
            </div>

            {/* Federal References */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Federal Law References</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Federal Food, Drug, and Cosmetic Act - Section 503A (Compounding Pharmacy)</li>
                <li>• Federal Food, Drug, and Cosmetic Act - Section 503B (Outsourcing Facility)</li>
                <li>• 21 U.S.C. § 301 et seq. (Federal Food, Drug, and Cosmetic Act)</li>
              </ul>
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
