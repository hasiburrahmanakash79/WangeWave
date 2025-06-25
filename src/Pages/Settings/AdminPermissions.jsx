import { useState } from "react";

const AdminPermissions = () => {
  const [onboardingItems, setOnboardingItems] = useState([
    { id: "firstName", label: "First Name", completed: true },
    { id: "lastName", label: "Last Name", completed: false },
    { id: "location", label: "Location", completed: true },
    { id: "garageLocation", label: "Garage location", completed: true },
    { id: "socialSecurity", label: "Social Security Card", completed: true },
    { id: "profilePhoto", label: "Profile Photo", completed: false },
    { id: "certifications", label: "Certifications", completed: false },
    { id: "license", label: "License", completed: false },
  ]);

  const handleCheckboxChange = (id) => {
    setOnboardingItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="max-w-6xl space-y-5">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Admin Role & Permissions
      </h2>

      {/* Onboarding Requirements Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className=" mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Danial Smith{" "}
            <span className="text-gray-500 font-normal"> ( Super admin )</span>
          </h2>
          <p className="text-gray-500 text-sm">danial123@gmail.com</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {onboardingItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={item.id}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      item.completed
                        ? "bg-orange-400 border-orange-400"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                <label
                  htmlFor={item.id}
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-2">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Update
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md text-sm font-medium bg-white transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className=" mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Danial Smith{" "}
            <span className="text-gray-500 font-normal"> ( Super admin )</span>
          </h2>
          <p className="text-gray-500 text-sm">danial123@gmail.com</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {onboardingItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={item.id}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      item.completed
                        ? "bg-orange-400 border-orange-400"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                <label
                  htmlFor={item.id}
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-2">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Update
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md text-sm font-medium bg-white transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className=" mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Danial Smith{" "}
            <span className="text-gray-500 font-normal"> ( Super admin )</span>
          </h2>
          <p className="text-gray-500 text-sm">danial123@gmail.com</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {onboardingItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={item.id}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      item.completed
                        ? "bg-orange-400 border-orange-400"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                <label
                  htmlFor={item.id}
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 pt-2">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Update
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md text-sm font-medium bg-white transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPermissions;
