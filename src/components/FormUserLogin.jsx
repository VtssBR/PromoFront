import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function FormUserLogin() {
    const { loginUserState } = useContext(UserContext)


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

        console.log("Dados enviados para login:", formData);

        try {
            const response = await loginUserState(formData);
            console.log("Login bem-sucedido:", response);
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
        }

        setFormData({
            email: "",
            password: ""
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Entrar</h1>

                <label htmlFor="email">Email: </label>
                <input type="text" name='email' value={formData.email} onChange={handleInputChange} />

                <label htmlFor='password'>Senha: </label>
                <input type="text" name='password' value={formData.password} onChange={handleInputChange} />

                <button type='submit'>Entrar</button>
            </form>
        </>
    )
}