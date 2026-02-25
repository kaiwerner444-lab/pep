"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const allProducts = [
  { id: 1, name: "5% RU-58841", description: "Research compound - 5% solution", price: 45.00, category: "General Research", image: "/vial.jpg" },
  { id: 2, name: "Acetic Acid 0.6% Solution 10ML", description: "Reconstitution solution", price: 10.00, category: "Lab Supplies", image: "/vial.jpg" },
  { id: 3, name: "Amino Tadalafil", description: "Research compound", price: 54.00, category: "General Research", image: "/vial.jpg" },
  { id: 4, name: "AOD-9604 5MG", description: "Research peptide - 5mg vial", price: 50.00, category: "Metabolic Research", image: "/vial.jpg" },
  { id: 5, name: "BAC Water", description: "Bacteriostatic water - 10ml/30ml", price: 12.00, category: "Lab Supplies", image: "/vial.jpg" },
  { id: 6, name: "BPC-157", description: "Body Protection Compound - 5mg/10mg", price: 35.00, category: "Tissue Research", image: "/vial.jpg" },
  { id: 7, name: "BPC-157/TB-500 Blend", description: "Research blend", price: 75.00, category: "Research Bundles", image: "/vial.jpg" },
  { id: 8, name: "CJC-1295 NO DAC 5MG & Ipamorelin 5MG", description: "Research combo", price: 75.00, category: "Secretagogue Research", image: "/vial.jpg" },
  { id: 9, name: "DSIP 5MG", description: "Delta Sleep Inducing Peptide", price: 35.00, category: "Neuropeptide Research", image: "/vial.jpg" },
  { id: 10, name: "Enclomiphene", description: "Selective estrogen receptor modulator", price: 75.00, category: "General Research", image: "/vial.jpg" },
  { id: 11, name: "GHK-CU", description: "Copper peptide - 50mg/100mg", price: 48.00, category: "Copper Peptides", image: "/vial.jpg" },
  { id: 12, name: "GLP-1 SM 10MG", description: "Semaglutide analog - 10mg", price: 128.00, category: "Glucagon Analogs", image: "/vial.jpg" },
  { id: 13, name: "GLP-2 TZ", description: "Tirzepatide analog - 5mg/10mg", price: 100.00, category: "Glucagon Analogs", image: "/vial.jpg" },
  { id: 14, name: "GLP-3 RT", description: "Retatrutide analog - 5mg/10mg/20mg", price: 75.00, category: "Glucagon Analogs", image: "/vial.jpg" },
  { id: 15, name: "Glutathione 600MG", description: "Antioxidant peptide", price: 54.00, category: "Antioxidants", image: "/vial.jpg" },
  { id: 16, name: "Glow (GHK-CU, TB-500, BPC-157)", description: "Research blend", price: 115.00, category: "Research Bundles", image: "/vial.jpg" },
  { id: 17, name: "HCG 5000iu", description: "Human Chorionic Gonadotropin", price: 40.00, category: "General Research", image: "/vial.jpg" },
  { id: 18, name: "IGF-1 LR3 1MG", description: "Insulin-like Growth Factor", price: 75.00, category: "Secretagogue Research", image: "/vial.jpg" },
  { id: 19, name: "KISSPEPTIN 10MG", description: "Reproductive hormone peptide", price: 60.00, category: "General Research", image: "/vial.jpg" },
  { id: 20, name: "KLOW (GHK-CU, TB-500, BPC-157, KPV)", description: "Research blend", price: 140.00, category: "Research Bundles", image: "/vial.jpg" },
  { id: 21, name: "KPV 10MG", description: "Anti-inflammatory peptide", price: 55.00, category: "Tissue Research", image: "/vial.jpg" },
  { id: 22, name: "Melanotan 2 10MG", description: "Melanocortin peptide - 10mg", price: 35.00, category: "General Research", image: "/vial.jpg" },
  { id: 23, name: "MOTS-C", description: "Mitochondrial peptide - 5mg/10mg/20mg", price: 55.00, category: "Metabolic Research", image: "/vial.jpg" },
  { id: 24, name: "NAD+", description: "Nicotinamide adenine dinucleotide - 500mg", price: 85.00, category: "Antioxidants", salePrice: 100.00, image: "/vial.jpg" },
  { id: 25, name: "PT-141 10MG", description: "Bremelanotide - 10mg vial", price: 40.00, category: "General Research", image: "/vial.jpg" },
  { id: 26, name: "Selank 10MG", description: "Synthetic peptide", price: 45.00, category: "Neuropeptide Research", image: "/vial.jpg" },
  { id: 27, name: "Semax 10MG", description: "Synthetic peptide", price: 35.00, category: "Neuropeptide Research", image: "/vial.jpg" },
  { id: 28, name: "Sermorelin 5MG", description: "Growth hormone releasing hormone", price: 48.00, category: "Secretagogue Research", image: "/vial.jpg" },
  { id: 29, name: "SLU-PP-332", description: "Exercise mimetic - 10mg", price: 175.00, category: "Metabolic Research", salePrice: 200.00, image: "/vial.jpg" },
  { id: 30, name: "TB-500 (Thymosin Beta-4)", description: "Thymosin peptide - 5mg", price: 35.00, category: "Thymosin Research", image: "/vial.jpg" },
  { id: 31, name: "Tesamorelin", description: "Growth hormone releasing factor - 5mg/10mg", price: 45.00, category: "Secretagogue Research", image: "/vial.jpg" },
];

const categories = ["All", "Glucagon Analogs", "Tissue Research", "Thymosin Research", "Secretagogue Research", "Metabolic Research", "Neuropeptide Research", "General Research", "Research Bundles", "Lab Supplies", "Copper Peptides", "Antioxidants"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="pt-16 min-h-screen bg-gradient-premium">
      {/* Premium Header */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-orange-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Collection
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our complete range of research-grade peptides. 
            Every product is HPLC tested and verified for 99%+ purity.
          </p>
        </div>
      </div>

      {/* Premium Filters */}
      <div className="sticky top-16 z-40 glass border-y border-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
              <SlidersHorizontal className="w-5 h-5 text-gray-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/25"
                      : "bg-[#0d0d0d] text-gray-400 hover:text-white border border-[#1a1a1a] hover:border-orange-500/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3.5 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl text-white text-sm focus:outline-none focus:border-orange-500/50 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {sortedProducts.length > 0 ? (
          <>
            <p className="text-gray-500 mb-8 text-lg">
              Showing <span className="text-white font-semibold">{sortedProducts.length}</span> premium product{sortedProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product, i) => (
                <div key={product.id} className="fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-32">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0d0d0d] flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-gray-400 text-xl mb-4">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
