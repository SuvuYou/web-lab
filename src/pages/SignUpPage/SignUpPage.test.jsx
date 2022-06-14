import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignUpPage from "./SignUpPage";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderSignUpPage = (user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <SignUpPage />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render SignUpPage", async () => {
  renderSignUpPage();

  expect(screen.getByText("Password")).toBeInTheDocument();
  expect(screen.getByText("Confirm Password")).toBeInTheDocument();
});
