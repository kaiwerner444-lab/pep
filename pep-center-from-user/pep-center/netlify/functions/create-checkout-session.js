const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // CORS headers
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
    const { items, customer, shipping, metadata, isSubscription } = JSON.parse(event.body);
    
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

    // Prepare order data for Supabase
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
      payment_method: 'stripe',
      notes: metadata?.notes || null,
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

    // Create Stripe Checkout session
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: items.map(item => {
        const unitPrice = item.isSubscription ? item.subscriptionPrice : item.price;
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.subtitle || 'Research Peptide',
              metadata: {
                product_id: item.id,
              },
            },
            unit_amount: Math.round(unitPrice * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      }),
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${process.env.URL || 'https://pep.center'}/order-success?order=${orderNumber}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'https://pep.center'}/checkout?canceled=true`,
      customer_email: customer.email,
      metadata: {
        order_id: order.id,
        order_number: orderNumber,
        customer_email: customer.email,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCost * 100,
              currency: 'usd',
            },
            display_name: shipping.method === 'express' ? 'Express Shipping (2-3 days)' : 
                          shipping.method === 'overnight' ? 'Overnight Shipping' : 'Standard Shipping (5-7 days)',
          },
        },
      ],
    };

    // Add subscription-specific config if needed
    if (isSubscription) {
      // For subscriptions, you'd need to set up Stripe Products and Prices
      // For now, we'll handle this in the success webhook
      sessionConfig.subscription_data = {
        metadata: {
          order_id: order.id,
          order_number: orderNumber,
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({ 
        stripe_session_id: session.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
        orderNumber: orderNumber,
        orderId: order.id,
      }),
    };

  } catch (error) {
    console.error('Checkout error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.stack,
      }),
    };
  }
};
