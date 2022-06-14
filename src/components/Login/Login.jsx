import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BasicInput from "../BasicInput/BasicInput";
import * as ROUTES from "../../constants/routes";
import { LOGIN_ENDPOINT } from "../../constants/api-endpoint";
import "./Login.scss";
import UserContext from "../../context/user-context";
import ToastrContext from "../../context/toastr-context";

const isFieldValidated = (value) => value.trim() !== "";

const Login = () => {
  const navigate = useNavigate();
  const { setMessage, setShowMessage } = useContext(ToastrContext);
  const { logIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFieldValidated(password) || !isFieldValidated(email)) {
      return;
    }
    try {
      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${email}:${password}`),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      const data = await res.json();

      if (data.message) {
        setError(data.message);
      }

      if (data.token && data.token !== "") {
        logIn(data.user, data.token);
        navigate(ROUTES.DASHBOARD, { replace: false });
      }
    } catch (err) {
      setMessage(err?.message || err?.message?.message);
      setShowMessage(true);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2 className="form-title">Login</h2>
        <form className="login-form">
          <div className="input-group">
            <BasicInput
              purpose={"email"}
              label={"Email"}
              value={email}
              setValue={setEmail}
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
          <p className="error-message">{error}</p>
          <button
            id="login-btn"
            className="submit-button"
            onClick={handleLogin}
          >
            Log In
          </button>
          <div className="sub-section">
            <p className="have-account-text">
              Don&apos;t have an account?
              <a
                className="sign-up"
                onClick={() => navigate(ROUTES.SIGN_UP, { replace: false })}
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
