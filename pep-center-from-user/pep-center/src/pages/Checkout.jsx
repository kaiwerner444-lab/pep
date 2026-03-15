import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  Check, 
  Package,
  MapPin,
  AlertCircle,
  RefreshCw, 
  Info,
  Loader2,
  User,
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
];

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 15, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 35, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 65, time: 'Next business day' },
];

export default function Checkout() {
  const { items, totalPrice, clearCart, hasSubscription, hasFreeShipping, subscriptionTier, isLoyaltyTier, subscriptionBenefits, incrementSubscriptionTier } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: profile?.full_name?.split(' ')[0] || '',
    lastName: profile?.full_name?.split(' ').slice(1).join(' ') || '',
    phone: profile?.phone || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    paymentMethod: 'stripe',
    shippingMethod: 'standard',
    notes: '',
    fdaAcknowledged: false,
  });

  // Update form when user loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        firstName: profile?.full_name?.split(' ')[0] || prev.firstName,
        lastName: profile?.full_name?.split(' ').slice(1).join(' ') || prev.lastName,
        phone: profile?.phone || prev.phone,
      }));
    }
  }, [user, profile]);

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
        <SEO title="Checkout" description="Complete your order" noindex={true} path="/checkout" />
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
  const finalShipping = hasFreeShipping ? 0 : shipping;
  const total = totalPrice + finalShipping;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    // Analytics: track checkout start
    if (typeof window !== 'undefined' && window.pepTrack) {
      window.pepTrack.checkoutStart();
    }

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
        userId: user?.id || null,
        metadata: {
          notes: formData.notes,
          userAgent: navigator.userAgent,
        },
      };

      if (formData.paymentMethod === 'stripe') {
        const response = await fetch('/.netlify/functions/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        window.location.href = data.url;
        return;

      } else {
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

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-white/60 mb-6">Order #{orderNumber} has been received.</p>
          <Link to="/products" className="px-8 py-3 bg-[#f97316] text-white rounded-xl font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <SEO title="Checkout" description="Complete your purchase with secure payment. HPLC-verified peptides and research compounds." noindex={true} path="/checkout" />
      <div className="max-w-6xl mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8">
          <ChevronLeft className="w-5 h-5" />
          Continue Shopping
        </Link>

        {/* Guest Login Prompt */}
        {!user && (
          <AnimatedSection animation="fadeUp" className="mb-6">
            <div className="p-4 rounded-xl bg-[#f97316]/10 border border-[#f97316]/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#f97316]" />
                  <div>
                    <p className="text-white font-medium">Have an account?</p>
                    <p className="text-white/60 text-sm">Sign in to track orders and keep your subscription tier across devices</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link 
                    to="/login" 
                    state={{ from: { pathname: '/checkout' } }}
                    className="px-4 py-2 bg-[#f97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register"
                    className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

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
                                {hasFreeShipping ? 'FREE' : `$${option.price}`}
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
                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-[#f97316] bg-[#f97316]/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-5 h-5 accent-[#f97316]"
                      />
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${method.color}20` }}>
                        <method.icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{method.name}</span>
                        </div>
                        <span className="text-white/50 text-sm">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm text-white/60 mb-2">Order Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316] resize-none"
                    placeholder="Any special instructions..."
                  />
                </div>
              </AnimatedSection>
            )}

            {/* FDA Acknowledgment */}
            {step === 3 && (
              <AnimatedSection animation="fadeUp" className="mt-8 p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.fdaAcknowledged}
                    onChange={(e) => setFormData({...formData, fdaAcknowledged: e.target.checked})}
                    className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-amber-500"
                  />
                  <div className="text-sm text-white/70">
                    <span className="text-amber-400 font-medium">Required: </span>
                    I acknowledge that these products are for 
                    <strong className="text-white"> research use only</strong> and 
                    <strong className="text-white"> NOT for human consumption</strong>.
                  </div>
                </label>
              </AnimatedSection>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={handleBack} className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={handleNext} className="flex-1 px-6 py-3 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c]">
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.fdaAcknowledged}
                  className="flex-1 px-6 py-3 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <Package className="w-6 h-6 text-white/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
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
                  <span className="text-white">{hasFreeShipping ? 'FREE' : `$${finalShipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-[#f97316]">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {hasSubscription && (
                <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-400">Subscription Order #{subscriptionTier + 1}</h4>
                      <p className="text-sm text-white/60">{subscriptionBenefits}</p>
                    </div>
                  </div>
                </div>
              )}
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
