import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../data/data";

///fields = ['id', 'coverimage', 'course_name', 'short_name', 'course_price', 'description', 'avaliable', 'created_at', 'updated_at', 'created_user']
// tailwindcss

const EditCourse = ({ data, AfterDone = () => {}, AfterCancel = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [course_name, setcourse_name] = useState(data.course_name);
  const [short_name, setshort_name] = useState(data.short_name);
  const [course_price, setcourse_price] = useState(data.course_price);
  const [description, setdescription] = useState(data.description);
  const [avaliable, setavaliable] = useState(data.avaliable);
  const [coverimage, setcoverimage] = useState(data.coverimage);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (coverimage instanceof File) {
      formData.append("coverimage", coverimage);
    }
    formData.append("course_name", course_name);
    formData.append("short_name", short_name);
    formData.append("course_price", course_price);
    formData.append("description", description);
    formData.append("avaliable", avaliable);
    axios
      .put(`/api/editor/course/${data.id}`, formData, {
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

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const onClose = () => {
    setShowModal(false);
    AfterCancel();
  };

  return (
    <React.Fragment>
      <img
        onClick={() => setShowModal(true)}
        src={assets.edit_icon}
        className="w-5 h-5 mr-2 transition hover:scale-150 duration-300 cursor-pointer"
        alt="edit"
      />
      {data ? (
        <>
        {showModal && <div className="bg-black opacity-80 w-full h-full absolute inset-0"></div>}
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none scale-0 origin-center ${
              showModal && "scale-100"
            } duration-300 `}
          >
      
            <div className="relative w-auto my-6 mx-auto max-w-3xl md:max-w-sm sm:max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white  text-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between py-2 px-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Edit Course
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
                      defaultValue={course_name}
                      onChange={(e) => setcourse_name(e.target.value)}
                    />
                    <h4 className="text-base font-bold">Short Name</h4>
                    <input
                      className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Short Name"
                      defaultValue={short_name}
                      onChange={(e) => setshort_name(e.target.value)}
                    />
                    <h4 className="text-base font-bold">Course Price</h4>
                    <input
                      className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Course Price"
                      defaultValue={course_price}
                      onChange={(e) => setcourse_price(e.target.value)}
                    />
                    <h4 className="text-base font-bold">Description</h4>
                    <input
                      className="w-full bg-white text-black border border-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="textarea"
                      placeholder="Description"
                      defaultValue={description}
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
                        checked={avaliable}
                        onChange={(e) => setavaliable(e.target.value)}
                      />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end mt-3 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded w-full"
                        type="submit"
                      >
                       Update Course
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default EditCourse;
