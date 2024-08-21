import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  useIonRouter,
} from "@ionic/react";
import {
  clipboardOutline,
  clipboardSharp,
  partlySunnyOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import CommandList from "../components/CommandList";
import { Commande, EtatCommandeEnum, PaymentStatusEnum } from "../core/types";
import { getCommandes } from "../services/commandService";

const CommandListPage: React.FC = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const router = useIonRouter();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      getAllCommandes();
    }
  }, [commandes]);

  const getAllCommandes = async () => {
    try {
      setShowLoading(true);
      const { data } = await getCommandes();
      const sortedData = data.sort((a: Commande, b: Commande) => {
        return (
          new Date(b.isoDateCommande).getTime() -
          new Date(a.isoDateCommande).getTime()
        );
      });
      console.log("commandes", data);
      setShowLoading(false);
      setCommandes(sortedData);
    } catch (error) {
      console.error("Error fetching commandes", error);
      setShowLoading(false);
    }
  };

  const handleCommandSelect = (commande: Commande) => {
    history.push(`/command/list/${commande.idCommande}`);
  };

  const handlePaymenStatus = (paymentStatus: PaymentStatusEnum) => {
    setCommandes(commandes.filter((x) => x.paymentStatus === paymentStatus));
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol>
              <IonBreadcrumbs>
                <IonBreadcrumb href="/command/list">
                  Liste des commandes{" "}
                  <IonIcon icon={clipboardOutline} slot="start" />
                </IonBreadcrumb>
                <IonBreadcrumb>{commandes.length} commandes</IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonRow className="ion-margin-top">
          <IonCol>
            <IonLabel>Type de commande</IonLabel>
            <IonSegment>
              <IonSegmentButton value="PENDING">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IonIcon
                    icon={clipboardSharp}
                    style={{ marginRight: "8px", color: "#000" }}
                  />
                  <IonLabel>En attente de paiement</IonLabel>
                </div>
              </IonSegmentButton>

              <IonSegmentButton value="PAID">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IonIcon
                    icon={partlySunnyOutline}
                    style={{ marginRight: "8px", color: "#000" }}
                  />
                  <IonLabel>Payé</IonLabel>
                </div>
              </IonSegmentButton>
            </IonSegment>
          </IonCol>
        </IonRow>

        <CommandList
          commandes={commandes}
          onCommandSelect={handleCommandSelect}
        />
      </IonContent>
      <IonLoading isOpen={showLoading} message={"Veuillez patienter..."} />
    </IonPage>
  );
};

export default CommandListPage;
