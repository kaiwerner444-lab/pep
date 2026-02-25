"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:-translate-y-1">
      {/* Vial Image */}
      <Link href={`/products/${product.id}`} className="block aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image 
            src="/vial.jpg" 
            alt={product.name}
            width={120}
            height={180}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium border border-orange-500/20">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">${product.price}</span>
          </div>
          <button className="p-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all hover:scale-105 glow-orange">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
