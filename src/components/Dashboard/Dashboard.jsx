import { useContext, useEffect, useState } from "react";
import { COURSES_LIST_ENDPOINT } from "../../constants/api-endpoint";
import UserContext from "../../context/user-context";
import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import "./Dashboard.scss";

const Dashboard = () => {
  const { user, token } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [freeCourses, setFreeCourses] = useState([]);
  const [joinedCourses, setJoinedCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(COURSES_LIST_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await res.json();

      setFreeCourses(data?.free || []);
      setJoinedCourses(data?.joined || []);
    })();
  }, [token]);

  return (
    <div>
      <Header
        showModal={showModal}
        setShowModal={setShowModal}
        currentPage={"dashboard"}
      />
      <main>
        {(joinedCourses.length !== 0 || user.type === "professor") && (
          <>
            <h2 className="section-label">Joined Courses</h2>
            <Slider
              slides={joinedCourses}
              type={"course"}
              isDisabled={joinedCourses.length === 0}
              onAddCourse={() => setShowModal(true)}
            />
          </>
        )}

        {freeCourses.length !== 0 && (
          <>
            <h2 className="section-label">Courses To Join</h2>
            <Slider slides={freeCourses} type={"join"} />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
