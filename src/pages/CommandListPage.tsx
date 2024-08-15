import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLoading,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { clipboardOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import CommandList from "../components/CommandList";
import { Commande } from "../core/types";
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
