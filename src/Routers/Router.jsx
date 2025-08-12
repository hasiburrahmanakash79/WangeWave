import { createBrowserRouter } from "react-router";
import Dashboard from "../Layouts/Dashboard";
import SignIn from "../Pages/Authentication/SignIn";
import UserControl from "../Pages/UserControl/UserControl";
import HomePage from "../Pages/HomePage/HomePage";
// import Settings from "../Pages/Settings/Settings";
// import PlatformSettings from "../Pages/Settings/PlatformSettings";
// import AdminPermissions from "../Pages/Settings/AdminPermissions";
// import DisputeCenter from "../Pages/DisputeCenter/DisputeCenter";
// import DisputeDetails from "../Pages/DisputeCenter/DisputeDetails";
import Payments from "../Pages/Payments/Payments";
import UserProfile from "../Pages/UserControl/UserProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/user_control",
        element: <UserControl />,
      },
      // {
      //   path: "/dispute",
      //   element: <DisputeCenter />,
      // },
      // {
      //   path: "/details/:id",
      //   element: <DisputeDetails />,
      // },
      // {
      //   path: "/settings",
      //   element: <Settings />,
      // },
      // {
      //   path: "/settings/platform",
      //   element: <PlatformSettings />,
      // },
      // {
      //   path: "/settings/permissions",
      //   element: <AdminPermissions />,
      // },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />,
      },
    ],
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
