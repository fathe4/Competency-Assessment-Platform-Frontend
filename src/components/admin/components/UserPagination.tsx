import React from "react";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface UserPaginationProps {
  pagination: PaginationInfo;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const UserPagination: React.FC<UserPaginationProps> = ({
  pagination,
  currentPage,
  onPageChange,
  isLoading = false,
}) => {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="px-5 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-600">
          Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
          {Math.min(
            pagination.currentPage * pagination.limit,
            pagination.totalUsers
          )}{" "}
          of {pagination.totalUsers} results
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!pagination.hasPrev || isLoading}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
          </button>
          <span className="px-3 py-2 bg-white rounded-lg border border-gray-300 font-medium text-xs">
            {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!pagination.hasNext || isLoading}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPagination;
