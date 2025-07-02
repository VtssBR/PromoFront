import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import styles from "./RootLayout.module.css";

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

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
            <div
              className={styles.buttonIcon}
              onClick={handlePostClick}
              role="button"
              tabIndex={0}
              aria-label="Postar uma nova promoção"
            >
              <img className={styles.menuImg} src="/img/addPromo.png" alt="adicionar promo" />
              <span>Postar Promoção</span>
            </div>
            {!user && (
              <Link to="/login">
                <div className={styles.buttonIcon}>
                  <img className={styles.menuImg} src="/img/userLogin.png" alt="login" />
                  <span>Login</span>
                </div>
              </Link>
            )}
            {user && (
              <div
                className={styles.buttonIcon}
                onClick={handleLogout}
                role="button"
                tabIndex={0}
                aria-label="Fazer logout"
              >
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
          <div className={styles.logoCubeContainer}>
              <img className={styles.logoFooter} src="/img/logoCube.png" alt="logo"/>
              <span className={styles.tagName}>©Promodomo {new Date().getFullYear()}</span>
          </div>
          <div className={styles.footerLinks}>
            <Link to="/terms">Termos</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
