import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import styles from "./ListCardsProducts.module.css";

export default function ListCardsProducts() {
    const { products } = useContext(ProductContext);

    return (
        <div className={styles.container}>
            {products.length === 0 ? (
                <p className={styles.noProducts}>Nenhum produto encontrado.</p>
            ) : (
                products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <img src={product.image} alt={product.title} className={styles.image} />
                        <div className={styles.textContent}>
                            <h3 className={styles.title}>{product.title}</h3>
                            <div className={styles.address}>
                                <img  className={styles.locationIcon} src="/img/locationIcon.png" alt="pino de localizacao" />
                                <span>{product.address?.split(',').slice(0, 3).join(',')}</span>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <h4 className={styles.price}>R$ {product.price}</h4>
                            <Link to={`/products/${product.id}`}>
                                <button className={styles.button}>Visualizar</button>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
