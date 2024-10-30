import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { Product } from "@shared/types";
import { mockupData } from "./mockupData";
import { log } from "console";

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

  if (!Number.isInteger(Number(id))) {
    res
      .status(400)
      .json({ message: "Invalid ID format. ID must be a number." });
    return;
  }

  const result = products.find((product) => product.id === Number(id));

  if (!result) {
    res.status(404).json({ message: `Product with ID '${id}' is not found.` });
    return;
  }

  res.json(result);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const server = app;
