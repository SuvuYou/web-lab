import { useContext, useState } from "react";
import BasicInput from "../BasicInput/BasicInput";
import { COURSES_ENDPOINT } from "../../constants/api-endpoint";
import UserContext from "../../context/user-context";
import "./Modal.scss";
import ToastrContext from "../../context/toastr-context";

const AddCourseModal = ({ onCloseModal }) => {
  const [subject, setSubject] = useState("");
  const { setMessage, setShowMessage } = useContext(ToastrContext);
  const { user, token } = useContext(UserContext);

  const handleAddCourse = async () => {
    if (subject.trim() === "") {
      return;
    }
    const course = { subject, professor_id: user.id };

    const endpoint = `${COURSES_ENDPOINT}/0`;

    try {
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(course),
      });

      onCloseModal();
    } catch (err) {
      setMessage(err?.message || err?.message?.message);
      setShowMessage(true);
    }
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
