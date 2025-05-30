import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Catalogo = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch("http://localhost:3000/api/admin")
    .then(res => res.json())
    .then(data => {
      console.log("Datos recibidos:", data);
      setProducts(data.modelos);
    })
    .catch((e) => console.error(e));
}, []);


  return (
    <div>
      <h3>Catalogo de productos</h3>
      {products ? (
        <ul>
          {products.map((p) => (
            <Link key={p.id} to={`/admin/${p.id}`}>
              <div>
                <h4>{p.titulo}</h4>
                <p>${p.precio}</p>
                <img src={p.imagen} alt={p.titulo} style={{ width: '200px' }} />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

