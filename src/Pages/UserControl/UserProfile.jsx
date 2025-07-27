"use client"

import DashboardCard from "../HomePage/DashboardCard"

export default function UserProfile() {
  const certificates = [
    { id: 1, type: "document" },
    { id: 2, type: "image" },
  ]

  const papers = [
    { id: 1, type: "document" },
    { id: 2, type: "image" },
    { id: 3, type: "image" },
    { id: 4, type: "image" },
  ]

  const license = [{ id: 1, type: "document" }]

  const DocumentIcon = () => (
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )

  const ImageIcon = () => (
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )

  const renderDocumentPlaceholder = (item) => (
    <div
      key={item.id}
      className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200"
    >
      {item.type === "document" ? <DocumentIcon /> : <ImageIcon />}
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="flex items-start space-x-4 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Daniel Smith"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Daniel Smith</h1>
              <p className="text-gray-600">Car and truck mechanic</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Email</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">drew@untitledui.com</p>
                <p className="text-sm text-gray-600">danilasmith@untitledui.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Phone</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">+22 123 456 7890</p>
                <p className="text-sm text-gray-600">+11 123 456 7890</p>
              </div>
            </div>
          </div>

          {/* Address and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Address</h3>
              <p className="text-sm text-gray-600">
                2464 Royal Ln. Mesa, New
                <br />
                Jersey 45463
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Avg. Price</h3>
              <p className="text-lg font-semibold text-gray-900">$250 USD</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Reviews</h3>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600">(4.5)</span>
              <span className="text-sm font-medium text-gray-900">300+ Review</span>
            </div>
          </div>
        </div>

        {/* Papers & Certificates Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Papers & Certificates</h2>
          </div>
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Certificates</h3>
            <div className="flex space-x-3">{certificates.map(renderDocumentPlaceholder)}</div>
          </div>
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Papers</h3>
            <div className="grid grid-cols-4 gap-3">{papers.map(renderDocumentPlaceholder)}</div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">License</h3>
            <div className="flex space-x-3">{license.map(renderDocumentPlaceholder)}</div>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <DashboardCard/>
      </div>
    </div>
  )
}
