import request from "supertest";
import { Product } from "@shared/types";
import { init, server } from "../src/server";

describe("server", () => {
  it("is defined", async () => {
    expect(server).toBeDefined();
  });

  describe("GET /api/products", () => {
    it("returns empty products, if the initialized data is empty", async () => {
      init();
      const response = await request(server).get("/api/products");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    it("returns 3 products, if there are 3 initialized product", async () => {
      const data = [
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
        {
          id: 3,
          name: "Product C",
          description: "Product C description",
          price: 40,
        },
      ];
      init(data);
      const response = await request(server).get("/api/products");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
    });

    it("returns the correct products in the same order as the initialized data", async () => {
      const data = [
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
      init(data);
      const response = await request(server).get("/api/products");
      expect(response.status).toBe(200);
      const result = response.body;
      expect(result).toEqual(data);
      expect(result[0]).toEqual(data[0]);
      expect(result[1]).toEqual(data[1]);
    });
  });
});
