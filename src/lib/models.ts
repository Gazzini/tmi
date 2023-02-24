/// Common types:
export type ProductID = 'avocados' | 'broccoli' | 'cauliflower' | 'beef';

/// Req types:
type ProductAndQuantity = {
    [key in ProductID]: number;
};
export interface CreateSessionParams {
    items: ProductAndQuantity;
}
