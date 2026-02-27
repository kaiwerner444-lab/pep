"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Shield, FileText, ExternalLink, Check } from "lucide-react";
import { allProducts } from "./page";

export default function ProductDetail({ id }: { id: string }) {
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.size || null);
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);

  if (!product) {
    return (
      <div className="pt-32 text-center text-white">
        <h1 className="text-2xl">Product not found</h1>
        <Link href="/products" className="text-[#b87333] mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleSizeChange = (size: string, price: number) => {
    setSelectedSize(size);
    setCurrentPrice(price);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-b from-[#1a1a1c] to-[#141415] border border-zinc-800/50 flex items-center justify-center p-12">
              <div className="absolute w-64 h-64 bg-[#b87333]/10 rounded-full blur-3xl" />
              <Image
                src="/vial-3d.svg"
                alt={product.name}
                width={300}
                height={450}
                className="object-contain relative z-10"
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            {/* Title and Price */}
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              {product.originalPrice && (
                <span className="text-2xl text-zinc-500 line-through">
                  ${product.originalPrice}.00
                </span>
              )}
              <span className="text-4xl font-bold text-[#b87333]">
                ${currentPrice}.00
              </span>
              {product.sizes && product.sizes.length > 1 && (
                <span className="text-zinc-500">– ${Math.max(...product.sizes.map(s => s.price))}.00</span>
              )}
            </div>

            {/* Contents */}
            <div className="bg-[#141415] rounded-2xl p-6 border border-zinc-800 mb-6">
              <h3 className="text-white font-semibold mb-2">Contents:</h3>
              <p className="text-zinc-400">{product.contents}</p>
              {product.requiresReconstitution && (
                <p className="text-[#b87333] text-sm mt-2">
                  Requires reconstitution with reconstitution solution{" "}
                  <Link href="/products/33" className="underline hover:text-[#cd7f32]">
                    (Sold Here)
                  </Link>
                </p>
              )}
            </div>

            {/* Concentration Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="px-4 py-2 rounded-full bg-[#b87333]/20 text-[#b87333] text-sm font-medium border border-[#b87333]/30">
                Concentration: {product.concentration}
              </span>
            </div>

            {/* Third Party Testing */}
            <div className="bg-[#141415] rounded-2xl p-6 border border-zinc-800 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-[#b87333]" />
                <h3 className="text-white font-semibold">Rigorous Third-Party Testing</h3>
              </div>
              <p className="text-zinc-400 text-sm">
                Every batch of our research chemicals and peptides undergoes third-party testing.
              </p>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => handleSizeChange(sizeOption.size, sizeOption.price)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        selectedSize === sizeOption.size
                          ? "bg-[#b87333] text-white"
                          : "bg-[#141415] text-zinc-400 border border-zinc-800 hover:border-[#b87333]/50"
                      }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* In Stock Badge */}
            <div className="flex items-center gap-2 mb-6">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium">In stock</span>
            </div>

            {/* Add to Cart */}
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#b87333] hover:bg-[#cd7f32] text-white rounded-xl font-semibold text-lg transition-all mb-6">
              <ShoppingCart className="w-5 h-5" />
              Add to cart
            </button>

            {/* COA Link */}
            <Link
              href={product.coaLink}
              className="inline-flex items-center gap-2 text-[#b87333] hover:text-[#cd7f32] transition-colors mb-2"
            >
              <FileText className="w-5 h-5" />
              Certificate of Analysis [{product.name} {selectedSize || ""}]
              <ExternalLink className="w-4 h-4" />
            </Link>
            <p className="text-zinc-500 text-sm mb-6">Batch: {product.batchNumber}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[#141415] rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-zinc-400 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Product Specifications */}
            <div className="bg-[#141415] rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-2xl font-bold text-white mb-6">Product Specifications:</h2>
              <p className="text-zinc-400 mb-6">
                {product.contents}. *Requires Reconstitution with solvent such as BAC Water{" "}
                <Link href="/products/33" className="text-[#b87333] underline hover:text-[#cd7f32]">
                  (Sold Here)
                </Link>
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">Application:</span>
                  <span className="text-white">{product.specs.application}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">Appearance:</span>
                  <span className="text-white">{product.specs.appearance}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">Chemical Formula:</span>
                  <span className="text-white font-mono">{product.specs.formula}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">PubChem CID:</span>
                  <span className="text-white">{product.specs.pubChemCid}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">CAS Number:</span>
                  <span className="text-white">{product.specs.casNumber}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">Molecular Weight:</span>
                  <span className="text-white">{product.specs.molecularWeight}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                  <span className="text-zinc-500">Synonyms:</span>
                  <span className="text-white">{product.specs.synonyms}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <span className="text-zinc-500">Storage:</span>
                  <span className="text-white">{product.specs.storage}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  <span className="text-zinc-500">Concentration:</span>
                  <span className="text-white">{product.concentration}</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-[#141415] rounded-3xl p-8 border border-zinc-800">
              <h3 className="text-white font-semibold mb-2">Have a question?</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Reach out to our U.S. support team at:
              </p>
              <a
                href="mailto:support@peptidelabs.com"
                className="text-[#b87333] hover:text-[#cd7f32] transition-colors"
              >
                support@peptidelabs.com
              </a>
            </div>
          </div>

          {/* Sidebar - Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-6">Related products</h3>
              <div className="space-y-4">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/products/${related.id}`}
                    className="flex items-center gap-4 p-4 bg-[#141415] rounded-2xl border border-zinc-800 hover:border-[#b87333]/30 transition-all"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#1a1a1c] flex items-center justify-center">
                      <Image
                        src="/vial-3d.svg"
                        alt={related.name}
                        width={40}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{related.name}</h4>
                      <p className="text-[#b87333] font-bold">${related.price}.00</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
