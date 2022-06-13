import { useEffect } from "react";
import Profile from "../../components/Profile/Profile";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return <Profile />;
};

export default ProfilePage;
