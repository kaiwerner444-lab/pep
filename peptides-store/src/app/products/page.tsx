"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const allProducts = [
  { id: 1, name: "BPC-157", description: "5mg Vial - Body protection compound for tissue research", price: 35, category: "Tissue Research", image: "/vial-3d.svg" },
  { id: 2, name: "TB-500", description: "5mg Vial - Thymosin beta-4 synthetic peptide", price: 35, category: "Thymosin Research", image: "/vial-3d.svg" },
  { id: 3, name: "GHK-CU", description: "50mg Vial - Copper peptide complex for skin research", price: 48, category: "Copper Peptides", image: "/vial-3d.svg" },
  { id: 4, name: "GLP-1 SM", description: "10mg Vial - Semaglutide analog for metabolic research", price: 128, category: "Glucagon Analogs", image: "/vial-3d.svg" },
  { id: 5, name: "NAD+", description: "500mg Vial - Nicotinamide adenine dinucleotide", price: 85, category: "Antioxidants", image: "/vial-3d.svg" },
  { id: 6, name: "GHRP-6", description: "5mg Vial - Growth hormone releasing peptide", price: 35, category: "Secretagogue Research", image: "/vial-3d.svg" },
  { id: 7, name: "CJC-1295", description: "5mg Vial - Growth hormone releasing hormone analog", price: 75, category: "Secretagogue Research", image: "/vial-3d.svg" },
  { id: 8, name: "Ipamorelin", description: "5mg Vial - Selective growth hormone secretagogue", price: 55, category: "Secretagogue Research", image: "/vial-3d.svg" },
  { id: 9, name: "Melanotan II", description: "10mg Vial - Melanocortin peptide for research", price: 35, category: "General Research", image: "/vial-3d.svg" },
  { id: 10, name: "PT-141", description: "10mg Vial - Bremelanotide research peptide", price: 40, category: "General Research", image: "/vial-3d.svg" },
  { id: 11, name: "Selank", description: "10mg Vial - Synthetic peptide for cognitive research", price: 45, category: "Neuropeptide Research", image: "/vial-3d.svg" },
  { id: 12, name: "Semax", description: "10mg Vial - Nootropic research peptide", price: 35, category: "Neuropeptide Research", image: "/vial-3d.svg" },
];

const categories = ["All", "Tissue Research", "Thymosin Research", "Copper Peptides", "Glucagon Analogs", "Antioxidants", "Secretagogue Research", "Neuropeptide Research", "General Research"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#b87333] text-sm tracking-wider uppercase mb-4">Premium Collection</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Research <span className="gradient-text font-semibold">Compounds</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Laboratory-grade peptides with verified purity for scientific research.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#141415] border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#b87333]/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-[#b87333] text-white"
                    : "bg-[#141415] text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-zinc-500 text-sm mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              className="mt-4 text-[#b87333] hover:text-[#cd7f32]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
