import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StripeProvider from '../components/StripeProvider';
import StripePaymentForm from '../components/StripePaymentForm';
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
  Plus
} from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

const paymentMethods = [
  { 
    id: 'crypto', 
    name: 'Cryptocurrency', 
    icon: Bitcoin, 
    desc: 'BTC, ETH, USDT, USDC',
    color: '#f97316'
  },
  { 
    id: 'zelle', 
    name: 'Zelle', 
    icon: Smartphone, 
    desc: 'Fast bank transfer',
    color: '#06b6d4'
  },
  { 
    id: 'wire', 
    name: 'Wire Transfer', 
    icon: Banknote, 
    desc: 'ACH / Domestic wire',
    color: '#8b5cf6'
  },
  { 
    id: 'card', 
    name: 'Credit Card', 
    icon: CreditCard, 
    desc: 'Secure card processing',
    color: '#ec4899'
  },
];

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 15, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 35, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 65, time: 'Next business day' },
];

export default function Checkout() {
  const { items, totalPrice, clearCart, addItem } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Stripe states
  const [clientSecret, setClientSecret] = useState('');
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  
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

  const [errors, setErrors] = useState({});

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white/30" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-white/50 mb-6">Add some products before checking out</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.firstName) newErrors.firstName = 'First name required';
    if (!formData.lastName) newErrors.lastName = 'Last name required';
    if (!formData.phone) newErrors.phone = 'Phone required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address required';
    if (!formData.city) newErrors.city = 'City required';
    if (!formData.state) newErrors.state = 'State required';
    if (!formData.zip) newErrors.zip = 'ZIP code required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate order number
    const newOrderNumber = 'PEP-' + Date.now().toString(36).toUpperCase();
    setOrderNumber(newOrderNumber);
    
    // Calculate totals
    const shipping = shippingOptions.find(s => s.id === formData.shippingMethod)?.price || 15;
    const subtotal = totalPrice;
    const total = subtotal + shipping;
    
    // Create order object
    const order = {
      orderNumber: newOrderNumber,
      date: new Date().toISOString(),
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
      },
      payment: {
        method: formData.paymentMethod,
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totals: {
        subtotal,
        shipping,
        total,
      },
      status: 'pending',
      notes: formData.notes,
    };
    
    // Save to localStorage (in real app, send to backend)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
  };

  const shipping = shippingOptions.find(s => s.id === formData.shippingMethod)?.price || 15;
  const total = totalPrice + shipping;

  // Create payment intent when reaching step 3 with Stripe
  useEffect(() => {
    if (step === 3 && formData.paymentMethod === 'stripe' && !clientSecret && items.length > 0) {
      createPaymentIntent();
    }
  }, [step, formData.paymentMethod, items.length]);

  const createPaymentIntent = async () => {
    setIsLoadingPayment(true);
    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'usd',
          metadata: {
            order_items: items.map(i => i.name).join(', '),
            customer_email: formData.email || 'pending',
          }
        }),
      });
      
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      console.error('Payment setup error:', error);
    }
    setIsLoadingPayment(false);
  };

  const handleStripeSuccess = (paymentIntent) => {
    const newOrderNumber = 'PEP-' + Date.now().toString(36).toUpperCase();
    
    const order = {
      orderNumber: newOrderNumber,
      date: new Date().toISOString(),
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
      },
      payment: {
        method: 'stripe',
        stripePaymentIntentId: paymentIntent.id,
        status: 'paid',
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      totals: {
        subtotal: totalPrice,
        shipping: shipping,
        total: total,
      },
      status: 'processing',
      notes: formData.notes,
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    clearCart();
    navigate('/order-success', { state: { order } });
  };

  // BAC Water Upsell Logic
  const hasBACWater = items.some(item => item.name?.toLowerCase().includes('bac water') || item.id?.includes('bac'));
  const hasPeptides = items.some(item => !item.name?.toLowerCase().includes('bac water') && !item.category?.toLowerCase().includes('supply'));
  const showBACUpsell = hasPeptides && !hasBACWater;

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="scaleIn">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-green-400" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Order Confirmed!
              </h1>
              <p className="text-white/60 mb-2">
                Thank you for your order. We've sent a confirmation to {formData.email}
              </p>
              <p className="text-[#f97316] font-mono text-lg mb-8">
                Order #{orderNumber}
              </p>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-white mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  to="/products" 
                  className="px-8 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link 
                  to="/orders" 
                  className="px-8 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  View Orders
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products" className="text-white/50 hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? 'bg-[#f97316] text-white' : 'bg-white/10 text-white/40'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 ${
                  step > s ? 'bg-[#f97316]' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
              
              {/* Step 1: Contact */}
              {step === 1 && (
                <AnimatedSection animation="fadeUp">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#f97316]" />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">First Name *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Last Name *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <AnimatedSection animation="fadeUp">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#f97316]" />
                    Shipping Address
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Street Address *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                          errors.address ? 'border-red-500' : 'border-white/10'
                        }`}
                        placeholder="123 Research Ave"
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">City *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                            errors.city ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="San Francisco"
                        />
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">State/Province *</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                            errors.state ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="CA"
                        />
                        {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">ZIP/Postal Code *</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => setFormData({...formData, zip: e.target.value})}
                          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors ${
                            errors.zip ? 'border-red-500' : 'border-white/10'
                          }`}
                          placeholder="94102"
                        />
                        {errors.zip && <p className="text-red-400 text-xs mt-1">{errors.zip}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Country</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316] transition-colors"
                        >
                          <option value="US" className="bg-[#0a0e17]">United States</option>
                          <option value="CA" className="bg-[#0a0e17]">Canada</option>
                          <option value="UK" className="bg-[#0a0e17]">United Kingdom</option>
                          <option value="AU" className="bg-[#0a0e17]">Australia</option>
                          <option value="OTHER" className="bg-[#0a0e17]">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="mt-6">
                      <label className="block text-sm text-white/60 mb-3">Shipping Method</label>
                      <div className="space-y-2">
                        {shippingOptions.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                              formData.shippingMethod === option.id
                                ? 'border-[#f97316] bg-[#f97316]/10'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={formData.shippingMethod === option.id}
                                onChange={(e) => setFormData({...formData, shippingMethod: e.target.value})}
                                className="w-4 h-4 accent-[#f97316]"
                              />
                              <div>
                                <p className="text-white font-medium">{option.name}</p>
                                <p className="text-white/50 text-sm">{option.time}</p>
                              </div>
                            </div>
                            <span className="text-[#f97316] font-semibold">${option.price}</span>
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
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#f97316]" />
                    Payment Method
                  </h2>
                  
                  {/* Payment Method Selection */}
                  <div className="space-y-3 mb-6">
                    {/* Stripe / Credit Card */}
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'stripe'
                          ? 'border-[#f97316] bg-[#f97316]/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="stripe"
                        checked={formData.paymentMethod === 'stripe'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-4 h-4 accent-[#f97316]"
                      />
                      <div className="w-12 h-12 rounded-xl bg-[#ec4899]/20 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-[#ec4899]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Credit/Debit Card</p>
                        <p className="text-white/50 text-sm">Visa, Mastercard, Amex, Apple Pay, Google Pay</p>
                      </div>
                    </label>

                    {/* Crypto */}
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'crypto'
                          ? 'border-[#f97316] bg-[#f97316]/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="crypto"
                        checked={formData.paymentMethod === 'crypto'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-4 h-4 accent-[#f97316]"
                      />
                      <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                        <Bitcoin className="w-6 h-6 text-[#f97316]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Cryptocurrency</p>
                        <p className="text-white/50 text-sm">BTC, ETH, USDT, USDC</p>
                      </div>
                    </label>

                    {/* Zelle */}
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'zelle'
                          ? 'border-[#f97316] bg-[#f97316]/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="zelle"
                        checked={formData.paymentMethod === 'zelle'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="w-4 h-4 accent-[#f97316]"
                      />
                      <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/20 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-[#06b6d4]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Zelle</p>
                        <p className="text-white/50 text-sm">Fast bank transfer</p>
                      </div>
                    </label>
                  </div>

                  {/* Stripe Payment Form */}
                  {formData.paymentMethod === 'stripe' && (
                    <>
                      {isLoadingPayment ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : clientSecret ? (
                        <StripeProvider>
                          <StripePaymentForm
                            clientSecret={clientSecret}
                            amount={Math.round(total * 100)}
                            onSuccess={handleStripeSuccess}
                          />
                        </StripeProvider>
                      ) : (
                        <div className="text-red-400 text-center py-4">
                          Error setting up payment. Please try again.
                        </div>
                      )}
                    </>
                  )}

                  {/* Crypto Payment Instructions */}
                  {formData.paymentMethod === 'crypto' && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-white font-medium mb-1">Crypto Payment Instructions</h4>
                          <p className="text-white/60 text-sm">
                            After placing your order, you will receive wallet addresses and payment instructions via email. 
                            Orders are processed once payment is confirmed (typically within 1 hour for most cryptocurrencies).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Zelle Payment Instructions */}
                  {formData.paymentMethod === 'zelle' && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-white font-medium mb-1">Zelle Payment Instructions</h4>
                          <p className="text-white/60 text-sm">
                            After placing your order, you will receive Zelle payment instructions via email. 
                            Please complete the transfer within 24 hours to avoid order cancellation.
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
                ) : formData.paymentMethod !== 'stripe' ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Place Order</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <Package className="w-6 h-6 text-white/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white/70 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* BAC Water Upsell */}
              {showBACUpsell && (
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-[#06b6d4]/10 to-blue-500/5 border border-[#06b6d4]/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm mb-1">Need BAC Water?</h4>
                      <p className="text-white/50 text-xs mb-3">
                        Your peptides need bacteriostatic water for reconstitution
                      </p>
                      <button
                        onClick={() => {
                          addItem({
                            id: 'bac-water-10ml-' + Date.now(),
                            name: 'BAC Water',
                            subtitle: '10ml Vial',
                            price: 12,
                            quantity: 1,
                            image: '/product_vial.jpg',
                            category: 'Lab Supplies'
                          });
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#06b6d4] text-white rounded-lg text-sm font-medium hover:bg-[#0891b2] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add for $12
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-[#f97316]">${total.toFixed(2)}</span>
                </div>
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
