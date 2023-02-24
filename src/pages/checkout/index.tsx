import React from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from '~/lib/keys';
import styles from './checkout.module.css';
import { ProductCard } from '~/lib/components/ProductCard';
import { useProducts } from '~/lib/hooks/useProducts';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const _stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PreviewPage: React.FC = () => {

    const [stripe, setStripe] = React.useState<Stripe | null>(null);
    const { products } = useProducts();

    React.useEffect(() => {
        if (!stripe) { return; }
        const asyncStuff = async () => {
            const newStripe = await loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
            setStripe(newStripe);
        };
        asyncStuff();
    }, [stripe])

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

    const productCards = products.map((p, i) => <ProductCard product={p} key={i} />);

    return (
        <>
            {productCards}
            <form action="/api/checkout_session" method="POST">
                <section className={styles.section}>
                    <button className={styles.button} type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
        </>
    );
};

export default PreviewPage;
