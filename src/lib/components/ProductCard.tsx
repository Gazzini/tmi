import { Product } from "../models"
import Image from 'next/image';
import styles from './productCard.module.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const p = product;
    return <div className={styles.main}>
        <div>
            {p.name}
        </div>
        <div>
            {p.desc}
        </div>
        {p.image_url && <Image src={p.image_url} alt={p.name} width={100} height={100} />}
        <div>
            {p.price_string_usd}
        </div>
    </div>
}
