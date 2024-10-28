import React, { useEffect, useState } from "react";
import { Product } from "@shared/types";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>{products[0] ? products[0].name : "Loading..."}</h1>
    </div>
  );
};

export default App;
