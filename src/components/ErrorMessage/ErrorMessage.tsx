import { IonToast } from "@ionic/react";
import React from "react";

interface ErrorMessageProps {
  showError: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  showError,
  errorMessage,
  onClose,
}) => {
  return (
    <IonToast
      isOpen={showError}
      onDidDismiss={onClose}
      message={errorMessage}
      duration={3000}
      color="danger" // Red color for error
      position="top" // You can adjust to "bottom" or "middle"
    />
  );
};

export default ErrorMessage;
