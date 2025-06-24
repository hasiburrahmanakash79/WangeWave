import logo from "../assets/logo/logo.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  RiHome4Line,
  RiShoppingCart2Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";

const Dashboard = () => {
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
      }
    });
  };

  const Menus = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: RiHome4Line,
    },
    {
      title: "Order Management",
      path: "/admin/orders",
      icon: RiShoppingCart2Line,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen shadow-lg border-r border-gray-200 fixed left-0 top-0 bottom-0 z-50 pt-8 transition-all duration-500">
        {/* Logo */}
        <div className="p-2 flex items-center justify-center">
          <img src={logo} alt="logo" className="cursor-pointer duration-300 w-12" />
        </div>

        {/* Menu Items */}
        <ul>
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              className={`flex py-1.5 px-7 cursor-pointer text-sm items-center ${
                location.pathname === menu.path
                  ? "bg-[#006850] text-white"
                  : "hover:bg-[#006850]/10"
              }`}
            >
              <li className="flex items-center gap-x-3 text-md">
                <IconContext.Provider value={{ className: "react-icon text-xl" }}>
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
            <Link to="/admin/profile" className="flex items-center gap-x-3 p-2 text-sm">
              <img
                src="https://randomuser.me/api/portraits/men/31.jpg"
                alt="Profile"
                className="w-10 rounded-full"
              />
              <span>
                <p className="font-bold">Deal port</p>
                <p>admin@admin.com</p>
              </span>
            </Link>
            <button onClick={handleLogout} className="text-2xl cursor-pointer">
              <RiLogoutBoxRLine />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64 pr-4 flex-1 overflow-y-auto transition-all duration-500 h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
