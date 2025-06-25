"use client"

import { useState, useMemo } from "react"

export default function Payments() {
  const [activeTab, setActiveTab] = useState("Transactions")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 8

  const allPayments = [
    {
      id: 1,
      jobId: "#3066",
      user: {
        name: "Olivia Rhye",
        username: "@olivia",
      },
      status: "Payment",
      statusColor: "green",
      email: "binhan628@gmail.com",
      phone: "(406) 555-0120",
    },
    {
      id: 2,
      jobId: "#3065",
      user: {
        name: "Phoenix Baker",
        username: "@phoenix",
      },
      status: "Payment",
      statusColor: "green",
      email: "tranthuy.nute@gmail.com",
      phone: "(480) 555-0103",
    },
    {
      id: 3,
      jobId: "#3064",
      user: {
        name: "Lana Steiner",
        username: "@lana",
      },
      status: "Payment",
      statusColor: "green",
      email: "ckctm12@gmail.com",
      phone: "(319) 555-0115",
    },
    {
      id: 4,
      jobId: "#3063",
      user: {
        name: "Demi Wilkinson",
        username: "@demi",
      },
      status: "Refund",
      statusColor: "red",
      email: "trungkiend@gmail.com",
      phone: "(205) 555-0100",
    },
    {
      id: 5,
      jobId: "#3062",
      user: {
        name: "Candice Wu",
        username: "@candice",
      },
      status: "Refund",
      statusColor: "red",
      email: "nvt.lsst.nute@gmail.com",
      phone: "(217) 555-0113",
    },
    {
      id: 6,
      jobId: "#3061",
      user: {
        name: "Natali Craig",
        username: "@natali",
      },
      status: "Refund",
      statusColor: "red",
      email: "thuongnute@gmail.com",
      phone: "(405) 555-0128",
    },
    {
      id: 7,
      jobId: "#3059",
      user: {
        name: "Drew Cano",
        username: "@drew",
      },
      status: "Withdraw",
      statusColor: "gray",
      email: "g.nute@gmail.com",
      phone: "(302) 555-0107",
    },
    {
      id: 8,
      jobId: "#3057",
      user: {
        name: "Andi Lane",
        username: "@andi",
      },
      status: "Withdraw",
      statusColor: "gray",
      email: "pktnd@gmail.com",
      phone: "(209) 555-0104",
    },
    {
      id: 9,
      jobId: "#3056",
      user: {
        name: "Kate Morrison",
        username: "@kate",
      },
      status: "Payment",
      statusColor: "green",
      email: "kate.morrison@gmail.com",
      phone: "(555) 123-4567",
    },
    {
      id: 10,
      jobId: "#3055",
      user: {
        name: "Joel Miles",
        username: "@joel",
      },
      status: "Withdraw",
      statusColor: "gray",
      email: "joel.miles@gmail.com",
      phone: "(555) 987-6543",
    },
  ]

  const tabs = ["Transactions", "Withdrawals", "Refunds"]
  const statusOptions = ["All", "Payment", "Refund", "Withdraw"]

  // Filter and search logic
  const filteredPayments = useMemo(() => {
    let filtered = allPayments

    // Filter by tab
    if (activeTab === "Withdrawals") {
      filtered = filtered.filter((payment) => payment.status === "Withdraw")
    } else if (activeTab === "Refunds") {
      filtered = filtered.filter((payment) => payment.status === "Refund")
    }
    // "Transactions" shows all

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((payment) => payment.status === statusFilter)
    }

    // Filter by search term (job ID, name, username, email)
    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [activeTab, statusFilter, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayments = filteredPayments.slice(startIndex, endIndex)

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
      case "green":
        return "bg-green-100 text-green-800"
      case "red":
        return "bg-red-100 text-red-800"
      case "gray":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payments</h1>

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPayments.length > 0 ? (
              currentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.jobId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.user.name}</div>
                      <div className="text-sm text-gray-500">{payment.user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(payment.statusColor)}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No payments found matching your criteria.
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
