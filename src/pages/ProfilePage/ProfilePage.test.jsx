import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ProfilePage from "./ProfilePage";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderProfilePage = (user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <ProfilePage />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render ProfilePage", async () => {
  renderProfilePage();

  expect(screen.getByText("Edit Profile")).toBeInTheDocument();
});
