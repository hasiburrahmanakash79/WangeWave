import { useState } from "react"

export default function PlatformSettings() {
  const [notification, setNotification] = useState("")
  const [privacyPolicy, setPrivacyPolicy] = useState("")
  const [terms, setTerms] = useState("")

  const [onboardingItems, setOnboardingItems] = useState([
    { id: "firstName", label: "First Name", completed: true },
    { id: "lastName", label: "Last Name", completed: false },
    { id: "location", label: "Location", completed: true },
    { id: "garageLocation", label: "Garage location", completed: true },
    { id: "socialSecurity", label: "Social Security Card", completed: true },
    { id: "profilePhoto", label: "Profile Photo", completed: false },
    { id: "certifications", label: "Certifications", completed: false },
    { id: "license", label: "License", completed: false },
  ])

  const handleCheckboxChange = (id) => {
    setOnboardingItems((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Platform Notification Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Notification</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a description..."
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none text-sm"
            />
            <p className="text-xs text-gray-500">This is a hint text to help user.</p>
          </div>

          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Send Notification
          </button>
        </div>
      </div>

      {/* Onboarding Requirements Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Onboarding Requirement <span className="text-gray-500 font-normal">( For Mechanics )</span>
        </h2>

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
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor={item.id} className="text-sm text-gray-700 cursor-pointer select-none">
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

      {/* Privacy & Policy / Terms Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Update Privacy & Policy / Terms</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="privacy" className="block text-sm font-medium text-gray-700">
              Privacy & Policy
            </label>
            <textarea
              id="privacy"
              placeholder="Enter a description..."
              value={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none text-sm"
            />
            <p className="text-xs text-gray-500">This is a hint text to help user.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
              Terms
            </label>
            <textarea
              id="terms"
              placeholder="Enter a description..."
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none text-sm"
            />
            <p className="text-xs text-gray-500">This is a hint text to help user.</p>
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
  )
}
