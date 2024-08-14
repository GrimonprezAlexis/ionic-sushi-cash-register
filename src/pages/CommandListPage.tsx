import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { clipboardOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CommandList from "../components/CommandList";
import { Commande } from "../core/types";
import { getCommandes } from "../services/commandService";

const CommandListPage: React.FC = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const router = useIonRouter();
  const history = useHistory();

  useEffect(() => {
    if (commandes.length === 0) {
      console.log(commandes);
      getAllCommandes();
    }
  }, [commandes]);

  const getAllCommandes = async () => {
    try {
      const { data } = await getCommandes();
      const sortedData = data.sort((a: Commande, b: Commande) => {
        return (
          new Date(b.isoDateCommande).getTime() -
          new Date(a.isoDateCommande).getTime()
        );
      });
      console.log("commandes", data);
      setCommandes(sortedData);
    } catch (error) {
      console.error("Error fetching commandes", error);
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
    </IonPage>
  );
};

export default CommandListPage;
