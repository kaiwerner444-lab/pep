import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  Check, 
  Bitcoin,
  Banknote,
  Smartphone,
  AlertCircle,
  Package,
  MapPin,
  Mail,
  User,
  Phone,
  Droplets,
  Plus,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

const paymentMethods = [
  { 
    id: 'stripe', 
    name: 'Credit Card', 
    icon: CreditCard, 
    desc: 'Secure checkout with Stripe',
    color: '#f97316',
    badge: 'Instant',
  },
  { 
    id: 'crypto', 
    name: 'Cryptocurrency', 
    icon: Bitcoin, 
    desc: 'BTC, ETH, USDT',
    color: '#f97316',
    badge: 'Private',
  },
  { 
    id: 'zelle', 
    name: 'Zelle', 
    icon: Smartphone, 
    desc: 'Fast bank transfer',
    color: '#f97316',
    badge: 'Fast',
  },
  { 
    id: 'wire', 
    name: 'Wire Transfer', 
    icon: Banknote, 
    desc: 'ACH / Domestic wire',
    color: '#fdba74',
    badge: 'Bulk',
  },
];

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 15, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 35, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 65, time: 'Next business day' },
];

export default function Checkout() {
  const { items, totalPrice, clearCart, hasSubscription } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    paymentMethod: 'stripe',
    shippingMethod: 'standard',
    notes: '',
  });

  // Check for cancelled checkout
  useEffect(() => {
    if (searchParams.get('canceled')) {
      setError('Payment was cancelled. You can try again.');
    }
  }, [searchParams]);

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white/30" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link to="/products" className="px-6 py-3 bg-[#f97316] text-white rounded-xl font-medium">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const shipping = shippingOptions.find(s => s.id === formData.shippingMethod)?.price || 15;
  // Free shipping for subscriptions
  const finalShipping = hasSubscription ? 0 : shipping;
  const total = totalPrice + finalShipping;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          subtitle: item.subtitle,
          price: item.price,
          subscriptionPrice: item.subscriptionPrice,
          quantity: item.quantity,
          isSubscription: item.isSubscription,
        })),
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          method: formData.shippingMethod,
          cost: finalShipping,
        },
        paymentMethod: formData.paymentMethod,
        isSubscription: hasSubscription,
        metadata: {
          notes: formData.notes,
          userAgent: navigator.userAgent,
        },
      };

      if (formData.paymentMethod === 'stripe') {
        // Create Stripe Checkout session
        const response = await fetch('/.netlify/functions/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Stripe Checkout
        window.location.href = data.url;
        return;

      } else {
        // Create order for non-Stripe payments
        const response = await fetch('/.netlify/functions/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create order');
        }

        setOrderNumber(data.orderNumber);
        setOrderComplete(true);
        clearCart();
      }

    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Order Complete View
  if (orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-white/60 mb-6">
            Order #{orderNumber} has been received. You will receive payment instructions via email shortly.
          </p>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#f97316] font-bold">1</span>
                </div>
                <p className="text-white/60 text-sm">Check your email for payment instructions</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#f97316] font-bold">2</span>
                </div>
                <p className="text-white/60 text-sm">Complete payment within 24 hours</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#f97316] font-bold">3</span>
                </div>
                <p className="text-white/60 text-sm">Order ships within 24-48 hours of payment</p>
              </div>
            </div>
          </div>

          <Link to="/products" className="px-8 py-3 bg-[#f97316] text-white rounded-xl font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8">
          <ChevronLeft className="w-5 h-5" />
          Continue Shopping
        </Link>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s ? 'bg-[#f97316] text-white' : 'bg-white/10 text-white/40'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-0.5 transition-colors ${
                      step > s ? 'bg-[#f97316]' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact */}
            {step === 1 && (
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                      placeholder="123 Research Ave"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">State *</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Country *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm text-white/60 mb-3">Shipping Method</label>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                            formData.shippingMethod === option.id
                              ? 'border-[#f97316] bg-[#f97316]/5'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={formData.shippingMethod === option.id}
                            onChange={(e) => setFormData({...formData, shippingMethod: e.target.value})}
                            className="w-5 h-5 accent-[#f97316]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">{option.name}</span>
                              <span className="text-[#f97316] font-semibold">
                                {hasSubscription ? 'FREE' : `$${option.price}`}
                              </span>
                            </div>
                            <span className="text-white/50 text-sm">{option.time}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                
                {hasSubscription && (
                  <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <div className="flex items-center gap-2 text-purple-400">
                      <RefreshCw className="w-5 h-5" />
                      <span>You have subscription items - Credit Card required for recurring billing</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-[#f97316] bg-[#f97316]/5'
                          : 'border-white/10 hover:border-white/20'
                      } ${hasSubscription && method.id !== 'stripe' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        disabled={hasSubscription && method.id !== 'stripe'}
                        className="w-5 h-5 accent-[#f97316]"
                      />
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center`}
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <method.icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{method.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/50 text-xs">
                            {method.badge}
                          </span>
                        </div>
                        <span className="text-white/50 text-sm">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Payment Instructions */}
                {formData.paymentMethod !== 'stripe' && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {formData.paymentMethod === 'crypto' && 'Cryptocurrency Payment'}
                          {formData.paymentMethod === 'zelle' && 'Zelle Payment'}
                          {formData.paymentMethod === 'wire' && 'Wire Transfer'}
                        </h4>
                        <p className="text-white/60 text-sm">
                          After placing your order, you will receive detailed payment instructions via email. 
                          Orders are processed once payment is confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Notes */}
                <div className="mt-6">
                  <label className="block text-sm text-white/60 mb-2">Order Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                    placeholder="Any special instructions..."
                  />
                </div>
              </AnimatedSection>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors font-semibold"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                    hasSubscription 
                      ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                      : 'bg-[#f97316] hover:bg-[#ea580c] text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : hasSubscription ? (
                    'Subscribe & Pay'
                  ) : (
                    'Place Order'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      item.isSubscription ? 'bg-purple-500/10' : 'bg-white/5'
                    }`}>
                      {item.isSubscription ? (
                        <RefreshCw className="w-6 h-6 text-purple-400" />
                      ) : (
                        <Package className="w-6 h-6 text-white/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      <p className="text-white/50 text-xs">
                        Qty: {item.quantity}
                        {item.isSubscription && <span className="text-purple-400 ml-1">(Monthly)</span>}
                      </p>
                    </div>
                    <span className="text-white/70 text-sm">
                      ${((item.isSubscription ? item.subscriptionPrice : item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">
                    {hasSubscription ? 'FREE' : `$${finalShipping.toFixed(2)}`}
                  </span>
                </div>
                {hasSubscription && (
                  <div className="flex justify-between text-sm text-purple-400">
                    <span>Subscription Discount</span>
                    <span>10% off</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-[#f97316]">${total.toFixed(2)}</span>
                </div>
                {hasSubscription && (
                  <p className="text-xs text-purple-400 text-right">Billed monthly</p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Truck className="w-4 h-4" />
                  <span>Discrete packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
