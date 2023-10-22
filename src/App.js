import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./auth/login";
import Register from "./auth/Register";
import Home from "./components/Home";
import Dashboard from "./components/Admin/Dashboard";
import { NavContext } from "./context/context";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import { APIURL } from "./data/data";
import CourseView from "./components/Course/CourseView";
import LessonView from "./components/Lessons/LessonVIew";
import CourseMenu from "./components/Lessons/CourseMenu";

axios.defaults.baseURL = APIURL;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common = { Authorization: `Token ${token}` };
}

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/course",
    element: <CourseView />,
  },
  {
    path: "/lesson",
    element: <LessonView />,
  },
  {
    path: "/lesson/coursemenu/:id",
    element: <CourseMenu />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
