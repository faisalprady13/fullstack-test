import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders title", async () => {
    render(<App />);

    await waitFor(() => {
      const textElement = screen.getByText("Flink Products");
      expect(textElement).toBeInTheDocument();
    });
  });
});
