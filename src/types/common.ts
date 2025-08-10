/**
 * Test_School Assessment Platform - Common Types
 * Shared types, enums, and constants used throughout the application
 */

// ============================================================================
// CORE TYPE DEFINITIONS
// ============================================================================

export type UserRole = "admin" | "student" | "supervisor";
export type CompetencyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type TestStep = 1 | 2 | 3;
export type TestStatus =
  | "in_progress"
  | "completed"
  | "failed"
  | "failed_no_retake"
  | "abandoned";

export type AssessmentStatus = "eligible" | "blocked_step1_failure";

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SortParams {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  status?: string;
  role?: UserRole;
  level?: CompetencyLevel;
  step?: TestStep;
  dateFrom?: Date;
  dateTo?: Date;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const COMPETENCY_LEVELS: CompetencyLevel[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
];

export const TEST_STEPS: TestStep[] = [1, 2, 3];

export const USER_ROLES: UserRole[] = ["admin", "student", "supervisor"];

export const TEST_STATUSES: TestStatus[] = [
  "in_progress",
  "completed",
  "failed",
  "failed_no_retake",
  "abandoned",
];

export const ASSESSMENT_STATUSES: AssessmentStatus[] = [
  "eligible",
  "blocked_step1_failure",
];

// Step to Level mapping
export const STEP_LEVEL_MAPPING: Record<TestStep, CompetencyLevel[]> = {
  1: ["A1", "A2"],
  2: ["B1", "B2"],
  3: ["C1", "C2"],
};

// Level to Step mapping
export const LEVEL_STEP_MAPPING: Record<CompetencyLevel, TestStep> = {
  A1: 1,
  A2: 1,
  B1: 2,
  B2: 2,
  C1: 3,
  C2: 3,
};
