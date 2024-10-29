import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders title", () => {
    render(<App />);
    const linkElement = screen.getByText("Flink Products");
    expect(linkElement).toBeInTheDocument();
  });
});
