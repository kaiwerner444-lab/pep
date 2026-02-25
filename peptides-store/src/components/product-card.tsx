"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div 
      className="group relative rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] border border-[#1a1a1a] overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 card-glow"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl" />
      </div>

      {/* Image container */}
      <Link 
        href={`/products/${product.id}`} 
        className="block aspect-square bg-gradient-to-br from-[#141414] to-[#0d0d0d] relative overflow-hidden"
      >
        {/* Glow effect behind image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] transition-all duration-500 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image 
            src="/vial.jpg" 
            alt={product.name}
            width={160}
            height={240}
            className={`object-contain transition-all duration-700 ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
          />
        </div>
        
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-5 left-5">
          <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold border border-orange-500/30 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </Link>

      {/* Content */}
      <div className="p-6 relative z-10">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-5 line-clamp-1">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 uppercase tracking-wider">Price</span>
            <span className="text-3xl font-bold text-white">${product.price}</span>
          </div>
          <button className="group/btn p-4 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white transition-all hover:scale-110 glow-orange">
            <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div 
          className={`absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-1000 ${isHovered ? 'translate-x-[400%]' : ''}`}
        />
      </div>
    </div>
  );
}
