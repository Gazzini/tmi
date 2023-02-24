import { NextApiHandler } from "next";
import { STRIPE_SECRET_KEY } from "~/lib/keys";
import { CheckoutRequest } from "~/lib/models";

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body) as CheckoutRequest;

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: 'price_1Mf2IVJrVgXbagO6RyDXBxEq',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.redirect(303, session.url);
        } catch (err: any) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

export default handler;