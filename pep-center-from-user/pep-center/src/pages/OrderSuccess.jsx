import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Mail, Clock, Download } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const orderNumber = searchParams.get('order');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // If coming from Stripe, order is in URL
    // Otherwise check localStorage for recent order
    if (orderNumber) {
      // Could fetch from Supabase here if needed
      setOrder({ orderNumber });
      setLoading(false);
    } else {
      // Check localStorage for last order
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const lastOrder = orders[orders.length - 1];
      if (lastOrder) {
        setOrder(lastOrder);
      }
      setLoading(false);
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order && !orderNumber) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Order Found</h1>
          <p className="text-white/60 mb-6">We couldn't find your order details.</p>
          <Link to="/products" className="px-6 py-3 bg-[#f97316] text-white rounded-xl">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection animation="fadeUp" className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            {sessionId ? 'Payment Successful!' : 'Order Confirmed!'}
          </h1>
          
          <p className="text-white/60 mb-2">
            {sessionId 
              ? 'Thank you for your payment. Your order is being processed.'
              : 'Thank you for your order. Payment instructions have been sent to your email.'
            }
          </p>
          
          {orderNumber && (
            <p className="text-[#f97316] font-mono text-lg">
              Order #{orderNumber}
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={100}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#f97316]" />
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[#f97316] font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Order Confirmation</p>
                  <p className="text-white/60 text-sm">
                    Check your email for order details and tracking information
                  </p>
                </div>
              </div>

              {!sessionId && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#f97316] font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Complete Payment</p>
                    <p className="text-white/60 text-sm">
                      Follow the payment instructions sent to your email within 24 hours
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[#f97316] font-bold">
                    {sessionId ? '2' : '3'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">Processing</p>
                  <p className="text-white/60 text-sm">
                    Your order will be processed and shipped within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[#f97316] font-bold">
                    {sessionId ? '3' : '4'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">Delivery</p>
                  <p className="text-white/60 text-sm">
                    Discrete packaging with tracking number provided via email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="px-8 py-3 bg-[#f97316] text-white rounded-xl font-medium text-center hover:bg-[#ea580c] transition-colors"
            >
              Continue Shopping
            </Link>
            
            <a 
              href="mailto:support@pep.center"
              className="px-8 py-3 bg-white/5 text-white rounded-xl font-medium text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
          </div>
        </AnimatedSection>

        {/* Important Notes */}
        <AnimatedSection animation="fadeUp" delay={300} className="mt-8">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-medium mb-1">Research Use Only</h4>
                <p className="text-white/60 text-sm">
                  All products are sold strictly for laboratory research purposes. 
                  Not for human or animal consumption. By purchasing, you agree to our Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
