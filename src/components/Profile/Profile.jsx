import { Fragment, useContext, useEffect, useState } from "react";
import {
  COURSES_LIST_ENDPOINT,
  REQUESTS_LIST_ENDPOINT,
} from "../../constants/api-endpoint";
import UserContext from "../../context/user-context";
import EditUserForm from "../EditUserForm/EditUserForm";
import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import "./Profile.scss";

const formatReuqests = (request) => {
  return {
    ...request.course,
    requestId: request.join_request_id,
    status: request.status,
    student: request.student,
  };
};

const Profile = () => {
  const { token } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [joinedCourses, setJoinedCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const [resCourses, resRequests] = await Promise.all([
        fetch(COURSES_LIST_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }),
        fetch(REQUESTS_LIST_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }),
      ]);

      const dataCourses = await resCourses.json();
      const dataRequests = await resRequests.json();

      setRequests(
        dataRequests?.requests.map((course) => formatReuqests(course)) || []
      );
      setJoinedCourses(dataCourses?.joined || []);
    })();
  }, [token]);

  return (
    <>
      <Header
        showModal={showModal}
        setShowModal={setShowModal}
        currentPage={"profile"}
      />
      <EditUserForm />
      {joinedCourses.length !== 0 && (
        <>
          <h2 className="section-label">Joined Courses</h2>
          <Slider slides={joinedCourses} type={"course"} />
        </>
      )}
      {requests.length !== 0 && (
        <>
          <h2 className="section-label">Join Requests</h2>
          <Slider slides={requests} type={"request"} />
        </>
      )}
    </>
  );
};

export default Profile;
