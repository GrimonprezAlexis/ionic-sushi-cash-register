import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  useIonRouter,
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

  const handleTypeChange = (type: "surplace" | "aemporter") => {
    const newOrderType: OrderType = {
      type,
      location: type === "aemporter" ? undefined : orderType?.location,
    };
    dispatch(setOrderType(newOrderType));
    if (type === "aemporter") {
      navigateToCommande2();
    }
  };

  const handleLocationChange = (location: "INSIDE" | "OUTSIDE") => {
    if (orderType?.type === "surplace") {
      dispatch(setOrderType({ ...orderType, location }));
    }
    navigateToCommande2();
  };

  const navigateToCommande2 = () => {
    router.push("/command/2");
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
              <IonSegment
                value={orderType?.type}
                onIonChange={(e) =>
                  handleTypeChange(e.detail.value as "surplace" | "aemporter")
                }
              >
                <IonSegmentButton value="surplace">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IonIcon
                      icon={restaurantOutline}
                      style={{ marginRight: "8px", color: "#000" }}
                    />
                    <IonLabel>Sur Place</IonLabel>
                  </div>
                </IonSegmentButton>

                <IonSegmentButton value="aemporter">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IonIcon
                      icon={walkOutline}
                      style={{ marginRight: "8px", color: "#000" }}
                    />
                    <IonLabel>À Emporter</IonLabel>
                  </div>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>

          {orderType?.type === "surplace" && (
            <IonRow className="ion-margin-top">
              <IonCol>
                <IonLabel>Emplacement</IonLabel>
                <IonSegment
                  value={orderType?.location}
                  onIonChange={(e) =>
                    handleLocationChange(e.detail.value as "INSIDE" | "OUTSIDE")
                  }
                >
                  <IonSegmentButton value="INSIDE">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon
                        icon={homeOutline}
                        style={{ marginRight: "8px", color: "#000" }}
                      />
                      <IonLabel>Intérieur</IonLabel>
                    </div>
                  </IonSegmentButton>

                  <IonSegmentButton value="OUTSIDE">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon
                        icon={sunnyOutline}
                        style={{ marginRight: "8px", color: "#000" }}
                      />
                      <IonLabel>Extérieur</IonLabel>
                    </div>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep1;
