"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

export default function DisputeCenter() {
  const [activeTab, setActiveTab] = useState("View all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 8
  const navigate = useNavigate();

  const allDisputes = [
    {
      id: 1,
      jobId: "#3066",
      service: "Engine Problem",
      submitDate: "Jan 6, 2025",
      carOwner: {
        name: "Olivia Rhye",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "OR",
      },
      mechanic: {
        name: "Olivia Rhye",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "OR",
      },
      status: "Pending Review",
      statusColor: "orange",
    },
    {
      id: 2,
      jobId: "#3065",
      service: "Oil Change",
      submitDate: "Jan 6, 2025",
      carOwner: {
        name: "Phoenix Baker",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "PB",
      },
      mechanic: {
        name: "Phoenix Baker",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "PB",
      },
      status: "Payment Done",
      statusColor: "green",
    },
    {
      id: 3,
      jobId: "#3064",
      service: "Oil Change",
      submitDate: "Jan 6, 2025",
      carOwner: {
        name: "Lana Steiner",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LS",
      },
      mechanic: {
        name: "Lana Steiner",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LS",
      },
      status: "Pending Review",
      statusColor: "orange",
    },
    {
      id: 4,
      jobId: "#3063",
      service: "AC System Repair",
      submitDate: "Jan 5, 2025",
      carOwner: {
        name: "Demi Wilkinson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DW",
      },
      mechanic: {
        name: "Demi Wilkinson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DW",
      },
      status: "Payment Done",
      statusColor: "green",
    }
  ]

  const tabs = ["View all", "Car Owner", "Mechanics"]
  const statusOptions = ["All", "Pending Review", "Payment Done", "Refunded"]

  // Filter and search logic
  const filteredDisputes = useMemo(() => {
    let filtered = allDisputes

    // Filter by tab (this would be based on who initiated the dispute)
    if (activeTab === "Car Owner") {
      // In a real app, you'd filter by who initiated the dispute
      filtered = filtered.filter((_, index) => index % 2 === 0)
    } else if (activeTab === "Mechanics") {
      filtered = filtered.filter((_, index) => index % 2 === 1)
    }

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((dispute) => dispute.status === statusFilter)
    }

    // Filter by search term (job ID, service, names)
    if (searchTerm) {
      filtered = filtered.filter(
        (dispute) =>
          dispute.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dispute.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dispute.carOwner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dispute.mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [activeTab, statusFilter, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDisputes = filteredDisputes.slice(startIndex, endIndex)

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

  const getStatusBadgeClasses = (statusColor) => {
    switch (statusColor) {
      case "orange":
        return "bg-orange-100 text-orange-800"
      case "green":
        return "bg-green-100 text-green-800"
      case "gray":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className=" bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dispute Center</h1>

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
                placeholder="Search"
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
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Job ID</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submit Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mechanic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDisputes.length > 0 ? (
              currentDisputes.map((dispute) => (
                <tr key={dispute.id} onClick={() => navigate(`/details/${dispute.id}`)} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dispute.jobId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispute.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispute.submitDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">{dispute.carOwner.initials}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{dispute.carOwner.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">{dispute.mechanic.initials}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{dispute.mechanic.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(dispute.statusColor)}`}
                    >
                      {dispute.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No disputes found matching your criteria.
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
