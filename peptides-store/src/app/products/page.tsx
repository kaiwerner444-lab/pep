"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Shield, 
  Check, 
  FileText, 
  ChevronRight,
  Search,
  Menu,
  FlaskConical,
  Home,
  Package,
  User
} from "lucide-react";
import { useState } from "react";
import { allProducts } from "@/lib/products";

const categories = [
  { name: "All", count: 34 },
  { name: "Peptides", count: 18 },
  { name: "Blends", count: 4 },
  { name: "GLP-1", count: 3 },
  { name: "Chemicals", count: 9 },
  { name: "Lab Supplies", count: 2 },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || 
                           (activeCategory === "Chemicals" && product.category === "Research Chemicals") ||
                           product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] pb-24">
      {/* Header */}
      <header className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">pep.center</span>
          </Link>

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
            <Link href="/" className="block py-3 text-lg text-white border-b border-[#2a303c]">
              Home
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
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">All Products</h1>
            <p className="text-gray-400">{filteredProducts.length} research compounds available</p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-12 pr-4 py-4"
            />
          </div>

          {/* Categories */}
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
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="card card-hover p-4">
                  <div className="aspect-square bg-[#111318] rounded-xl mb-4 flex items-center justify-center relative">
                    <Image
                      src={product.image || "/vial-3d.svg"}
                      alt={product.name}
                      width={70}
                      height={100}
                      className="object-contain"
                    />
                    {product.onSale && (
                      <span className="absolute top-2 right-2 badge">Sale</span>
                    )}
                    {product.outOfStock && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full">
                        OOS
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-[#f97316] font-medium mb-1">{product.category}</p>
                  <h3 className="font-semibold text-white text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-white">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-600 line-through">${product.originalPrice}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="card p-8 text-center">
              <p className="text-gray-400 mb-4">No products found</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
                className="text-[#f97316] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="nav-item flex flex-col items-center gap-1">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/products" className="nav-item active flex flex-col items-center gap-1">
            <Package className="w-6 h-6" />
            <span className="text-xs">Shop</span>
          </Link>
          <Link href="#" className="nav-item flex flex-col items-center gap-1">
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
