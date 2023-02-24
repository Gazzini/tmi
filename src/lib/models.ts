/// Common types:
export interface Product {
    id: string;
    price_id: string;
    price_string_usd: string;
    name: string;
    desc: string;
    image_url: string | null;
}

/// Req types:
export type PriceIDAndQuantity = {
    [key: string]: number;
};
export interface CheckoutRequest {
    items: PriceIDAndQuantity;
}
export interface ProductsResponse {
    products: Product[];
}
