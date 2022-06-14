import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CourseDetails from "./CourseDetails";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderCourse = (override = {}, user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <CourseDetails
            professorName={"Prof Name"}
            subjectTitle={"Math"}
            courseId={1}
            userType={"student"}
            {...override}
          />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        message: "message",
      }),
  })
);

it("should render course details for student", async () => {
  renderCourse({ subjectTitle: "History" });

  expect(screen.getByText("History")).toBeInTheDocument();
});

it("should render course details for professor", async () => {
  renderCourse({ userType: "professor" });

  fireEvent.change(screen.getByTestId("input"), { target: { value: "new" } });
  fireEvent.click(screen.getByText("Change Subject Name"));

  fireEvent.click(screen.getByText("Delete Course"));
  fireEvent.click(screen.getByText("Confirm"));
});
