import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import EmailVerificationModal from "../auth/EmailVerificationModal";

interface VerificationWrapperProps {
  children: React.ReactNode;
}

const VerificationWrapper: React.FC<VerificationWrapperProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // If user is not verified, show verification modal
  React.useEffect(() => {
    if (user && !user.isVerified) {
      setShowVerificationModal(true);
    } else {
      setShowVerificationModal(false);
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowVerificationModal(false);
  };

  return (
    <>
      {children}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={handleCloseModal}
        email={user?.email || ""}
      />
    </>
  );
};

export default VerificationWrapper;
