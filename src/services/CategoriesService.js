const URL = "http://localhost:3000/api/categories";

export const getCategories = async () => {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Erro ao buscar Categorias");
    return response.json();
};