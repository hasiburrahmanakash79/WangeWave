"use client";

import { Edit, Trash } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../components/CommonModal";
import useUser from "../../hooks/useUser";
import apiClient from "../../lib/api-client"; // Import apiClient for API calls
import { getCookie } from "../../lib/cookie-utils";


export default function UserControl() {
  const { users, loading } = useUser();
  const [activeTab, setActiveTab] = useState("View all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Ensure usersData is an array, default to empty array if undefined/null
  const usersData = Array.isArray(users?.data) ? users?.data : [];

  console.log(usersData);

  const tabs = ["View all", "Car Owner", "Mechanics"];
  const statusOptions = ["All", "Act ive", "Inactive"];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = usersData;

    if (activeTab === "Car Owner") {
      filtered = filtered.filter((user) => user.role === "Car Owner");
    } else if (activeTab === "Mechanics") {
      filtered = filtered.filter((user) => user.role === "Mechanic");
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [usersData, activeTab, statusFilter, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Pagination helpers
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
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  // API handlers for edit and delete
  const handleEditClick = (e, user) => {
    e.stopPropagation();
    setSelectedUser(user);
    setEditFormData({
      name: user.name || "",
      username: user.username || "",
      status: user.status || "Active",
      role: user.role || "Car Owner",
      carModel: user.carModel || "",
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (e, user) => {
    e.stopPropagation();
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(`/user/${selectedUser._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      console.log("User updated:", response.data);
      setShowEditModal(false);
      setSelectedUser(null);
      // Optionally trigger a refetch of users via useUser hook
    } catch (error) {
      console.error("Edit user failed:", error.response?.data || error.message);
      alert(`Edit user failed: ${JSON.stringify(error.response?.data) || error.message}`);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await apiClient.delete(`/user/${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      console.log("User deleted:", response.data);
      setShowDeleteModal(false);
      setSelectedUser(null);
      // Optionally trigger a refetch of users via useUser hook
    } catch (error) {
      console.error("Delete user failed:", error.response?.data || error.message);
      alert(`Delete user failed: ${JSON.stringify(error.response?.data) || error.message}`);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          User Control
        </h1>

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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                  />
                </svg>
                <span>Filters</span>
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Filter by Status
                    </h3>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={statusFilter === status}
                            onChange={(e) =>
                              handleStatusFilterChange(e.target.value)
                            }
                            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user?._id}
                  onClick={() => navigate(`/profile/${user._id}`)} // Changed user.id to user._id
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name || "User"}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.username || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isVerified === "true"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.isVerified === "true"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      ></div>
                      {user.isVerified || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.carModel || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-7">
                      <button
                        onClick={(e) => handleDeleteClick(e, user)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash />
                      </button>
                      <button
                        onClick={(e) => handleEditClick(e, user)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
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
                onClick={() =>
                  typeof page === "number" ? goToPage(page) : null
                }
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

      {/* Edit Modal */}
      <CommonModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        title={`Edit User: ${selectedUser?.name || ""}`}
      >
        {selectedUser && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={editFormData.status}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={editFormData.role}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="Car Owner">Car Owner</option>
                <option value="Mechanic">Mechanic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Car Model
              </label>
              <input
                type="text"
                name="carModel"
                value={editFormData.carModel}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={editFormData.role === "Mechanic"}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </CommonModal>

      {/* Delete Modal */}
      <CommonModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the user{" "}
            <strong>{selectedUser?.name || "N/A"}</strong>?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedUser(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </CommonModal>

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