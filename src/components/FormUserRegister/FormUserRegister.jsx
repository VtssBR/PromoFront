import { useState, useContext, useEffect } from 'react'
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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: ""
  })

  const [successMessage, setSuccessMessage] = useState("")

  // Limpa mensagem de sucesso automaticamente após 4 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 4000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const inputHandleChange = (event) => {
    const { name, value } = event.target

    setFormData(prev => ({ ...prev, [name]: value }))

    // Limpa erros do campo e erro geral ao digitar
    setErrors(prev => ({ ...prev, [name]: "", general: "" }))

    // Limpa mensagem de sucesso ao alterar qualquer input
    setSuccessMessage("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validação simples
    const newErrors = { name: "", email: "", password: "", general: "" }
    let hasError = false

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
      hasError = true
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
      hasError = true
    } else {
      // Validação básica de email via regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Formato de email inválido"
        hasError = true
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    // Tenta criar o usuário e captura erros da API
    try {
      await createUserState(formData)
      setFormData({ name: "", email: "", password: "" })
      setErrors({ name: "", email: "", password: "", general: "" })
      setSuccessMessage("Cadastro realizado com sucesso!")
    } catch (error) {
      const apiMessage = error.message || "Erro ao criar conta."

      if (apiMessage.toLowerCase().includes("e-mail")) {
        setErrors({ ...newErrors, email: apiMessage })
      } else {
        setErrors({ ...newErrors, general: apiMessage })
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <span className={styles.title}>Crie seu Cadastro</span>

        <label htmlFor="name" className={styles.label}>Nome:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={inputHandleChange}
          className={styles.input}
          autoComplete="name"
          aria-describedby="error-name"
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && <span id="error-name" role="alert" className={styles.error}>{errors.name}</span>}

        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={inputHandleChange}
          className={styles.input}
          autoComplete="email"
          aria-describedby="error-email"
          aria-invalid={!!errors.email}
          required
        />
        {errors.email && <span id="error-email" role="alert" className={styles.error}>{errors.email}</span>}

        <label htmlFor="password" className={styles.label}>Senha:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={inputHandleChange}
          className={styles.input}
          autoComplete="new-password"
          aria-describedby="error-password"
          aria-invalid={!!errors.password}
          required
        />
        {errors.password && <span id="error-password" role="alert" className={styles.error}>{errors.password}</span>}

        {errors.general && <span role="alert" className={styles.error}>{errors.general}</span>}

        {successMessage && <span role="status" className={styles.success}>{successMessage}</span>}

        <button type="submit" className={styles.button}>Cadastre-se</button>

        <Link to="/login" className={styles.link}>Já possuo uma conta!</Link>

        <span className={styles.termos}>Ao continuar, você concorda com os Termos de uso</span>
      </form>
    </div>
  )
}
