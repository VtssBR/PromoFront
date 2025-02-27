import { createContext, useEffect, useState } from "react"
import { addProduct, getProducts} from "../services/ProductsService"


export const ProductContext = createContext({});

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


    const createProductState= async (productData) => {
        try {
            const createdProduct = await addProduct(productData)
            setProducts = ((existentsProducts) => [...existentsProducts, createdProduct])
        } catch (error) {
            setError(error.message);
        }
    }
   
    return (
        <ProductContext.Provider value={{ products, error, createProductState}}>
          {children}
        </ProductContext.Provider>
      );
    };

