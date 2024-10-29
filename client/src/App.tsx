import React, { useEffect, useState } from "react";
import { Product } from "@shared/types";
import ProductTable from "./components/ProductTable";
import { Alert, Button, Input } from "antd";

const { Search } = Input;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await fetch(`http://localhost:3000/api/products`);
    handleResponse(res);
  };

  const fetchProduct = async (val: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${val}`);
    handleResponse(res);
  };

  const handleResponse = async (res: Response) => {
    const data = await res.json();
    if (res.status === 200) {
      setVisible(false);
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([data]);
      }
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
      <Button type="primary" onClick={fetchAll}>
        Fetch All Products
      </Button>
      <p>
        for the purpose of the test, the search function below will fetch a new
        data instead of searching from the saved data
      </p>
      {visible && (
        <Alert
          className="alert"
          message={errorText}
          type="error"
          closable
          afterClose={handleClose}
        />
      )}
      <Search
        className="searchBox"
        placeholder="product ID"
        enterButton="Fetch Product"
        onSearch={fetchProduct}
      />
      <ProductTable data={products} />
    </div>
  );
};

export default App;
