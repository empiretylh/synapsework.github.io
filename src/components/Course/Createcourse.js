import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../data/data";

///fields = ['id', 'coverimage', 'course_name', 'short_name', 'course_price', 'description', 'avaliable', 'created_at', 'updated_at', 'created_user']
// tailwindcss

const CreateCourse = ({ AfterDone = () => {}, AfterCancel = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [course_name, setcourse_name] = useState("");
  const [short_name, setshort_name] = useState("");
  const [course_price, setcourse_price] = useState("");
  const [description, setdescription] = useState("");
  const [avaliable, setavaliable] = useState(false);
  const [coverimage, setcoverimage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!coverimage) {
      alert("Please upload a cover image");
      return;
    }
    const formData = new FormData();
    formData.append("coverimage", coverimage);
    formData.append("course_name", course_name);
    formData.append("short_name", short_name);
    formData.append("course_price", course_price);
    formData.append("description", description);
    formData.append("avaliable", avaliable);
    axios
      .post("/api/editor/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        AfterDone();
        setavaliable(false);
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
      if(event.key === "c" && event.altKey) setShowModal(prev=> !prev);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className="realtive">
      <button
        className="p-3 bg-slate-900 hover:bg-slate-700 rounded-lg text-white flex flex-row items-center"
        onClick={() => setShowModal(true)}
      >
        <img
          src={assets.add_icon}
          className="w-5 h-5 mr-2 filter brightness-0 invert"
          alt="add"
        />
        <span>Create Course</span>
      </button>

      <>
    
        <div
          className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none scale-0 origin-center ${
            showModal && "scale-100"
          } duration-300 `}
        >  {showModal &&   <div className="bg-black opacity-80 w-full h-full absolute inset-0"></div>}
           <div className="relative w-auto my-6 mx-auto max-w-3xl md:max-w-sm sm:max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  text-black outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold text-center">
                  Create Course
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
                  <h4 className="text-base font-bold">Course Name</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Course Name"
                    onChange={(e) => setcourse_name(e.target.value)}
                    autoFocus={showModal}
                  />
                  <h4 className="text-base font-bold">Short Name</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Short Name"
                    onChange={(e) => setshort_name(e.target.value)}
                  />
                  <h4 className="text-base font-bold">Course Price</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Course Price"
                    onChange={(e) => setcourse_price(e.target.value)}
                  />
                  <h4 className="text-base font-bold">Description</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="textarea"
                    placeholder="Description"
                    onChange={(e) => setdescription(e.target.value)}
                  />

                  <h4 className="text-base font-bold">Cover Image</h4>
                  <input
                    className="w-full bg-white text-black border border-gray-700  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="file"
                    placeholder="Cover Image"
                    onChange={(e) => setcoverimage(e.target.files[0])}
                  />

                  <div className="flex items-center justify-between bg-slate-100 p-2">
                    <h4 className="text-base font-bold">Avaliable</h4>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      onChange={(e) => setavaliable(e.target.value)}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end mt-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded w-full"
                      type="submit"
                    >
                      Create Course
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

export default CreateCourse;
