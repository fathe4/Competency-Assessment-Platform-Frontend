import { baseApi } from "./baseApi";
import type { ApiResponse } from "../types";

interface Certificate {
  id: string;
  levelAchieved: string;
  issuedDate: string;
  test: {
    step: number;
    score: number;
    completedAt: string;
  };
}

interface CertificatesResponse {
  certificates: Certificate[];
}

export const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCertificates: builder.query<ApiResponse<CertificatesResponse>, void>(
      {
        query: () => ({
          url: "/certificates/user/me",
          method: "GET",
        }),
        providesTags: ["Certificate"],
      }
    ),
    getCertificate: builder.query<ApiResponse<Certificate>, string>({
      query: (certificateId) => ({
        url: `/certificates/${certificateId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, certificateId) => [
        { type: "Certificate", id: certificateId },
      ],
    }),
    downloadCertificate: builder.mutation<ArrayBuffer, string>({
      query: (certificateId) => ({
        url: `/certificates/${certificateId}/download`,
        method: "GET",
        responseType: "arraybuffer", // This should handle binary data
      }),
      transformResponse: (response: ArrayBuffer) => response,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserCertificatesQuery,
  useGetCertificateQuery,
  useDownloadCertificateMutation,
} = certificateApi;
