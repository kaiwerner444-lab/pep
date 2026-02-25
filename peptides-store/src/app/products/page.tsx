"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const allProducts = [
  {
    id: 1,
    name: "BPC-157",
    description: "Body Protection Compound - 5mg vial",
    price: 49.99,
    category: "Healing",
    image: "/product-1.jpg",
  },
  {
    id: 2,
    name: "TB-500",
    description: "Thymosin Beta-4 - 5mg vial",
    price: 54.99,
    category: "Recovery",
    image: "/product-2.jpg",
  },
  {
    id: 3,
    name: "CJC-1295",
    description: "Growth Hormone Releasing Hormone - 2mg",
    price: 39.99,
    category: "Performance",
    image: "/product-3.jpg",
  },
  {
    id: 4,
    name: "Ipamorelin",
    description: "Growth Hormone Secretagogue - 2mg",
    price: 34.99,
    category: "Performance",
    image: "/product-4.jpg",
  },
  {
    id: 5,
    name: "GHRP-6",
    description: "Growth Hormone Releasing Peptide - 5mg",
    price: 44.99,
    category: "Performance",
    image: "/product-5.jpg",
  },
  {
    id: 6,
    name: "Melanotan II",
    description: "Melanocortin Peptide - 10mg",
    price: 59.99,
    category: "Research",
    image: "/product-6.jpg",
  },
  {
    id: 7,
    name: "PT-141",
    description: "Bremelanotide - 10mg vial",
    price: 64.99,
    category: "Research",
    image: "/product-7.jpg",
  },
  {
    id: 8,
    name: "Semaglutide",
    description: "GLP-1 Agonist - 5mg vial",
    price: 89.99,
    category: "Metabolic",
    image: "/product-8.jpg",
  },
];

const categories = ["All", "Healing", "Recovery", "Performance", "Research", "Metabolic"];

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
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                      ? "bg-blue-600 text-white"
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
              className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
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
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
