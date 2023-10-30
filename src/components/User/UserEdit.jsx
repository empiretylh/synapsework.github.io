import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../data/data";
import { useMutation } from "react-query";
import { UserUpdate } from "../../api/api";

///fields = ['id', 'coverimage', 'course_name', 'short_name', 'course_price', 'description', 'avaliable', 'created_at', 'updated_at', 'created_user']
// tailwindcss

const UserEdit = ({
  AfterDone = () => {},
  AfterCancel = () => {},
  showModal,
  setShowModal,
  data,
}) => {
  const [username, setusername] = useState(data.username);
  const [name, setname] = useState(data.name);
  const [phone, setphone] = useState(data.phone);
  const [email, setemail] = useState(data.email);
  const [is_admin, setis_admin] = useState(data.is_admin);
  const [is_editor, setis_editor] = useState(data.is_editor);

  const ClearData = () => {
    setusername("");
    setname("");
    setphone("");
    setemail("");
    setis_admin(false);
    setis_editor(false);
  };

  useEffect(() => {
    setusername(data.username);
    setname(data.name);
    setphone(data.phone);
    setemail(data.email);
    setis_admin(data.is_admin);
    setis_editor(data.is_editor);
  }, [data]);

  const user_update = useMutation(UserUpdate, {
    onSuccess: (res) => {
      AfterDone();
      setShowModal(false);
      ClearData();
    },
    onError: (res) => {
      alert("Cannot Update the User Information");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    user_update.mutate({
      id: data.id,
      username: username,
      name: name,
      phone: phone,
      email: email,
      admin: is_admin,
      editor: is_editor,
    });
  };

  const onClose = () => {
    setShowModal(false);
    AfterCancel();
    ClearData();
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className="realtive">
      <>
        <div
          className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none scale-0 origin-center ${
            showModal && "scale-100"
          } duration-300 `}
        >
          {" "}
          {showModal && (
            <div className="bg-black opacity-80 w-full h-full absolute inset-0"></div>
          )}
          <div className="relative w-auto my-6 mx-auto max-w-3xl md:max-w-sm sm:max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  text-black outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl font-semibold text-center">
                  Edit User
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none">
                    x
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form onSubmit={onSubmit}>
                  <h4 className="text-base font-bold">Username</h4>
                  <input
                    className="w-[300px] bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    autoFocus={showModal}
                  />
                  <h4 className="text-base font-bold">Name</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
                  />
                  <h4 className="text-base font-bold">Email</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <h4 className="text-base font-bold">Phone Number</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    value={phone}
                    placeholder="Phone Number"
                    onChange={(e) => setphone(e.target.value)}
                  />
                  <div className="flex items-center justify-between bg-slate-100 p-2">
                    <h4 className="text-base font-bold">Editor</h4>
                    <input
                      type="checkbox"
                      checked={is_editor}
                      className="form-checkbox h-5 w-5 text-gray-600"
                      onChange={(e) => setis_editor((prev) => !prev)}
                    />
                  </div>
                  <div className="flex items-center justify-between bg-slate-100 p-2">
                    <h4 className="text-base font-bold">Admin</h4>
                    <input
                      type="checkbox"
                      checked={is_admin}
                      className="form-checkbox h-5 w-5 text-gray-600"
                      onChange={(e) => setis_admin((prev) => !prev)}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end mt-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded w-full"
                      type="submit"
                    >
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UserEdit;
