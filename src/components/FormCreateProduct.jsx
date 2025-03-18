import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { CategoryContext } from "../context/CategoryContext";


export default function FormCreateProduct() {
    const { createProductState } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext)

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        categoryId: "",
        description: "",
        image: "",
        expiresAt: ""
    });

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const inputValue = event.target.value;

        setFormData((previousData) => ({
            ...previousData,
            [fieldName]: inputValue
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData((previousData) => ({
            ...previousData,
            image: file
        }));
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value
        setFormData((previousData) => ({
            ...previousData,
            categoryId: categoryId
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const productData = {
            userId: "ea3ae9df-81d6-443c-83d7-52fc9f53d855", //Retirar depois de validar o login 
            title: formData.title,
            price: parseFloat(formData.price) || 0,
            categoryId: formData.categoryId,
            description: formData.description,
            image: formData.image || "",
            expiresAt: formData.expiresAt
        };

        createProductState(productData);

        setFormData({
            title: "",
            price: "",
            categoryId: "",
            description: "",
            image: "",
            expiresAt: ""
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Postar Promoção</h1>

            <label htmlFor="title">Título:</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

            <label htmlFor="price">Preço:</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} />

            <label htmlFor="categoryId">Categoria:</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange}>
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor="description">Descrição:</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>

            <label htmlFor="image">Imagem:</label>
            <input type="file" name="image" accept=".jpg, .jpeg, .png" value={formData.image} onChange={handleImageChange} />

            <label htmlFor="expiresAt">Data de Expiração:</label>
            <input type="date" id="expiresAt" name="expiresAt" value={formData.expiresAt} onChange={handleInputChange} />

            <button type="submit">Postar</button>
        </form>
    );
}
