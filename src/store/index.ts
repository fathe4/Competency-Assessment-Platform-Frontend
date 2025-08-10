// Store configuration exports
export { store, persistor, type RootState, type AppDispatch } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";

// API imports
import { authApi } from "./authApi";
import { assessmentApi } from "./assessmentApi";
import { certificateApi } from "./certificateApi";

// Auth exports with namespace to avoid conflicts
export { authApi };
export {
  clearError as clearAuthError,
  setCredentials,
  clearCredentials,
  setLoading,
  setError as setAuthError,
  updateUserVerification,
} from "./slices/authSlice";

// Assessment exports with namespace to avoid conflicts
export { assessmentApi };
export {
  startTest,
  updateTimer,
  pauseTimer,
  resumeTimer,
  completeTest,
  setLoading as setAssessmentLoading,
  setError as setAssessmentError,
  resetAssessment,
} from "./slices/assessmentSlice";

// API hooks - Assessment
export const {
  useCheckEligibilityQuery,
  useLazyCheckEligibilityQuery,
  useStartAssessmentMutation,
  useGetCurrentQuestionQuery,
  useLazyGetCurrentQuestionQuery,
  useSubmitAnswerMutation,
  useSkipQuestionMutation,
  useNavigateQuestionMutation,
  useCompleteAssessmentMutation,
  useGetAssessmentHistoryQuery,
  useLazyGetAssessmentHistoryQuery,
  useGetActiveAssessmentQuery,
  useLazyGetActiveAssessmentQuery,
} = assessmentApi;

// API hooks - Auth
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

// API hooks - Certificate
export const {
  useGetUserCertificatesQuery,
  useGetCertificateQuery,
  useDownloadCertificateMutation,
} = certificateApi;
