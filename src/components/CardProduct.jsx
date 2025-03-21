import { useContext, useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"




export default function CardProduct() {
    const { product, getProductByIdState, deleteProductState} = useContext(ProductContext)
    const { id } = useParams();
    const navigate = useNavigate()
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

    if (!product) return <p>Carregando</p>; //Futuramente criar um componente de carregando

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
                <button onClick={handleDelete}>Excluir</button>
                
            </div>
        </div>
    );
}