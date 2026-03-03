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
              Premium research peptides for laboratory applications.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Products</h4>
            <div className="flex flex-col gap-2">
              <Link to="/products" className="text-sm text-white/40 hover:text-white/70 transition-colors">All Products</Link>
              <Link to="/products?category=growth" className="text-sm text-white/40 hover:text-white/70 transition-colors">Growth Factors</Link>
              <Link to="/products?category=healing" className="text-sm text-white/40 hover:text-white/70 transition-colors">Healing Peptides</Link>
              <Link to="/products?category=cosmetic" className="text-sm text-white/40 hover:text-white/70 transition-colors">Cosmetic Peptides</Link>
              <Link to="/products?category=research" className="text-sm text-white/40 hover:text-white/70 transition-colors">Research Peptides</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link to="/blog" className="text-sm text-white/40 hover:text-white/70 transition-colors">Research Blog</Link>
              <Link to="/contact" className="text-sm text-white/40 hover:text-white/70 transition-colors">Contact Us</Link>
              <Link to="/bundles" className="text-sm text-white/40 hover:text-white/70 transition-colors">Research Bundles</Link>
              <Link to="/faq" className="text-sm text-white/40 hover:text-white/70 transition-colors">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/terms" className="text-sm text-white/40 hover:text-white/70 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link to="/shipping" className="text-sm text-white/40 hover:text-white/70 transition-colors">Shipping Policy</Link>
              <Link to="/refund" className="text-sm text-white/40 hover:text-white/70 transition-colors">Return Policy</Link>
              <Link to="/fda-disclaimer" className="text-sm text-white/40 hover:text-white/70 transition-colors">Legal Disclaimer</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            Laboratory research materials only. Not for human consumption.
          </p>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} pep.center. All rights reserved.
          </p>
        </div>
      </div>

      {/* Research Use Notice */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-4">
            <h3 className="text-xs font-semibold text-amber-400 mb-1">RESEARCH USE NOTICE</h3>
          </div>
          
          <div className="text-xs text-white/30 leading-relaxed max-w-4xl mx-auto text-center">
            <p>
              All materials offered are intended solely for laboratory research and educational purposes. 
              These products are chemical research materials and are not intended for human or veterinary use. 
              By accessing this website, you acknowledge that you are a qualified researcher or laboratory professional 
              and will use these materials in accordance with applicable laws and regulations.
            </p>
            <p className="mt-3">
              Pep.Center operates as a research chemical supplier and does not manufacture pharmaceutical products. 
              Please review our <Link to="/terms" className="text-[#f97316] hover:underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-[#f97316] hover:underline">Privacy Policy</Link> for complete details.
            </p>
            <div className="mt-4">
              <Link to="/fda-disclaimer" className="text-xs text-[#f97316] hover:text-[#fb923c] transition-colors underline">
                View Complete Legal Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
