import { useEffect } from "react";
import SignUp from "../../components/SignUp/SignUp";

const SignUpPage = () => {
  useEffect(() => {
    document.title = "SignUp";
  }, []);

  return <SignUp />;
};

export default SignUpPage;
