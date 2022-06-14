import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const onAddCourseMock = jest.fn();
const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderSignUp = (user = { type: "student" }) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <SignUp />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "error message" }),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

it("should render SignUp", async () => {
  renderSignUp();

  fireEvent.change(screen.getAllByTestId("input")[0], {
    target: { value: "field" },
  });
  fireEvent.change(screen.getAllByTestId("input")[1], {
    target: { value: "field" },
  });

  fireEvent.click(screen.getAllByText("Sign Up")[1]);

  expect(await screen.findByText("All fields are required")).toBeVisible();

  fireEvent.change(screen.getAllByTestId("input")[2], {
    target: { value: "field" },
  });
  fireEvent.change(screen.getAllByTestId("input")[3], {
    target: { value: "field" },
  });
  fireEvent.change(screen.getAllByTestId("input")[4], {
    target: { value: "field" },
  });
  fireEvent.change(screen.getAllByTestId("input")[5], {
    target: { value: "field" },
  });

  fireEvent.click(screen.getAllByText("Sign Up")[1]);

  expect(await screen.findByText("error message")).toBeVisible();
});
