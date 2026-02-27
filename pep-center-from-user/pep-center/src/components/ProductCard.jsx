import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      className="group flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-500"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Area */}
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          {/* Purity Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/25 text-xs font-medium text-[#f97316]">
              {product.purity}
            </span>
          </div>
          
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-white text-lg group-hover:text-[#f97316] transition-colors duration-300">
            {product.name}
          </h3>
          <span className="text-xl font-bold text-[#f97316]">${product.price}</span>
        </div>
        
        <p className="text-sm text-[#f97316]/70 mb-3">{product.subtitle}</p>
        
        <p className="text-sm text-white/35 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {product.description}
        </p>
        
        <button
          onClick={handleAddToCart}
          className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdded 
              ? 'bg-green-500/15 border border-green-500/30 text-green-400' 
              : 'bg-white/[0.04] border border-white/[0.08] text-white/80 hover:bg-[#f97316] hover:border-[#f97316] hover:text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Added
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
