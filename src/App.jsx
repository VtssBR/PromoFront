import { RouterProvider } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import router from "./router";

export default function App() {
  return (
    <CategoryProvider> 
      <ProductProvider>  
        <RouterProvider router={router} />
      </ProductProvider>
    </CategoryProvider>
  );
}