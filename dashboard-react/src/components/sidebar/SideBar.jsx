import { Link } from "react-router-dom";
import logo from "../../assets/Designer.png";
import "./sidebar.css";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul className="links">
        <li>
          <Link to="/catalogo">Catalogo</Link>
        </li>
        <li>
          <Link to="/last-product">Ultimo Producto</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
      </ul>
    </div>
  );
};



