const URL = "http://localhost:3000/api/users" //Criar URL .env quando finalizado 
const URLAUTH = "http://localhost:3000/api/authentication/login"

export const getUsers = async () => {
    const response =  await fetch(URL)
    if (!response.ok) throw new Error("Erro ao buscar usuarios");
    return response.json();
}

export const addUsers = async (newUser) => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    })
    if (!response.ok) throw new Error("Erro ao criar usuarios");
    return response.json();
}

export const getUserById = async (id) =>{
    const response = await fetch(`${URL}/${id}`,{
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao buscar usuario");
    return response.json();
}

export const loginUser = async(userData) =>{
    
    const response = await fetch(URLAUTH,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    if (!response.ok) throw new Error("Erro ao fazer login");
    return response.json();
    
}

export const attUser = async (userUpdated, id) => {
    const response = await fetch(`${URL}/${id}`,{
        method:'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdated)
    })
    if (!response.ok) throw new Error("Erro ao atualizar usuario");
    return response.json();
}

export const deleteUser = async (id) => {
    const response = await fetch(`${URL}/${id}`,{
        method:'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) throw new Error("Erro ao excluir usuario");
    return response.json();
}

