import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import ProfilePage from "../Pages/Authentication/Profile/ProfilePage";
import UserControl from "../Pages/UserControl/UserControl";
import HomePage from "../Pages/HomePage/HomePage";
import Settings from "../Pages/Settings/Settings";
import PlatformSettings from "../Pages/Settings/PlatformSettings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
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
        element: <Settings/>,
        children:[
          {
            path: "platform",
            element: <PlatformSettings/>
          }
        ]
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
