import { Product } from "../models"
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const p = product;
    return <>
        <div>
            {p.name}
        </div>
        <div>
            {p.desc}
        </div>
        {p.image_url && <Image src={p.image_url} alt={p.name} width={100} height={100} />}
    </>
}
