/**
 * Test_School Assessment Platform - User Management Types
 * Types for user management operations in the admin dashboard
 */

import type { UserRole } from "./common";

// ============================================================================
// USER MANAGEMENT TYPES
// ============================================================================

export interface IUserManagement {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetUsersRequest {
  page?: number;
  limit?: number;
  role?: UserRole | "all";
  search?: string;
  verified?: "all" | "verified" | "unverified";
}

export interface IGetUsersResponse {
  success: boolean;
  data: {
    users: IUserManagement[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message: string;
}

export interface IChangeUserRoleRequest {
  userId: string;
  role: UserRole;
}

export interface IChangeUserRoleResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: UserRole;
      emailVerified: boolean;
      updatedAt: string;
    };
    roleChange: {
      from: UserRole;
      to: UserRole;
      changedAt: string;
    };
  };
  message: string;
}

export interface IUpdateProfileRequest {
  fullName: string;
}

export interface IUpdateProfileResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: UserRole;
      emailVerified: boolean;
      updatedAt: string;
    };
  };
  message: string;
}

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponse {
  success: boolean;
  message: string;
}
