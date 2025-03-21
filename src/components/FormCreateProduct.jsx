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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = new FormData(); 
    productData.append("userId", "ea3ae9df-81d6-443c-83d7-52fc9f53d855"); 
    productData.append("title", formData.title);
    productData.append("price", formData.price); 
    productData.append("categoryId", formData.categoryId);
    productData.append("description", formData.description);
    productData.append("expiresAt", formData.expiresAt);

    if (formData.image) {
        productData.append("image", formData.image); 
    }

    try {
        await createProductState(productData); 
        setFormData({
            title: "",
            price: "",
            categoryId: "",
            description: "",
            image: null, 
            expiresAt: ""
        });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
    }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-[600px] mx-auto p-5 border border-gray-300 rounded-lg shadow-md flex flex-col gap-3 font-sans"
    >
      <h1 className="text-center text-xl font-semibold">Postar Promoção</h1>

      <label htmlFor="title" className="font-bold">Título:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md"
      />

      <label htmlFor="price" className="font-bold">Preço:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md"
      />

      <label htmlFor="categoryId" className="font-bold">Categoria:</label>
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="description" className="font-bold">Descrição:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md h-20"
      ></textarea>

      <label htmlFor="image" className="font-bold">Imagem:</label>
      <input
        type="file"
        name="image"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
        className="p-1"
      />

      <label htmlFor="expiresAt" className="font-bold">Data de Expiração:</label>
      <input
        type="date"
        id="expiresAt"
        name="expiresAt"
        value={formData.expiresAt}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="bg-black text-white p-3 rounded-md cursor-pointer text-lg mt-3 hover:bg-gray-800 transition"
      >
        Postar
      </button>
    </form>
  );
}
