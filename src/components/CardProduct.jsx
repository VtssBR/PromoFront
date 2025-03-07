import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"


export default function CardProduct() {
    const { getProductByIdState } = useContext(ProductContext)
    const [product, setProduct] = useState({});
    const { id } = useParams();


    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProductByIdState(id);
            setProduct(product);
        };
        fetchProduct();
    }, [id, getProductByIdState]);


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