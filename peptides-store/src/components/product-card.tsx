"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  outOfStock?: boolean;
  onSale?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={`group relative rounded-3xl bg-gradient-to-b from-[#1a1a1c] to-[#141415] border border-zinc-800/50 p-6 hover:border-[#b87333]/30 transition-all duration-300 ${product.outOfStock ? 'opacity-60' : ''}`}>
      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute top-5 left-5 z-10">
          <span className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
            SALE
          </span>
        </div>
      )}
      
      {/* Out of Stock Badge */}
      {product.outOfStock && (
        <div className="absolute top-5 left-5 z-10">
          <span className="px-3 py-1.5 rounded-full bg-zinc-700/50 text-zinc-400 text-xs font-medium border border-zinc-600">
            Out of Stock
          </span>
        </div>
      )}

      {/* Purity Badge */}
      {!product.onSale && !product.outOfStock && (
        <div className="absolute top-5 left-5 z-10">
          <span className="px-3 py-1.5 rounded-full bg-[#b87333]/20 text-[#b87333] text-xs font-medium border border-[#b87333]/30">
            ≥99%
          </span>
        </div>
      )}

      {/* Vial Image Container */}
      <div className="aspect-square flex items-center justify-center mb-6 relative">
        <div className="absolute w-48 h-48 bg-[#b87333]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image 
          src="/vial-3d.svg" 
          alt={product.name}
          width={200}
          height={300}
          className="object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Name and Price Row */}
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-semibold text-white group-hover:text-[#c9a961] transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-sm text-zinc-500 line-through mr-2">
                ${product.originalPrice}
              </span>
            )}
            <span className={`text-2xl font-bold ${product.onSale ? 'text-green-400' : 'text-[#b87333]'}`}>
              ${product.price}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button 
          disabled={product.outOfStock}
          className={`w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 border ${
            product.outOfStock 
              ? 'bg-zinc-800/30 text-zinc-600 border-zinc-800 cursor-not-allowed'
              : 'bg-zinc-800/50 hover:bg-[#b87333] text-white border-zinc-700 hover:border-[#b87333]'
          }`}
        >
          {product.outOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
