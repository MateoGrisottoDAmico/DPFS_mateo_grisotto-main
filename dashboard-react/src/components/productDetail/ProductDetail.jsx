// import { useEffect, useState } from "react";

// useState

// export const ProductDetail = () => {
//     const [product, setProduct] = useState({});
    
//       useEffect(() => {
//       fetch("http://localhost:3000/api/admin/1")
//         .then(res => res.json())
//         .then(data => {
//           console.log("Datos recibidos:", data);
//           setProduct(data.modelos);
//         })
//         .catch((e) => console.error(e));
//     }, []);
    
//     return (
//     <div className="catalog">
//       <h3>Detalle</h3>
//       {product.length > 0 ? (
//         <ul>
          
//             <div key={product.id}>
//               <h4>{product.titulo}</h4>
//               <p>Precio: ${product.precio}</p>
//               {/* <img src={product.imagen} alt={product.titulo} style={{ width: '200px' }}/> */}
//             </div>
          
//         </ul>
//       ) : (
//         <p>Cargando...</p>
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Product } from "../product/Product";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/admin/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h3>Catálogo de productos</h3>
      {product ? <Product product={product} /> : <p>Cargando...</p>}
    </div>
  );
};