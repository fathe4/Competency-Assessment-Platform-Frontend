import { useCallback } from "react";
import { useDownloadCertificateMutation } from "../store";
import { toastUtils, showApiError } from "../utils/toast";

export const useCertificateDownload = () => {
  const [downloadCertificate, { isLoading }] = useDownloadCertificateMutation();

  const downloadCertificatePDF = useCallback(
    async (certificateId: string, fileName?: string) => {
      try {
        const response = await downloadCertificate(certificateId).unwrap();

        // Convert ArrayBuffer to Blob
        const blob = new Blob([response], { type: "application/pdf" });

        const url = window.URL.createObjectURL(blob);
        console.log("🔗 Created blob URL:", url);

        // Create temporary link and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || `certificate-${certificateId}.pdf`;
        link.style.display = "none"; // Hide the link

        document.body.appendChild(link);
        link.click();
        console.log("✅ Download triggered");

        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          console.log("🧹 Cleanup completed");
        }, 100);

        toastUtils.success("Certificate downloaded successfully!");
      } catch (error) {
        console.error("Download error:", error);
        showApiError(error);
      }
    },
    [downloadCertificate]
  );

  return {
    downloadCertificatePDF,
    isDownloading: isLoading,
  };
};
