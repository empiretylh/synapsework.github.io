import * as React from "react";
import CreateCourse from "../Course/Createcourse";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
const Dashboard = () => {
  //filter the course
  const [course, setCourse] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("/api/editor/course/list")
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error : Loading courses.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex font-mono relative">
      <Navigation />
      <div className="px-5 py-4">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
