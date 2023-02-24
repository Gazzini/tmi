import { NextApiHandler } from "next";
import { STRIPE_SECRET_KEY } from "~/lib/keys";
import { Product } from "~/lib/models";

const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Returns all the products from Stripe
const handler: NextApiHandler = async (_, res) => {

    const stripeProducts = await stripe.products.list({
        limit: 100,
    });

    console.log('Products!!!!!!!!!!!!!!');
    console.log(JSON.stringify(stripeProducts));

    const products: Product[] = stripeProducts.data.map((d: any) => ({
        id: d.id,
        name: d.name,
        desc: d.description || '',
        image_url: (d.images.length > 0) ? d.images[0] : null,
    }));

    res.json({
        products,
    });
}

export default handler;