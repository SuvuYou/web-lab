import { useState } from "react";
import BasicInput from "../BasicInput/BasicInput";
import Header from "../Header/Header";
import "./CourseDetails.scss";

const CourseDetails = ({ professorName, subjectTitle, userType }) => {
  const [subject, setSubject] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header
        showModal={showModal}
        setShowModal={setShowModal}
        currentPage={"course"}
      />
      <main className="main">
        <div className="course">
          <img src="/images/course-mild-pink.png" alt="course" />
          <div className="course-info">
            <div className="left-section">
              <span className="subject-name">{subjectTitle}</span>
              {userType === "professor" && (
                <>
                  <BasicInput
                    purpose={"text"}
                    value={subject}
                    setValue={setSubject}
                    label={"Subject Name"}
                  />
                  <button className="submit-button hidden">
                    Change Subject Name
                  </button>
                </>
              )}
            </div>
            <div className="right-section">
              <span className="professor-name">{professorName}</span>
              {userType === "professor" && (
                <button className="delete-button hidden">Delete Course</button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CourseDetails;
