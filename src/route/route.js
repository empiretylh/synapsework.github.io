import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../components/Home";
import Login from "../auth/login";
import Register from "../auth/Register";
import Dashboard from "../components/Admin/Dashboard";
import CourseView from "../components/Course/CourseView";
import UserView from "../components/User/UserView";
import LessonView from "../components/Lessons/LessonVIew";
import CourseRequestView from "../components/CourseRequest/CourseRequest";
import CourseMenu from "../components/Lessons/CourseMenu";
import NotFound from "../components/Error/Error";
import NotificationView from "../components/Notification/Notification";
import { useMemo } from "react";
import SettingsView from "../components/Setting/setting";

const Routes = () => {
  const { token, isAdmin, isEditor } = useAuth();

  // Define routes accessible only to authenticated users

  let routes = [

    {
      path: "/dashboard",
      element: <Dashboard />,

    },
    {
      path: "/course",
      element: <CourseView />,
    },
    {
      path: "/user",
      element: <UserView />,
    },
    {
      path: "/lesson",
      element: <LessonView />,
    },
    {
      path: "/request",
      element: <CourseRequestView />,
    },
    {
      path: "/settings",
      element: <SettingsView />,
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
  ];

  if (isAdmin) {
    routes.push({
      path: "/notification",
      element: <NotificationView />,
    });
  }

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      errorElement: <NotFound />,
      children: routes,
    },
  ];

  const routesForPublic = [
    {
      path: "/",
      element: isAdmin || isEditor ? <Dashboard /> : <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router =
    useMemo(() => (
      createBrowserRouter([
        ...routesForPublic,
        ...routesForAuthenticatedOnly,
        ...(!token ? routesForNotAuthenticatedOnly : []),
      ])
    ), [token, isAdmin, isEditor]);


  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
