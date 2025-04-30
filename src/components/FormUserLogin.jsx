import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function FormUserLogin() {
    const { loginUserState } = useContext(UserContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const inputValue = event.target.value;

        setFormData((previousData) => ({
            ...previousData,
            [fieldName]: inputValue
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await loginUserState(formData);
            setFormData({
                email: "",
                password: ""
            })
            navigate("/")
        } catch (error) {
            setFormData({
                email: "",
                password: ""
            })
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-[350px] w-full p-5 border border-gray-300 rounded-lg shadow-md flex flex-col gap-2 font-sans"
            >
                <h1 className="text-center text-xl font-semibold">Login</h1>

                <label htmlFor="email" className="font-bold">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 rounded-md border border-gray-300"
                />

                <label htmlFor="password" className="font-bold">
                    Senha:
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="p-2 rounded-md border border-gray-300"
                />

                <button
                    type="submit"
                    className="bg-white text-black p-2 rounded-md cursor-pointer text-lg font-bold mt-2 border border-gray-400 hover:bg-gray-100 transition"
                >
                    Entrar
                </button>

                <Link to="/register" className="text-center text-blue-500 hover:underline mt-2">
                    Fazer cadastro
                </Link>
            </form>

        </>
    )
}