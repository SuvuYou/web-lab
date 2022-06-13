import { Outlet, Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
