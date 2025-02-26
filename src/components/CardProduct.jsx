import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


export default function ListProduct(){
    const {products} = useContext(ProductContext)

    return(
        <>
        <h1>Produtos</h1>
        <div>
            {products.map((product)=>(
            <div key={product.id}>
            <img src={product.image} alt=" Imagem" width={500} />
            <h4>{product.title}</h4>
            <h4>{product.price}</h4>
            </div>
        ))}
        </div>
        </>
    )
} 