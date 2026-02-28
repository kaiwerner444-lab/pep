import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, X, Truck, FlaskConical } from 'lucide-react';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  // Group items by name and calculate totals
  const groupedItems = items.reduce((acc, item) => {
    const existing = acc.find(i => i.name === item.name && i.price === item.price);
    if (existing) {
      existing.quantity += item.quantity;
      existing.ids.push(item.id);
    } else {
      acc.push({ ...item, ids: [item.id] });
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
                  key={item.ids[0]} 
                  className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-8 h-8 text-[#f97316]/60" />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                      <button 
                        onClick={() => item.ids.forEach(id => removeItem(id))}
                        className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-white/40 mb-3">{item.subtitle || 'Research Peptide'}</p>
                    
                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.ids[0], item.quantity - 1)}
                          className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 text-white/60" />
                        </button>
                        <span className="text-sm font-medium text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.ids[0], item.quantity + 1)}
                          className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white/60" />
                        </button>
                      </div>
                      <span className="text-lg font-bold text-[#f97316]">${item.price * item.quantity}</span>
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
            {totalPrice < 100 && (
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
            
            {totalPrice >= 100 && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Truck className="w-4 h-4" />
                  <span>You qualify for free shipping!</span>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60">Subtotal</span>
              <span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 rounded-xl bg-[#f97316] text-white font-semibold hover:bg-[#ea580c] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
