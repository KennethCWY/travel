import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders navbar links", () => {
  render(<App />, { wrapper: MemoryRouter });
  const linkElement = screen.getByText(/Oyster card/i);
  expect(linkElement).toBeInTheDocument();
});
