import { createContext, useEffect, useState } from "react"
import {getCategories} from "../services/CategoriesService"


export const CategoryContext = createContext({})


export const CategoryProvider = ({children}) =>{
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);


    useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await getCategories()
                    setCategories(data)
                } catch (error) {
                    setError(error.message);
                }
            }
            fetchData()
        }, [])

    return (
            <CategoryContext.Provider value={{ categories, error}}>
              {children}
            </CategoryContext.Provider>
          );
}

