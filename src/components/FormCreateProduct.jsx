import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


export default function FormCreateProduct(){
    const {createProductState} = useContext(ProductContext)


    return (
        <>
            <form key={products.id}>
                <h1>Postar Promocao</h1>
                
                <label htmlFor="title">Titulo:</label>
                <input type="text" name="title" value={products.title}/>

                <label htmlFor="price">Preco:</label>
                <input type="number" name="price" value={products.price}/>

                <label htmlFor="category">Categoria:</label>
                <input type="text" name="category" value={products.category}/>

                <label htmlFor="description">Descricao</label>
                <input type="textarea" name="description" value={products.description}/>

                <label htmlFor="image">Imagem</label>
                <input type="file" name="image" accept=".jpg, .jpeg, .png" value={products.image}/>

                <button type="submit">Postar</button>
            </form>
        </>
    )
}