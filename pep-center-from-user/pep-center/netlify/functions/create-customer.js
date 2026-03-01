const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, name, phone, address } = JSON.parse(event.body);

    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      address: {
        line1: address.line1,
        city: address.city,
        state: address.state,
        postal_code: address.zip,
        country: address.country,
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        customerId: customer.id,
        customer: customer,
      }),
    };

  } catch (error) {
    console.error('Customer creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
