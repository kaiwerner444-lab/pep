import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  RefreshCw,
  Download,
  Eye,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const STATUS_COLORS = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  paid: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  processing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  shipped: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  expired: 'bg-white/10 text-white/40 border-white/20',
};

const STATUS_LABELS = {
  pending: 'Pending Payment',
  paid: 'Paid',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    paid: 0,
    shipped: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
      
      // Calculate stats
      const stats = {
        total: data?.length || 0,
        pending: data?.filter(o => o.status === 'pending').length || 0,
        paid: data?.filter(o => o.status === 'paid').length || 0,
        shipped: data?.filter(o => o.status === 'shipped').length || 0,
        revenue: data?.reduce((sum, o) => sum + (o.total || 0), 0) || 0,
      };
      setStats(stats);
      
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Make sure Supabase is configured.');
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      // Refresh orders
      fetchOrders();
      
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Failed to update order status');
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  function exportToCSV() {
    const headers = ['Order #', 'Date', 'Customer', 'Email', 'Status', 'Total', 'Items'];
    const rows = orders.map(o => [
      o.order_number,
      new Date(o.created_at).toLocaleDateString(),
      o.customer_name,
      o.customer_email,
      o.status,
      o.total,
      o.items?.length || 0,
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Orders</h1>
            <p className="text-white/60 mt-1">Manage and track all orders</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-white/50 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-white/50 text-sm">Pending</p>
            <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-white/50 text-sm">Paid</p>
            <p className="text-2xl font-bold text-blue-400">{stats.paid}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-white/50 text-sm">Shipped</p>
            <p className="text-2xl font-bold text-cyan-400">{stats.shipped}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-white/50 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-[#f97316]">${stats.revenue.toFixed(0)}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No orders found</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div 
                    className="flex flex-col lg:flex-row lg:items-center gap-4 cursor-pointer"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-[#f97316]">{order.order_number}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[order.status]}`}>
                          {STATUS_LABELS[order.status]}
                        </span>
                        {order.has_subscription && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            Subscription
                          </span>
                        )}
                      </div>
                      <p className="text-white font-medium">{order.customer_name}</p>
                      <p className="text-white/50 text-sm">{order.customer_email}</p>
                    </div>

                    {/* Date & Total */}
                    <div className="lg:text-right">
                      <p className="text-white font-semibold">${order.total?.toFixed(2)}</p>
                      <p className="text-white/50 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-white/30 text-xs">
                        {order.items?.length || 0} items
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, e.target.value);
                        }}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#f97316]"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-white/40" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/40" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Customer Details */}
                        <div>
                          <h4 className="text-white font-medium mb-2">Customer</h4>
                          <div className="space-y-1 text-sm text-white/60">
                            <p>{order.customer_name}</p>
                            <p>{order.customer_email}</p>
                            {order.customer_phone && <p>{order.customer_phone}</p>}
                          </div>
                        </div>

                        {/* Shipping */}
                        <div>
                          <h4 className="text-white font-medium mb-2">Shipping</h4>
                          <div className="space-y-1 text-sm text-white/60">
                            <p>{order.shipping_address?.line1}</p>
                            <p>{order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.postal_code}</p>
                            <p>{order.shipping_address?.country}</p>
                            <p className="text-[#f97316]">Method: {order.shipping_method}</p>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="md:col-span-2">
                          <h4 className="text-white font-medium mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/60">
                                    {item.qty}x
                                  </span>
                                  <span className="text-white text-sm">{item.name}</span>
                                  {item.is_subscription && (
                                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400">
                                      Subscription
                                    </span>
                                  )}
                                </div>
                                <span className="text-white/60 text-sm">${(item.price * item.qty).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between">
                            <span className="text-white/60">Total</span>
                            <span className="text-[#f97316] font-bold">${order.total?.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                          <div className="md:col-span-2">
                            <h4 className="text-white font-medium mb-2">Notes</h4>
                            <p className="text-white/60 text-sm">{order.notes}</p>
                          </div>
                        )}

                        {/* Payment Info */}
                        <div className="md:col-span-2">
                          <h4 className="text-white font-medium mb-2">Payment</h4>
                          <div className="text-sm text-white/60">
                            <p>Method: {order.payment_method}</p>
                            {order.stripe_payment_intent_id && (
                              <p>Stripe ID: {order.stripe_payment_intent_id}</p>
                            )}
                            {order.paid_at && (
                              <p>Paid at: {new Date(order.paid_at).toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center text-sm text-white/40">
          <p>Showing {filteredOrders.length} of {orders.length} orders</p>
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
