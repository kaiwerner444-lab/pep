import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Mail, Clock, Star } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tierUpgraded, setTierUpgraded] = useState(false);
  const { clearCart, incrementSubscriptionTier, subscriptionTier } = useCart();
  const { user } = useAuth();

  const orderNumber = searchParams.get('order');
  const sessionId = searchParams.get('session_id');
  const isSubscription = searchParams.get('subscription') === 'true';
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    async function handleSuccess() {
      // Only process if payment was successful
      if (sessionId && !canceled) {
        clearCart();
        
        // If this was a subscription order, increment tier
        if (isSubscription) {
          const newTier = await incrementSubscriptionTier();
          setTierUpgraded(newTier > subscriptionTier);
        }
      }
      
      if (orderNumber) {
        setOrder({ orderNumber });

        // Analytics: track checkout complete
        if (typeof window !== 'undefined' && window.pepTrack) {
          window.pepTrack.checkoutComplete(orderNumber);
        }
      }

      setLoading(false);
    }
    
    handleSuccess();
  }, [orderNumber, sessionId, canceled, isSubscription, clearCart, incrementSubscriptionTier, subscriptionTier]);

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

  // If payment was canceled
  if (canceled) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-amber-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Canceled
          </h1>
          
          <p className="text-white/60 mb-2">
            Your payment was not completed. Your cart has been saved and you can try again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              to="/checkout" 
              className="px-8 py-3 bg-[#f97316] text-white rounded-xl font-medium hover:bg-[#ea580c] transition-colors"
            >
              Return to Checkout
            </Link>
            
            <Link 
              to="/products" 
              className="px-8 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
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
            Payment Successful!
          </h1>
          
          <p className="text-white/60 mb-2">
            Thank you for your payment. Your order is being processed.
          </p>
          
          {orderNumber && (
            <p className="text-[#f97316] font-mono text-lg">
              Order #{orderNumber}
            </p>
          )}
        </AnimatedSection>

        {/* Subscription Tier Upgrade Notice */}
        {isSubscription && tierUpgraded && (
          <AnimatedSection animation="fadeUp" delay={50}>
            <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-purple-400 font-semibold">Subscription Tier Upgraded!</p>
                  <p className="text-white/60 text-sm">
                    You're now at Order #{subscriptionTier + 1} pricing. 
                    {subscriptionTier + 1 >= 2 ? ' Free shipping unlocked!' : ' Free shipping starts at Order #2.'}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

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

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[#f97316] font-bold">2</span>
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
                  <span className="text-sm text-[#f97316] font-bold">3</span>
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
            
            {user && (
              <Link 
                to="/account" 
                className="px-8 py-3 bg-white/5 text-white rounded-xl font-medium text-center hover:bg-white/10 transition-colors"
              >
                View My Account
              </Link>
            )}
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
