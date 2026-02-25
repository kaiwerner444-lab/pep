"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, FlaskConical, Zap } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'glass border-b border-orange-500/20' : 'bg-transparent'}`} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 glow-orange">
              <FlaskConical className="w-7 h-7 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text tracking-tight">PeptideLabs</span>
              <span className="text-[10px] text-orange-400/70 uppercase tracking-[0.2em]">Premium Research</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-gray-300 hover:text-white transition-colors text-sm font-medium group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-3 text-gray-300 hover:text-white transition-all hover:scale-110 group">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-lg">
                0
              </span>
              <span className="absolute inset-0 rounded-xl bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-orange-500/20 mt-3">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
