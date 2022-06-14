import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CourseComponent from "./CourseComponent";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const onAddCourseMock = jest.fn();
const setMessage = jest.fn();
const setShowMessage = jest.fn();

const renderCourse = (override = {}, user = { type: "student" }) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <CourseComponent
            type={"course"}
            professorName={"Prof Name"}
            subject={"Math"}
            courseId={1}
            requestId={1}
            onAddCourse={onAddCourseMock}
            status={"pending"}
            studentName={"Stud Name"}
            isDisabled={false}
            {...override}
          />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render course for professor", async () => {
  renderCourse({}, { type: "professor" });

  expect(screen.getByText("Prof Name")).toBeVisible();
  expect(screen.getByText("Math")).toBeVisible();
});

it("should render course for student", async () => {
  renderCourse();

  expect(screen.getByText("Prof Name")).toBeVisible();
  expect(screen.getByText("Math")).toBeVisible();
});

it("should render course to join for student", async () => {
  renderCourse({ type: "join" });

  expect(screen.getByText("Prof Name")).toBeVisible();
  expect(screen.getByText("Math")).toBeVisible();
});

it("should render join request for student", async () => {
  renderCourse({ type: "request" });

  expect(screen.getByText("Prof Name")).toBeVisible();
  expect(screen.getByText("Math")).toBeVisible();
});

it("should render join request for professor", async () => {
  renderCourse({ type: "request" }, { type: "professor" });

  expect(screen.getByText("Prof Name")).toBeVisible();
  expect(screen.getByText("Math")).toBeVisible();
});
