const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { items, customer, shipping, paymentMethod, metadata, isSubscription } = JSON.parse(event.body);
    
    // Calculate totals
    const subtotal = items.reduce((sum, item) => {
      const price = item.isSubscription ? item.subscriptionPrice : item.price;
      return sum + (price * item.quantity);
    }, 0);
    
    const shippingCost = shipping?.cost || 15;
    const total = subtotal + shippingCost;

    // Create Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Generate order number
    const orderNumber = 'PEP-' + Date.now().toString(36).toUpperCase();

    // Prepare order data
    const orderData = {
      order_number: orderNumber,
      status: 'pending',
      customer_email: customer.email,
      customer_name: `${customer.firstName} ${customer.lastName}`.trim(),
      customer_phone: customer.phone || null,
      shipping_address: {
        line1: shipping.address,
        city: shipping.city,
        state: shipping.state,
        postal_code: shipping.zip,
        country: shipping.country || 'US',
      },
      shipping_method: shipping.method,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.isSubscription ? item.subscriptionPrice : item.price,
        original_price: item.price,
        quantity: item.quantity,
        is_subscription: item.isSubscription || false,
      })),
      subtotal: subtotal,
      shipping_cost: shippingCost,
      total: total,
      has_subscription: isSubscription || false,
      metadata: metadata || {},
      payment_method: paymentMethod,
      notes: metadata?.notes || null,
      // For non-Stripe payments, generate payment instructions
      payment_instructions: generatePaymentInstructions(paymentMethod, total),
    };

    // Save order to Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      throw dbError;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        orderNumber: orderNumber,
        orderId: order.id,
        total: total,
        paymentInstructions: order.payment_instructions,
      }),
    };

  } catch (error) {
    console.error('Order creation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Internal server error',
      }),
    };
  }
};

function generatePaymentInstructions(method, amount) {
  const instructions = {
    crypto: {
      title: 'Cryptocurrency Payment',
      message: `Please send $${amount} worth of cryptocurrency to the wallet address that will be emailed to you within 5 minutes.`,
      details: [
        'Bitcoin (BTC), Ethereum (ETH), and USDT are accepted',
        'Payment must be received within 24 hours',
        'Order will be processed once payment is confirmed',
        'Include your order number in the transaction memo',
      ],
    },
    zelle: {
      title: 'Zelle Payment',
      message: `Please send $${amount} via Zelle to the email address that will be provided in your confirmation email.`,
      details: [
        'Zelle payments are typically instant',
        'Use your order number as the payment reference',
        'Payment must be received within 24 hours',
      ],
    },
    wire: {
      title: 'Wire Transfer',
      message: `Please initiate a wire transfer for $${amount}. Bank details will be provided in your confirmation email.`,
      details: [
        'Domestic wire transfers typically take 1-2 business days',
        'Include your order number in the wire reference',
        'International wires may take 3-5 business days',
      ],
    },
  };
  
  return instructions[method] || null;
}
