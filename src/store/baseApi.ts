import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../services/axiosBaseQuery";
import { CONSTANTS } from "./constants";

// Create a function that can be called later to get the current access token
let getAccessToken: (() => string | null) | undefined;

// Function to set the token getter (will be called from store initialization)
export const setTokenGetter = (tokenGetter: () => string | null) => {
  getAccessToken = tokenGetter;
};

const baseQuery = axiosBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // Pass a function that dynamically calls getAccessToken when needed
  getAccessToken: () => (getAccessToken ? getAccessToken() : null),
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    CONSTANTS.USER,
    CONSTANTS.CERTIFICATE,
    CONSTANTS.AUTH,
    CONSTANTS.ASSESSMENT.TEST,
    CONSTANTS.ASSESSMENT.QUESTION,
    CONSTANTS.ASSESSMENT.RESULT,
  ],
  endpoints: () => ({}),
});
