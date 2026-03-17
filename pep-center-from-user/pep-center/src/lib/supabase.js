import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Gracefully handle missing env vars so the site renders for SEO/browsing
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Order types for reference
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  CRYPTO: 'crypto',
  ZELLE: 'zelle',
  WIRE: 'wire',
};

// Save order to Supabase
export async function createOrder(orderData) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Get order by ID
export async function getOrder(orderId) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  
  if (error) throw error;
  return data;
}

// Update order status
export async function updateOrderStatus(orderId, status) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
