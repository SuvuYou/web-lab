import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { COURSES_ENDPOINT } from "../../constants/api-endpoint";
import * as ROUTES from "../../constants/routes";
import ToastrContext from "../../context/toastr-context";
import UserContext from "../../context/user-context";
import BasicInput from "../BasicInput/BasicInput";
import DeleteModal from "../DeleteModal/DeleteModal";
import Header from "../Header/Header";
import "./CourseDetails.scss";

const CourseDetails = ({ professorName, subjectTitle, userType, courseId }) => {
  const { setMessage, setShowMessage } = useContext(ToastrContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const resetFields = () => {
    setSubject("");
  };

  const deleteCourse = async (e) => {
    e.preventDefault();

    const endpoint = `${COURSES_ENDPOINT}/${courseId}`;
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await res.json();

      if (data.message) {
        setMessage(data?.message || data?.message?.message);
        setShowMessage(true);

        return;
      }
    } catch (err) {
      setMessage(err?.message || err?.message?.message);
      setShowMessage(true);
    }

    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  const handleCourseChange = async (e) => {
    e.preventDefault();

    if (subject.trim() === "") {
      return;
    }

    const newCourseData = { subject };

    const endpoint = `${COURSES_ENDPOINT}/${courseId}`;
    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newCourseData),
      });

      const data = await res.json();

      if (data.message) {
        setMessage(data?.message || data?.message?.message);
        setShowMessage(true);

        return;
      }
      resetFields();
    } catch (err) {
      setMessage(err?.message || err?.message?.message);
      setShowMessage(true);
    }
  };

  return (
    <>
      <Header
        showModal={showModal}
        setShowModal={setShowModal}
        currentPage={"course"}
      />
      <main className="main">
        <div className="course-details">
          <img src="/images/course-mild-pink.png" alt="course" />
          <div className="course-details-info">
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
                  <button
                    className="submit-button-details"
                    onClick={handleCourseChange}
                  >
                    Change Subject Name
                  </button>
                </>
              )}
            </div>
            <div className="right-section">
              <span className="professor-name">{professorName}</span>
              {userType === "professor" && (
                <button
                  className="delete-button-details"
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                >
                  Delete Course
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      {showDeleteModal && (
        <DeleteModal
          label={"Are you sure you want to delete course?"}
          onConfirm={deleteCourse}
          onCloseModal={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default CourseDetails;
