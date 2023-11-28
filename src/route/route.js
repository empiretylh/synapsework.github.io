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

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      errorElement: <NotFound />,
      children: [
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
          path: "/notification",
          element: <NotificationView />,
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
      ],
    },
  ];

  const routesForPublic = [
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
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...(!token ? routesForNotAuthenticatedOnly : []),
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
