"use client"

import { useState } from "react"
import { RiCarFill, RiSettings4Fill } from "react-icons/ri"

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
          <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
            <RiCarFill className="text-2xl mr-2" />

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
          <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
            <RiSettings4Fill className="text-2xl mr-2" />
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
