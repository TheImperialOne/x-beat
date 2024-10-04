// controllers/paymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

exports.createPayment = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
