import { useState } from "react";
import CourseComponent from "../CourseComponent/CourseComponent";
import "./Slider.scss";

const SLIDE_WIDTH = 420;

const Slider = ({ slides, type, onAddCourse, isDisabled = false }) => {
  const [scroll, setScroll] = useState(0);

  const renderSlides = () => {
    if (isDisabled) {
      return (
        <CourseComponent
          type={type}
          professorName=""
          subject=""
          isDisabled
          onAddCourse={onAddCourse}
        />
      );
    }

    return slides.map((slide, index) => (
      <CourseComponent
        key={index}
        type={type}
        courseId={slide.course_id}
        requestId={slide.requestId}
        professorName={`${slide.professor.first_name} ${slide.professor.last_name}`}
        subject={slide.subject}
        studentName={`${slide.student?.first_name} ${slide.student?.last_name}`}
        status={slide?.status}
      />
    ));
  };

  return (
    <section className="courses">
      <div
        className="list"
        style={{ transform: `translateX(${scroll * -SLIDE_WIDTH}px)` }}
      >
        {renderSlides()}
      </div>
      <div className="navigation">
        <img
          src="/images/right-arrow.png"
          alt="arrow"
          width="36px"
          height="36px"
          className="left-arrow"
          id="left-arrow-course"
          onClick={() => {
            setScroll((prev) => (prev !== 0 ? prev - 1 : prev));
          }}
        />
        <img
          src="/images/right-arrow.png"
          alt="arrow"
          width="36px"
          height="36px"
          className="right-arrow"
          id="right-arrow-course"
          onClick={() => {
            setScroll((prev) =>
              prev !== (slides?.length || 1) - 1 ? prev + 1 : prev
            );
          }}
        />
      </div>
    </section>
  );
};

export default Slider;
