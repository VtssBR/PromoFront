import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from "react-router-dom"
import styles from './FormUserRegister.module.css'

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
        }

        createUserState(userData)

        setFormData({
            name: "",
            email: "",
            password: ""
        })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <span className={styles.title}>Crie seu Cadastro</span>

                <label htmlFor="name" className={styles.label}>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={inputHandleChange}
                    className={styles.input}
                />

                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={inputHandleChange}
                    className={styles.input}
                />

                <label htmlFor="password" className={styles.label}>Senha:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={inputHandleChange}
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>Cadastre-se</button>

                <Link to="/login" className={styles.link}>Já possuo uma conta!</Link>
            </form>
        </div>
    )
}
