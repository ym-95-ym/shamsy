const express = require('express');
const Stripe = require('stripe');
const app = express();
const stripe = Stripe('pk_test_51SBEOBHF4Z0Mcr4wdgPvmOsv74mrnhw2Ur75ZmtQFelitMffNOw60qxYSm1XSVneWkLtGDrzMc2RP8ZwRp5oRwDQ00vAAR17TB'); // Replace with your secret key

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { amount, donationType, projectName } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Spende - ${projectName}`,
              description: donationType === 'monthly' ? 'Monatliche Spende' : 'Einmalige Spende',
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: donationType === 'monthly' ? 'subscription' : 'payment',
      success_url: `${req.headers.origin}/spenden?success=true&amount=${amount}&type=${donationType}`,
      cancel_url: `${req.headers.origin}/spenden?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));