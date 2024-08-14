import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import CommandListItem from "../../components/CommandListItem";
import { Commande } from "../../core/types";
import { getCommandes } from "../../services/commandService";

const AddCommandStep3: React.FC = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
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
    history.push(`/commandes/${commande.idCommande}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des commandes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton routerLink="/">Retourner à l'accueil</IonButton>
        <CommandListItem
          commandes={commandes}
          onCommandSelect={handleCommandSelect}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep3;
