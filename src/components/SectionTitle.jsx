import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

const SectionTitle = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef();
  const location = useLocation();

  // Convert current route path to breadcrumb string
  const getBreadcrumbTitle = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";

    const formatted = segments
      .map((seg) =>
        seg
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(" > ");

    return `Dashboard > ${formatted}`;
  };

  const notifications = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      title: "New Order Received",
      time: "2 mins ago",
      description: "You have received a new order from Sarah.",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      title: "Stock Alert",
      time: "10 mins ago",
      description: "iPhone 15 Pro Max is running low on stock.",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      title: "New User Signup",
      time: "30 mins ago",
      description: "Jessica has just signed up to your platform.",
    },
    {
      id: 4,
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      title: "Support Ticket Replied",
      time: "1 hour ago",
      description: "You have a new reply from user on ticket #3214.",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between relative p-5 border-b border-gray-200">
      <div>
        <h1 className="">
          {getBreadcrumbTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-5" ref={bellRef}>
        {/* 🔍 Search */}
        <div className="flex items-center bg-gray-100 rounded-lg px-2">
          <button className="text-gray-500 p-1">
            <RiSearchLine className="text-lg" />
          </button>
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent pl-2 pr-1 py-1.5 text-sm outline-none w-full"
          />
        </div>

        {/* 🔔 Notification Bell */}
        <button
          className="relative cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <FaBell className="text-2xl text-gray-700" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* 👤 User Avatar */}
        <img
          src="https://randomuser.me/api/portraits/men/55.jpg"
          alt="User"
          className="w-9 h-9 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200"
        />

        {/* 🔽 Dropdown */}
        {open && (
          <div className="absolute right-0 top-16 w-96 bg-white rounded-xl shadow-xl z-50 border border-[#DBDBDB]">
            <div className="py-2 px-5 shadow font-semibold rounded-t-xl text-gray-700">
              Notifications
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50"
                >
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-gray-500">{n.time}</div>
                    <div className="text-sm text-gray-600">{n.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 text-center text-sm text-blue-600 hover:underline cursor-pointer">
              See All Notifications
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
