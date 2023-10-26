import React, { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { CourseRequestUpdate, RequestList, fetchCourses } from "../../api/api";
import Navigation from "../Navigation/Navigation";
import { assets } from "../../data/data";
import { numberWithCommas } from "../extra/extra";

const CourseRequestView = () => {
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

  const request_data = useQuery("request", RequestList);

  const update_request = useMutation(CourseRequestUpdate, {
    onSuccess: () => {
      request_data.refetch();
    },
  });

  const ComputePrice = useMemo(() => {
    //Compute all the course price that are confirmed
    if (request_data.data) {
      const data = request_data.data.data;
      const filter = data.filter((item) => item.confirm === true);
      let total = 0;
      filter.forEach((item) => {
        total += parseInt(item.coursename.course_price, 10);
      });
      return total;
    }
  }, [request_data.data]);

  const RequestFilter = useMemo(() => {
    if (request_data.data) {
      const data = request_data.data.data;
      //Filter with course name and username
      if (search) {
        return data.filter(
          (item) =>
            item.coursename.course_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.user.username.toLowerCase().includes(search.toLowerCase())
        );
      }
      return data;
    }
  }, [request_data.data, search]);

  // Request CardView Filter filter unconfirmed items and only 5 items show
  const RequestCardViewFilter = useMemo(() => {
    if (request_data.data) {
      const data = request_data.data.data;
      //order by updated_at the lastest
      data.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      return data.filter((item) => item.confirm === false).slice(0, 5);
    }
  }, [request_data.data]);

  const TableView = () => (
    <div className="col-span-2 h-full overflow-auto">
      {/*No , Course Name, Requested User, Course Price, Updated_at,Confirm  */}

      <table className="table-auto w-full">
        <thead>
          <tr className="text-center">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Course Name</th>
            <th className="border px-4 py-2">Requested User</th>
            <th className="border px-4 py-2">Course Price</th>
            <th className="border px-4 py-2">Requested Time</th>
            <th className="border px-4 py-2">Confirm</th>
          </tr>
        </thead>
        <tbody>
          {RequestFilter &&
            RequestFilter.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {item.coursename.course_name}
                </td>
                <td className="border px-4 py-2">{item.user.username}</td>
                <td className="border px-4 py-2 text-right">
                  {numberWithCommas(item.coursename.course_price)}
                </td>
                <td className="border px-4 py-2">
                  {new Date(item.updated_at).toLocaleString()}
                </td>
                <td className="border px-4 py-2 items-center justify-center">
                  {item.confirm ? (
                    <button className="bg-gray-900 text-white font-bold py-2 px-4 rounded">
                      Confirmed
                    </button>
                  ) : (
                    <button
                      className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        update_request.mutate({
                          id: item.id,
                          confirm: true,
                        });
                      }}
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex font-mono relative h-screen">
      <Navigation />

      <div className="flex flex-col  px-5 py-3 w-full relative">
        <div className="flex flex-row items-center relative">
          <div className="flex flex-row items-center">
            <img
              src={assets.startup}
              className={`w-8 h-8 filter brightness-0 mx-2`}
              alt={"startup"}
            />
            <h1 className="text-2xl font-semibold">Course Request</h1>
            
          </div>

          <div className="flex flex-row items-center border border-gray-400  rounded-lg justify-self-center ml-6">
            <input
              type="text"
              placeholder="Search Request"
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
          <div className="ml-auto">
            <h2 className="text-lg font-semibold">Total Price : {numberWithCommas(ComputePrice)} </h2>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 w-full mt-3"></div>
        <div className="flex" style={{ height: "calc(100vh - 70px)" }}>
          <div className="flex flex-col mt-5">
            {/*Container Start*/}
            <div className="flex flex-row justify-center items-center"></div>
            {request_data.isLoading ? (
              <div className="flex flex-col mt-5 animate-pulse duration-100">
                <img
                  src={assets.mainicon}
                  className="w-[150px] h-[150px] my-auto mx-auto"
                  alt="loading"
                />
                <p className="text-center">Syncing...</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-0 h-full">
                {TableView()}
                <div className="flex flex-col h-full overflow-auto">
                  {/* Card View */}
                  {RequestCardViewFilter &&
                    RequestCardViewFilter.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row border border-gray-300 rounded-lg p-2 m-2 items-center"
                      >
                        <img
                          src={item.user.profileimage}
                          className="w-[100px] h-[100px] object-cover rounded-full"
                          alt="course"
                          onClick={() =>
                            setShowImage(item.coursename.course_image)
                          }
                        />
                        <div className="flex flex-col ml-5">
                          <p className="text-left mt-2 font-semibold">
                            {item.coursename.course_name}
                          </p>
                          <p className="text-left mt-2">{item.user.name}</p>
                          <p className="text-left mt-2">
                            {new Date(item.updated_at).toLocaleString()}
                          </p>
                          <div className="mt-2">
                            <button
                              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                update_request.mutate({
                                  id: item.id,
                                  confirm: true,
                                });
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRequestView;
