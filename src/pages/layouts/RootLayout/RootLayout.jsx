import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  const { user, logout } = useContext(UserContext); 
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/products/new");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoContainer}>
            <img src="/img/logoIcon.png" alt="logo" className={styles.logoImage} />
            <p className={styles.logoText}>PROMO</p>
          </Link>

          <nav className={styles.nav}>
            <input type="text" placeholder="Buscar..." />
            <button onClick={handlePostClick}>Postar Promoção</button>

            {!user && (
              <Link to="/login">
                <button>Área de Usuário</button>
              </Link>
            )}

            {user && (
              <button onClick={handleLogout}>Sair</button>
            )}
          </nav>
        </div>
      </header>

      <Outlet />

      <footer>
        <h4>Rodapé</h4>
      </footer>
    </>
  );
}
