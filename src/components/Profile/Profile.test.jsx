import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "./Profile";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderProfile = (user = { type: "student" }) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <Profile />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render Profile", async () => {
  renderProfile();

  expect(screen.getByText("Edit Profile")).toBeInTheDocument();
});
