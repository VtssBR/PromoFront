import { Link, Outlet } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {

    const { user, logout} = useContext(UserContext);
    const navigate = useNavigate();



    const handlePostClick = () => {

        console.log("Estado atual de user:", user);
        if (!user) {
            navigate("/login"); 
            return;
        }

        navigate("/products/new");
    };

    const handleLogout = () => {
        logout()
        window.location.reload();
        navigate("/")
    }

    return (
        <>
            <header style={{ display: "flex", alignItems: "center", gap: "10px" }} >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Link to="/">
                        <img src="/img/logoIcon.png" alt="logo" style={{ height: "50px" }} />
                    </Link>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>PROMO</p>
                </div>
                <nav>
                    <input type="text" />
                    <button onClick={handlePostClick}>Postar  Promocao</button>
                    
                    {!user &&(
                        <Link to="/login"><button>Area de Usuario</button></Link>
                    )}
                    {user && (
                        <button onClick={handleLogout}>Sair</button>
                    )}
                </nav>
            </header>
            <Outlet />
            <footer>
                <h4>Rodape</h4>
            </footer>
        </>
    )
}