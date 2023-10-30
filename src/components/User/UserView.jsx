/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import {
  CourseRequestUpdate,
  RequestList,
  UserDelete,
  UserList,
  UserUpdate,
  fetchCourses,
} from "../../api/api";
import Navigation from "../Navigation/Navigation";
import { assets } from "../../data/data";
import { numberWithCommas } from "../extra/extra";
import UserEdit from "./UserEdit";

const UserView = () => {
  //   const [course, setCourse] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [SelectedData, setSelectedData] = React.useState([]);
  const [editShowModal, seteditShowModal] = React.useState(false);

  const [showMore, setShowMore] = React.useState(false);

  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMore(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

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

  const users_data = useQuery(["user", "all"], UserList);

  const UsersFilter = useMemo(() => {
    if (users_data.data) {
      const data = users_data.data.data;
      //Filter with  name and username
      if (search) {
        return data.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.username.toLowerCase().includes(search.toLowerCase())
        );
      }
      return data;
    }
  }, [users_data.data, search]);

  const AdminFilter = useMemo(() => {
    if (users_data.data) {
      const data = users_data.data.data;
      //Filter with  name and username

      return data.filter((item) => item.is_admin);
    }
  }, [users_data.data]);

  const EditorFilter = useMemo(() => {
    if (users_data.data) {
      const data = users_data.data.data;
      //Filter with  name and username

      return data.filter((item) => item.is_editor);
    }
  }, [users_data.data]);

  const user_update = useMutation(UserUpdate, {
    onSuccess: (res) => {
      users_data.refetch();
    },
    onError: (res) => {
      alert("Cannot Update the User Information");
    },
  });

  const user_delete = useMutation(UserDelete, {
    onSuccess: (res) => {
      users_data.refetch();
    },
    onError: () => {
      alert("Cannot Delete the user.");
    },
  });

  const menuItems = [
    {
      label: "Edit User",
      icon: assets.edit_icon,
      onClick: () => seteditShowModal(true),
    },
    {
      label: "Change Password",
      icon: assets.password_icon,
      onClick: () => console.log("Change Password"),
    },
    {
      label: "Promote to Editor",
      icon: assets.editor_icon,
      onClick: () => {
        user_update.mutate({
          id: SelectedData.id,
          editor: true,
        });
      },
    },
    {
      label: "Promote to Admin",
      icon: assets.admin_icon,
      onClick: () => {
        user_update.mutate({
          id: SelectedData.id,
          admin: true,
        });
      },
    },
    {
      label: "Delete User",
      icon: assets.delete_icon,
      onClick: () => {
        user_delete.mutate({
          id: SelectedData.id,
        });
      },
    },
  ];

  function handleMenuItemClick(onClick) {
    setShowMore(false);
    onClick();
  }

  const TableView = () => (
    <div className="col-span-3 row-span-2 h-full overflow-auto">
      {/*No , Name, Username, Email, Phone No  */}
      <span className="flex flex-row p-2">
        <img src={assets.user} alt="altuser" className="w-6 h-6 mr-3" />
        <h1 className="text-2xl font-semibold">{"Users"}</h1>
      </span>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-center">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {UsersFilter &&
            UsersFilter.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.username}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.phone}</td>
                {/* button has dropdown and includes delete user, edit user, change password, promote admin, promte to editor */}
                <td className="border px-4 py-2">
                  <div className="inline-flex bg-white border rounded-md">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMore(item.id);
                          setSelectedData(item);
                        }}
                        className="inline-flex items-center justify-center h-full px-2 py-1 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                      >
                        <img
                          src={assets._3dot_icon}
                          alt="more"
                          className="w-5 h-5"
                        />
                      </button>
                      {showMore === item.id && (
                        <div
                          ref={ref}
                          className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg"
                        >
                          <div className="p-2">
                            {menuItems.map((item, index) => (
                              <button
                                key={index}
                                className="w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-black flex flex-row items-center focus:bg-red-500 "
                                onClick={() =>
                                  handleMenuItemClick(item.onClick)
                                }
                              >
                                <img
                                  src={item.icon}
                                  className="w-5 h-5 mr-2"
                                  alt={item.label}
                                />
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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

      <UserEdit
        AfterDone={() => {
          users_data.refetch();
        }}
        data={SelectedData}
        showModal={editShowModal}
        setShowModal={seteditShowModal}
      />

      <div className="flex flex-col  px-5 py-3 w-full relative">
        <div className="flex flex-row items-center relative">
          <div className="flex flex-row items-center">
            <img
              src={assets.user}
              className={`w-8 h-8 filter brightness-0 mx-2`}
              alt={"startup"}
            />
            <h1 className="text-2xl font-semibold">Users</h1>
          </div>

          <div className="flex flex-row items-center border border-gray-400  rounded-lg justify-self-center ml-6">
            <input
              type="text"
              placeholder="Search user"
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
          <div className="flex flex-col mt-5 w-full">
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
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full">
                {TableView()}
                <div className="flex flex-col h-full overflow-auto">
                  {SimpleTableView("Admin", assets.admin_icon, AdminFilter)}
                </div>
                <div className="flex flex-col h-full overflow-auto">
                  {SimpleTableView("Editors", assets.editor_icon, EditorFilter)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;

const SimpleTableView = (title, icon, data) => (
  <div>
    <span className="flex flex-row p-2">
      <img src={icon} alt={`alt${title}`} className="w-6 h-6 mr-3" />
      <h1 className="text-2xl font-semibold">{title}</h1>
    </span>
    <table className="table-auto w-full">
      <thead>
        <tr className="text-center">
          <th className="border px-4 py-2">No</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Username</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.username}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
