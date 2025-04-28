import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

export default function CardProduct() {
    const { product, getProductByIdState } = useContext(ProductContext);
    const { id } = useParams();

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', options).format(date);
    };

    useEffect(() => {
            getProductByIdState(id);
    }, [id, getProductByIdState]);

    if (!product) return <p className="text-center text-gray-600">Carregando...</p>;

    return (
        <div className="flex p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-xl mb-4 border border-gray-200"
                />
                <h2 className="text-2xl font-semibold text-primary-dark mb-2">{product.title}</h2>
                <p className="text-lg text-green-600 font-medium mb-2">{(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-sm text-gray-600 mb-1">Válido até: {formatDate(product.expiresAt)}</p>
                <p className="text-sm text-gray-600 mb-1">Endereço: {product.address}</p>

                {isLoaded && product.latitude && product.longitude && (
                    <div className="h-80 w-full rounded-xl overflow-hidden my-4">
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={{
                                lat: Number(product.latitude),
                                lng: Number(product.longitude)
                            }}
                            zoom={15}
                        >
                            <Marker position={{
                                lat: Number(product.latitude),
                                lng: Number(product.longitude)
                            }} />
                        </GoogleMap>
                    </div>
                )}
            </div>
        </div>
    );
}
