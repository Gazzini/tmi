/// Common types:
export type ProductID = 'avocados' | 'broccoli' | 'cauliflower' | 'beef';
export interface Product {
    id: ProductID;
    price_id: string;
    price_string_usd: string;
    name: string;
    desc: string;
    image_url: string | null;
}

/// Req types:
type ProductAndQuantity = {
    [key in ProductID]: number;
};
export interface CheckoutRequest {
    items: ProductAndQuantity;
}
export interface ProductsResponse {
    products: Product[];
}
