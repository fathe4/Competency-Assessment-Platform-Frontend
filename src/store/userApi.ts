import { baseApi } from "./baseApi";
import type {
  IGetUsersRequest,
  IGetUsersResponse,
  IChangeUserRoleRequest,
  IChangeUserRoleResponse,
  IUpdateProfileRequest,
  IUpdateProfileResponse,
  IChangePasswordRequest,
  IChangePasswordResponse,
} from "../types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users (Admin only) with pagination and filtering
    getAllUsers: builder.query<IGetUsersResponse, IGetUsersRequest>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.role && params.role !== "all")
          searchParams.append("role", params.role);
        if (params.search) searchParams.append("search", params.search);
        if (params.verified && params.verified !== "all")
          searchParams.append("verified", params.verified);

        return {
          url: `/users?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.users.map(({ _id }) => ({
                type: "User" as const,
                id: _id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // Get current user's profile
    getUserProfile: builder.query<IUpdateProfileResponse, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "PROFILE" }],
    }),

    // Update current user's profile
    updateUserProfile: builder.mutation<
      IUpdateProfileResponse,
      IUpdateProfileRequest
    >({
      query: (profileData) => ({
        url: "/users/profile",
        method: "PUT",
        data: profileData,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),

    // Change current user's password
    changePassword: builder.mutation<
      IChangePasswordResponse,
      IChangePasswordRequest
    >({
      query: (passwordData) => ({
        url: "/users/change-password",
        method: "PUT",
        data: passwordData,
      }),
    }),

    // Change user role (Admin only)
    changeUserRole: builder.mutation<
      IChangeUserRoleResponse,
      IChangeUserRoleRequest
    >({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PUT",
        data: { role },
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: "User", id: userId },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useChangeUserRoleMutation,
} = userApi;
