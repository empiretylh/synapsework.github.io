import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../data/data";

///fields = ['id', 'coverimage', 'course_name', 'short_name', 'course_price', 'description', 'avaliable', 'created_at', 'updated_at', 'created_user']
// tailwindcss

const DeleteCourse = ({
  data,
  AfterDone = () => {},
  AfterCancel = () => {},
}) => {
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

  const onDelete = (id) => {
    axios
      .delete(`/api/editor/course/${id}/delete`)
      .then((res) => {
        AfterDone();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <img
        onClick={() => setShowModal(true)}
        src={assets.delete_icon}
        className="w-5 h-5 mr-2 transition hover:scale-150 duration-300 cursor-pointer"
        alt="delete"
      />
      {data ? (
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
                <div className="flex items-start py-2 px-2 justify-between border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold tracking-tighter text-red-500">
                    Delete Course
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
                <div className="flex flex-wrap px-4 w-auto text-red-500 py-6">
                  <div classname="text-[18px] font-semibold">
                    Are you sure want to delete the course?
                  </div>
                </div>
                <div className="flex flex-row">
                <div className="flex flex-col w-1/2 px-2 py-2 text-center bg-green-600 hover:bg-green-500 text-black cursor-pointer" onClick={onClose}>Cancel</div>
                  <div className="flex flex-col w-1/2 px-2 py-2 text-center bg-red-600 hover:bg-red-500 text-white cursor-pointer" onClick={()=> onDelete(data.id)}>Delete</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default DeleteCourse;
