const getRawBody = require("raw-body");
import Order from '@/models/Order';

// Disable next.js body parsing (stripe needs the raw body to validate the event)
export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export default async function handler(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        const rawBody = await getRawBody(req);
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const { client_reference_id: orderId } = event.data.object
            await Order.findOneAndUpdate({ _id: orderId }, { isPaid: true, paidAt: (new Date()).toISOString() });
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}
