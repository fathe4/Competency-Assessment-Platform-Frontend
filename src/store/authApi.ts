import { baseApi } from "./baseApi";
import type {
  ILoginRequest,
  IRegisterRequest,
  IAuthResponse,
  IUser,
  IVerifyOTPRequest,
  IVerifyOTPResponse,
  IResendOTPRequest,
  IResendOTPResponse,
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
} from "../types/auth";
import { CONSTANTS } from "./constants";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: [CONSTANTS.AUTH],
    }),
    register: builder.mutation<IAuthResponse, IRegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [CONSTANTS.AUTH],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [CONSTANTS.AUTH],
    }),
    verifyOTP: builder.mutation<IVerifyOTPResponse, IVerifyOTPRequest>({
      query: (otpData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: otpData,
      }),
      invalidatesTags: [CONSTANTS.AUTH],
    }),
    resendOTP: builder.mutation<IResendOTPResponse, IResendOTPRequest>({
      query: (emailData) => ({
        url: "/auth/resend-otp",
        method: "POST",
        data: emailData,
      }),
    }),
    getProfile: builder.query<
      { success: boolean; data: { user: IUser } },
      void
    >({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: [CONSTANTS.AUTH],
    }),
    forgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordRequest
    >({
      query: (emailData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: emailData,
      }),
    }),
    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordRequest
    >({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: resetData,
      }),
      invalidatesTags: [CONSTANTS.AUTH],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
