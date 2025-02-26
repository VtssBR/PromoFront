import { RouterProvider } from "react-router-dom"
import { ProductProvider } from "./context/ProductContext";
import router from "./router"

export default function App() {
  return (
    <>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
    </>
  )
}

