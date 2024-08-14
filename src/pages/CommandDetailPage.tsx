import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Commande, SelectedProducts } from "../core/types";
import { getCommandeById } from "../services/commandService";
import { formatTime } from "../core/utils";

interface RouteParams {
  id: string;
}

const CommandDetailPage: FC = () => {
  const router = useIonRouter();
  const { id } = useParams<RouteParams>();
  const [detailCommande, setDetailCommande] = useState<Commande | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetailCommande = async () => {
      if (!id) {
        console.error("Error: no ID provided for fetching detail commande");
        return;
      }
      try {
        const { data } = await getCommandeById(id);
        setDetailCommande(data);
      } catch (error) {
        console.error("Error fetching detail commande", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailCommande();
  }, [id]);

  if (loading) {
    return <IonLoading isOpen={loading} message={"Loading..."} />;
  }

  const navigateToUrl = (url: string) => {
    router.push(url);
  };

  return (
    <IonPage>
      <IonBreadcrumbs>
        <IonBreadcrumb onClick={() => router.back()}>
          Liste des commandes
        </IonBreadcrumb>
        <IonBreadcrumb onClick={() => navigateToUrl("command/list")}>
          Commande n°{detailCommande?.idCommande}
        </IonBreadcrumb>
      </IonBreadcrumbs>

      <IonContent className="ion-padding">
        {detailCommande ? (
          <>
            <IonTitle>
              Détails de la commande #{detailCommande.idCommande}
            </IonTitle>
            <p>Produits commandés :</p>
            <IonList>
              {/* Update this section based on the actual structure of `detailCommande` */}
              <IonItem>
                <IonLabel>
                  Commandes{" "}
                  {detailCommande.orderType?.type === "surplace"
                    ? "sur Place"
                    : "à Emporter"}{" "}
                  -{" "}
                  {detailCommande.orderType?.location === "INSIDE"
                    ? "Intérieur"
                    : "Extérieur"}
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  Date : {formatTime(detailCommande.isoDateCommande)}
                </IonLabel>

                <IonLabel>Table : {detailCommande.tableNumber}</IonLabel>
                <IonLabel>Total : {detailCommande.totalPrice} €</IonLabel>
              </IonItem>
            </IonList>
          </>
        ) : (
          <p>Aucune commande trouvée.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CommandDetailPage;
