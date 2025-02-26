import { createContext, useContext, useEffect, useState } from "react"
import { getProducts, addProduct, attProduct, getProductById, deleteProduct } from "../services/ProductsService"


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData()
    }, [])
   
    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, error }}>
          {children}
        </ProductContext.Provider>
      );
    };
    export const useProducts = () => useContext(ProductContext);
