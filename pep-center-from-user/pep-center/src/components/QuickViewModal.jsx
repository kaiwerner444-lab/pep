import { useState, useEffect } from 'react';
import { X, ShoppingCart, Check, Beaker, Shield, FileCheck, Snowflake, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createPortal } from 'react-dom';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const specs = [
    { icon: Beaker, label: 'Purity', value: product.purity || '≥99%', color: 'text-[#f97316]' },
    { icon: Shield, label: 'Testing', value: 'HPLC', color: 'text-green-400' },
    { icon: Snowflake, label: 'Form', value: 'Lyophilized', color: 'text-blue-400' },
    { icon: FileCheck, label: 'COA', value: 'Included', color: 'text-green-400' },
  ];

  const modalContent = (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div 
          className="w-full max-w-4xl max-h-[90vh] bg-[#0a0e17] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-bold text-white">Quick View</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid md:grid-cols-2">
              {/* Left - Image */}
              <div className="relative aspect-square bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 sm:p-8 flex items-center justify-center">
                <img 
                  src={product.image || '/product_vial.jpg'} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#f97316]/20 border border-[#f97316]/30 text-[10px] sm:text-xs font-semibold text-[#f97316]">
                    {product.purity || '≥99%'}
                  </span>
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-[10px] sm:text-xs font-semibold text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    In Stock
                  </span>
                </div>
              </div>

              {/* Right - Details */}
              <div className="p-4 sm:p-8 flex flex-col">
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-[#f97316] mb-1 sm:mb-2">{product.category}</p>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                    {product.name}
                  </h1>
                  <p className="text-sm sm:text-base text-white/60">{product.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#f97316]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-base sm:text-lg text-white/30 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-4 border-b border-white/10">
                  {['details', 'specs'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 sm:pb-3 text-sm font-medium transition-colors ${
                        activeTab === tab 
                          ? 'text-[#f97316] border-b-2 border-[#f97316]' 
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {tab === 'details' ? 'Details' : 'Specs'}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 mb-4 sm:mb-6">
                  {activeTab === 'details' ? (
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                        {product.description || product.longDescription}
                      </p>
                      {product.researchApplications && (
                        <div>
                          <p className="text-xs sm:text-sm text-white/50 mb-2">Research Applications:</p>
                          <ul className="space-y-1">
                            {product.researchApplications.slice(0, 3).map((app, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-1.5 flex-shrink-0" />
                                {app}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {specs.map((spec, i) => (
                        <div key={i} className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                            <spec.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${spec.color}`} />
                            <span className="text-[10px] sm:text-xs text-white/40">{spec.label}</span>
                          </div>
                          <span className={`text-xs sm:text-sm font-semibold ${spec.color}`}>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
                      isAdded 
                        ? 'bg-green-500/20 border border-green-500/40 text-green-400' 
                        : 'bg-[#f97316] text-white hover:bg-[#ea580c]'
                    }`}
                  >
                    {isAdded ? (
                      <><Check className="w-4 h-4 sm:w-5 sm:h-5" /> Added!</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart</>
                    )}
                  </button>
                  
                  <a 
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="w-full py-2.5 sm:py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    View Full Details <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
