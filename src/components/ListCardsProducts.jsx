import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

export default function ListCardsProducts() {
    const { products } = useContext(ProductContext);

    return (
        <div>
            {products.length === 0 ? ( // Exibe mensagem caso não haja produtos
                <p>Nenhum produto encontrado.</p>
            ) : (
                products.map((product) => (
                    <div key={product.id}>
                        <img src={product.image} alt={product.title} width={250} />
                        <h4>{product.title}</h4>
                        <h4>R$ {product.price}</h4>
                        <Link to={`/products/${product.id}`}>
                            <button>Visualizar</button>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}
