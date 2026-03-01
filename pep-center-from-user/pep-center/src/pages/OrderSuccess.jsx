import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Order Found</h1>
          <Link to="/products" className="text-[#f97316]">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-white/60 mb-2">
          Thank you for your order. A confirmation has been sent to {order.customer.email}
        </p>
        
        <p className="text-[#f97316] font-mono text-lg mb-8">
          Order #{order.orderNumber}
        </p>
        
        <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-white mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>${order.totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Shipping</span>
              <span>${order.totals.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/10">
              <span>Total Paid</span>
              <span>${order.totals.total.toFixed(2)}</span>
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
    </div>
  );
}
