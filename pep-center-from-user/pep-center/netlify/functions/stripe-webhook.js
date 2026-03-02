const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  // Create Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        
        // Update order status to paid
        const { error } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            stripe_payment_intent_id: session.payment_intent,
            stripe_customer_id: session.customer,
            paid_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_session_id', session.id);

        if (error) {
          console.error('Error updating order:', error);
          throw error;
        }

        // Here you would trigger email notification
        // We'll add this next
        
        console.log('Order marked as paid:', session.metadata?.order_number);
        break;
      }

      case 'checkout.session.expired': {
        const session = stripeEvent.data.object;
        
        await supabase
          .from('orders')
          .update({
            status: 'expired',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_session_id', session.id);

        console.log('Order expired:', session.metadata?.order_number);
        break;
      }

      case 'invoice.payment_succeeded': {
        // Handle subscription renewals
        const invoice = stripeEvent.data.object;
        console.log('Subscription payment succeeded:', invoice.id);
        break;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
