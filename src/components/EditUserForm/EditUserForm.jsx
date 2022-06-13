import { useContext, useState } from "react";
import UserContext from "../../context/user-context";
import BasicInput from "../BasicInput/BasicInput";
import "./EditUserForm.scss";

const EditUserForm = () => {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [GPA, setGPA] = useState("");
  const [subject, setSubject] = useState("");

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
          <div classNameName="input-group">
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
          <button className="submit-button">Save Changes</button>
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
          <button className="submit-button">Change password</button>
          <button className="delete-button">Delete Account</button>
        </div>
      </section>
    </>
  );
};

export default EditUserForm;
