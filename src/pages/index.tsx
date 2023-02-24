import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from '~/lib/keys';
import { ProductCard } from '~/lib/components/ProductCard';
import { useProducts } from '~/lib/hooks/useProducts';
import { useCart } from '~/lib/hooks/useCart';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const _stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PreviewPage: React.FC = () => {
    const { products } = useProducts();
    const { items, inc, dec, form } = useCart();

    // TODO: encapsulate this somewhere else:
    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            alert('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            alert('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    if (!items) {
        return <></>
    };

    const productCards = products.map((p, i) => <ProductCard product={p} key={i} quantity={items[p.price_id]} inc={inc} dec={dec} />);

    return (
        <>
            {productCards}
            {form}
        </>
    );
};

export default PreviewPage;
