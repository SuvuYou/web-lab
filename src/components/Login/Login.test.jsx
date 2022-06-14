import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();
const loginMock = jest.fn();

const renderLogin = () => {
  render(
    <UserContext.Provider value={{ logIn: loginMock }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <Login />
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

it("should render Login", async () => {
  renderLogin();

  expect(screen.getByText("Login")).toBeInTheDocument();

  fireEvent.change(screen.getAllByTestId("input")[0], {
    target: { value: "email" },
  });
  fireEvent.change(screen.getAllByTestId("input")[1], {
    target: { value: "password" },
  });

  fireEvent.click(screen.getByText("Log In"));

  expect(await screen.findByText("error message")).toBeVisible();
});

it("should render call login", async () => {
  global.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ message: "success message", token: "token" }),
    });

  renderLogin();

  fireEvent.change(screen.getAllByTestId("input")[0], {
    target: { value: "email" },
  });
  fireEvent.change(screen.getAllByTestId("input")[1], {
    target: { value: "password" },
  });

  fireEvent.click(screen.getByText("Log In"));

  expect(await screen.findByText("success message")).toBeVisible();
  expect(loginMock).toHaveBeenCalled();
});
