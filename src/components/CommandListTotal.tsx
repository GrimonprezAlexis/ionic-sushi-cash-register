import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonLabel,
  IonText,
} from "@ionic/react";
import React from "react";

interface CommandListTotalProps {
  totalRevenue: number;
}

const CommandListTotal: React.FC<CommandListTotalProps> = ({
  totalRevenue,
}) => {
  return (
    <IonCard>
      <IonCardContent>
        <div className="ion-text-center">
          <IonText style={{ fontSize: "1em" }}>
            Montant total des commandes payées:
          </IonText>
          <IonLabel
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "1.5em",
              fontWeight: "bold",
            }}
          >
            {totalRevenue.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </IonLabel>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CommandListTotal;
