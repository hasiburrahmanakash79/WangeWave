import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import ProfilePage from "../Pages/Authentication/Profile/ProfilePage";
import UserControl from "../Pages/UserControl/UserControl";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/user_control",
        element: <UserControl/>
      },
      {
        path: "/dispute",
        element: <ProfilePage/>
      },
      {
        path: "/settings",
        element: <ProfilePage/>
      },
      {
        path: "/payments",
        element: <ProfilePage/>
      },
      {
        path: "/profile",
        element: <ProfilePage/>
      },

    ],
  },
  
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
