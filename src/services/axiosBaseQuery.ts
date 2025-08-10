import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosRequestConfig, AxiosError } from "axios";

type AxiosBaseQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  responseType?: AxiosRequestConfig["responseType"];
  // Optional flag to disable automatic toast error handling for specific endpoints
  suppressErrorToast?: boolean;
};

interface AxiosBaseQueryOptions {
  baseUrl?: string;
  // Global flag to enable/disable automatic error toasts
  showErrorToasts?: boolean;
  // Function to get the current access token
  getAccessToken?: () => string | null;
}

const axiosBaseQuery =
  ({
    baseUrl = "",
    showErrorToasts = false,
    getAccessToken,
  }: AxiosBaseQueryOptions = {}): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    unknown
  > =>
  async ({
    url,
    method,
    data,
    params,
    responseType,
    suppressErrorToast = false,
  }) => {
    try {
      // Get the current access token if the getter function is provided
      const accessToken = getAccessToken ? getAccessToken() : null;

      // Prepare headers with authorization if token exists
      const headers: AxiosRequestConfig["headers"] = {};
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        responseType,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      const errorResponse = {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };

      // Optional: Show toast for global error handling
      // This is disabled by default to avoid duplicate toasts when components handle errors manually
      if (showErrorToasts && !suppressErrorToast) {
        // Dynamically import to avoid circular dependencies
        const { showApiError } = await import("../utils/toast");
        showApiError(errorResponse.error);
      }

      return errorResponse;
    }
  };

export default axiosBaseQuery;
