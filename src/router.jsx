import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./pages/layouts/RootLayout/RootLayout";
import RegisterUser from "./pages/auth/RegisterUser";
import LoginUser from "./pages/auth/LoginUser";
import ProductsLayout from "./pages/layouts/ProductsLayout";
import ListProducts from "./pages/products/ListProducts";
import ShowProduct from "./pages/products/ShowProduct";
import CreateProduct from "./pages/products/CreateProduct";
import UpdateProduct from "./pages/products/UpdateProduct";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        { index: true, element: <ListProducts /> },
        { path: "register", element: <RegisterUser /> },
        { path: "login", element: <LoginUser /> },

        {
            path: "products", element: <ProductsLayout />,
            children: [
                { path: ":id", element: <ShowProduct /> },
                { path: "new", element: <CreateProduct /> },
                { path: ":id/update", element: <UpdateProduct /> }
            ]
        }
    ]
}])

export default router;