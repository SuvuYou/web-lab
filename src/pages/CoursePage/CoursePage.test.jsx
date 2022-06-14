import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CoursePage from "./CoursePage";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderCoursePage = (user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <CoursePage />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        course_id: 1,
        subject: "Math",
        professor: { first_name: "name", last_name: "last" },
      }),
  })
);

it("should render CoursePage", async () => {
  renderCoursePage();

  waitFor(() => {
    expect(screen.getByText("Math")).toBeInTheDocument();
  });
});
