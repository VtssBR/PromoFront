import { Outlet } from "react-router-dom";

export default function ProductsLayout() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Outlet />
            </div>
        </>
    )
}