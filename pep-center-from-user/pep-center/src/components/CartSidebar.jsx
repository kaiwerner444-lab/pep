import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, X, Truck, FlaskConical, RefreshCw, Package } from 'lucide-react';

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
    hasSubscription 
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

        {/* Subscription Banner */}
        {hasSubscription && (
          <div className="px-5 py-3 bg-purple-500/10 border-b border-purple-500/20">
            <div className="flex items-center gap-2 text-sm text-purple-400">
              <RefreshCw className="w-4 h-4" />
              <span>You have subscription items - monthly delivery</span>
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
                      ? 'bg-purple-500/[0.05] border-purple-500/30' 
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Product Image */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.isSubscription ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-[#f97316]/10 border border-[#f97316]/20'
                  }`}>
                    {item.isSubscription ? (
                      <RefreshCw className="w-8 h-8 text-purple-400/60" />
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
                          <span className="text-xs text-purple-400 flex items-center gap-1 mt-0.5">
                            <RefreshCw className="w-3 h-3" /> Monthly Subscription
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
                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
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
                        <span className={`text-lg font-bold ${item.isSubscription ? 'text-purple-400' : 'text-[#f97316]'}`}>
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
            {/* Free Shipping Progress */}
            {totalPrice < 100 && !hasSubscription && (
              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                  <Truck className="w-4 h-4" />
                  <span>Add ${(100 - totalPrice).toFixed(0)} more for free shipping</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#f97316] rounded-full transition-all"
                    style={{ width: `${Math.min((totalPrice / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            
            {totalPrice >= 100 && !hasSubscription && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Truck className="w-4 h-4" />
                  <span>You qualify for free shipping!</span>
                </div>
              </div>
            )}

            {hasSubscription && (
              <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 text-sm text-purple-400">
                  <Package className="w-4 h-4" />
                  <span>Free shipping on all subscriptions!</span>
                </div>
              </div>
            )}

            {/* Savings */}
            {subscriptionSavings > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 text-sm">Subscription Savings</span>
                <span className="text-purple-400 font-medium">-${subscriptionSavings.toFixed(2)}/mo</span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/10">
              <div>
                <span className="text-white/60 block">Subtotal</span>
                {hasSubscription && (
                  <span className="text-xs text-purple-400">Monthly recurring</span>
                )}
              </div>
              <span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-center py-4 rounded-xl font-semibold transition-colors ${
                hasSubscription
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
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
