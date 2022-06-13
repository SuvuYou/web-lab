import { useState } from "react";
import BasicInput from "../BasicInput/BasicInput";
import "./Modal.scss";

const AddCourseModal = ({ onCloseModal }) => {
  const [subject, setSubject] = useState("");

  const handleAddCourse = () => {
    if (subject.trim() === "") {
      return;
    }

    onCloseModal();
  };

  return (
    <>
      <div className="overlay" onClick={() => onCloseModal()} />
      <div className="add-course-form">
        <div className="input-group">
          <BasicInput
            purpose={"text"}
            value={subject}
            setValue={setSubject}
            label={"Subject"}
          />
        </div>
        <button className="add-course-button" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>
    </>
  );
};

export default AddCourseModal;
