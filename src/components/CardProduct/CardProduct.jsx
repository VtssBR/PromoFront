import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";
import { GoogleMap, Marker } from '@react-google-maps/api';
import styles from './CardProduct.module.css'; 

export default function CardProduct() {
    const { product, getProductByIdState } = useContext(ProductContext);
    const { id } = useParams();
    const { isLoaded } = useContext(GoogleMapsContext);

    const [mapCenter, setMapCenter] = useState(null); 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', options).format(date);
    };

    useEffect(() => {
        getProductByIdState(id);
    }, [id, getProductByIdState]);

    useEffect(() => {
        if (product?.latitude && product?.longitude) {
            setMapCenter({
                lat: Number(product.latitude),
                lng: Number(product.longitude)
            });
        }
    }, [product]);

    if (!product) return <p className={styles.loading}>Carregando...</p>;

    return (
        <div className={styles.productPage}>
            <div className={styles.productContainer}>
                <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                />
                <h2 className={styles.productTitle}>{product.title}</h2>
                <p className={styles.productPrice}>
                    {(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productValidUntil}>Válido até: {formatDate(product.expiresAt)}</p>
                <p className={styles.productAddress}>Endereço: {product.address}</p>
                
                {isLoaded && mapCenter && (
                    <div className={styles.mapContainer}>
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={mapCenter}
                            zoom={15}
                            options={{
                                disableDefaultUI: true,
                                zoomControl: true,
                                draggable: true,
                                gestureHandling: "greedy",
                            }}
                        >
                            <Marker position={mapCenter} />
                        </GoogleMap>
                    </div>
                )}
            </div>
        </div>
    );
}
