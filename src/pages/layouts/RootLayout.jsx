import { Link, Outlet } from "react-router-dom"

export default function RootLayout(){
    return(
        <>
        <header>
            <img src="" alt="logo" />
            <nav>
                <input type="text" />
                <Link to="/products/new"><button>Postar  Promocao</button></Link>
                <Link to="/login"><button>Area de Usuario</button></Link>
            </nav>
        </header>
        <Outlet/>
        <footer>
            <h4>Rodape</h4>
        </footer>
        </>
    )
}