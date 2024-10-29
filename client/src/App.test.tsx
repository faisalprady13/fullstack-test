import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
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
          ]),
      });
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("initialization", () => {
    it("renders title correctly", async () => {
      render(<App />);
      const textElement = screen.getByText("Flink Products");
      await waitFor(() => {
        expect(textElement).toBeInTheDocument();
      });
    });

    it("call '/api/products' to fetch all products on mount", async () => {
      render(<App />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "http://localhost:3000/api/products"
        );
      });
    });

    it("should not render error alert on initialization", async () => {
      render(<App />);
      const alertElement = document.querySelector(".alert");
      await waitFor(() => {
        expect(alertElement).toBeNull();
      });
    });
  });
});
