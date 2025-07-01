const BASE_URL = import.meta.env.VITE_API_URL;

const URL = `${BASE_URL}/users`

const URLAUTHLOGIN = `${BASE_URL}/authentication/login`
const URLAUTHREGISTER = `${BASE_URL}/authentication/register`

export const getUsers = async () => {
    const response = await fetch(URL)
    if (!response.ok) throw new Error("Erro ao buscar usuarios");
    return response.json();
}

export const addUsers = async (newUser) => {
    const response = await fetch(URLAUTHREGISTER, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    })

    const data = await response.json(); 

    if (!response.ok) {

        throw new Error(data.message || "Erro ao criar usuário.");
    }

    return data;
}

export const getUserById = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao buscar usuario");
    return response.json();
}

export const loginUser = async (userData) => {

    const response = await fetch(URLAUTHLOGIN, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    if (!response.ok) throw new Error("Erro ao fazer login");
    return response.json();

}

export const attUser = async (userUpdated, id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdated)
    })
    if (!response.ok) throw new Error("Erro ao atualizar usuario");
    return response.json();
}

export const deleteUser = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao excluir usuario");
    return response.json();
}

