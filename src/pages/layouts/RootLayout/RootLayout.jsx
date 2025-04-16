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
          </Link>

          <nav className={styles.nav}>
          
          <div className={styles.buttonIcon}>
          <img className={styles.menuImg} src="/img/addPromo.png" alt="adicionar promo"/>
            <button onClick={handlePostClick}>Postar Promoção</button>
            </div>
            {!user && (
              <Link to="/login">
                <div className={styles.buttonIcon}>
                <img className={styles.menuImg} src="img/user.png" alt="area de usuario" />
                <button>Área de Usuário</button>
                </div>
              </Link>
            )}

            {user && (
              <div className={styles.buttonIcon}>
              <img className={styles.menuImg} src="/img/logout.png" alt="logout" />
              <button onClick={handleLogout}>Sair</button>
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
