import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-white/50 mb-6">Add some products to get started with your research order.</p>
          <Link to="/" className="px-6 py-3 rounded-lg bg-scientific-orange text-navy-primary font-semibold hover:bg-scientific-orange/90 transition-colors">
            Return to catalog
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice >= 100 ? 0 : 15;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-scientific-orange/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-xs text-white/50">{item.subtitle}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm hover:bg-white/20"
                          >
                            −
                          </button>
                          <span className="text-sm font-mono w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-sm hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-scientific-orange">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Payment</h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-mono">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="font-mono">{shipping === 0 ? <span className="text-green-400">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {totalPrice < 100 && (
                  <p className="text-xs text-white/40">Free shipping on orders over $100</p>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold font-mono text-scientific-orange">
                    ${(totalPrice + shipping).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Stripe placeholder */}
              <div className="p-4 rounded-lg border border-white/10 bg-white/5 text-center mb-4">
                <p className="text-sm text-white/50 mb-2">Stripe is not configured. Please contact support.</p>
                <p className="text-xs text-white/30">
                  To enable payments, add your Stripe publishable key to your environment variables.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
