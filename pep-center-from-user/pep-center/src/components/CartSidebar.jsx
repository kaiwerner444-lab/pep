import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, X, Truck, FlaskConical, RefreshCw, Package, Crown, Info } from 'lucide-react';

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeItem, 
    updateQuantity, 
    toggleSubscription,
    totalPrice, 
    subscriptionSavings,
    hasSubscription,
    hasFreeShipping,
    isLoyaltyTier,
    subscriptionTier,
    subscriptionBenefits,
  } = useCart();

  if (!isOpen) return null;

  // Group items by id AND subscription status
  const groupedItems = items.reduce((acc, item) => {
    const key = `${item.id}-${item.isSubscription}`;
    const existing = acc.find(i => i.key === key);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ 
        key,
        ...item,
      });
    }
    return acc;
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate shipping
  const shippingCost = hasFreeShipping ? 0 : 15;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0e17] border-l border-white/10 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0d1117]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#f97316]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Your Cart</h2>
              <p className="text-xs text-white/40">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Subscription Status Banner */}
        {hasSubscription && (
          <div className={`px-5 py-3 border-b ${isLoyaltyTier ? 'bg-amber-500/10 border-amber-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
            <div className="flex items-center gap-2">
              {isLoyaltyTier ? (
                <Crown className="w-5 h-5 text-amber-400" />
              ) : (
                <RefreshCw className="w-5 h-5 text-purple-400" />
              )}
              <div className="flex-1">
                <span className={`text-sm font-medium ${isLoyaltyTier ? 'text-amber-400' : 'text-purple-400'}`}>
                  {isLoyaltyTier ? 'Loyalty Tier Unlocked!' : `Subscription Order #${subscriptionTier + 1}`}
                </span>
                <p className="text-xs text-white/50">{subscriptionBenefits}</p>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-white font-semibold mb-2">Your cart is empty</h3>
              <p className="text-sm text-white/40 mb-6">Add some research peptides to get started</p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-[#f97316] text-white font-medium rounded-xl hover:bg-[#ea580c] transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {groupedItems.map((item) => (
                <div 
                  key={item.key} 
                  className={`flex gap-4 p-4 rounded-2xl border transition-colors ${
                    item.isSubscription 
                      ? isLoyaltyTier ? 'bg-amber-500/[0.05] border-amber-500/30' : 'bg-purple-500/[0.05] border-purple-500/30'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Product Image */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.isSubscription 
                      ? isLoyaltyTier ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-purple-500/10 border border-purple-500/20'
                      : 'bg-[#f97316]/10 border border-[#f97316]/20'
                  }`}>
                    {item.isSubscription ? (
                      isLoyaltyTier ? <Crown className="w-8 h-8 text-amber-400/60" /> : <RefreshCw className="w-8 h-8 text-purple-400/60" />
                    ) : (
                      <FlaskConical className="w-8 h-8 text-[#f97316]/60" />
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                        {item.isSubscription && (
                          <span className={`text-xs flex items-center gap-1 mt-0.5 ${isLoyaltyTier ? 'text-amber-400' : 'text-purple-400'}`}>
                            <RefreshCw className="w-3 h-3" /> 
                            Monthly Subscription
                            {isLoyaltyTier && <span className="text-amber-400">(10% off)</span>}
                            {!isLoyaltyTier && subscriptionTier === 1 && <span className="text-purple-400">(5% off + Free ship)</span>}
                            {!isLoyaltyTier && subscriptionTier === 0 && <span className="text-purple-400">(5% off)</span>}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.isSubscription)}
                        className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-white/40 mb-2">{item.subtitle || 'Research Peptide'}</p>
                    
                    {/* Subscription Toggle */}
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => toggleSubscription(item.id, item.isSubscription)}
                        className={`text-xs px-2 py-1 rounded-lg border transition-colors ${
                          item.isSubscription
                            ? isLoyaltyTier 
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                              : 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                            : 'bg-white/5 border-white/10 text-white/50 hover:text-white/70'
                        }`}
                      >
                        {item.isSubscription ? 'Switch to One-time' : 'Make Subscription'}
                      </button>
                    </div>
                    
                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity - 1)}
                          className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 text-white/60" />
                        </button>
                        <span className="text-sm font-medium text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                          className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white/60" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${item.isSubscription ? isLoyaltyTier ? 'text-amber-400' : 'text-purple-400' : 'text-[#f97316]'}`}>
                          ${(item.isSubscription ? item.subscriptionPrice : item.price) * item.quantity}
                        </span>
                        {item.isSubscription && (
                          <span className="text-xs text-white/30 block">
                            ${item.subscriptionPrice}/mo each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0d1117]">
            {/* Subscription Terms Notice */}
            {hasSubscription && !isLoyaltyTier && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-400/80">
                    <p className="font-medium mb-1">Subscription Terms</p>
                    <p>Canceling before 3 orders forfeits subscription pricing. Complete 3 orders to unlock 10% off permanently.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Free Shipping Progress */}
            {hasSubscription && subscriptionTier === 0 && (
              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping unlocks on your 2nd subscription order</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-1/3" />
                </div>
                <p className="text-xs text-white/30 mt-1">1 of 3 orders to loyalty tier</p>
              </div>
            )}
            
            {hasSubscription && subscriptionTier === 1 && (
              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>1 more order to unlock 10% off loyalty tier!</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-2/3" />
                </div>
                <p className="text-xs text-white/30 mt-1">2 of 3 orders to loyalty tier</p>
              </div>
            )}

            {hasFreeShipping && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Package className="w-4 h-4" />
                  <span>Free shipping on your subscription!</span>
                </div>
              </div>
            )}

            {/* Savings */}
            {subscriptionSavings > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className={isLoyaltyTier ? 'text-amber-400 text-sm' : 'text-purple-400 text-sm'}>
                  Subscription Savings
                </span>
                <span className={`font-medium ${isLoyaltyTier ? 'text-amber-400' : 'text-purple-400'}`}>
                  -${subscriptionSavings.toFixed(2)}/mo
                </span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">Shipping</span>
              <span className="text-white text-sm">
                {hasFreeShipping ? 'FREE' : '$15.00'}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/10">
              <div>
                <span className="text-white/60 block">Subtotal</span>
                {hasSubscription && (
                  <span className={`text-xs ${isLoyaltyTier ? 'text-amber-400' : 'text-purple-400'}`}>
                    {isLoyaltyTier ? 'Loyalty tier pricing' : `Order #${subscriptionTier + 1} pricing`}
                  </span>
                )}
              </div>
              <span className="text-2xl font-bold text-white">${finalTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-center py-4 rounded-xl font-semibold transition-colors ${
                hasSubscription
                  ? isLoyaltyTier
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-[#f97316] text-white hover:bg-[#ea580c]'
              }`}
            >
              {hasSubscription ? 'Subscribe & Checkout' : 'Proceed to Checkout'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
