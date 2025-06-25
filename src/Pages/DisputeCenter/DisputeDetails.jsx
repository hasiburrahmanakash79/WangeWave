"use client"

import { useState } from "react"

export default function DisputeDetails() {
  const [adminDecision, setAdminDecision] = useState("")

  const carImages = [
    "https://www.bergerandgreen.com/wp-content/uploads/2020/12/pittsburgh-personal-injury-lawyer-what-are-common-delayed-symptoms-after-a-car-accident.jpg",
    "https://www.johnfoy.com/wp-content/uploads/2019/02/faqs-what-happens-to-your-body-in-a-car-crash-2.jpg",
    "https://www.themartinezlawfirm.com/wp-content/uploads/2024/02/The-Difference-Between-a-Minor-Car-Accident-and-a-Major-Car-Accident-.webp",
  ]

  return (
    <div className="p-5 rounded-2xl bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dispute Center</h1>
        <p className="text-gray-600">Track, manage and forecast your customers and orders.</p>
      </div>

      {/* Main Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Car & Owner Details Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-gray-800 rounded mr-3 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Car & Owner Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <p className="text-sm text-gray-900">Engine Oil Change</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
              <p className="text-sm text-gray-900 font-medium">Brown Smith</p>
              <p className="text-sm text-gray-600">brownsmith@aaa.com</p>
              <p className="text-sm text-gray-600">+1 123 456 7890</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <p className="text-lg font-semibold text-gray-900">$150.00</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Details</label>
              <p className="text-sm text-gray-900">2020 Toyota Camry</p>
              <p className="text-sm text-gray-600">License: LA-3567-01</p>
            </div>
          </div>
        </div>

        {/* Mechanic Details Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-gray-800 rounded mr-3 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Mechanic Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <p className="text-sm text-gray-900">Engine Oil Change</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mechanic</label>
              <p className="text-sm text-gray-900 font-medium">Daniel Smith</p>
              <p className="text-sm text-gray-600">danielsmith123@smithauto.com</p>
              <p className="text-sm text-gray-600">+1 123 456 7890</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 ml-1">4.5</span>
                </div>
                <span className="text-sm text-gray-600">300+ Review</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop Address</label>
              <p className="text-sm text-gray-900">2364 Royal Ln, Mesa, New</p>
              <p className="text-sm text-gray-900">Jersey 44483</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer's Rejection Reason */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Customer&#39;s Rejection Reason</h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            The mechanic did not replace the oil filter as promised. The old filter was still there when I checked. Also
            there were oil stains left on my garage floor that were not cleaned up.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            Also he did not replace the back tires as promised. The old filter was still there when I checked.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Car Images</label>
            <div className="flex space-x-3">
              {carImages.map((image, index) => (
                <div key={index} className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Car image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Submitted On: 19.06.05 - Mar 30, 2008</p>
        </div>
      </div>

      {/* Admin Decision */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Decision</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="admin-decision" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="admin-decision"
              placeholder="Enter a description..."
              value={adminDecision}
              onChange={(e) => setAdminDecision(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">This is a hint text to help user.</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel request
            </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
              Refund Customer
            </button>
            <button className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 transition-colors">
              Pay Mechanic
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
