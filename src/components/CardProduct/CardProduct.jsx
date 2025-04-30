import { useContext, useEffect, useState } from "react";
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Endereço copiado para a área de transferência!");
            })
            .catch(err => {
                alert("Falha ao copiar o endereço!");
                console.error("Erro ao copiar: ", err);
            });
    };

    useEffect(() => {
        getProductByIdState(id);
    }, [id, getProductByIdState]);

    useEffect(() => {
        if (product?.id === id && product.latitude && product.longitude) {
            setMapCenter({
                lat: Number(product.latitude),
                lng: Number(product.longitude)
            });
        }
    }, [id, product?.id, product?.latitude, product?.longitude]);

    if (!product) return <p className={styles.loading}>Carregando...</p>;

    return (
        <div className={styles.productPage}>
            <div className={styles.productContainer}>
                <div className={styles.productMain}>
                    <div className={styles.leftColumn}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className={styles.productImage}
                        />

                    </div>
                    <div className={styles.productContent}>
                        <h2 className={styles.productTitle}>{product.title}</h2>
                        <p className={styles.productPrice}>
                            {(product.price).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </p>

                        <div className={styles.infoBlock}>
                            <img className={styles.infoIcon} src="/img/relogio.png" alt="relógio" />
                            <span><b>Válido até: </b>{formatDate(product.expiresAt)}</span>
                        </div>

                        <div className={styles.productObservation}>
                            <b>Observação: </b>Validade da promoção é uma estimativa informada pelo usuário. Consulte a loja.
                        </div>

                        <div className={styles.infoBlock}>
                            <img className={styles.infoIcon} src="/img/info.png" alt="informação" />
                            <span><b>Descrição: </b>{product.description}</span>
                        </div>

                        <div className={styles.infoBlockAddress} onClick={() => copyToClipboard(product.address)}>
                            <img className={styles.infoIcon} src="/img/locationIcon.png" alt="pino de localização" />
                            <span><b>Endereço: </b>{product.address}</span>
                        </div>

                        {isLoaded && mapCenter && (
                            <div
                                className={
                                    styles.mapContainer +
                                    " " +
                                    (window.innerWidth < 768 ? styles.mapMobile : "")
                                }
                            >
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    center={mapCenter}
                                    zoom={15}
                                    options={{
                                        disableDefaultUI: true,
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
            </div>
        </div>
    );
}
