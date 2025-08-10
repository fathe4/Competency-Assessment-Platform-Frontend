import React from "react";
import { SearchInput, Select } from "../../shared";
import type { UserRole } from "../../../types/common";

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: UserRole | "all";
  setRoleFilter: (role: UserRole | "all") => void;
  verificationFilter: "all" | "verified" | "unverified";
  setVerificationFilter: (filter: "all" | "verified" | "unverified") => void;
  onSearch: () => void;
  onFilterChange: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  verificationFilter,
  setVerificationFilter,
  onSearch,
  onFilterChange,
}) => {
  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "supervisor", label: "Supervisor" },
    { value: "student", label: "Student" },
  ];

  const verificationOptions = [
    { value: "all", label: "All Users" },
    { value: "verified", label: "Verified" },
    { value: "unverified", label: "Unverified" },
  ];

  const handleRoleChange = (value: string) => {
    setRoleFilter(value as UserRole | "all");
    onFilterChange();
  };

  const handleVerificationChange = (value: string) => {
    setVerificationFilter(value as "all" | "verified" | "unverified");
    onFilterChange();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* Search */}
        <div className="lg:col-span-5">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Search Users
          </label>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={onSearch}
            placeholder="Search by name or email..."
          />
        </div>

        {/* Role Filter */}
        <div className="lg:col-span-3">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Filter by Role
          </label>
          <Select
            value={roleFilter}
            onChange={handleRoleChange}
            options={roleOptions}
          />
        </div>

        {/* Verification Filter */}
        <div className="lg:col-span-3">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Verification Status
          </label>
          <Select
            value={verificationFilter}
            onChange={handleVerificationChange}
            options={verificationOptions}
          />
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1">
          <button
            onClick={onSearch}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium shadow-md"
          >
            <svg
              className="h-4 w-4 mx-auto"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
