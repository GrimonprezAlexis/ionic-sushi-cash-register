import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Commande, EtatCommandeEnum } from "../core/types";
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonBadge,
  IonAccordion,
  IonAccordionGroup,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
} from "@ionic/react";
import {
  timeOutline,
  restaurantOutline,
  walkOutline,
  fastFoodOutline,
  eyeOffOutline,
  eyeSharp,
} from "ionicons/icons";
import { calculateElapsedTime, formatTime } from "../core/utils";

interface CommandListProps {
  commandes: Commande[];
  onCommandSelect: (commande: Commande) => void;
}

const CommandList: React.FC<CommandListProps> = ({
  commandes,
  onCommandSelect,
}) => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getOrderTypeIcon = (type: string) => {
    const icons = {
      surplace: restaurantOutline,
      aemporter: walkOutline,
      livraison: fastFoodOutline,
    };
    return icons[type] || restaurantOutline;
  };

  return (
    <IonAccordionGroup>
      {commandes.map((commande) => (
        <IonAccordion key={commande.idCommande}>
          <IonItem slot="header" lines="full">
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="auto">
                  <IonBadge
                    color={
                      commande.etat === EtatCommandeEnum.SERVIE
                        ? "success"
                        : "warning"
                    }
                  >
                    {commande.etat}
                  </IonBadge>
                </IonCol>
                <IonCol>
                  <IonLabel>
                    <h2>Commande #{commande.idCommande}</h2>
                    <IonNote>{formatTime(commande.isoDateCommande)}</IonNote>
                    <IonNote style={{ margin: 8 }}>-</IonNote>
                    <IonNote color={"primary"}>{commande.totalPrice}€</IonNote>
                  </IonLabel>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon icon={getOrderTypeIcon(commande.orderType.type)} />
                </IonCol>
                <IonCol size="auto" onClick={() => onCommandSelect(commande)}>
                  <IonIcon icon={eyeSharp} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>

          <div className="ion-padding" slot="content">
            <IonList lines="none">
              <IonItem>
                <IonLabel>Produits</IonLabel>
                <IonText>
                  {commande.products.map((product) => product.name).join(", ")}
                </IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Temps écoulé</IonLabel>
                <IonText>
                  <IonIcon icon={timeOutline} slot="start" />
                  {calculateElapsedTime(commande.isoDateCommande)}
                </IonText>
              </IonItem>
              <IonItem>
                <IonLabel>Numéro de Table</IonLabel>
                <IonBadge color="primary">
                  {commande.tableNumber || "N/A"}
                </IonBadge>
              </IonItem>
            </IonList>
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
};

export default CommandList;
