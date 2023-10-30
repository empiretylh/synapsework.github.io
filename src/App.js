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
import CourseRequestView from "./components/CourseRequest/CourseRequest";
import UserView from "./components/User/UserView";
import NotFound from "./components/Error/Error";
import AuthProvider from "./auth/AuthProvider";
import Routes from "./route/route";

//base url
axios.defaults.baseURL = APIURL;

const client = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
