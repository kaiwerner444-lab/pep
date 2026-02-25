"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const allProducts = [
  { id: 1, name: "5% RU-58841", description: "Research compound - 5% solution", price: 45.00, category: "Research", image: "/vial.jpg" },
  { id: 2, name: "Acetic Acid 0.6% Solution 10ML", description: "Reconstitution solution", price: 10.00, category: "Supplies", image: "/vial.jpg" },
  { id: 3, name: "Amino Tadalafil", description: "Research compound", price: 54.00, category: "Research", image: "/vial.jpg" },
  { id: 4, name: "AOD-9604 5MG", description: "Fat loss peptide - 5mg vial", price: 50.00, category: "Metabolic", image: "/vial.jpg" },
  { id: 5, name: "BAC Water", description: "Bacteriostatic water - 10ml/30ml", price: 12.00, category: "Supplies", image: "/vial.jpg" },
  { id: 6, name: "BPC-157", description: "Body Protection Compound - 5mg/10mg", price: 35.00, category: "Healing", image: "/vial.jpg" },
  { id: 7, name: "BPC-157/TB-500 Blend", description: "Healing & recovery blend", price: 75.00, category: "Healing", image: "/vial.jpg" },
  { id: 8, name: "CJC-1295 NO DAC 5MG & Ipamorelin 5MG", description: "GH combo blend", price: 75.00, category: "Performance", image: "/vial.jpg" },
  { id: 9, name: "DSIP 5MG", description: "Delta Sleep Inducing Peptide", price: 35.00, category: "Sleep", image: "/vial.jpg" },
  { id: 10, name: "Enclomiphene", description: "Selective estrogen receptor modulator", price: 75.00, category: "Research", image: "/vial.jpg" },
  { id: 11, name: "GHK-CU", description: "Copper peptide - 50mg/100mg", price: 48.00, category: "Skin", image: "/vial.jpg" },
  { id: 12, name: "GLP-1 SM 10MG", description: "Semaglutide analog - 10mg", price: 128.00, category: "GLP-1", image: "/vial.jpg" },
  { id: 13, name: "GLP-2 TZ", description: "Tirzepatide analog - 5mg/10mg", price: 100.00, category: "GLP-1", image: "/vial.jpg" },
  { id: 14, name: "GLP-3 RT", description: "Retatrutide analog - 5mg/10mg/20mg", price: 75.00, category: "GLP-1", image: "/vial.jpg" },
  { id: 15, name: "Glutathione 600MG", description: "Antioxidant peptide", price: 54.00, category: "Wellness", image: "/vial.jpg" },
  { id: 16, name: "Glow (GHK-CU, TB-500, BPC-157)", description: "Skin & healing blend", price: 115.00, category: "Bundles", image: "/vial.jpg" },
  { id: 17, name: "HCG 5000iu", description: "Human Chorionic Gonadotropin", price: 40.00, category: "Research", image: "/vial.jpg" },
  { id: 18, name: "IGF-1 LR3 1MG", description: "Insulin-like Growth Factor", price: 75.00, category: "Performance", image: "/vial.jpg" },
  { id: 19, name: "KISSPEPTIN 10MG", description: "Reproductive hormone peptide", price: 60.00, category: "Research", image: "/vial.jpg" },
  { id: 20, name: "KLOW (GHK-CU, TB-500, BPC-157, KPV)", description: "Advanced healing blend", price: 140.00, category: "Bundles", image: "/vial.jpg" },
  { id: 21, name: "KPV 10MG", description: "Anti-inflammatory peptide", price: 55.00, category: "Healing", image: "/vial.jpg" },
  { id: 22, name: "Melanotan 2 10MG", description: "Tanning peptide - 10mg", price: 35.00, category: "Research", image: "/vial.jpg" },
  { id: 23, name: "MOTS-C", description: "Mitochondrial peptide - 5mg/10mg/20mg", price: 55.00, category: "Metabolic", image: "/vial.jpg" },
  { id: 24, name: "NAD+", description: "Nicotinamide adenine dinucleotide - 500mg", price: 85.00, category: "Wellness", salePrice: 100.00, image: "/vial.jpg" },
  { id: 25, name: "PT-141 10MG", description: "Bremelanotide - 10mg vial", price: 40.00, category: "Research", image: "/vial.jpg" },
  { id: 26, name: "Selank 10MG", description: "Nootropic peptide", price: 45.00, category: "Nootropic", image: "/vial.jpg" },
  { id: 27, name: "Semax 10MG", description: "Nootropic peptide", price: 35.00, category: "Nootropic", image: "/vial.jpg" },
  { id: 28, name: "Sermorelin 5MG", description: "Growth hormone releasing hormone", price: 48.00, category: "Performance", image: "/vial.jpg" },
  { id: 29, name: "SLU-PP-332", description: "Exercise mimetic - 10mg", price: 175.00, category: "Metabolic", salePrice: 200.00, image: "/vial.jpg" },
  { id: 30, name: "TB-500 (Thymosin Beta-4)", description: "Recovery peptide - 5mg", price: 35.00, category: "Recovery", image: "/vial.jpg" },
  { id: 31, name: "Tesamorelin", description: "Growth hormone releasing factor - 5mg/10mg", price: 45.00, category: "Performance", image: "/vial.jpg" },
];

const categories = ["All", "GLP-1", "Healing", "Recovery", "Performance", "Metabolic", "Nootropic", "Research", "Bundles", "Supplies", "Skin", "Sleep", "Wellness"];

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
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-4">All Products</h1>
          <p className="text-gray-400 max-w-2xl">
            Browse our complete collection of research peptides. All products are 
            HPLC tested and verified for purity.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-800 bg-black sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              <SlidersHorizontal className="w-5 h-5 text-gray-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-orange-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
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
              className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedProducts.length > 0 ? (
          <>
            <p className="text-gray-400 mb-6">
              Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-orange-400 hover:text-orange-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
