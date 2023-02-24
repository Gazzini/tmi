import { NextApiHandler } from "next";
import { STRIPE_SECRET_KEY } from "~/lib/keys";
import { PriceIDAndQuantity } from "~/lib/models";

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log('REQUEST:');
            console.log(JSON.stringify(req.body));
            console.log(JSON.stringify(req.body.req));
            const items = JSON.parse(req.body.items) as PriceIDAndQuantity;
            console.dir(items);
            const line_items = Object.keys(items).map(k => ({
                price: k,
                quantity: items[k],
            }));

            console.dir(line_items);

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items,
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