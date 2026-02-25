"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

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
    <Link 
      href={`/products/${product.id <= 5 ? product.id : '1'}`}
      className="group block rounded-2xl bg-[#141415] border border-zinc-800 overflow-hidden hover:border-[#b87333]/30 transition-all duration-300 card-hover"
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-b from-[#1a1a1c] to-[#141415] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#b87333]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image 
          src="/vial.jpg" 
          alt={product.name}
          width={140}
          height={200}
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-[#b87333] uppercase tracking-wider mb-2">{product.category}</p>
        <h3 className="text-white font-medium mb-1 group-hover:text-[#c9a961] transition-colors">
          {product.name}
        </h3>
        <p className="text-zinc-500 text-sm mb-4 line-clamp-1">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-light text-white">${product.price}</span>
          <span className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-[#b87333] group-hover:text-white transition-all">
            <ShoppingCart className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
