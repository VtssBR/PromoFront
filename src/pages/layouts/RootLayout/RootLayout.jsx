import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import styles from "./RootLayout.module.css";
import { useState } from "react";

export default function RootLayout() {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
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
          </Link>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src="/img/menu.png" alt="menu" />
          </button>

          <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
            <div className={styles.buttonIcon} onClick={handlePostClick}>
              <img className={styles.menuImg} src="/img/addPromo.png" alt="adicionar promo" />
              <span>Postar Promoção</span>
            </div>
            {!user && (
              <Link to="/login">
                <div className={styles.buttonIcon}>
                  <img className={styles.menuImg} src="img/userLogin.png" alt="login" />
                  <span>Login</span>
                </div>
              </Link>
            )}
            {user && (
              <div className={styles.buttonIcon} onClick={handleLogout}>
                <img className={styles.menuImg} src="/img/logout.png" alt="logout" />
                <span>Sair</span>
              </div>
            )}
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>©Promodomo {new Date().getFullYear()}</p>
          <div className={styles.footerLinks}>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
