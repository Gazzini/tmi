import React from 'react';
import { Product, ProductsResponse } from '~/lib/models';

interface ProductHookResult {
    products: Product[];
}

// Fetches a list of products from api (which fetches them from Stripe)
export const useProducts = (): ProductHookResult => {
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        if (products.length > 0) { return; }
        const asyncStuff = async () => {
            const res = await fetch('/api/products', {
                method: "GET",
            });
            const parsedResponse = (await res.json()) as ProductsResponse;
            setProducts(parsedResponse.products);
            console.log(JSON.stringify(res));
        };
        asyncStuff();
    }, [products, setProducts]);

    return {
        products,
    };
}
