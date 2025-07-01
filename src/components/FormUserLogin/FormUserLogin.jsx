import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from "react-router-dom"
import styles from './FormUserLogin.module.css'

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
            await loginUserState(formData);
            setFormData({ email: "", password: "" });
            navigate("/");
        } catch (error) {
            setFormData({ email: "", password: "" });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <span className={styles.title}>Acesse sua conta</span>

                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                />

                <label htmlFor="password" className={styles.label}>Senha:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>Entrar</button>

                <Link to="/register" className={styles.link}>Fazer cadastro</Link>
            </form>
        </div>
    )
}
