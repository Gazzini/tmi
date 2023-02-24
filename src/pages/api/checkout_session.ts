import { NextApiHandler } from "next";
import { STRIPE_SECRET_KEY } from "~/lib/keys";

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1Mf2IVJrVgXbagO6RyDXBxEq',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/checkout/?success=true`,
                cancel_url: `${req.headers.origin}/checkout/?canceled=true`,
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