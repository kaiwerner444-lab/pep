"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const allProducts = [
  // Page 1 Products
  { id: 1, name: "5% RU-58841", description: "Research compound - 5% solution 30ml", price: 45, category: "Research Chemicals", image: "/vial-3d.svg" },
  { id: 2, name: "Acetic Acid 0.6%", description: "10ml Solution for peptide reconstitution", price: 10, category: "Lab Supplies", image: "/vial-3d.svg" },
  { id: 3, name: "Amino Tadalafil", description: "Liquid research compound 30ml", price: 54, category: "Research Chemicals", image: "/vial-3d.svg" },
  { id: 4, name: "AOD-9604", description: "5mg Vial - GH fragment for metabolic research", price: 50, category: "Peptides", image: "/vial-3d.svg" },
  { id: 5, name: "BAC Water", description: "Bacteriostatic water 10ml/30ml", price: 12, category: "Lab Supplies", image: "/vial-3d.svg" },
  { id: 6, name: "BPC-157", description: "5mg Vial - Body protection compound", price: 35, category: "Peptides", image: "/vial-3d.svg" },
  { id: 7, name: "BPC-157/TB-500", description: "Blend - Healing & recovery combo", price: 75, category: "Peptide Blends", image: "/vial-3d.svg" },
  { id: 8, name: "CJC-1295/Ipamorelin", description: "5mg/5mg - GH releasing combo", price: 75, category: "Peptide Blends", image: "/vial-3d.svg" },
  { id: 9, name: "DSIP", description: "5mg Vial - Delta sleep inducing peptide", price: 35, category: "Peptides", image: "/vial-3d.svg" },
  { id: 10, name: "Enclomiphene", description: "SERM for hormonal research", price: 75, category: "Research Chemicals", image: "/vial-3d.svg" },
  { id: 11, name: "GHK-CU", description: "50mg Vial - Copper peptide", price: 48, category: "Peptides", image: "/vial-3d.svg" },
  { id: 12, name: "Glow", description: "GHK-CU, TB-500, BPC-157 blend", price: 115, category: "Peptide Blends", image: "/vial-3d.svg" },
  
  // Page 2 Products (GLP-1s, etc.)
  { id: 13, name: "GLP-1 SM", description: "10mg Vial - Semaglutide analog", price: 128, category: "GLP-1", image: "/vial-3d.svg" },
  { id: 14, name: "GLP-2 TZ", description: "10mg Vial - Tirzepatide analog", price: 100, category: "GLP-1", image: "/vial-3d.svg" },
  { id: 15, name: "GLP-3 RT", description: "10mg Vial - Retatrutide analog", price: 75, category: "GLP-1", image: "/vial-3d.svg" },
  { id: 16, name: "Glutathione", description: "600mg Vial - Antioxidant peptide", price: 54, category: "Peptides", image: "/vial-3d.svg" },
  { id: 17, name: "HCG", description: "5000iu Vial - Human chorionic gonadotropin", price: 40, category: "Research Chemicals", image: "/vial-3d.svg" },
  { id: 18, name: "IGF-1 LR3", description: "1mg Vial - Long R3 IGF-1", price: 75, category: "Peptides", image: "/vial-3d.svg" },
  { id: 19, name: "KISSPEPTIN", description: "10mg Vial - Reproductive peptide", price: 60, category: "Peptides", image: "/vial-3d.svg" },
  { id: 20, name: "KLOW", description: "Advanced healing peptide stack", price: 140, category: "Peptide Blends", image: "/vial-3d.svg" },
  { id: 21, name: "KPV", description: "10mg Vial - Anti-inflammatory tripeptide", price: 55, category: "Peptides", image: "/vial-3d.svg" },
  { id: 22, name: "Melanotan II", description: "10mg Vial - Melanocortin peptide", price: 35, category: "Peptides", image: "/vial-3d.svg" },
  { id: 23, name: "MOTS-C", description: "10mg Vial - Mitochondrial peptide", price: 55, category: "Peptides", image: "/vial-3d.svg" },
  { id: 24, name: "NAD+", description: "500mg Vial - Nicotinamide adenine dinucleotide", price: 85, category: "Peptides", image: "/vial-3d.svg" },
  
  // Page 3 Products
  { id: 25, name: "PT-141", description: "10mg Vial - Bremelanotide peptide", price: 40, category: "Peptides", image: "/vial-3d.svg" },
  { id: 26, name: "Selank", description: "10mg Vial - Nootropic peptide", price: 45, category: "Peptides", image: "/vial-3d.svg" },
  { id: 27, name: "Semax", description: "10mg Vial - Cognitive peptide", price: 35, category: "Peptides", image: "/vial-3d.svg" },
  { id: 28, name: "Sermorelin", description: "5mg Vial - GHRH analog", price: 48, category: "Peptides", image: "/vial-3d.svg" },
  { id: 29, name: "SLU-PP-332", description: "10mg Vial - ERR agonist", price: 175, category: "Research Chemicals", image: "/vial-3d.svg" },
  { id: 30, name: "TB-500", description: "5mg Vial - Thymosin beta-4", price: 35, category: "Peptides", image: "/vial-3d.svg" },
  { id: 31, name: "Tesamorelin", description: "5mg Vial - GHRF analog", price: 45, category: "Peptides", image: "/vial-3d.svg" },
  { id: 32, name: "GHRP-6", description: "5mg Vial - Growth hormone releasing peptide", price: 35, category: "Peptides", image: "/vial-3d.svg" },
  { id: 33, name: "CJC-1295", description: "5mg Vial - No DAC", price: 45, category: "Peptides", image: "/vial-3d.svg" },
  { id: 34, name: "Ipamorelin", description: "5mg Vial - GH secretagogue", price: 40, category: "Peptides", image: "/vial-3d.svg" },
  { id: 35, name: "Tadalafil", description: "Liquid research compound", price: 54, category: "Research Chemicals", image: "/vial-3d.svg" },
  { id: 36, name: "Ostarine", description: "Liquid SARM for research", price: 65, category: "Research Chemicals", image: "/vial-3d.svg" },
];

const categories = ["All", "Peptides", "GLP-1", "Peptide Blends", "Research Chemicals", "Lab Supplies"];

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
          <p className="text-[#b87333] text-sm tracking-wider uppercase mb-4">Complete Catalog</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Research <span className="gradient-text font-semibold">Compounds</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            {allProducts.length}+ laboratory-grade peptides and research chemicals.
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
          Showing {filteredProducts.length} of {allProducts.length} products
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
