import React, { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import {
  CourseRequestUpdate,
  DeviceLists,
  RequestList,
  createNotification,
  fetchCourses,
} from "../../api/api";
import Navigation from "../Navigation/Navigation";
import { assets } from "../../data/data";
import { isValidFCMToken, numberWithCommas } from "../extra/extra";

const NotificationView = () => {
  //   const [course, setCourse] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [Selected, setSelected] = React.useState("all");

  const [showimage, setShowImage] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState([]);

  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [action_url, setUrl] = React.useState("");

  const noti_data = useMutation(createNotification, {
    onSuccess: () => {
      setTitle("");
      setMessage("");
      setUrl("");
    },
  });

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

  const request_data = useQuery("request_devices", DeviceLists);

  const update_request = useMutation(CourseRequestUpdate, {
    onSuccess: () => {
      request_data.refetch();
    },
  });

  const RequestDevicesFilter = useMemo(() => {
    if (request_data.data) {
      const data = request_data.data.data;
      let data2 = data.filter((item) => isValidFCMToken(item.fcm_token));
      //Filter with course name and username
      if (search) {
        return data2.filter((item) =>
          item.user.username.toLowerCase().includes(search.toLowerCase())
        );
      }
      return data2;
    }
  }, [request_data.data, search]);

  const handleRowClick = (index) => {
    // Append selectedrow
    if (selectedRow.includes(index)) {
      setSelectedRow((prev) => prev.filter((item) => item !== index));
    } else {
      setSelectedRow((prev) => [...prev, index]);
    }
  };

  const TableView = () => (
    <div className="col-span-2 h-full overflow-auto">
      {/*No , Course Name, Requested User, Course Price, Updated_at,Confirm  */}

      <table className="table-auto w-full">
        <thead>
          <tr className="text-center">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">FCM Valid</th>
            <th className="border px-4 py-2">Join Date</th>
          </tr>
        </thead>
        <tbody>
          {RequestDevicesFilter &&
            RequestDevicesFilter.map((item, index) => (
              <tr
                key={index}
                className={`${selectedRow.includes(item.id) ? "bg-gray-500" : ""
                  } cursor-pointer`}
                onClick={() => handleRowClick(item.id)}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 min-w-lg">
                  {item.user.username}
                </td>
                <td className="border px-4 py-2 min-w-2xl">{item.user.name}</td>
                <td className="border px-4 py-2">
                  {isValidFCMToken(item.fcm_token) ? "Valid" : "InValid"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(item.updated_at).toLocaleString()}
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
              src={assets.noti_icon}
              className={`w-8 h-8 filter brightness-0 mx-2`}
              alt={"startup"}
            />
            <h1 className="text-2xl font-semibold">Notification</h1>
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
        </div>
        <div className="border-b-2 border-gray-300 w-full mt-3"></div>
        <div className="flex" style={{ height: "calc(100vh - 70px)" }}>
          <div className="flex flex-col mt-5  w-full">
            {/*Container Start*/}
            <div className="flex flex-row justify-center items-center w-full"></div>
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
                  <div className="flex flex-col h-full overflow-auto">
                    <input
                      type="text"
                      placeholder="Title"
                      className="my-2 p-2 border rounded"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Message"
                      className="my-2 p-2 border rounded"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      className="my-2 p-2 border rounded"
                      value={action_url}
                      onChange={(e) => setUrl(e.target.value)}
                    />

                    <button
                      className="p-2 bg-blue-500 text-white rounded"
                      onClick={() => {
                        noti_data.mutate({ title, message, action_url, sended_device: selectedRow });
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
