import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a961] via-[#b87333] to-[#8b5a2b] flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold text-white">
                Peptide<span className="gradient-text">Labs</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Premium research peptides for scientific advancement. 
              All products are strictly for research purposes only.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Navigation</h3>
            <ul className="space-y-3">
              {["Products", "About", "Contact", "Shipping"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Mail className="w-4 h-4 text-[#b87333]" />
                <span>support@peptidelabs.com</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Phone className="w-4 h-4 text-[#b87333]" />
                <span>1-800-PEPTIDE</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <MapPin className="w-4 h-4 text-[#b87333]" />
                <span>Research District, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            © 2025 PeptideLabs. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            For research purposes only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  );
}
