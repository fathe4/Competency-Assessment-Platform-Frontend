import React, { useState } from "react";
import type { UserRole } from "../../types/common";
import { useGetAllUsersQuery, useChangeUserRoleMutation } from "../../store";
import { toast } from "react-toastify";
import { PageContainer } from "../shared";
import { UserFilters, UserTable, EditRoleModal } from "./components";
import type { IUser } from "../../types";

const UserManagement: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [verificationFilter, setVerificationFilter] = useState<
    "all" | "verified" | "unverified"
  >("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  // API hooks
  const {
    data: usersResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllUsersQuery({
    page,
    limit,
    role: roleFilter,
    search: searchTerm,
    verified: verificationFilter,
  });

  const [changeUserRole, { isLoading: isChangingRole }] =
    useChangeUserRoleMutation();

  // Extract users and pagination from response
  const users = usersResponse?.data?.users || [];
  const pagination = usersResponse?.data?.pagination;

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsEditModalOpen(true);
  };

  const handleSaveUserRole = async () => {
    if (selectedUser && selectedRole && selectedRole !== selectedUser.role) {
      try {
        await changeUserRole({
          userId: selectedUser._id,
          role: selectedRole,
        }).unwrap();

        toast.success(`User role updated to ${selectedRole} successfully`);
        setIsEditModalOpen(false);
        setSelectedUser(null);
        setSelectedRole(null);
        refetch();
      } catch (error: unknown) {
        console.error("Failed to update user role:", error);
        const errorMessage =
          error && typeof error === "object" && "data" in error
            ? (error as { data?: { message?: string } }).data?.message ||
              "Failed to update user role"
            : "Failed to update user role";
        toast.error(errorMessage);
      }
    } else {
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setSelectedRole(null);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setSelectedRole(null);
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page when searching
  };

  const handleFilterChange = () => {
    setPage(1); // Reset to first page when filtering
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <PageContainer maxWidth="2xl">
          <div className="bg-white rounded-3xl shadow-xl border border-red-100 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-full">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-600 mb-2">
                  Error Loading Users
                </h1>
                <p className="text-red-700 mb-4">
                  There was an error loading the users. Please try again.
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageContainer maxWidth="full" className="p-4 lg:p-6">
        {/* Modern Header */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  User Management
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Manage user accounts and permissions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          verificationFilter={verificationFilter}
          setVerificationFilter={setVerificationFilter}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium text-sm">
                Loading users...
              </span>
            </div>
          </div>
        )}

        {/* Users Table */}
        {!isLoading && !error && (
          <UserTable
            users={users}
            pagination={pagination}
            currentPage={page}
            onPageChange={setPage}
            onEditUser={handleEditUser}
            isLoading={isChangingRole}
          />
        )}

        {/* Edit Role Modal */}
        <EditRoleModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          onSave={handleSaveUserRole}
          isLoading={isChangingRole}
        />
      </PageContainer>
    </div>
  );
};

export default UserManagement;
