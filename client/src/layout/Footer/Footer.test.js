import { screen } from "@testing-library/react";
import Footer from ".";

describe("Footer", () => {
  test("it shows the copyright logo and creater names", () => {
    render(<Footer />);
    const content = screen.queryByText(
      /© Toby, Kenneth, Gorazd & Elicia 2021/i
    );
    expect(content).toBeInTheDocument();
  });
});
