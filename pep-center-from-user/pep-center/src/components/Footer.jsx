import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-scientific-orange/20 border border-scientific-orange/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-scientific-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                </svg>
              </div>
              <span className="text-lg font-bold">
                <span className="text-gradient">PEP</span>
                <span className="text-white/60">.CENTER</span>
              </span>
            </div>
            <p className="text-sm text-white/40">
              Made with precision for researchers worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Products</h4>
            <div className="flex flex-col gap-2">
              <a href="/#products" className="text-sm text-white/40 hover:text-white/70 transition-colors">Growth Factors</a>
              <a href="/#products" className="text-sm text-white/40 hover:text-white/70 transition-colors">Healing Peptides</a>
              <a href="/#products" className="text-sm text-white/40 hover:text-white/70 transition-colors">Cosmetic Peptides</a>
              <a href="/#products" className="text-sm text-white/40 hover:text-white/70 transition-colors">Research Peptides</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <div className="flex flex-col gap-2">
              <a href="/#blog" className="text-sm text-white/40 hover:text-white/70 transition-colors">Blog</a>
              <a href="/#contact" className="text-sm text-white/40 hover:text-white/70 transition-colors">Contact Us</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/terms" className="text-sm text-white/40 hover:text-white/70 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link to="/shipping" className="text-sm text-white/40 hover:text-white/70 transition-colors">Shipping Policy</Link>
              <Link to="/refund" className="text-sm text-white/40 hover:text-white/70 transition-colors">Refund Policy</Link>
              <Link to="/fda-disclaimer" className="text-sm text-white/40 hover:text-white/70 transition-colors">FDA Disclaimer</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            For research purposes only. Not for human or animal consumption.
          </p>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} pep.center. All rights reserved.
          </p>
        </div>
      </div>

      {/* FDA Disclaimer Section */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-amber-400 mb-2">FDA DISCLAIMER & RESEARCH USE POLICY</h3>
            <p className="text-xs text-white/40">Please read before purchasing</p>
          </div>
          
          <div className="text-xs text-white/30 leading-relaxed space-y-4 max-w-5xl mx-auto">
            <p>
              <strong className="text-white/50">The statements made within this website have not been evaluated by the US Food and Drug Administration.</strong> The statements and the products of this company are not intended to diagnose, treat, cure or prevent any disease. All products are for laboratory developmental research USE ONLY. Products are not for human consumption.
            </p>
            
            <p>
              <strong className="text-white/50">PEP.CENTER is a chemical supplier.</strong> PEP.CENTER is not a compounding pharmacy or chemical compounding facility as defined under 503A of the Federal Food, Drug, and Cosmetic Act. PEP.CENTER is not an outsourcing facility as defined under 503B of the Federal Food, Drug, and Cosmetic Act.
            </p>
            
            <p className="text-amber-400/70">
              <strong>THE PRODUCTS WE OFFER ARE NOT INTENDED FOR HUMAN USE. THEY ARE INTENDED FOR IN-VITRO AND PRE-CLINICAL RESEARCH PURPOSES ONLY.</strong>
            </p>
            
            <p>
              THE CUSTOMER ACKNOWLEDGES THAT THERE ARE RISKS IN THE HANDLING, USE, AND DISTRIBUTION OF THESE PRODUCTS, AND CERTIFIES THAT IT HAS THE PROPER EQUIPMENT, FACILITIES, AND PERSONNEL FOR MANAGING THOSE RISKS; AND THE CUSTOMER KNOWINGLY ACCEPTS THESE RISKS. THESE CHEMICALS ARE NOT INTENDED TO BE USED AND SHOULD NOT BE USED IN INAPPROPRIATE APPLICATIONS, SUCH AS, WITHOUT LIMITATION, FOOD ADDITIVES, DRUGS, COSMETICS, HOUSEHOLD CHEMICALS, OR OTHER APPLICATIONS OUTSIDE OF IN-VITRO LABORATORY RESEARCH, PRE-CLINICAL RESEARCH, OR IN LABORATORY CHEMICAL SYNTHESIS OR TESTING OF DIFFERENT MATERIALS.
            </p>
            
            <p>
              SELLER IS AWARE THAT IN PURCHASING THESE PRODUCTS, CUSTOMER IS AGREEING TO THE ABOVE. HOWEVER, IN THE EVENT THAT CUSTOMER UTILIZES OR CAUSES OTHERS TO USE THESE PRODUCTS OUTSIDE OF THE ABOVE RESTRICTIONS, CUSTOMER IS ACCEPTING SUCH RISKS OF DOING SO ON ITSELF, ABSOLVING SELLER OF ANY RESPONSIBILITY FOR SUCH CUSTOMER ACTIONS, AND SPECIFICALLY AGREES TO INDEMNIFY AND HOLD SELLER HARMLESS FOR ANY CLAIMS MADE BY ANY THIRD PARTY BECAUSE OF SUCH CUSTOMER ACTION.
            </p>
            
            <div className="pt-4 text-center">
              <Link to="/fda-disclaimer" className="text-xs text-[#f97316] hover:text-[#fb923c] transition-colors underline">
                Read Full FDA Disclaimer and Research Use Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
