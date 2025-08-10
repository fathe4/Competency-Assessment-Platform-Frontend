import React from "react";
import { Modal } from "../../shared";
import type { UserRole } from "../../../types/common";

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  onSave: () => void;
  isLoading?: boolean;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isOpen,
  onClose,
  user,
  selectedRole,
  setSelectedRole,
  onSave,
  isLoading = false,
}) => {
  if (!user) return null;

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

  const roles: UserRole[] = ["admin", "supervisor", "student"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-white"
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
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Edit User Role</h3>
            <p className="text-blue-100 text-sm">
              Update permissions for this user
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {/* User Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-600 truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Current Role:</span>
            <span
              className={`px-2 py-1 text-xs font-bold rounded-full ${getRoleBadgeColor(user.role)}`}
            >
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-3">
            Select new role:
          </p>
          <div className="space-y-2">
            {roles.map((role) => (
              <label
                key={role}
                className="flex items-center p-3 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200"
                style={{
                  borderColor: selectedRole === role ? "#3b82f6" : "#e5e7eb",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex-1">
                  <span className="text-xs font-medium text-gray-900 capitalize">
                    {role}
                  </span>
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full ${getRoleBadgeColor(role)}`}
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 font-medium text-sm disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              <span>Saving...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default EditRoleModal;
