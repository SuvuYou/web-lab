import { useContext, useState } from "react";
import UserContext from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AddCourseModal from "../AddCourseModal/Modal";
import "./Header.scss";

const Header = ({ currentPage, showModal, setShowModal }) => {
  const { user, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      {user.type === "professor" && (
        <button
          id="add-course"
          className="header-btn"
          onClick={() => setShowModal(true)}
        >
          Add Course
        </button>
      )}
      <button
        id={currentPage !== "dashboard" ? "dashboard" : "profile"}
        className="header-btn"
        onClick={() =>
          navigate(
            currentPage !== "dashboard" ? ROUTES.DASHBOARD : ROUTES.PROFILE,
            { replace: false }
          )
        }
      >
        {currentPage !== "dashboard" ? "Dashboard" : "Profile"}
      </button>
      <button id="sign-out" className="header-btn" onClick={() => signOut()}>
        Sign Out
      </button>
      {showModal && (
        <AddCourseModal
          onCloseModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
