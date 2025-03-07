import { createContext, useState, useEffect } from "react";
import { getUsers, getUserById, addUsers, attUser, deleteUser } from "../services/UserService";

export const UserContext = createContext({})


export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
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

    const createUserState = async (userData) => {
        try {
            const newUser = await addUsers(userData)
            setUsers((existentsProducts)=>{[...existentsProducts, newUser]})
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <UserContext.Provider value={{users, createUserState}}>
            {children}
        </UserContext.Provider>
    );
};
