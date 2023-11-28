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
};

// 'api/course/request/list',course.CourseRequestListAPIView.as_view(),name='course_request_list_api'),
//      path('api/course/request/create',course.CourseRequestListCreateAPIView.as_view(),name='course_request_create_api'),
//      path('api/editor/course/request/<int:pk

export const RequestList = ({ queryKey }) => {
  return axios.get("api/course/request/list");
};

export const CourseRequestCreate = (data) => {
  return axios.post("api/course/request/create", data);
};

export const CourseRequestUpdate = (data) => {
  console.log(data);
  return axios.put("api/editor/course/request/" + data.id, data);
};

export const CourseRequestDelete = (data) => {
  return axios.delete("api/editor/course/request/" + data.id, data);
};

// users....................
export const UserList = ({ queryKey }) => {
  const [_, type] = queryKey;
  return axios.get("api/user/?type="+type);
};


export const UserUpdate = (data) => {
  return axios.put("api/user/?id=" + data.id, data);
}

export const UserDelete =  (data)=>{
  return axios.delete("api/user/?id=" + data.id, data);
}

// devices
export const DeviceLists = (data)=>{
  return axios.get("api/editor/device/list");
}

//notifications

export const createNotification = (data)=>{
  return axios.post("api/editor/notification/create",data);
}