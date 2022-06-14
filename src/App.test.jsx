import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";

const renderApp = (history) => {
  render(<App history={history} />);
};

it("should render App", async () => {
  const history = createMemoryHistory({ initialEntries: ["/login"] });
  renderApp(history);
  expect(history.location.pathname).toBe("/login");
});
