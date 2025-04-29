import { RouterProvider } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import { UserProvider } from "./context/UserContext";
import { GoogleMapsProvider } from "./context/GoogleMapsContext";
import router from "./router";


export default function App() {
  return (
    <UserProvider>
      <GoogleMapsProvider>
        <ProductProvider>
          <CategoryProvider>
            <RouterProvider router={router} />
          </CategoryProvider>
        </ProductProvider>
      </GoogleMapsProvider>
    </UserProvider>
  );
}