import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import UserContext from "../../context/user-context";
import { BrowserRouter as Router } from "react-router-dom";

const setShowModalMock = jest.fn();

it("should render modal", async () => {
  render(
    <UserContext.Provider value={{ user: {}, token: "" }}>
      <Router>
        <Header
          currentPage={"dashboard"}
          showModal={false}
          setShowModal={setShowModalMock}
        />
      </Router>
    </UserContext.Provider>
  );

  expect(screen.getByText("Sign Out")).toBeInTheDocument();
});
