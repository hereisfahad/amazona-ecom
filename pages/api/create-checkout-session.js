const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const YOUR_DOMAIN = req.headers.origin
    const { totalPrice, orderId, email: customer_email } = req.body
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email,
            client_reference_id: orderId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Total'
                        },
                        unit_amount: totalPrice*100,
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/orders/${orderId}`,
            cancel_url: `${YOUR_DOMAIN}/orders/${orderId}`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
