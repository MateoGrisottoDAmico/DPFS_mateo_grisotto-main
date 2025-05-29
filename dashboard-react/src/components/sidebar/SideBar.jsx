import logo from "../../assets/Designer.png";
import "./sidebar.css";

export const SideBar = () => {
    return <div className="sidebar">
        <img src={logo} alt="logo"/>
        <ul className="links">
            <li><a href="">Catálogo</a></li>
            <li><a href="">Ultima publicación</a></li>
            <li><a href="">Categorías</a></li>
            <li><a href="">Total de publicaciones</a></li>
        </ul>
    </div>
};