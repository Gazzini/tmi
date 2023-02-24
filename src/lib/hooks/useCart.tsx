import React from 'react';
import { useForm } from 'react-hook-form';
import { PriceIDAndQuantity } from '~/lib/models';


// Exposes cart functions & data
export const useCart = () => {
    const [items, setItems] = React.useState<PriceIDAndQuantity>({});

    // This helps us modify form values
    const { setValue, register } = useForm<{ items: string; }>(); // TODO: stop using a form, or figure out these types

    // Initially set the form value to an empty cart
    React.useEffect(() => {
        setValue("items", JSON.stringify(items));
    }, [setValue, items]);

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

    const form = <form action='/api/checkout_session' method='POST'>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue='{}' type='hidden' {...register("items")} />

        <button className="checkoutButton" type="submit" role="link">
            Checkout
        </button>
    </form>

    return {
        items,
        inc,
        dec,
        form,
    };
}
