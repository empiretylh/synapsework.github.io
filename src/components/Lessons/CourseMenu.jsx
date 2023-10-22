import React, { useMemo } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {
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

  const course_menu_data = useQuery(["course_menu", id], fetchCourseMenu);

  const course_data = useQuery(["course", id], fetchCoursesWithid);
  const [lessonEnabled, setLessonEnabled] = React.useState(false);

  const lesson_data = useQuery(["lesson", selected], fetchLesson, {
    enabled: lessonEnabled,
  });

  React.useEffect(() => {
    if (course_menu_data.isSuccess) {
      setSelected(course_menu_data.data.data[0].id);
      setLessonEnabled(true);
    }
  }, [course_menu_data.isSuccess]);

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

  React.useEffect(() => {
    if (lesson_data.data) {
      setLessonsData(lesson_data.data.data);
    }
  }, [lesson_data.data]);

  const handleDragEnd = (result) => {
    console.log("Drag end....")
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
    lesson_data.fetch();
  };

  const LessonView = () => (
    <div className={"mt-2"}>
      {lesson_data.data && lessonsData.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lessons">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {lessonsData.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex flex-row items-center justify-between px-4 border-b-2 border-gray-500 py-2"
                      >
                        <div className="flex flex-row items-center">
                          <h3 className="flex-grow-0 mr-2">{item.title}</h3>
                        </div>
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
              <h3 className="text text-right text-[13px] text-white px-2 ">
                3 category, 23 lessons
              </h3>
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
          <div className="w-full bg-gray-200 h-full flex-col">
            {" "}
            {/*Content View */}
            <div className="flex flex-row items-center justify-between px-4 border-b-2 border-gray-500 py-2">
              <div className="flex flex-row items-center">
                <h3 className="flex-grow-0 mr-2">Select Category : </h3>
                <select
                  className="w-[300px] h-9 rounded-md focus:outline-none"
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
              </div>
              <CourseCategoryCreate AfterDone={ReloadCourseMenu} id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMenu;
