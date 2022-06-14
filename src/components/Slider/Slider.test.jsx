import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Slider from "./Slider";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";
import { BrowserRouter as Router } from "react-router-dom";

const setMessage = jest.fn();
const setShowMessage = jest.fn();

const courseMock = {
  course_id: 1,
  subject: "Math",
  professor: { first_name: "name", last_name: "last" },
};

const renderSlider = (override = {}, user = {}) => {
  render(
    <UserContext.Provider value={{ user, token: "" }}>
      <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
        <Router>
          <Slider
            slides={[courseMock]}
            onAddCourse={jest.fn()}
            type={"course"}
            isDisabled={false}
            {...override}
          />
        </Router>
      </ToastrContext.Provider>
    </UserContext.Provider>
  );
};

it("should render Slider", async () => {
  renderSlider();

  expect(screen.getByText("Math")).toBeInTheDocument();
});
