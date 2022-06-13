import { useContext, useState } from "react";
import UserContext from "../../context/user-context";
import "./CourseComponent.scss";

const config = {
  course: {
    class: "course",
    img: "./images/course-mild-pink.png",
    info: "course-info",
    renderDisabled: true,
    renderRequestBtn: false,
    renderStatus: false,
  },
  join: {
    class: "course-to-join",
    img: "./images/course-to-join-mild-pink.png",
    info: "course-to-join-info",
    renderDisabled: false,
    renderRequestBtn: true,
    renderStatus: false,
  },
  request: {
    class: "request",
    img: "./images/request-mild-pink.png",
    info: "request-info",
    renderDisabled: false,
    renderRequestBtn: false,
    renderStatus: true,
  },
};

const CourseComponent = ({
  type,
  professorName,
  subject,
  onAddCourse = () => {},
  status = "",
  studentName = "",
  isDisabled = false,
}) => {
  const { user } = useContext(UserContext);

  const [requestSended, setRequestSended] = useState(false);

  const renderRequestBtn = () => (
    <button
      onClick={() => setRequestSended(true)}
      className={`request-btn ${requestSended && "request-sended"}`}
    >
      {!requestSended ? "Send Request" : "Request sended"}
    </button>
  );

  const renderRequestsStatus = (status, studentName = "") =>
    user.type === "student" ? (
      <span className={`status--${status}`}>{status}</span>
    ) : (
      <div className="request-form">
        <span className="student-name">{studentName}</span>
        <button className="request-form-btn" id="approve">
          Approve
        </button>
        <button className="request-form-btn" id="reject">
          Reject
        </button>
      </div>
    );

  return (
    <div
      onClick={() => onAddCourse()}
      className={`${config[type].class} ${
        config[type].renderDisabled && isDisabled ? "over" : ""
      }`}
    >
      <img src={config[type].img} alt={type} />
      {config[type].renderRequestBtn && renderRequestBtn()}
      <div className={config[type].info}>
        <span className="subject-name">{subject}</span>
        <span className="professor-name">{professorName}</span>
      </div>
      {config[type].renderDisabled && isDisabled && (
        <p className="disabled-text">Add Course</p>
      )}
      {config[type].renderStatus && renderRequestsStatus(status, studentName)}
    </div>
  );
};

export default CourseComponent;