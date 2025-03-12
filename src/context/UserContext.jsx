import { createContext, useState, useEffect } from "react";
import { getUsers, getUserById, loginUser, addUsers, attUser, deleteUser } from "../services/UserService";

export const UserContext = createContext({})


export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const [erro, setError] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers()
                setUsers(data)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData()
    }, [])

    const createUserState = async (formData) => {
        try {
            const newUser = await addUsers(formData)
            setUsers((existentsProducts) => { [...existentsProducts, newUser] })
        } catch (error) {
            setError(error.message)
        }
    }

    const getUserByIdState = async (id) => {
        try {
            const userId = await getUserById(id)
            setUser(userId)
        } catch (error) {
            setError(error.message)
        }

    }

    const loginUserState = async (formData) => {
        try {
            const { user, token } = await loginUser(formData); 
            setUser(user); 
            localStorage.setItem("token", token); 
            return { user, token }; 
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }


    return (
        <UserContext.Provider value={{ users, createUserState, getUserByIdState, loginUserState }}>
            {children}
        </UserContext.Provider>
    );
};
