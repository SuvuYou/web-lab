import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderDashboard = (user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <Dashboard />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render course details", async () => {
  renderDashboard();

  expect(screen.getByText("Sign Out")).toBeInTheDocument();
});
