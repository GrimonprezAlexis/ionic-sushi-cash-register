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
  useIonRouter,
} from "@ionic/react";
import { setOrderType } from "../../store/actions";
import { RootState } from "../../store";
import { OrderType } from "../../core/types";

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
      <IonBreadcrumbs>
        <IonBreadcrumb>Type de Commande</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent className="ion-padding">
        <IonSegment
          value={orderType?.type}
          onIonChange={(e) =>
            handleTypeChange(e.detail.value as "surplace" | "aemporter")
          }
        >
          <IonSegmentButton value="surplace">
            <IonLabel>Sur Place</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="aemporter">
            <IonLabel>À Emporter</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {orderType?.type === "surplace" && (
          <IonContent className="ion-padding">
            <IonSegment
              value={orderType.location}
              onIonChange={(e) =>
                handleLocationChange(e.detail.value as "INSIDE" | "OUTSIDE")
              }
            >
              <IonSegmentButton value="INSIDE">
                <IonLabel>Intérieur</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="OUTSIDE">
                <IonLabel>Extérieur</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonContent>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep1;
