import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";


export default function CardProduct() {
    const { product, getProductByIdState, deleteProductState } = useContext(ProductContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();
        
        const publicId = product.publicId;
    
        try {
            await deleteProductState(id, publicId);
            setIsDeleted(true);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    useEffect(() => {
        if (!isDeleted) {
            getProductByIdState(id);
        }
    }, [id, getProductByIdState]);

    if (!product) return <p>Carregando...</p>; // Futuramente criar um componente de carregamento

    return (
        <div className="card-container">
            <div className="card">
                <img src={product.image} alt={product.title} className="card-image" />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>R$ {product.price}</p>
                <p>Válido até: {product.expiresAt}</p>
                <button className="delete-button" onClick={handleDelete}>
                    Excluir
                </button>
            </div>
        </div>
    );
}
