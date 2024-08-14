import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  alertCircleOutline,
  refreshOutline,
  homeOutline,
} from "ionicons/icons";

interface ErrorPageProps {
  errorCode?: number;
  errorMessage?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = 404,
  errorMessage = "La page que vous recherchez n'existe pas.",
  onRetry,
  onGoHome,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>🙈 Error</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              <IonIcon
                icon={alertCircleOutline}
                color="danger"
                style={{ fontSize: "4rem" }}
              />
            </IonCardTitle>
            <IonCardTitle className="ion-text-center">
              Error {errorCode}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="ion-text-center">{errorMessage}</p>
            <div className="ion-text-center ion-margin-top">
              {onRetry && (
                <IonButton
                  onClick={onRetry}
                  fill="outline"
                  className="ion-margin-end"
                >
                  <IonIcon slot="start" icon={refreshOutline} />
                  Retry
                </IonButton>
              )}
              {onGoHome && (
                <IonButton onClick={onGoHome} fill="solid">
                  <IonIcon slot="start" icon={homeOutline} />
                  Go Home
                </IonButton>
              )}
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
