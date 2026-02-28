import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronLeft, Clock, CheckCircle, Truck, X } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

const statusColors = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending Payment' },
  processing: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Processing' },
  shipped: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Shipped' },
  delivered: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Delivered' },
  cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Cancelled' },
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: X,
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Sort by date, newest first
    savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(savedOrders);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Link to="/products" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            Back to Shop
          </Link>
          
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white/30" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">No Orders Yet</h1>
          <p className="text-white/50 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-white/50 hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Orders</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {orders.map((order, index) => {
              const StatusIcon = statusIcons[order.status] || Clock;
              const statusStyle = statusColors[order.status] || statusColors.pending;
              
              return (
                <AnimatedSection key={order.orderNumber} animation="fadeUp" delay={index * 100}>
                  <div
                    onClick={() => setSelectedOrder(order)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedOrder?.orderNumber === order.orderNumber
                        ? 'border-[#f97316] bg-[#f97316]/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-white font-mono text-sm">{order.orderNumber}</p>
                        <p className="text-white/40 text-xs">{formatDate(order.date)}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusStyle.bg}`}>
                        <StatusIcon className={`w-4 h-4 ${statusStyle.text}`} />
                        <span className={`text-xs font-medium ${statusStyle.text}`}>
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center"
                          >
                            <Package className="w-5 h-5 text-white/40" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center text-xs text-white/40">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60 text-sm">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${order.totals.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Order Number</p>
                    <p className="text-white font-mono">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Date Placed</p>
                    <p className="text-white">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Payment Method</p>
                    <p className="text-white capitalize">{selectedOrder.payment.method}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <p className="text-xs text-white/40 uppercase mb-2">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-white/70">{item.name} x{item.quantity}</span>
                        <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span>${selectedOrder.totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      <span>${selectedOrder.totals.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>${selectedOrder.totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/40 uppercase mb-2">Shipping Address</p>
                  <div className="text-sm text-white/70">
                    <p>{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p>{selectedOrder.shipping.address}</p>
                    <p>{selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.zip}</p>
                    <p>{selectedOrder.shipping.country}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-24 text-center">
                <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
