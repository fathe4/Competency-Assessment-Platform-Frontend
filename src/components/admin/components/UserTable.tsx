import React from "react";
import { TableHeader } from "../../shared";
import type { UserRole } from "../../../types/common";
import UserRow from "./UserRow";
import UserPagination from "./UserPagination";

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface UserTableProps {
  users: User[];
  pagination?: PaginationInfo;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEditUser: (user: User) => void;
  isLoading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  pagination,
  currentPage,
  onPageChange,
  onEditUser,
  isLoading = false,
}) => {
  const tableColumns = [
    { key: "user", header: "User" },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
    { key: "joined", header: "Joined" },
    { key: "actions", header: "Actions", className: "text-center" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <TableHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <svg
              className="h-5 w-5 text-blue-600"
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
            <span>Users ({pagination?.totalUsers || 0})</span>
          </h2>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{users.filter((u) => u.isVerified).length} Verified</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{users.filter((u) => !u.isVerified).length} Pending</span>
            </div>
          </div>
        </div>
      </TableHeader>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onEdit={onEditUser}
                isLoading={isLoading}
              />
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 mb-3"
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
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No users found
            </h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <UserPagination
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default UserTable;
