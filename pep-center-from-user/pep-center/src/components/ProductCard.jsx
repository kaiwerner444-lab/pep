import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Plus, Check, ShoppingBag, TrendingDown, Eye, GitCompare, RefreshCw } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

// Volume pricing tiers
const volumeTiers = [
  { min: 1, max: 9, discount: 0, label: '1-9 units' },
  { min: 10, max: 49, discount: 10, label: '10-49 units' },
  { min: 50, max: 99, discount: 20, label: '50-99 units' },
  { min: 100, max: null, discount: 30, label: '100+ units' },
];

// Calculate volume price
function calculateVolumePrice(basePrice, quantity) {
  const tier = volumeTiers.find(t => 
    quantity >= t.min && (t.max === null || quantity <= t.max)
  );
  const discount = tier?.discount || 0;
  const discountedPrice = basePrice * (1 - discount / 100);
  return {
    unitPrice: discountedPrice,
    totalPrice: discountedPrice * quantity,
    discount: discount,
    tier: tier?.label,
  };
}

export default function ProductCard({ product, index = 0, onQuickView, onCompare, isComparing = false }) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add item multiple times for quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product, isSubscription);
    }
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    setQuantity(1);
  };

  // Calculate volume pricing
  const pricing = calculateVolumePrice(product.price, quantity);
  const nextTier = volumeTiers.find(t => t.min > quantity);
  const savings = (product.price - pricing.unitPrice) * quantity;
  
  // Subscription price (additional 10% off)
  const subscriptionPrice = Math.round(pricing.unitPrice * 0.90);
  const subscriptionSavings = isSubscription ? (pricing.unitPrice - subscriptionPrice) * quantity : 0;
  const finalPrice = isSubscription ? subscriptionPrice : pricing.unitPrice;
  const finalTotal = finalPrice * quantity;

  return (
    <div 
      className="group flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#f97316]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          {/* Purity Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/30 text-xs font-medium text-[#f97316] backdrop-blur-sm">
              {product.purity}
            </span>
          </div>

          {/* Subscription Badge */}
          {isSubscription && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-medium text-purple-400 backdrop-blur-sm flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Subscribe & Save
              </span>
            </div>
          )}
          
          {/* Volume Discount Badge */}
          {quantity >= 10 && !isSubscription && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30 text-xs font-medium text-green-400 backdrop-blur-sm flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                {pricing.discount}% OFF
              </span>
            </div>
          )}
          
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Shine sweep */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000"
            style={{
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            }}
          />

          {/* Quick Action Buttons */}
          <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4 group-hover:sm:opacity-100 group-hover:sm:translate-y-0`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="flex-1 py-2.5 bg-white/90 backdrop-blur-sm text-[#0a0e17] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
            {onCompare && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCompare(product);
                }}
                className={`px-3 rounded-xl font-medium transition-colors ${
                  isComparing 
                    ? 'bg-[#f97316] text-white' 
                    : 'bg-white/90 backdrop-blur-sm text-[#0a0e17] hover:bg-white'
                }`}
                title={isComparing ? 'Remove from compare' : 'Add to compare'}
              >
                <GitCompare className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={product} 
        isOpen={showQuickView} 
        onClose={() => setShowQuickView(false)} 
      />      
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-white text-lg group-hover:text-[#f97316] transition-colors">
              {product.name}
            </h3>
            <div className="text-right">
              <span className="text-xl font-bold text-[#f97316]">${finalPrice.toFixed(0)}</span>
              {(pricing.discount > 0 || isSubscription) && (
                <span className="text-sm text-white/30 line-through block">${product.price}</span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-[#f97316]/70 mb-2">{product.subtitle}</p>
        </Link>

        {/* Subscription Toggle */}
        <div className="mb-3 p-3 rounded-xl bg-purple-500/[0.05] border border-purple-500/20">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isSubscription}
              onChange={(e) => setIsSubscription(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/50"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white">Subscribe Monthly</span>
              </div>
              <p className="text-xs text-purple-400/70">Save 10% + free shipping</p>
            </div>
            {isSubscription && (
              <span className="text-xs font-bold text-purple-400">-${Math.round(product.price * 0.10)}/mo</span>
            )}
          </label>
        </div>

        {/* Volume Pricing Info */}
        <div 
          className="mb-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer transition-all hover:border-white/[0.1]"
          onClick={() => setShowPricing(!showPricing)}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/50">Volume Pricing Available</span>
            <span className="text-[#f97316]">{showPricing ? 'Hide' : 'View'} →</span>
          </div>
          
          {showPricing && (
            <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
              {volumeTiers.slice(1).map((tier, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-white/40">{tier.label}</span>
                  <span className="text-[#f97316]">{tier.discount}% off</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-white/50">Qty:</span>
          <div className="flex items-center gap-2">
            {[1, 10, 50, 100].map((qty) => (
              <button
                key={qty}
                onClick={() => setQuantity(qty)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  quantity === qty
                    ? 'bg-[#f97316] text-white'
                    : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1] hover:text-white'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>

        {/* Savings indicator */}
        {(savings > 0 || subscriptionSavings > 0) && (
          <div className="mb-3 p-2 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center gap-2">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">
              Save ${(savings + subscriptionSavings).toFixed(0)}
              {isSubscription && '/mo'}
            </span>
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
            isAdded 
              ? 'bg-green-500/20 border border-green-500/40 text-green-400' 
              : isSubscription
                ? 'bg-purple-500/20 border border-purple-500/40 text-purple-400 hover:bg-purple-500/30'
                : 'bg-white/[0.04] border border-white/[0.08] text-white/80 hover:bg-[#f97316] hover:border-[#f97316] hover:text-white'
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
          
          {isAdded ? (
            <><Check className="w-4 h-4" /> Added {quantity > 1 ? `(${quantity})` : ''}</>
          ) : (
            <>
              {isSubscription ? <RefreshCw className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              {isSubscription ? 'Subscribe' : 'Add'} {quantity > 1 ? `${quantity}` : ''}
              <span className="ml-1 text-xs opacity-70">${finalTotal.toFixed(0)}</span>
              {isSubscription && <span className="text-xs opacity-70">/mo</span>}
            </>
          )}
        </button>

        {/* Next tier incentive */}
        {nextTier && quantity < nextTier.min && !isSubscription && (
          <p className="mt-2 text-xs text-center text-white/30">
            Add {nextTier.min - quantity} more for {nextTier.discount}% off
          </p>
        )}
      </div>
    </div>
  );
}
