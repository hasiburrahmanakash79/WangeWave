import logo from "../assets/logo/logo.svg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiUserSettingsLine,
  RiLogoutBoxRLine,
  RiBankCardLine,
} from "react-icons/ri";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import SectionTitle from "../components/SectionTitle";
import useMe from "../hooks/useMe";

const Dashboard = () => {
  const {data, loading } = useMe();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User logged out");
        // Clear cookies or perform logout logic here
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect to sign-in page   
        Swal.fire("Logged out!", "You have been logged out successfully.", "success");
        // Redirect to sign-in page
        navigate('/signin')
      }
    });
  };

  const Menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: RiDashboardLine,
    },
    {
      title: "User Control",
      path: "/user_control",
      icon: RiUserSettingsLine,
    },
    // {
    //   title: "Dispute Center",
    //   path: "/dispute",
    //   icon: RiCustomerService2Fill,
    // },
    {
      title: "Payments",
      path: "/payments",
      icon: RiBankCardLine,
    },
    // {
    //   title: "Settings",
    //   path: "/settings",
    //   icon: RiSettings4Line,
    // },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen shadow-lg border-r border-gray-200 fixed left-0 top-0 bottom-0 z-50 pt-8 transition-all duration-500">
        {/* Logo */}
        <div className="p-2 flex flex-col items-center justify-center">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer duration-300 w-14 mb-1"
          />
          <p className="font-semibold text-center">
            Fast. Trusted. Local Mechanics.
          </p>
        </div>

        {/* Menu Items */}
        <ul className="space-y-5 mt-10">
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              className={`flex py-2 px-7 cursor-pointer text-sm items-center ${
                location.pathname === menu.path
                  ? "bg-[#FF9500]/10 text-black"
                  : "hover:bg-[#FF9500]/10"
              }`}
            >
              <li className="flex items-center gap-x-3 text-md">
                <IconContext.Provider
                  value={{ className: "react-icon text-[22px] text-[#FF9500]" }}
                >
                  <menu.icon />
                </IconContext.Provider>
                <span>{menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Profile & Logout */}
        <div className="mt-28 ms-3.5 md:ms-0 p-2 bottom-2 absolute w-full">
          <div className="flex items-center justify-center gap-x-3">
            <Link
              className="flex items-center gap-x-3 p-2 text-sm"
            >
              <img
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                alt="Profile"
                className="w-10 rounded-full"
              />
              <span>
                <p className="font-bold">{data?.data?.profile?.fullName}</p>
                <p>{data?.data?.role}</p>
              </span>
            </Link>
            <button onClick={handleLogout} className="text-2xl cursor-pointer">
              <RiLogoutBoxRLine />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64 flex-1 overflow-y-auto transition-all duration-500 h-[100vh]">
        {/* <SectionTitle /> */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
