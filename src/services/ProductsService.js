const URL = "http://localhost:3000/api/products"; //Criar URL .env quando finalizado 

export const getProducts = async () => {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return response.json();
};

export const addProduct = async (newProduct) => {
    const token = localStorage.getItem("token"); 
    const response = await fetch(URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify(newProduct),
    });
    if (!response.ok) throw new Error("Falha ao criar produto");
    return response.json();
};

export const attProduct = async (updateProduct, id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateProduct),
    });
    if (!response.ok) throw new Error("Falha ao atualizar o produto");
    return response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Falha ao localizar o produto");
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erro ao excluir produto");
    return response.json();
};
