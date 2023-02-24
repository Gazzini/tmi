import React from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from '~/lib/keys';
import styles from './index.module.css';
import { ProductCard } from '~/lib/components/ProductCard';
import { useProducts } from '~/lib/hooks/useProducts';
import { useForm, SubmitHandler } from "react-hook-form";
import { PriceIDAndQuantity } from '~/lib/models';

type Inputs = {
    items: string;
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const _stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PreviewPage: React.FC = () => {
    const { products } = useProducts();
    const [items, setItems] = React.useState<PriceIDAndQuantity>({});

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

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const inc = (price_id: string) => {
        const newItems = {
            ...items,
        };
        if (items[price_id]) {
            newItems[price_id] += 1;
        } else {
            newItems[price_id] = 1;
        }

        setItems(newItems);
        setValue("items", JSON.stringify(items));
    }

    const dec = (price_id: string) => {
        const newItems = {
            ...items,
        };
        if (items[price_id] && items[price_id] > 0) {
            newItems[price_id] -= 1;
        }

        setItems(newItems);
        setValue("items", JSON.stringify(items));
    }

    const productCards = products.map((p, i) => <ProductCard product={p} key={i} quantity={items[p.price_id]} inc={inc} dec={dec} />);

    React.useEffect(() => {
        setValue("items", JSON.stringify(items));
    }, [setValue, items]);

    return (
        <>
            <form action='/api/checkout_session' method='POST'>
                {/* register your input into the hook by invoking the "register" function */}
                <input defaultValue='{}' type='hidden' {...register("items")} />

                <button className={styles.button} type="submit" role="link">
                    Checkout
                </button>
            </form>

            {productCards}
        </>
    );
};

export default PreviewPage;
