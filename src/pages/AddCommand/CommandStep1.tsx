import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonContent,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCheckbox,
  IonButton,
  useIonRouter,
  createAnimation,
} from "@ionic/react";
import { setOrderType } from "../../store/actions";
import { RootState } from "../../store";
import { OrderType } from "../../core/types";
import {
  restaurantOutline,
  walkOutline,
  homeOutline,
  sunnyOutline,
} from "ionicons/icons";

const AddCommandStep1: React.FC = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const orderType = useSelector((state: RootState) => state.command.orderType);
  const [tempOrderType, setTempOrderType] = useState(orderType?.type || "");
  const [tempLocation, setTempLocation] = useState(orderType?.location || "");

  const handleTypeChange = (type: "surplace" | "aemporter") => {
    setTempOrderType(type);
    if (type === "aemporter") {
      setTempLocation(undefined);
    }
  };

  const handleLocationChange = (location: "INSIDE" | "OUTSIDE") => {
    if (tempOrderType === "surplace") {
      setTempLocation(location);
    }
  };

  const handleSubmit = () => {
    const newOrderType: OrderType = {
      type: tempOrderType as "surplace" | "aemporter",
      location: tempOrderType === "surplace" ? tempLocation : undefined,
    };
    dispatch(setOrderType(newOrderType));
    navigateToCommande2();
  };

  const navigateToCommande2 = () => {
    // Animation avant de changer de page
    const animation = createAnimation()
      .addElement(document.querySelector("ion-content")!)
      .duration(500)
      .easing("ease-out")
      .fromTo("opacity", "1", "0");

    animation.play().then(() => {
      router.push("/command/2");
    });
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol>
              <IonBreadcrumbs>
                <IonBreadcrumb href="/command/1">
                  Commande <IonIcon icon={restaurantOutline} slot="start" />
                </IonBreadcrumb>
                <IonBreadcrumb>Étape 1</IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <IonLabel>Type de Commande</IonLabel>
              <IonRow className="ion-align-items-center ion-padding-vertical">
                <IonCol size="auto">
                  <IonCheckbox
                    checked={tempOrderType === "surplace"}
                    onIonChange={() => handleTypeChange("surplace")}
                  />
                </IonCol>
                <IonCol>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IonIcon
                      icon={restaurantOutline}
                      style={{ marginRight: "8px", color: "#000" }}
                    />
                    <IonLabel>Sur Place</IonLabel>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow className="ion-align-items-center ion-padding-vertical">
                <IonCol size="auto">
                  <IonCheckbox
                    checked={tempOrderType === "aemporter"}
                    onIonChange={() => handleTypeChange("aemporter")}
                  />
                </IonCol>
                <IonCol>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IonIcon
                      icon={walkOutline}
                      style={{ marginRight: "8px", color: "#000" }}
                    />
                    <IonLabel>À Emporter</IonLabel>
                  </div>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>

          {tempOrderType === "surplace" && (
            <IonRow className="ion-margin-top">
              <IonCol>
                <IonLabel>Emplacement</IonLabel>

                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonCheckbox
                      checked={tempLocation === "INSIDE"}
                      onIonChange={() => handleLocationChange("INSIDE")}
                    />
                  </IonCol>
                  <IonCol>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon
                        icon={homeOutline}
                        style={{ marginRight: "8px", color: "#000" }}
                      />
                      <IonLabel>Intérieur</IonLabel>
                    </div>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center ion-padding-vertical">
                  <IonCol size="auto">
                    <IonCheckbox
                      checked={tempLocation === "OUTSIDE"}
                      onIonChange={() => handleLocationChange("OUTSIDE")}
                    />
                  </IonCol>
                  <IonCol>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon
                        icon={sunnyOutline}
                        style={{ marginRight: "8px", color: "#000" }}
                      />
                      <IonLabel>Extérieur</IonLabel>
                    </div>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          )}

          <IonRow className="ion-margin-top">
            <IonCol>
              {/* Bouton de validation */}
              <IonButton
                expand="block"
                onClick={handleSubmit}
                color="primary"
                className="ion-padding"
              >
                Valider et Continuer
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep1;
