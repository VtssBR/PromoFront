import { RouterProvider } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import { UserProvider } from "./context/UserContext";
import router from "./router";


export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CategoryProvider>
          <RouterProvider router={router} />
        </CategoryProvider>
      </ProductProvider>
    </UserProvider>
  );
}