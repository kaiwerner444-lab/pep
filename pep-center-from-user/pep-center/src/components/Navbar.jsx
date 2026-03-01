import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';
import { Lock, Shield } from 'lucide-react';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Trust Bar - Hidden on mobile, visible on sm+ */}
      <div className="hidden sm:block fixed top-0 left-0 right-0 z-[51] bg-[#0a0e17]/90 backdrop-blur-sm border-b border-white/5 py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 text-[10px] sm:text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#f97316]" />
              HPLC Verified Products
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#f97316]" />
              Secure SSL Checkout
            </span>
            <span className="hidden md:inline">Discrete Shipping Worldwide</span>
          </div>
        </div>
      </div>

      <nav className="fixed top-0 sm:top-7 left-0 right-0 z-50 bg-[#0a0e17]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#f97316]/20 border border-[#f97316]/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.453 15h11.094" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#f97316] to-[#fb923c] bg-clip-text text-transparent">PEP</span>
                <span className="text-white/60">.CENTER</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className={`text-sm transition-colors ${isActive('/') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Home</Link>
              <Link to="/products" className={`text-sm transition-colors ${isActive('/products') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Products</Link>
              <Link to="/bundles" className={`text-sm transition-colors ${isActive('/bundles') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Bundles</Link>
              <Link to="/blog" className={`text-sm transition-colors ${isActive('/blog') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Blog</Link>
              <Link to="/contact" className={`text-sm transition-colors ${isActive('/contact') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Contact</Link>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
                <span className="text-sm">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-scientific-orange text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-navy-secondary/95 backdrop-blur-xl">
            <div className="px-4 py-4 flex flex-col gap-3">
              <Link to="/" onClick={() => setMobileOpen(false)} className={`text-sm py-2 ${isActive('/') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Home</Link>
              <Link to="/products" onClick={() => setMobileOpen(false)} className={`text-sm py-2 ${isActive('/products') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Products</Link>
              <Link to="/bundles" onClick={() => setMobileOpen(false)} className={`text-sm py-2 ${isActive('/bundles') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Bundles</Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className={`text-sm py-2 ${isActive('/blog') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Blog</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className={`text-sm py-2 ${isActive('/contact') ? 'text-[#f97316] font-medium' : 'text-white/70 hover:text-white'}`}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
      <CartSidebar />
    </>
  );
}
