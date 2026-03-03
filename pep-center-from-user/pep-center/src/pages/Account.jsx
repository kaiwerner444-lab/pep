import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Package, Crown, RefreshCw, LogOut, ChevronRight, Star } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Account() {
  const { user, profile, signOut, subscriptionTier, hasFreeShipping, isLoyaltyTier } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  }

  if (!user) return null;

  const getTierColor = () => {
    if (isLoyaltyTier) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (subscriptionTier >= 1) return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    return 'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/30';
  };

  const getTierName = () => {
    if (isLoyaltyTier) return 'Loyalty Member';
    if (subscriptionTier >= 1) return 'Subscriber';
    return 'New Member';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeUp" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My <span className="text-[#f97316]">Account</span>
              </h1>
              <p className="text-white/60">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Subscription Status */}
          <AnimatedSection animation="fadeUp" delay={100} className="md:col-span-2">
            <div className={`p-6 rounded-2xl border ${getTierColor()}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  {isLoyaltyTier ? (
                    <Crown className="w-7 h-7 text-amber-400" />
                  ) : (
                    <Star className="w-7 h-7 text-[#f97316]" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{getTierName()}</h2>
                  <p className="text-white/60">
                    Order #{subscriptionTier + 1} Pricing
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-white">{subscriptionTier >= 1 ? '5%' : '0%'}</p>
                  <p className="text-xs text-white/50">Current Discount</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-white">{hasFreeShipping ? 'FREE' : '$15'}</p>
                  <p className="text-xs text-white/50">Shipping</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-white">{isLoyaltyTier ? '10%' : subscriptionTier >= 1 ? '5%' : '5%'}</p>
                  <p className="text-xs text-white/50">Next Order Discount</p>
                </div>
              </div>

              {!isLoyaltyTier && (
                <div className="mt-6">
                  <p className="text-sm text-white/60 mb-2">
                    Complete {3 - subscriptionTier} more order{3 - subscriptionTier !== 1 ? 's' : ''} to unlock Loyalty Tier (10% off + free shipping)
                  </p>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#f97316] rounded-full transition-all"
                      style={{ width: `${(subscriptionTier / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fadeUp" delay={150}>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/products" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-white/70">Browse Products</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </Link>
                <Link to="/bundles" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-white/70">View Bundles</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </Link>
                <Link to="/orders" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-white/70">Order History</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Order History */}
        <AnimatedSection animation="fadeUp" delay={200}>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#f97316]" />
              Recent Orders
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/60 mb-4">No orders yet</p>
                <Link to="/products" className="px-6 py-2 bg-[#f97316] text-white rounded-xl">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="font-medium text-white">{order.order_number}</p>
                      <p className="text-sm text-white/50">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#f97316]">${order.total?.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
