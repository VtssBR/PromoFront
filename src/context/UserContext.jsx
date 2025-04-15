import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getUsers,
  getUserById,
  loginUser,
  addUsers,
  attUser,
  deleteUser
} from "../services/UserService";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [erro, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const checkToken = () => {
      const token = localStorage.getItem("token");
  
      if (token && isTokenValid(token)) {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    };
  
    fetchData();
    checkToken(); 
  
    const interval = setInterval(checkToken, 2 * 60 * 1000); 
  
    return () => clearInterval(interval); 
  }, []);

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (err) {
      return false;
    }
  };

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
      const userId = await getUserById(id);
      setUser(userId);
    } catch (error) {
      setError(error.message);
    }
  };

  const loginUserState = async (formData) => {
    try {
      const { token } = await loginUser(formData);
      const decoded = jwtDecode(token);
      
      const completeUser = { ...decoded, token };
  
      setUser(completeUser);
      localStorage.setItem("token", token);
      return completeUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        isAuthenticated: !!user,
        createUserState,
        getUserByIdState,
        loginUserState,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
