import React from "react";
import type { UserRole } from "../../../types/common";
import { TableRow, TableCell } from "../../shared";

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  isLoading?: boolean;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  onEdit,
  isLoading = false,
}) => {
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
      case "supervisor":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white";
      case "student":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <TableRow>
      {/* User Info */}
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            {user.isVerified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-0.5">
                <svg
                  className="h-2.5 w-2.5 text-white"
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
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.fullName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </TableCell>

      {/* Role */}
      <TableCell>
        <span
          className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getRoleBadgeColor(user.role)}`}
        >
          {user.role.toUpperCase()}
        </span>
      </TableCell>

      {/* Verification Status */}
      <TableCell>
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            user.isVerified
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {user.isVerified ? "Verified" : "Pending"}
        </span>
      </TableCell>

      {/* Created Date */}
      <TableCell>
        <div className="text-xs text-gray-600">
          {formatDate(user.createdAt)}
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-center">
        <button
          onClick={() => onEdit(user)}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50"
        >
          <svg
            className="h-3 w-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
