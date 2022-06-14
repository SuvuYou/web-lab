import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  PROESSORS_ENDPOINT,
  STUDENTS_ENDPOINT,
} from "../../constants/api-endpoint";
import UserContext from "../../context/user-context";
import BasicInput from "../BasicInput/BasicInput";
import DeleteModal from "../DeleteModal/DeleteModal";
import * as ROUTES from "../../constants/routes";
import "./EditUserForm.scss";
import ToastrContext from "../../context/toastr-context";

const isFieldValidated = (value) => value.trim() !== "";

const EditUserForm = () => {
  const { user, token, signOut } = useContext(UserContext);
  const { setMessage, setShowMessage } = useContext(ToastrContext);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [GPA, setGPA] = useState("");
  const [subject, setSubject] = useState("");

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setGPA("");
    setSubject("");
  };

  const deleteAccount = async (e) => {
    e.preventDefault();

    const endpoint =
      user.type === "student"
        ? `${STUDENTS_ENDPOINT}/${user.id}`
        : `${PROESSORS_ENDPOINT}/${user.id}`;
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

      signOut();
      navigate(ROUTES.LOGIN, { replace: false });
    } catch (err) {
      setMessage(err?.message || err?.message?.message);
      setShowMessage(true);
    }
  };

  const handleUserChange = async (e) => {
    e.preventDefault();
    const isStudent = user.type === "student";

    if (
      !isFieldValidated(password) &&
      !isFieldValidated(confirmPassword) &&
      !isFieldValidated(firstName) &&
      !isFieldValidated(lastName) &&
      !isFieldValidated(email) &&
      ((!isFieldValidated(GPA) && isStudent) ||
        (!isFieldValidated(subject) && !isStudent))
    ) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    const newUserData = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
      ...(email.trim() !== "" && { email }),
      ...(password.trim() !== "" && { password }),
      ...(lastName.trim() !== "" && { last_name: lastName }),
      ...(firstName.trim() !== "" && { first_name: firstName }),
      ...(isStudent && GPA.trim() !== "" && { GPA }),
      ...(!isStudent && subject.trim() !== "" && { subject }),
    };

    const endpoint = isStudent
      ? `${STUDENTS_ENDPOINT}/${user.id}`
      : `${PROESSORS_ENDPOINT}/${user.id}`;
    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newUserData),
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
      <h2 className="section-label">Edit Profile</h2>
      <section className="edit-profile">
        <div className="column">
          <div className="input-group name-input">
            <div className="half-column">
              <BasicInput
                purpose={"text"}
                label={"First Name"}
                value={firstName}
                setValue={setFirstName}
              />
            </div>
            <div className="half-column">
              <BasicInput
                purpose={"text"}
                label={"Last Name"}
                value={lastName}
                setValue={setLastName}
              />
            </div>
          </div>
          <div className="input-group">
            <BasicInput
              purpose={"email"}
              label={"Email"}
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="input-group">
            {user.type === "student" ? (
              <BasicInput
                purpose={"text"}
                label={"GPA"}
                value={GPA}
                setValue={setGPA}
              />
            ) : (
              <BasicInput
                purpose={"text"}
                label={"Subject"}
                value={subject}
                setValue={setSubject}
              />
            )}
          </div>
          <button className="submit-button" onClick={handleUserChange}>
            Save Changes
          </button>
        </div>
        <div className="column">
          <div className="input-group">
            <BasicInput
              purpose={"password"}
              label={"Password"}
              value={password}
              setValue={setPassword}
            />
          </div>
          <div className="input-group">
            <BasicInput
              purpose={"password"}
              label={"Confirm Password"}
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          </div>
          <button className="submit-button" onClick={handleUserChange}>
            Change password
          </button>
          <button
            className="delete-button"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </section>
      {showDeleteModal && (
        <DeleteModal
          onCloseModal={() => setShowDeleteModal(false)}
          onConfirm={deleteAccount}
          label="Are you sure you want to delete your account?"
        />
      )}
    </>
  );
};

export default EditUserForm;
