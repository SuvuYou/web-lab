import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import useAuth from "./hookers/use-auth";
import useToastr from "./hookers/use-toastr";
import UserContext from "./context/user-context";
import ProtectedRoute from "./helpers/protectedRoute";
import NotForLoggedInRoute from "./helpers/notForLoggedInRoute";
import ToastrContext from "./context/toastr-context";
import Toastr from "./components/Toastr/Toastr";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const CoursePage = lazy(() => import("./pages/CoursePage/CoursePage"));

function App() {
  const { user, token, signOut, logIn } = useAuth();
  const { showMessage, message, setMessage, setShowMessage } = useToastr();

  return (
    <ToastrContext.Provider value={{ setMessage, setShowMessage }}>
      <UserContext.Provider value={{ user, token, signOut, logIn }}>
        <Router>
          {showMessage && message.trim() !== "" && <Toastr message={message} />}
          <Suspense fallback={<></>}>
            <Routes>
              <Route
                path={ROUTES.SIGN_UP}
                element={
                  <NotForLoggedInRoute
                    user={user}
                    navigateTo={ROUTES.DASHBOARD}
                  />
                }
              >
                <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
              </Route>
              <Route
                path={ROUTES.LOGIN}
                element={
                  <NotForLoggedInRoute
                    user={user}
                    navigateTo={ROUTES.DASHBOARD}
                  />
                }
              >
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              </Route>
              <Route
                path={ROUTES.DASHBOARD}
                element={<ProtectedRoute user={user} />}
              >
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              </Route>
              <Route
                path={ROUTES.PROFILE}
                element={<ProtectedRoute user={user} />}
              >
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              </Route>
              <Route
                path={ROUTES.COURSE}
                element={<ProtectedRoute user={user} />}
              >
                <Route path={ROUTES.COURSE} element={<CoursePage />} />
              </Route>
              <Route path={"*"} element={<div>Not found</div>} />
            </Routes>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </ToastrContext.Provider>
  );
}

export default App;
