import { createContext, useEffect, useState } from "react"
import { addProduct, getProducts, attProduct, getProductById} from "../services/ProductsService"


export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null);
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
            setProducts((existentsProducts) => [...existentsProducts, createdProduct])
        } catch (error) {
            setError(error.message);
        }
    }

    const updateProductState = async (productUpdateData, id) =>{
        try {
            const updatedProduct = await attProduct(productUpdateData,id)
            setProducts((existingProducts) =>
                existingProducts.map((product) =>
                    product.id === id ? updatedProduct : product
                )
            );
        } catch (error) {
            setError(error.message);
        }
    }

    const getProductByIdState = async (id) => {
        try {
            const fetchedProduct = await getProductById(id);
            setProduct(fetchedProduct);
        } catch (error) {
            setError(error.message);
        }
    };


   
    return (
        <ProductContext.Provider value={{products, product,  error, createProductState, updateProductState, getProductByIdState,}}>
          {children}
        </ProductContext.Provider>
      );
    };

