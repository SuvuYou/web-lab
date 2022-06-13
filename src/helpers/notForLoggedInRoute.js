import { Outlet, Navigate } from "react-router-dom";

const NotForLoggedInRoute = ({ user, navigateTo }) => {
  return !user ? <Outlet /> : <Navigate to={navigateTo} />;
};

export default NotForLoggedInRoute;
