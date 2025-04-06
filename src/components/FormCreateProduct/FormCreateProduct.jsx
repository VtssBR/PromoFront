import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import { UserContext } from "../../context/UserContext";
import styles from "./FormCreateProduct.module.css";

export default function FormCreateProduct() {
  const { createProductState } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    image: "",
    expiresAt: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setFormData((prev) => ({ ...prev, categoryId }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = new FormData();
    productData.append("userId", String(user.id));
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
        expiresAt: "",
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.heading}>Postar Promoção</h1>

      <label htmlFor="title" className={styles.label}>Título:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className={styles.input}
      />

      <label htmlFor="price" className={styles.label}>Preço:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        className={styles.input}
      />

      <label htmlFor="categoryId" className={styles.label}>Categoria:</label>
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleCategoryChange}
        className={styles.input}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="description" className={styles.label}>Descrição:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className={`${styles.input} ${styles.textarea}`}
      ></textarea>

      <label htmlFor="image" className={styles.label}>Imagem:</label>
      <div className={styles.imageContainer}>
        <input
          id="image"
          type="file"
          name="image"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          className={styles.hiddenInput}
        />
        <label htmlFor="image" className={styles.uploadButton}>
          Selecionar imagem
        </label>
        {formData.image && (
          <span className={styles.fileName}>{formData.image.name}</span>
        )}
      </div>

      <label htmlFor="expiresAt" className={styles.label}>Data de Expiração:</label>
      <input
        type="date"
        id="expiresAt"
        name="expiresAt"
        value={formData.expiresAt}
        onChange={handleInputChange}
        className={styles.input}
      />

      <button type="submit" className={styles.submitButton}>
        Postar
      </button>
    </form>
  );
}
