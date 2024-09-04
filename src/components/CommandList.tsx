import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Commande,
  LabelPaymentStatusEnum,
  PaymentStatusEnum,
} from "../core/types";
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
  IonItemGroup,
  IonItemDivider,
  IonRippleEffect,
} from "@ionic/react";
import {
  timeOutline,
  restaurantOutline,
  walkOutline,
  fastFoodOutline,
  eyeSharp,
  chevronDownOutline,
  chevronUpOutline,
} from "ionicons/icons";
import { calculateElapsedTime, formatDate } from "../core/utils";

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
    const icons: any = {
      surplace: restaurantOutline,
      aemporter: walkOutline,
      livraison: fastFoodOutline,
    };
    return icons[type] || restaurantOutline;
  };

  const groupedCommandes = commandes.reduce((groups: any, commande) => {
    const date = formatDate(commande.isoDateCommande, "DD/MM/YYYY");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(commande);
    return groups;
  }, {});

  return (
    <IonList style={{ padding: "0", margin: "0" }}>
      {Object.keys(groupedCommandes).map((date) => (
        <IonItemGroup key={date}>
          <IonItemDivider
            sticky
            style={{
              backgroundColor: "whitesmoke",
              marginTop: "1rem",
              padding: "4px 16px",
            }}
          >
            <IonLabel
              color="primary"
              style={{ fontSize: "1em", fontWeight: "bold" }}
            >
              {date}
            </IonLabel>
          </IonItemDivider>
          <IonAccordionGroup>
            {groupedCommandes[date].map((commande: Commande) => (
              <IonAccordion key={commande.idCommande}>
                <IonItem
                  slot="header"
                  lines="full"
                  style={{
                    padding: "8px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <IonGrid style={{ padding: "0" }}>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="auto">
                        <IonBadge
                          color={
                            commande.paymentStatus === PaymentStatusEnum.PENDING
                              ? "warning"
                              : commande.paymentStatus ===
                                PaymentStatusEnum.PAID
                              ? "success"
                              : "medium"
                          }
                          style={{ fontSize: "0.8em", padding: "4px 6px" }}
                        >
                          {LabelPaymentStatusEnum[commande.paymentStatus]}
                        </IonBadge>
                      </IonCol>
                      <IonCol>
                        <IonLabel
                          style={{ fontSize: "1em", fontWeight: "bold" }}
                        >
                          {formatDate(commande.isoDateCommande, "HH:mm")}
                          <IonIcon
                            icon={getOrderTypeIcon(commande.orderType.type)}
                            style={{
                              marginLeft: "8px",
                              verticalAlign: "middle",
                            }}
                          />
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  <div style={{ textAlign: "right", flexGrow: 1 }}>
                    <IonText
                      color="primary"
                      style={{ fontSize: "1.2em", fontWeight: "bold" }}
                    >
                      {commande.totalPrice}€
                    </IonText>
                  </div>

                  <IonIcon
                    icon={eyeSharp}
                    onClick={() => onCommandSelect(commande)}
                    slot="end"
                    style={{ fontSize: "1.2em", verticalAlign: "middle" }}
                  />
                </IonItem>

                <div
                  className="ion-padding"
                  slot="content"
                  style={{ padding: "8px 16px" }}
                >
                  <IonList lines="none" style={{ padding: "0" }}>
                    <IonItem style={{ padding: "4px 0" }}>
                      <IonLabel
                        style={{ fontSize: "0.85em", color: "#8c8c8c" }}
                      >
                        Produits
                      </IonLabel>
                      <IonText style={{ fontSize: "0.85em", color: "#ffffff" }}>
                        {commande.products
                          .map((product) => product.name)
                          .join(", ")}
                      </IonText>
                    </IonItem>
                    <IonItem style={{ padding: "4px 0" }}>
                      <IonLabel
                        style={{ fontSize: "0.85em", color: "#8c8c8c" }}
                      >
                        Temps écoulé
                      </IonLabel>
                      <IonText style={{ fontSize: "0.85em", color: "#ffffff" }}>
                        <IonIcon icon={timeOutline} slot="start" />
                        {calculateElapsedTime(commande.isoDateCommande)}
                      </IonText>
                    </IonItem>
                    {commande.tableNumber && (
                      <IonItem style={{ padding: "4px 0" }}>
                        <IonBadge
                          color="tertiary"
                          style={{ fontSize: "0.85em" }}
                        >
                          Table {commande.tableNumber}
                        </IonBadge>
                      </IonItem>
                    )}
                  </IonList>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </IonItemGroup>
      ))}
    </IonList>
  );
};

export default CommandList;
