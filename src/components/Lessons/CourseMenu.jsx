import React, { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import {
  CreateLesson,
  UpdateLesson,
  fetchCourseMenu,
  fetchCourses,
  fetchCoursesWithid,
  fetchLesson,
} from "../../api/api";
import Navigation from "../Navigation/Navigation";
import { assets } from "../../data/data";
import { Link, useParams } from "react-router-dom";
import CourseCategoryCreate from "./CourseCategoryCreate";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MarkdownEditor from "./MarkDownEditor";

const CourseMenu = () => {
  //   const [course, setCourse] = React.useState([]);

  let { id } = useParams();

  const [search, setSearch] = React.useState("");

  const [showimage, setShowImage] = React.useState(false);
  const [selected, setSelected] = React.useState(0);

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

  const course_menu_data = useQuery(["course_menu", id], fetchCourseMenu,{
    enabled:false
  });

  const course_data = useQuery(["course", id], fetchCoursesWithid);
  const [lessonEnabled, setLessonEnabled] = React.useState(false);

  const lesson_data = useQuery(["lesson", selected], fetchLesson, {
    enabled: lessonEnabled,
  });

  React.useEffect(() => {
    if (course_menu_data.isSuccess && course_menu_data.data.data.length > 0) {
      setSelected(
        course_menu_data.data.data[course_menu_data.data.data.length - 1].id
      );
      setLessonEnabled(true);
    }
  }, [course_menu_data.isSuccess, course_menu_data.data]);

  const Course_Data = useMemo(() => {
    if (course_data.data) {
      return course_data.data.data[0];
    }
  }, [course_data.data]);

  // fields = ['id', 'course', 'title', 'order', 'created_at', 'updated_at', 'content']

  const Course_Menu_Data = useMemo(() => {
    if (course_menu_data.data) {
      let data = course_menu_data.data.data;
      //sort by order
      data.sort((a, b) => {
        return a.order - b.order;
      });
      return data;
    }
  }, [course_menu_data.data]);

  const [lessonsData, setLessonsData] = React.useState([]);

  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [markdown, setMarkdown] = React.useState("");
  const [selectedTitle, setSelectedTitle] = React.useState("");
  const [isAutoSave, setIsAutoSave] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(0);
  const [titleEditable, setTitleEditable] = React.useState(false);
  const markdownRef = React.useRef(markdown);

  React.useEffect(() => {
    markdownRef.current = markdown;
  }, [markdown]);

  const lessonSave = useMutation(UpdateLesson, {
    onSuccess: () => {
      console.log("lesson save success");
    },
  });

  const lessonCreate = useMutation(CreateLesson, {
    onSuccess: (res) => {
      console.log(res.data);
      console.log("lesson create success");
      ReloadLesson();
      //Update the last  LessonData with res.data
      setLessonsData((prev) => {
        let newLessonsData = [...prev];
        newLessonsData[newLessonsData.length - 1] = res.data;
        return newLessonsData;
      });
      setSelectedLesson(res.data.id);

      //Why not change
      console.log(lessonsData);
    },
  });

  const onCreateLesson = (title) => {
    lessonCreate.mutate({
      course_menu: selected,
      content: `# ${title}`,
      title: title,
      order: lessonsData.length,
    });
  };

  React.useEffect(() => {
    if (isAutoSave && selectedLesson !== null) {
      //Save every 10 seconds
      const interval = setInterval(() => {
        Save();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isAutoSave, selectedLesson, selectedOrder, selectedTitle, selected]);

  const Save = () => {
    lessonSave.mutate({
      id: selectedLesson,
      order: selectedOrder,
      course_menu: selected,
      content: markdownRef.current,
      title: selectedTitle,
    });
  };

  //Ctrl + S to save if the lession title has
 
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        lessonSave.mutate({
          id: selectedLesson,
          order: selectedOrder,
          course_menu: selected,
          content: markdown,
          title: selectedTitle,
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [markdown, selectedLesson, selectedOrder, selectedTitle]);

  React.useEffect(() => {
    if (lesson_data.data) {
      lesson_data.refetch();
    }
  }, [selectedLesson, selectedOrder, selectedTitle, selected]);

  React.useEffect(() => {
    if (lesson_data.data) {
      setLessonsData(lesson_data.data.data);
    }
  }, [lesson_data.data]);

  const handleDragEnd = (result) => {
    console.log("Drag end....");
    if (!result.destination) {
      return;
    }

    const items = Array.from(lessonsData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLessonsData(items);
  };

  const ReloadCourse = () => {
    course_data.refetch();
  };

  const ReloadCourseMenu = () => {
    course_menu_data.refetch();
  };

  const ReloadLesson = () => {
    lesson_data.refetch();
  };

  //Search to filter the lessonsData
  React.useEffect(() => {
    if (search) {
      setLessonsData((prev) => {
        let newLessonsData = [...prev];
        newLessonsData = newLessonsData.filter((item) => {
          return item.title.toLowerCase().includes(search.toLowerCase());
        });
        return newLessonsData;
      });
    } else {
      ReloadLesson();
    }
  }, [search]);

  const LessonCreate = () => {
    //add new lessonData
    let newLessonData = {
      id: "new",
      order: lessonsData.length + 1,
      course_menu: selected,
      title: "",
    };

    setLessonsData((prev) => [...prev, newLessonData]);
  };

  const ContentView = () => (
    <div className="flex flex-row items-center justify-between px-4 border-b-2 border-gray-500 py-2 text-white">
      <div className="flex flex-row items-center">
        <input
          type="text"
          className={`w-[150px] h-9 rounded-md focus:outline-none px-2 bg-transparent mr-4 ${
            titleEditable ? "bg-white text-black" : "text-white"
          }`}
          value={selectedTitle}
          contentEditable={titleEditable}
          onDoubleClick={(event) => {
            setTitleEditable(true);
            event.target.select();
          }}
          onChange={(e) => setSelectedTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTitleEditable(false);
              lessonSave.mutate({
                id: selectedLesson,
                order: selectedOrder,
                course_menu: selected,
                content: markdown,
                title: e.target.value,
              });
            }
          }}
        />
        <h3 className="flex-grow-0 mr-2 px-2 border-l-2 border-black">
          Category :
        </h3>
        <select
          className="w-[250px] h-9 rounded-md focus:outline-none text-black mr-2"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {course_menu_data.data && Course_Menu_Data.length > 0 ? (
            Course_Menu_Data.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.title}
                </option>
              );
            })
          ) : (
            <option value={0}>Please add new category</option>
          )}
        </select>
        <CourseCategoryCreate AfterDone={ReloadCourseMenu} id={id} />
        <div className="flex items-center justify-between ml-3 border-l-2 border-black cursor-pointer">
          <input
            type="checkbox"
            id="auto-save-checkbox"
            className="form-checkbox h-5 w-5 text-gray-600 mx-3"
            checked={isAutoSave}
            onChange={() => setIsAutoSave((prev) => !prev)}
          />
          <label
            htmlFor="auto-save-checkbox"
            className="text-[13px] font-bold select-none cursor-pointer"
          >
            Auto Save
          </label>
        </div>
      </div>
      {/* New Lesson Button */}
      <div className="flex flex-row-reverse items-center">
        <button
          className="flex flex-row items-center justify-center px-2 py-2 bg-black hover:bg-slate-700 rounded"
          onClick={LessonCreate}
          title="New Lesson"
        >
          <img
            src={assets.newdocument_icon}
            className="w-7 h-7 filter brightness-0 invert"
            alt="icon"
          />
          <div className={"text-[13px] ml-1 "}>New Lesson</div>
        </button>
        <button
          className="flex flex-row items-center justify-center mx-1 px-1 py-2 bg-slate-900 hover:bg-slate-700 rounded"
          onClick={LessonCreate}
          title="Download Markdown"
        >
          <img
            src={assets.download_icon}
            className="w-7 h-7 filter brightness-0 invert"
            alt="icon"
          />
        </button>
        <button
          className="flex flex-row items-center justify-center mx-1 px-1 py-2 bg-slate-900 hover:bg-slate-700 rounded"
          onClick={LessonCreate}
          title="Markdown"
        >
          <img
            src={assets.markdown_icon}
            className="w-7 h-7 filter brightness-0 invert"
            alt="icon"
          />
        </button>
      </div>
    </div>
  );

  const LessonView = () => (
    <div
      className={"mt-2"}
      style={{ height: "calc(100vh - 160px)", overflowY: "auto" }}
    >
      {lesson_data.data && lessonsData.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lessons">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {lessonsData.map((item, index) => (
                  //if item.id is 'new' is editable textinput
                  <Draggable key={item.id} draggableId={item.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex flex-row items-center justify-between px-4 py-2 text-white hover:bg-gray-500 ${
                          item.id === selectedLesson
                            ? "bg-gray-700 text-yellow-200 border-blue-500 border-y-2  "
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedLesson(item.id);
                          setMarkdown(item.content);
                          setSelectedTitle(item.title);
                          setSelectedOrder(item.order);
                        }}
                      >
                        {item.id === "new" ? (
                          //textinput
                          <div className="flex flex-row items-center">
                            <input
                              type="text"
                              className="w-full h-9 rounded-md focus:outline-none bg-white px-2 text-black bg-transparent mr-4"
                              autoFocus={true}
                              select={true}
                              onKeyDown={(e) => {
                                console.log(e.key);
                                if (e.key === "Enter") {
                                  setLessonsData((prev) => {
                                    let newLessonsData = [...prev];
                                    newLessonsData[
                                      newLessonsData.length - 1
                                    ].id = new Date().getTime();
                                    newLessonsData[
                                      newLessonsData.length - 1
                                    ].title = e.target.value;
                                    newLessonsData[
                                      newLessonsData.length - 1
                                    ].content = e.target.value;

                                    return newLessonsData;
                                  });
                                  onCreateLesson(e.target.value);
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row items-center">
                            <h3 className="flex-grow-0 mr-2 select-none">
                              {item.title}
                            </h3>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="flex flex-row items-center justify-between px-4 border-b-2 border-gray-500 py-2">
          <h3 className="flex-grow-0 mr-2">No Lesson</h3>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex font-mono relative h-screen">
      <Navigation />
      <div className="flex flex-col w-full relative bg-black">
        <div className="flex flex-row bg-red-500 h-screen">
          {" "}
          {/*Grid is here */}
          <div className="w-[400px]  bg-gray-800">
            {/*Header */}
            <div className="flex flex-col border-gray-200 border-b-2 py-4">
              <h2 className="text-lg text-center bg-gray-800 text-white">
                {course_data.data && Course_Data.course_name}
              </h2>
            
            </div>
            {/* Search Bar */}
            <div className="flex flex-col p-4">
              <div className="flex flex-row items-center rounded-md bg-gray-200">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-gray-200 rounded-md focus:outline-none"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img
                  src={assets.search_icon}
                  className="w-4 h-4 mr-2"
                  alt="search"
                />
              </div>
            </div>
            {LessonView()}
          </div>
          <div className="flex flex-col h-full w-full bg-gray-900">
            {" "}
            {/*Content View */}
            {ContentView()}
            {/* Markdown View */}
            <div
              className="flex-grow flex-shrink-0"
              style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMenu;
