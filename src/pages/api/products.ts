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
        price_id: d.default_price,
        name: d.name,
        desc: d.description || '',
        image_url: (d.images.length > 0) ? d.images[0] : null,
    }));

    // Populate the price strings in USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
    });
    const pricePromises = products.map(async (p) => {
        if (!p.price_id) {
            p.price_string_usd = '';
        } else {
            const price = await stripe.prices.retrieve(p.price_id);
            p.price_string_usd = formatter.format(price.unit_amount);
        }
    });
    await Promise.all(pricePromises);

    res.json({
        products,
    });
}

export default handler;