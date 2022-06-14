import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditUserForm from "./EditUserForm";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderUserForm = (user = { type: "student" }) => {
  render(
    <UserContext.Provider value={{ user, token: "", signOut: jest.fn() }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <EditUserForm />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "message" }),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

it("should render edit user form for student", async () => {
  renderUserForm();

  expect(screen.getByText("First Name")).toBeInTheDocument();
});

it("should render edit user form for professor", async () => {
  renderUserForm({ type: "professor" });

  fireEvent.change(screen.getAllByTestId("input")[0], {
    target: { value: "new" },
  });
  fireEvent.click(screen.getByText("Save Changes"));

  expect(screen.getAllByTestId("input")[0]).toHaveTextContent("");

  fireEvent.click(screen.getByText("Delete Account"));
  fireEvent.click(screen.getByText("Confirm"));

  waitFor(() => {
    expect(setMessage).toHaveBeenCalledWith("message");
    expect(setShowMessage).toHaveBeenCalledWith(true);
  });
});
