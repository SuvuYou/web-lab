import React, { useEffect } from "react";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return <Login />;
};

export default LoginPage;
