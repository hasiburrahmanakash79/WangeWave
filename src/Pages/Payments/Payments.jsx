"use client";

import { useState, useMemo, useEffect } from "react";
import usePaymentHistory from "../../hooks/usePaymentHistory";

export default function Payments() {
  const { paymentHistory, loading } = usePaymentHistory();
  console.log("paymentHistory:", paymentHistory);

  const [activeTab, setActiveTab] = useState("Transactions");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  const tabs = ["Transactions", "Paid", "Unpaid", "Cancelled"];

  // Filter and search logic
  const filteredPayments = useMemo(() => {
    let filtered = paymentHistory?.data || [];

    if (activeTab === "Paid") {
      filtered = filtered.filter((payment) => payment.status === "PAID");
    } else if (activeTab === "Unpaid") {
      filtered = filtered.filter((payment) => payment.status === "UNPAID");
    } else if (activeTab === "Cancelled") {
      filtered = filtered.filter((payment) => payment.status === "CANCELLED");
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          (payment.userProfile?.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (payment.userProfile?.phoneNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (payment.mechanicProfile?.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (payment.mechanicProfile?.phoneNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    console.log("filteredPayments:", filtered);
    return filtered;
  }, [activeTab, searchTerm, paymentHistory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);
  console.log("currentPayments:", currentPayments);

  // Reset currentPage if it exceeds totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center bg-white">Loading...</div>;
  }


  if (!paymentHistory?.data) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading payments or no data available.
      </div>
    );
  }

  return (
    <div className="p-6">
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
                  activeTab === tab
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
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
              placeholder="Search by name or phone"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="ps-5 py-3">NO.</th>
              <th className="px-6 py-3">Mechanic</th>
              <th className="px-6 py-3">Users</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Extra Amount</th>
              <th className="px-6 py-3">Stripe ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPayments.length > 0 ? (
              currentPayments.map((payment, index) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="ps-5 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-gray-900">{payment.mechanicProfile?.fullName || "N/A"}</div>
                    <div className="text-gray-500">{payment.mechanicProfile?.email || "N/A"}</div>
                    <div className="text-xs text-gray-500">
                      Phone: {payment.mechanicProfile?.phoneNumber || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-gray-900">{payment.userProfile?.fullName || "N/A"}</div>
                    <div className="text-gray-500">{payment.userProfile?.email || "N/A"}</div>
                    <div className="text-xs text-gray-500">
                      Phone: {payment.userProfile?.phoneNumber || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === "PAID"
                          ? "bg-green-200 text-green-800"
                          : payment.status === "UNPAID"
                          ? "bg-yellow-200 text-yellow-800"
                          : payment.status === "CANCELLED"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {payment.status || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.extraAmount ? `$${payment.extraAmount}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.userProfile?.stripeCustomerId || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
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
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Previous</span>
          </button>
          <div className="flex items-center space-x-2">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && goToPage(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  page === currentPage
                    ? "bg-orange-400/5 text-orange-400"
                    : page === "..." ? "text-gray-400 cursor-default" : "text-gray-500 hover:bg-orange-400/5"
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
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Next</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Click outside to close filters */}
      {showFilters && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}