import { default as SearchBar } from ".";
import { screen, render } from "@testing-library/react";

describe("SearchBar", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(<SearchBar />);
  });

  test("it renders a form", () => {
    let form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
