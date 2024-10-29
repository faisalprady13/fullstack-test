import React, { useEffect, useState } from "react";
import { Product } from "@shared/types";
import ProductTable from "./components/ProductTable";
import { Alert, Input } from "antd";

const { Search } = Input;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = async (val: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${val}`);
    const data = await res.json();
    if (res.status === 200) {
      setVisible(false);
      setProducts([data]);
    } else {
      setProducts([]);
      setErrorText(data.message);
      setVisible(true);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <h1>Flink Products</h1>
      <p>
        for the purpose of the test, the search button below will fetch a new
        data instead of searching from the already fetched data
      </p>
      {visible && (
        <Alert
          message={errorText}
          type="error"
          closable
          afterClose={handleClose}
        />
      )}
      <Search
        placeholder="product ID"
        enterButton="Fetch Product"
        onSearch={handleSearch}
      />
      <ProductTable data={products} />
    </div>
  );
};

export default App;
