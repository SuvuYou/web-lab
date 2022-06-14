import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom";
import ToastrContext from "../../context/toastr-context";
import UserContext from "../../context/user-context";

const onCloseModal = jest.fn();
const setMessage = jest.fn();
const setShowMessage = jest.fn();

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

it("should render modal", async () => {
  render(
    <UserContext.Provider value={{ user: {}, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Modal onCloseModal={onCloseModal} />
      </ToastrContext.Provider>
    </UserContext.Provider>
  );

  expect(screen.getByText("Subject")).toBeInTheDocument();

  fireEvent.change(screen.getByTestId("input"), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByText("Add Course"));

  expect(onCloseModal).not.toHaveBeenCalled();

  fireEvent.change(screen.getByTestId("input"), {
    target: { value: "new" },
  });
  fireEvent.click(screen.getByText("Add Course"));

  waitFor(() => {
    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });
});
