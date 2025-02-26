import { createContext, useEffect, useState } from "react"
import { getProducts} from "../services/ProductsService"


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
   
    return (
        <ProductContext.Provider value={{ products, error }}>
          {children}
        </ProductContext.Provider>
      );
    };

