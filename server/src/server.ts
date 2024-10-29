import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Product } from "@shared/types";
import { mockupData } from "./mockupData";

let products: Product[];

export const init = (data: Product[] = []) => {
  products = data;
};
init(mockupData);

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const result = products.find((product) => product.id === Number(id));

  if (!result) {
    res.status(404).json({ message: `Item with ID '${id}' not found.` });
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const server = app;
