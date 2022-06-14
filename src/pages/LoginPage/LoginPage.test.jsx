import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderLoginPage = (user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <LoginPage />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render LoginPage", async () => {
  renderLoginPage();

  expect(screen.getByText("Login")).toBeInTheDocument();
});
