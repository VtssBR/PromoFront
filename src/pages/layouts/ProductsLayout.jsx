import { Outlet } from "react-router-dom";

export default function ProductsLayout(){
    return (
        <>
            <h1>Produtos</h1>
            <Outlet/>
        </>
    )
}