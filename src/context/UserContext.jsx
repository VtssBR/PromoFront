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

        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
        }
    }, [])

    const createUserState = async (formData) => {
        try {
            const newUser = await addUsers(formData);
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (error) {
            setError(error.message);
        }
    };

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

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };


    return (
        <UserContext.Provider value={{ users, user, createUserState, getUserByIdState, loginUserState, logout }}>
            {children}
        </UserContext.Provider>
    );
};
