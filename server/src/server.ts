import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Product } from "@shared/types";

const data: Product[] = [
  {
    id: 1,
    name: "Product A",
    description: "Product A description",
    price: 20,
  },
  {
    id: 2,
    name: "Product B",
    description: "Product B description",
    price: 30,
  },
];

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Flink!" });
});

app.get("/api/products", (req: Request, res: Response) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
