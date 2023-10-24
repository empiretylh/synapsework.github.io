import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../data/data";

///fields = ['id', 'coverimage', 'course_name', 'short_name', 'course_price', 'description', 'avaliable', 'created_at', 'updated_at', 'created_user']
// tailwindcss

const CourseCategoryCreate = ({
  id,
  AfterDone = () => {},
  AfterCancel = () => {},
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please Filled the title");
      return;
    }

        //  fields = ['id', 'course', 'title', 'created_at', 'updated_at']
    const formData = {
      course: id,
      title: title,
    }

    console.log(JSON.stringify(formData))
    axios
      .post("api/editor/course/coursemenu/create", formData,{
        headers:{
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        AfterDone();
        setTitle("");
      });

    setShowModal(false);
  };

  const onClose = () => {
    setShowModal(false);
    AfterCancel();
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
      //Alt + c to open setshowmodal true
      if (event.key === "e" && event.altKey) setShowModal((prev) => !prev);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className="realtive">
      <button
        className="p-2 bg-slate-900 hover:bg-slate-700 rounded-lg text-white flex flex-row items-center text-sm"
        onClick={() => setShowModal(true)}
        title="Add Category"
      >
        <img
          src={assets.addcatgory_icon}
          className="w-7 h-7 filter brightness-0 invert"
          alt="add"
        />
      </button>
      <>
        {showModal && (
          <div className="bg-black opacity-80 w-full h-full absolute inset-0"></div>
        )}
        <div
          className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none scale-0 origin-center ${
            showModal && "scale-100"
          } duration-300 `}
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl md:max-w-sm sm:max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  text-black outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl font-semibold text-center">
                  Create Category
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
                  <h4 className="text-base font-bold">Category Title</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Category Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={showModal}
                  />
                  {/*footer*/}
                  <div className="flex items-center justify-end mt-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded w-full"
                      type="submit"
                    >
                      Create Category
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

export default CourseCategoryCreate;
