import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"


export default function CardProduct() {
    const { product, getProductByIdState } = useContext(ProductContext)
    const { id } = useParams();


    useEffect(() => {
        getProductByIdState(id);
    }, [id, getProductByIdState]);

    if (!product) return <p>Carregando...</p>; //Futuramente criar um componente de carregando

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <div style={{ maxWidth: "300px" }}>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{ width: "100%", height: "auto" }} 
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>R$ {product.price}</p>
                <p>Válido até: {product.expiresAt}</p>
            </div>
        </div>
    );
}