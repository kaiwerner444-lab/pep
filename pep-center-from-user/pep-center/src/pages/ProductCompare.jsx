import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Check, Trash2, GitCompare, ArrowRight, Beaker, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function ProductCompare() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [compareList, setCompareList] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  // Load compare list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && typeof parsed[0] === 'object') {
          // Already full product objects
          setCompareList(parsed);
        } else {
          // Array of IDs - look up products
          const items = products.filter(p => parsed.includes(p.id));
          setCompareList(items);
        }
      } catch (e) {
        console.error('Error loading compare list:', e);
      }
    }
  }, []);

  // Save compare list to localStorage
  useEffect(() => {
    const ids = compareList.map(p => p.id);
    localStorage.setItem('compareList', JSON.stringify(ids));
  }, [compareList]);

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addToCart = (product) => {
    addItem(product);
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <GitCompare className="w-10 h-10 text-white/30" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">No Products to Compare</h1>
          <p className="text-white/50 mb-6">Add products to your comparison list to see them side by side.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Define comparison attributes
  const attributes = [
    { key: 'name', label: 'Product', render: (p) => <span className="font-semibold text-white">{p.name}</span> },
    { key: 'subtitle', label: 'Size', render: (p) => p.subtitle },
    { key: 'price', label: 'Price', render: (p) => <span className="text-[#f97316] font-bold">${p.price}</span> },
    { key: 'category', label: 'Category', render: (p) => p.category },
    { key: 'purity', label: 'Purity', render: (p) => <span className="text-[#f97316]">{p.purity || '≥99%'}</span> },
    { 
      key: 'description', 
      label: 'Description', 
      render: (p) => <span className="text-sm text-white/70">{p.description?.substring(0, 100)}...</span>,
      fullWidth: true 
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Compare Products
            </h1>
            <p className="text-white/50">
              {compareList.length} {compareList.length === 1 ? 'product' : 'products'} in comparison
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearCompare}
              className="px-4 py-2 bg-white/5 text-white/70 rounded-xl hover:bg-white/10 transition-colors text-sm"
            >
              Clear All
            </button>
            <Link to="/products" className="px-4 py-2 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors text-sm">
              Add More
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <AnimatedSection animation="fadeUp">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Product Headers */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
                <div className="p-4"></div> {/* Empty corner cell */}
                {compareList.map((product) => (
                  <div key={product.id} className="relative p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white/50" />
                    </button>
                    <img 
                      src={product.image || '/product_vial.jpg'} 
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-xl mb-3"
                    />
                    <h3 className="font-semibold text-white text-center">{product.name}</h3>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              {attributes.map((attr) => (
                <div 
                  key={attr.key}
                  className="grid gap-4 border-t border-white/10"
                  style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}
                >
                  <div className="p-4 text-sm font-medium text-white/50 flex items-center">
                    {attr.label}
                  </div>
                  {compareList.map((product) => (
                    <div key={`${product.id}-${attr.key}`} className="p-4 text-white">
                      {attr.render(product)}
                    </div>
                  ))}
                </div>
              ))}

              {/* Actions Row */}
              <div 
                className="grid gap-4 border-t border-white/10"
                style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}
              >
                <div className="p-4"></div>
                {compareList.map((product) => (
                  <div key={`${product.id}-actions`} className="p-4">
                    <button
                      onClick={() => addToCart(product)}
                      className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        addedToCart[product.id]
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                          : 'bg-[#f97316] text-white hover:bg-[#ea580c]'
                      }`}
                    >
                      {addedToCart[product.id] ? (
                        <><Check className="w-4 h-4" /> Added</>
                      ) : (
                        <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                      )}
                    </button>
                    <Link 
                      to={`/products/${product.id}`}
                      className="w-full mt-2 py-2 text-sm text-white/50 hover:text-white flex items-center justify-center gap-1 transition-colors"
                    >
                      View Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Recommended Comparisons */}
        {compareList.length < 3 && (
          <AnimatedSection animation="fadeUp" delay={200}>
            <div className="mt-12">
              <h2 className="text-xl font-bold text-white mb-4">Popular Comparisons</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'BPC-157 vs TB-500', products: ['bpc-157-5mg', 'tb-500-5mg'] },
                  { name: 'Semaglutide vs Tirzepatide', products: ['semaglutide-5mg', 'tirzepatide-5mg'] },
                  { name: 'GHK-Cu Options', products: ['ghk-cu-50mg', 'ghk-cu-100mg'] },
                ].map((comparison, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const items = products.filter(p => comparison.products.includes(p.id));
                      setCompareList(items);
                    }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#f97316]/30 hover:bg-white/[0.05] transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GitCompare className="w-4 h-4 text-[#f97316]" />
                      <span className="text-white font-medium">{comparison.name}</span>
                    </div>
                    <p className="text-sm text-white/50">Click to load comparison</p>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
