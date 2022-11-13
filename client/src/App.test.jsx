import { render, screen } from "@testing-library/react";

import App from "./App";

test("Renders TodoInput element", () => {
  render(<App />);
  const ele = screen.getByText(/New Todo Item/i);
  expect(ele).toBeInTheDocument();
});
