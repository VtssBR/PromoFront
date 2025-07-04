import { useContext, useRef, useState } from "react";

import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import { UserContext } from "../../context/UserContext";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";
import { NumericFormat } from 'react-number-format';
import { StandaloneSearchBox } from '@react-google-maps/api';
import styles from "./FormCreateProduct.module.css";

export default function FormCreateProduct() {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const { createProductState } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);
  const { isLoaded } = useContext(GoogleMapsContext);
  const [addressSelected, setAddressSelected] = useState(false);
  const searchBoxRef = useRef(null);
  const inputTextRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    image: null,
    address: "",
    latitude: null,
    longitude: null,
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

  const handleOnPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();

    if (places && places.length > 0) {
      const place = places[0];
      if (place.formatted_address && place.geometry) {
        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        }));
        setAddressSelected(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!addressSelected) {
      alert("Por favor, selecione um endereço da lista.");
      return;
    }

    setIsPosting(true);

    const productData = new FormData();
    productData.append("userId", String(user.userId));
    productData.append("title", formData.title);
    productData.append("price", formData.price);
    productData.append("categoryId", formData.categoryId);
    productData.append("description", formData.description);
    productData.append("expiresAt", formData.expiresAt);
    productData.append("address", formData.address);
    productData.append("latitude", formData.latitude);
    productData.append("longitude", formData.longitude);

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
        address: "",
        latitude: null,
        longitude: null,
        expiresAt: "",
      });

      if (inputTextRef.current) {
        inputTextRef.current.value = "";
      }

      setAddressSelected(false);


      setMessage("Produto postado com sucesso!");
      setMessageType("success");


      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);

    } catch (error) {
      console.error("Erro ao criar produto:", error);

      setMessage("Ocorreu um erro ao postar o produto.");
      setMessageType("error");

    } finally {
      setIsPosting(false);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <>


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
        <NumericFormat
          className={styles.input}
          name="price"
          value={formData.price}
          onValueChange={(values) => {
            setFormData((prev) => ({
              ...prev,
              price: values.value
            }));
          }}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale
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

        <label htmlFor="address" className={styles.label}>Endereço:</label>
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={handleOnPlacesChanged}
          >
            <input
              ref={inputTextRef}
              type="text"
              placeholder="Digite o endereço"
              className={styles.input}
              onChange={() => setAddressSelected(false)}
            />
          </StandaloneSearchBox>
        )}

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

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPosting}
        >
          {isPosting ? (
            <>
              Postando...
              <span className={styles.spinner}></span>
            </>
          ) : (
            "Postar"
          )}
        </button>

      </form>
      {message && (
        <div
          className={`${styles.alert} ${messageType === "success" ? styles.success : styles.error
            }`}
        >
          {message}
        </div>
      )}
    </>
  );
}
