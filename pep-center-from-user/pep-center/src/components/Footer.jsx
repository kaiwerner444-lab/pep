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
    </footer>
  );
}
