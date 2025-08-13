"use client";

import { Trash } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../components/CommonModal";
import useUser from "../../hooks/useUser";
import apiClient from "../../lib/api-client";
import { getCookie } from "../../lib/cookie-utils";

export default function UserControl() {
  const { users, loading, refetch } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const usersData = Array.isArray(users?.data) ? users?.data : [];
  console.log("usersData:", usersData);

  const filteredUsers = useMemo(() => {
    let filtered = usersData;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          (user.profile?.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (user.profile?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    console.log("filteredUsers:", filtered);
    return filtered;
  }, [usersData, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("currentUsers:", currentUsers);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (e, user) => {
    e.stopPropagation();
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/user/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
      });
      setShowDeleteModal(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      console.error("Delete user failed:", error.response?.data || error.message);
      alert(`Failed to delete user: ${error.response?.data?.message || error.message}`);
    }
  };

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center bg-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Control</h1>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Car Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.length ? (
              currentUsers.map((user) => (
                <tr key={user._id} onClick={() => navigate(`/profile/${user._id}`)} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user?.profile?.image || "/placeholder.svg"}
                        alt={user?.profile?.fullName || "User"}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user?.profile?.fullName || "N/A"}</div>
                        <div className="text-sm text-gray-500">{user?.profile?.email || "N/A"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user?.isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <div
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${user?.isVerified ? "bg-green-400" : "bg-red-400"}`}
                      ></div>
                      {user?.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.role || "N/A"}</td>
                  <td className="px-6 py-4 text-sm capitalize text-gray-900">{user?.profile?.carInfo?.carModel || "N/A"}</td>
                  <td className="px-6 py-4">
                    <button onClick={(e) => handleDeleteClick(e, user)} className="text-gray-400 hover:text-red-600">
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
              currentPage === 1 ? "text-gray-300" : "text-gray-500 hover:text-gray-700"
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
                onClick={() => typeof page === "number" && goToPage(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  page === currentPage
                    ? "bg-orange-400/10 text-orange-400"
                    : page === "..." ? "text-gray-400" : "text-gray-500 hover:bg-orange-400/10"
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
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
              currentPage === totalPages ? "text-gray-300" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Next</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

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
            Are you sure you want to delete <strong>{selectedUser?.profile?.fullName || "this user"}</strong>?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedUser(null);
              }}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </CommonModal>
    </div>
  );
}