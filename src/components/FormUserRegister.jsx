import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from "react-router-dom"

export default function FormUserRegister() {
    const { createUserState } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const inputHandleChange = (event) => {
        const fieldName = event.target.name
        const inputValue = event.target.value

        setFormData((previousData) => ({
            ...previousData,
            [fieldName]: inputValue
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "user"
        }

        createUserState(userData)

        setFormData({
            name: "",
            email: "",
            password: ""
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Cadastre-se</h1>
                <label htmlFor="name">Nome:</label>
                <input type="text" name='name' value={formData.name} onChange={inputHandleChange} />

                <label htmlFor="email">Email: </label>
                <input type="email" name='email' value={formData.email} onChange={inputHandleChange} />

                <label htmlFor="password">Senha: </label>
                <input type="password" name='password' value={formData.password} onChange={inputHandleChange} />

                <button type='submit'>Cadastrar</button>
                <Link to="/login"><p>Ja possuo uma conta!</p></Link>
            </form>
        </>
    )
}