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

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    })

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const inputValue = event.target.value;

        setFormData((previousData) => ({
            ...previousData,
            [fieldName]: inputValue
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "", // Limpa erro ao digitar
            general: ""
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação simples
        let hasError = false;
        const newErrors = { email: "", password: "", general: "" };

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
            hasError = true;
        }

        if (!formData.password.trim()) {
            newErrors.password = "Senha é obrigatória";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            await loginUserState(formData);
            setFormData({ email: "", password: "" });
            navigate("/");
        } catch (error) {
            setErrors({ ...newErrors, general: "Email ou senha inválidos" });
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
                {errors.email && <span className={styles.error}>{errors.email}</span>}

                <label htmlFor="password" className={styles.label}>Senha:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}

                {errors.general && <span className={styles.error}>{errors.general}</span>}

                <button type="submit" className={styles.button}>Entrar</button>

                <Link to="/register" className={styles.link}>Fazer cadastro</Link>

                <span className={styles.termos}>Ao continuar, você concorda com os Termos de uso</span>
            </form>
        </div>
    )
}
