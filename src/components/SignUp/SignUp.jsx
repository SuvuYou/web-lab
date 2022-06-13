import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BasicInput from "../BasicInput/BasicInput";
import * as ROUTES from "../../constants/routes";
import {
  PROESSORS_ENDPOINT,
  STUDENTS_ENDPOINT,
} from "../../constants/api-endpoint";
import "./SignUp.scss";
import UserContext from "../../context/user-context";

const isFieldValidated = (value) => value.trim() !== "";

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useContext(UserContext);

  const [isStudent, setIsStudent] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [GPA, setGPA] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !isFieldValidated(password) ||
      !isFieldValidated(confirmPassword) ||
      !isFieldValidated(firstName) ||
      !isFieldValidated(lastName) ||
      !isFieldValidated(email)
    ) {
      return setError("All fields are required");
    }

    if (
      (!isFieldValidated(GPA) && isStudent) ||
      (!isFieldValidated(subject) && !isStudent)
    ) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    const user = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
      ...(isStudent && { iq: 100 }),
      ...(isStudent && { GPA }),
      ...(!isStudent && { subject }),
    };

    const endpoint = isStudent
      ? `${STUDENTS_ENDPOINT}/0`
      : `${PROESSORS_ENDPOINT}/0`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data.message) {
      setError(data.message);
    }

    if (data.email && email.token !== "") {
      navigate(ROUTES.LOGIN, { replace: false });
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <h2 className="form-title">Sign Up</h2>
        <form className="signup-form">
          <div className="radio-group">
            <p className="radio-title">Choose your account type:</p>
            <input
              type="radio"
              id="student"
              className="radio-input"
              name="user-type"
              value="student"
              checked={isStudent}
              onChange={(e) => {
                setIsStudent(e.target.checked);
              }}
            />
            <label htmlFor="student" className="radio-label">
              Student
            </label>
            <input
              type="radio"
              id="professor"
              className="radio-input"
              name="user-type"
              value="professor"
              checked={!isStudent}
              onChange={(e) => {
                setIsStudent(!e.target.checked);
              }}
            />
            <label htmlFor="professor" className="radio-label">
              Professor
            </label>
            <div className="input-group">
              <BasicInput
                purpose={"text"}
                label={"First Name"}
                value={firstName}
                setValue={setFirstName}
              />
            </div>
            <div className="input-group">
              <BasicInput
                purpose={"text"}
                label={"Last Name"}
                value={lastName}
                setValue={setLastName}
              />
            </div>
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
            <div className="input-group">
              <BasicInput
                purpose={"email"}
                label={"Email"}
                value={email}
                setValue={setEmail}
              />
            </div>
            <div className="input-group">
              {isStudent ? (
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
          </div>
          <p className="error-message">{error}</p>
          <button
            id="signup-btn"
            className="submit-button"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <div className="sub-section">
            <p className="have-account-text">
              Already have an account?
              <a
                className="log-in"
                onClick={() => navigate(ROUTES.LOGIN, { replace: false })}
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
