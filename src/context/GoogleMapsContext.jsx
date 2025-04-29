import { createContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

export const GoogleMapsContext = createContext();

const libraries = ["places"];

export const GoogleMapsProvider = ({ children }) => {

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider
      value={{ isLoaded, loadError}}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
};