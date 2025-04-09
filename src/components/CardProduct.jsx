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

    if (!product) return <p className="text-center text-gray-600">Carregando...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-64 object-cover rounded-xl mb-4 border border-gray-200" 
                />
                <h2 className="text-2xl font-semibold text-primary-dark mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-lg text-green-600 font-medium mb-2">R$ {product.price}</p>
                <p className="text-sm text-gray-600 mb-1">Válido até: {product.expiresAt}</p>
                <p className="text-sm text-gray-600 mb-1">Endereço: {product.address}</p>
                
                <button 
                    onClick={handleDelete}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}
