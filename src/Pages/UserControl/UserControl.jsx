"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

export default function UserControl() {
  const [activeTab, setActiveTab] = useState("View all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 8
  const navigate = useNavigate()

  const allUsers = [
    {
      id: 1,
      name: "Olivia Rhye",
      username: "@olivia",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Car Owner",
      carModel: "Tesla Model X",
    },
    {
      id: 2,
      name: "Phoenix Baker",
      username: "@phoenix",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Car Owner",
      carModel: "Land Cruiser-22",
    },
    {
      id: 3,
      name: "Lana Steiner",
      username: "@lana",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Inactive",
      role: "Car Owner",
      carModel: "Toyota Supra",
    },
    {
      id: 4,
      name: "Demi Wilkinson",
      username: "@demi",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Car Owner",
      carModel: "Land Cruiser-22",
    },
    {
      id: 5,
      name: "Candice Wu",
      username: "@candice",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Car Owner",
      carModel: "Toyota Supra",
    },
    {
      id: 6,
      name: "Natali Craig",
      username: "@natali",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Mechanic",
      carModel: "N/A",
    },
    {
      id: 7,
      name: "Drew Cano",
      username: "@drew",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Inactive",
      role: "Mechanic",
      carModel: "N/A",
    },
    {
      id: 8,
      name: "Andi Lane",
      username: "@andi",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Mechanic",
      carModel: "N/A",
    },
    {
      id: 9,
      name: "Kate Morrison",
      username: "@kate",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Car Owner",
      carModel: "BMW X5",
    },
    {
      id: 10,
      name: "Joel Miles",
      username: "@joel",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Inactive",
      role: "Mechanic",
      carModel: "N/A",
    },
    {
      id: 11,
      name: "Marcus Johnson",
      username: "@marcus",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Car Owner",
      carModel: "Audi A4",
    },
    {
      id: 12,
      name: "Sarah Wilson",
      username: "@sarah",
      avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      status: "Active",
      role: "Mechanic",
      carModel: "N/A",
    },
  ]

  const tabs = ["View all", "Car Owner", "Mechanics"]
  const statusOptions = ["All", "Active", "Inactive"]

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = allUsers

    // Filter by tab (role)
    if (activeTab === "Car Owner") {
      filtered = filtered.filter((user) => user.role === "Car Owner")
    } else if (activeTab === "Mechanics") {
      filtered = filtered.filter((user) => user.role === "Mechanic")
    }

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    // Filter by search term (name and username)
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [activeTab, statusFilter, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  // Pagination helpers
  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    return pages
  }

  return (
    <div className=" bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">User Control</h1>

        {/* Tabs and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-gray-200 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm w-64"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                  />
                </svg>
                <span>Filters</span>
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Status</h3>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={statusFilter === status}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {currentUsers.length} of {filteredUsers.length} users
          {searchTerm && ` matching "${searchTerm}"`}
          {statusFilter !== "All" && ` with status "${statusFilter}"`}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="">
                  <span>Status</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="">
                  <span>Role</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Model
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} onClick={() => navigate(`/profile/${user.id}`)} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.status === "Active" ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.carModel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
              currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => (typeof page === "number" ? goToPage(page) : null)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  page === currentPage
                    ? "bg-orange-400/5 text-orange-400"
                    : page === "..."
                      ? "text-gray-400 cursor-default"
                      : "text-gray-500 hover:bg-orange-400/5"
                }`}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
              currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Next</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Click outside to close filters */}
      {showFilters && <div className="fixed inset-0 z-0" onClick={() => setShowFilters(false)} />}
    </div>
  )
}
