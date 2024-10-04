import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);

        // Create payment intent on the server
        const response = await fetch('/api/payments/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100, currency: 'usd' }), // Amount is in cents
        });

        const { clientSecret } = await response.json();

        // Confirm the payment
        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.log(error);
        } else {
            console.log('Payment successful!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

export default PaymentForm;
