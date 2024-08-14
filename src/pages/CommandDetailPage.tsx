import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
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
import { Commande } from "../core/types";
import { getCommandeById } from "../services/commandService";
import { formatTime } from "../core/utils";
import {
  arrowBackOutline,
  cashOutline,
  cardOutline,
  calendarOutline,
  receiptOutline,
} from "ionicons/icons";

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
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={() => router.back()}>
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>Détails de la commande</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {detailCommande ? (
          <>
            <IonBreadcrumbs>
              <IonBreadcrumb>
                Commande n°{detailCommande?.idCommande}
              </IonBreadcrumb>
            </IonBreadcrumbs>

            <IonList>
              <IonItem>
                <IonIcon icon={calendarOutline} slot="start" />
                <IonLabel>
                  Date : {formatTime(detailCommande.isoDateCommande)}
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon icon={receiptOutline} slot="start" />
                <IonLabel>
                  Type :{" "}
                  {detailCommande.orderType?.type === "surplace"
                    ? "Sur Place"
                    : "À Emporter"}{" "}
                  -{" "}
                  {detailCommande.orderType?.location === "INSIDE"
                    ? "Intérieur"
                    : "Extérieur"}
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Table : {detailCommande.tableNumber}</IonLabel>
                <IonLabel>Total : {detailCommande.totalPrice} €</IonLabel>
              </IonItem>

              {detailCommande.paymentMean && (
                <IonItem>
                  <IonIcon
                    icon={
                      detailCommande.paymentMean === "CASH"
                        ? cashOutline
                        : cardOutline
                    }
                    slot="start"
                  />
                  <IonLabel>
                    Moyen de paiement :{" "}
                    {detailCommande.paymentMean === "CASH"
                      ? "Espèces"
                      : "Carte Bancaire"}
                  </IonLabel>
                </IonItem>
              )}
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
