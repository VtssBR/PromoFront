const BASE_URL = import.meta.env.VITE_API_URL;

const URL = `${BASE_URL}/categories` 

export const getCategories = async () => {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Erro ao buscar Categorias");
    return response.json();
};