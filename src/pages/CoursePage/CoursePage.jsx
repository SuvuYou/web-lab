import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import { COURSES_ENDPOINT } from "../../constants/api-endpoint";
import UserContext from "../../context/user-context";

const CoursePage = () => {
  const { course_id } = useParams();
  const { user, token } = useContext(UserContext);
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Course";
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const endpoint = `${COURSES_ENDPOINT}/${course_id}`;

      try {
        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const courseData = await res.json();
        setCourse(courseData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    !isLoading && (
      <CourseDetails
        userType={user.type}
        subjectTitle={course.subject}
        professorName={`${course.professor.first_name} ${course.professor.last_name}`}
      />
    )
  );
};

export default CoursePage;
