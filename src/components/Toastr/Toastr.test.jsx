import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Toastr from "./Toastr";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderToastr = (override = {}, user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <Toastr message={"message"} {...override} />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render Toastr", async () => {
  renderToastr({ message: "test message" });

  expect(screen.getByText("test message")).toBeInTheDocument();
});
