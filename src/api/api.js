import axios from "axios";

//axios request for react-query

export const fetchCourses = ({ queryKey }) => {
  const [_key, courseid] = queryKey;
  return axios.get("/api/editor/course/list");
};

export const fetchCoursesWithid = ({ queryKey }) => {
  const [_key, courseid] = queryKey;
  return axios.get("/api/editor/course/list?course_id=" + courseid);
};

export const fetchCourseMenu = ({ queryKey }) => {
  const [_, id] = queryKey;
  console.log("course menu fetch....", id);
  return axios.get(`/api/editor/course/coursemenu/list?course_id=${id}`);
};

export const fetchLesson = ({ queryKey }) => {
  const [_, coursemenu_id] = queryKey;
  return axios.get(
    `/api/editor/course/lesson/list?coursemenu_id=${coursemenu_id}`
  );
};

export const UpdateLesson = (data) => {
  return axios.put("api/editor/course/lesson/" + data.id, data);
};


export const CreateLesson = (data) => {
  return axios.post("api/editor/course/lesson/create", data);
}
