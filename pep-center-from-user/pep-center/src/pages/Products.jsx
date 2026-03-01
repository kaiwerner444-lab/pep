import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { GitCompare, X } from 'lucide-react';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Load compare list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Handle both array of objects and array of strings
        if (parsed.length > 0 && typeof parsed[0] === 'object') {
          setCompareList(parsed);
        } else {
          // It's an array of IDs, look up products
          const items = products.filter(p => parsed.includes(p.id));
          setCompareList(items);
        }
      } catch (e) {
        console.error('Error loading compare list:', e);
      }
    }
  }, []);

  // Save compare list to localStorage (save full objects for easier access)
  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products');
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isComparing = (productId) => {
    return compareList.some(p => p.id === productId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`pt-24 pb-20 ${compareList.length > 0 ? 'pb-28 sm:pb-24' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#f97316] to-[#ec4899] bg-clip-text text-transparent">Research</span> Catalog
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Browse our complete collection of {products.length}+ research peptides and compounds.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#f97316]/50 focus:outline-none text-white placeholder:text-white/30 transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#f97316] text-white shadow-lg shadow-[#f97316]/20'
                  : 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-white/40 text-sm mb-8">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Product Grid - All Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onCompare={toggleCompare}
              isComparing={isComparing(product.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 mb-4">No products found matching your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Compare Bar - Fixed at bottom */}
      {compareList.length > 0 && (
        <div 
          className="fixed bottom-0 left-0 right-0 bg-[#0a0e17]/98 backdrop-blur-xl border-t border-[#f97316]/30 p-3 sm:p-4 z-[100] shadow-2xl shadow-black/50"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#f97316]/20 flex items-center justify-center">
                  <GitCompare className="w-4 h-4 text-[#f97316]" />
                </div>
                <span className="text-white font-medium text-sm sm:text-base">{compareList.length} selected</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 overflow-x-auto">
                {compareList.map((product) => (
                  <div key={product.id} className="flex items-center gap-1 px-2 py-1.5 bg-white/5 rounded-lg text-xs border border-white/10">
                    <span className="text-white truncate max-w-[100px]">{product.name}</span>
                    <button 
                      onClick={() => toggleCompare(product)}
                      className="text-white/40 hover:text-white ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button 
                onClick={clearCompare}
                className="text-white/50 hover:text-white text-sm px-2 sm:px-3 py-2"
              >
                Clear
              </button>
              <Link 
                to="/compare"
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#f97316] text-white rounded-xl font-medium hover:bg-[#ea580c] transition-colors text-sm whitespace-nowrap"
              >
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
