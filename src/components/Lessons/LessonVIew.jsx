import React, { useMemo } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchCourses } from "../../api/api";
import Navigation from "../Navigation/Navigation";
import { assets } from "../../data/data";
import { Link } from "react-router-dom";

const LessonView = () => {
  //   const [course, setCourse] = React.useState([]);

  const [search, setSearch] = React.useState("");

  const [Selected, setSelected] = React.useState("all");

  const [showimage, setShowImage] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowImage(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showimage]);

  const course_data = useQuery("course", fetchCourses);

  const CourseFilter = useMemo(() => {
    if (course_data.data) {
      if (Selected === "all" && !search) return course_data.data.data;
      if (Selected === "active") {
        return course_data.data.data.filter((course) => {
          return (
            course.avaliable &&
            (course.course_name.toLowerCase().includes(search.toLowerCase()) ||
              course.short_name.toLowerCase().includes(search.toLowerCase()))
          );
        });
      }
      if (Selected === "inactive") {
        return course_data.data.data.filter((course) => {
          return (
            !course.avaliable &&
            (course.course_name.toLowerCase().includes(search.toLowerCase()) ||
              course.short_name.toLowerCase().includes(search.toLowerCase()))
          );
        });
      }
      return course_data.data.data.filter((course) => {
        return (
          course.course_name.toLowerCase().includes(search.toLowerCase()) ||
          course.short_name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  }, [search, Selected, course_data.data]);

  const ReloadCourse = () => {
    course_data.refetch();
  };

  return (
    <div className="flex font-mono relative h-screen">
      <Navigation />

      <div className="flex flex-col  px-5 py-3 w-full relative">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img
              src={assets.lesson}
              className={`w-8 h-8 filter brightness-0 mx-2`}
              alt={"startup"}
            />
            <h1 className="text-2xl font-semibold">Lesson</h1>
            <div className="flex flex-row items-center border border-gray-400  rounded-lg justify-self-center ml-6">
              <input
                type="text"
                placeholder="Search Course"
                className="outline-none w-96 py-2 rounded-lg px-3"
                autoFocus={true}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img
                src={assets.search_icon}
                className="w-5 h-5 mx-2 filter brightness-0"
                alt="search"
              />
            </div>
            <div className="flex flex-row items-center ml-3">
              <select
                name="filter"
                id="filter"
                className="border border-gray-400 rounded-lg px-3 py-2 w-64"
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 w-full mt-3"></div>
        <div className="h-full overflow-auto">
          <div className="flex flex-col mt-5">
            {/*Container Start*/}
            {course_data.isLoading ? (
              <div className="flex flex-col mt-5 animate-pulse duration-100">
                <img
                  src={assets.mainicon}
                  className="w-[150px] h-[150px] my-auto mx-auto"
                  alt="loading"
                />
                <p className="text-center">Syncing...</p>
             b </div>
            ) : (
              <div className="flex flex-col mt-2  ">
                <div className="overflow-x-auto">
                  <div className="py-2 align-middle inline-block min-w-full">
                    <div className="py-2 algin-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg grid grid-cols-4 gap-10 px-5 ">
                        {course_data.data &&
                          CourseFilter.map((course, index) => (
                            <CourseItemCardView key={index} data={course} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Container End*/}
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none scale-0 ${
              showimage && "scale-100"
            } duration-300`}
          >
            <div
              className="bg-black opacity-80 w-full h-full absolute inset-0"
              onClick={() => setShowImage(null)}
            ></div>
            <div className="text-2xl text-white">x </div>
            <img
              src={course_data.data && showimage}
              className="w-[1000px] h-auto relative z-10"
              alt="ImageViewr"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;

const CourseItemCardView = ({ data }) => {
  return (
    <Link
      className="flex flex-col w-full h-auto bg-gray-200 my-4 mx-2 text-black rounded transition cursor-pointer drop-shadow-xl border-b-4 border-gray-300 hover:bg-gray-400"
      to={`/lesson/coursemenu/${data.id}`}
    >
      <img
        src={data.coverimage}
        className="w-full h-[200px] object-cover"
        alt={data.course_name}
      />
      <div className="flex flex-col p-2">
        <h1 className="text-md font-semibold font-sans">{data.course_name}</h1>
        <div className="flex flex-row items-center w-full">
          <img
            src={assets.user}
            className="w-4 h-4 mr-1 filter brightness-0"
            alt="user"
          />
          <span className="text-[13px]">{data.created_by}</span>
          {data.avaliable ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-green-800 absolute right-3">
              Active
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 absolute right-3">
              Inactive
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
