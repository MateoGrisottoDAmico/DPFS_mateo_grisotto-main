import { Route, Routes } from "react-router-dom";
import { Catalogo } from "../catalogo/Catalogo";
import { Counter } from "../counter/Counter";
import { LastProduct } from "../lastProduct/LastProduct";
import { ProductDetail } from "../productDetail/ProductDetail";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Counter />
              <Catalogo />
            </>
          }
        />
        <Route path="/catalogo" element={<Catalogo />} />

        <Route path="/last-product" element={<LastProduct />} />
        <Route path="/counter" element={<Counter />} />

        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};