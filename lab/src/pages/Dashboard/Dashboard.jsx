import { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return <Dashboard />;
};

export default DashboardPage;
