import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./pages/layouts/RootLayout/RootLayout";
import RegisterUser from "./pages/auth/RegisterUser";
import LoginUser from "./pages/auth/LoginUser";
import ListProducts from "./pages/products/ListProducts";
import ShowProduct from "./pages/products/ShowProduct";
import CreateProduct from "./pages/products/CreateProduct";
import UpdateProduct from "./pages/products/UpdateProduct";
import Terms from "./pages/footer/Terms/Terms";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        { index: true, element: <ListProducts /> },
        { path: "terms", element: <Terms/> },
        { path: "register", element: <RegisterUser /> },
        { path: "login", element: <LoginUser /> },
        { path: "products/:id", element: <ShowProduct /> },
        { path: "products/new", element: <CreateProduct /> },
        { path: "products/:id/update", element: <UpdateProduct /> }
    ]
}]);

export default router;
