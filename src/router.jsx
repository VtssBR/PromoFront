import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        { index: true, element: <Home /> },

        { path: "register", element: <RegisterUser /> },
        { path: "login", element: <LoginUser /> },

        {
            path: "products", element: <ProductsLayout />,
            children: [
                { index: true, element: <ListProducts /> },
                { path: "new", element: <CreateProduct /> },
                { path: ":id", element: <ShowProduct /> },
                { path: ":id/update", element: <UpdateProduct /> }
            ]
        }
    ]
}])

export default router;