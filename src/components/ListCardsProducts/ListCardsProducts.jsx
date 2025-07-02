import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import styles from "./ListCardsProducts.module.css";
import { UserContext } from "../../context/UserContext";

export default function ListCardsProducts() {
    const { products, deleteProductState } = useContext(ProductContext);
    const { user } = useContext(UserContext);

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
                            <h4 className={styles.price}>
                                {(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h4>
                            <div className={styles.address}>
                                <img className={styles.locationIcon} src="/img/locationIcon.png" alt="pino de localizacao" />
                                <span>{product.address?.split(',').slice(0, 3).join(',')}</span>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <Link to={`/products/${product.id}`} className={styles.buttonIcon}>
                                <span>Detalhes</span>
                                <img className={styles.imgIcon} src="/img/setadireita.png" alt="seta direita" />
                            </Link>
                            {user?.role === "admin" && (
                                <button
                                    className={styles.buttonIcon}
                                    onClick={() => deleteProductState(product.id, product.publicId)}
                                >
                                    Excluir
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
