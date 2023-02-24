import { Product } from "../models"
import Image from 'next/image';
import styles from './productCard.module.css';

interface ProductCardProps {
    product: Product;
    quantity: number;
    inc: (price_id: string) => void;
    dec: (price_id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, inc, dec }) => {
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
        <div className={styles.quantity}>
            <button className={styles.button} onClick={() => inc(p.price_id)}>+</button>
            {quantity ?? 0}
            <button className={styles.button} onClick={() => dec(p.price_id)}>-</button>
        </div>
    </div>
}
