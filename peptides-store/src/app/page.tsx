"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingCart, 
  Menu, 
  FlaskConical, 
  Search,
  ArrowRight,
  Shield,
  Truck,
  Clock,
  ChevronRight,
  Home as HomeIcon,
  Package,
  User
} from "lucide-react";
import { useState } from "react";

const featuredProducts = [
  { id: 1, name: "BPC-157", subtitle: "5mg Vial", price: 35, category: "Healing", popular: true },
  { id: 2, name: "TB-500", subtitle: "5mg Vial", price: 35, category: "Recovery", popular: true },
  { id: 3, name: "GHK-CU", subtitle: "50mg Vial", price: 48, category: "Anti-Aging", popular: false },
  { id: 4, name: "GLP-1 SM", subtitle: "10mg Vial", price: 128, category: "Metabolic", popular: false },
];

const categories = [
  { name: "All", count: 34 },
  { name: "Peptides", count: 18 },
  { name: "Blends", count: 4 },
  { name: "GLP-1", count: 3 },
  { name: "Chemicals", count: 9 },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] pb-24">
      {/* Header */}
      <header className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">pep.center</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="icon-btn relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f97316] rounded-full text-xs font-bold flex items-center justify-center">
                0
              </span>
            </button>
            <button 
              className="icon-btn md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0c10] pt-20 px-4 md:hidden">
          <nav className="space-y-4">
            <Link href="/products" className="block py-3 text-lg text-white border-b border-[#2a303c]">
              Products
            </Link>
            <Link href="/about" className="block py-3 text-lg text-white border-b border-[#2a303c]">
              About
            </Link>
            <Link href="/contact" className="block py-3 text-lg text-white border-b border-[#2a303c]">
              Contact
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Card */}
          <div className="card p-6 mb-6 text-center">
            <div className="w-16 h-16 bg-[#f97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#f97316]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Premium Research Peptides
            </h1>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Lab-verified purity, worldwide shipping. Trusted by 50,000+ researchers.
            </p>
            <Link 
              href="/products"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 w-full max-w-sm"
            >
              Browse Catalog
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Search products..."
              className="input-field w-full pl-12 pr-4 py-4"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.name
                    ? "bg-[#f97316] text-white"
                    : "bg-[#161922] text-gray-400 border border-[#2a303c] hover:border-[#f97316]"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Featured Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Featured</h2>
            <Link href="/products" className="text-sm text-[#f97316] flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="card card-hover p-4">
                  {/* Product Image */}
                  <div className="aspect-square bg-[#111318] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/vial-3d.svg"
                      alt={product.name}
                      width={80}
                      height={120}
                      className="object-contain"
                    />
                    {product.popular && (
                      <span className="absolute top-2 right-2 badge">Popular</span>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <p className="text-xs text-[#f97316] font-medium mb-1">{product.category}</p>
                  <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.subtitle}</p>
                  <p className="text-lg font-bold text-white">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: "99.9%", label: "Purity" },
              { value: "34+", label: "Products" },
              { value: "24h", label: "Shipping" },
            ].map((stat, i) => (
              <div key={i} className="card p-4 text-center">
                <p className="text-2xl font-bold text-[#f97316]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              { icon: Shield, title: "Lab Verified", desc: "HPLC tested every batch" },
              { icon: Truck, title: "Fast Shipping", desc: "Discreet worldwide delivery" },
              { icon: Clock, title: "24h Dispatch", desc: "Same day processing" },
            ].map((feature, i) => (
              <div key={i} className="card p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-[#f97316]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FlaskConical className="w-6 h-6 text-[#f97316]" />
              <span className="text-xl font-bold text-white">pep.center</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Premium research peptides for scientific applications. 
              Lab-verified purity, worldwide shipping.
            </p>
            <p className="text-xs text-gray-600">
              For research purposes only. Not for human or animal consumption.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="nav-item active flex flex-col items-center gap-1">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/products" className="nav-item flex flex-col items-center gap-1">
            <Package className="w-6 h-6" />
            <span className="text-xs">Shop</span>
          </Link>
          <Link href="/account" className="nav-item flex flex-col items-center gap-1">
            <User className="w-6 h-6" />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 text-center hidden md:block">
        <p className="text-gray-600 text-sm">
          © 2026 pep.center — For research purposes only
        </p>
      </footer>
    </div>
  );
}
