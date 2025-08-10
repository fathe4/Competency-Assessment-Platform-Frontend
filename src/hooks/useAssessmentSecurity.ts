import { useEffect, useCallback, useRef } from "react";
import { toastUtils } from "../utils/toast";

interface AssessmentSecurityConfig {
  isActive: boolean;
  onAutoSubmit: () => void;
}

export const useAssessmentSecurity = ({
  isActive,
  onAutoSubmit,
}: AssessmentSecurityConfig) => {
  const isAutoSubmittingRef = useRef(false);

  // Auto-submit when security violation is detected
  const handleSecurityViolation = useCallback(
    (reason: string) => {
      if (isAutoSubmittingRef.current) return; // Prevent multiple auto-submissions

      isAutoSubmittingRef.current = true;
      console.warn("🚨 Security violation:", reason);
      toastUtils.error(
        `Security violation: ${reason}. Auto-submitting test...`
      );

      // Give user 2 seconds to see the message, then auto-submit
      setTimeout(() => {
        onAutoSubmit();
      }, 2000);
    },
    [onAutoSubmit]
  );

  // Block right-click
  const handleRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    toastUtils.warning("Right-click is disabled during assessment");
  }, []);

  // Block common keyboard shortcuts
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      // Block F12 (dev tools)
      if (e.key === "F12") {
        e.preventDefault();
        handleSecurityViolation("Developer tools access attempted");
        return;
      }

      // Block Ctrl+Shift+I (dev tools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        handleSecurityViolation("Developer tools access attempted");
        return;
      }

      // Block Ctrl+U (view source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        handleSecurityViolation("View source attempted");
        return;
      }

      // Block Ctrl+R and F5 (refresh)
      if ((e.ctrlKey && e.key === "r") || e.key === "F5") {
        e.preventDefault();
        handleSecurityViolation("Page refresh attempted");
        return;
      }
    },
    [handleSecurityViolation]
  );

  // Detect tab switching
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && isActive) {
      handleSecurityViolation("Tab switch detected");
    }
  }, [isActive, handleSecurityViolation]);

  // Detect navigation attempts
  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue =
      "Are you sure you want to leave? Your test will be submitted.";
    return e.returnValue;
  }, []);

  // Setup security when assessment is active
  useEffect(() => {
    if (!isActive) {
      isAutoSubmittingRef.current = false; // Reset when assessment becomes inactive
      return;
    }

    // Add event listeners
    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Disable text selection
    document.body.style.userSelect = "none";

    // Show security warning
    console.warn(
      "🚨 ASSESSMENT SECURITY ACTIVE - Violations will auto-submit test"
    );

    // Cleanup function
    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Reset text selection
      document.body.style.userSelect = "";
    };
  }, [
    isActive,
    handleRightClick,
    handleKeyPress,
    handleVisibilityChange,
    handleBeforeUnload,
  ]);

  return {
    isSecurityActive: isActive,
    isAutoSubmitting: isAutoSubmittingRef.current,
  };
};

export default useAssessmentSecurity;
