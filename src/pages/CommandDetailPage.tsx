import {
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Commande, LabelPaymentStatusEnum, RouteParams } from "../core/types";
import { getCommandeById, printCommande } from "../services/commandService";
import { formatDate } from "../core/utils";
import {
  arrowBackOutline,
  cashOutline,
  cardOutline,
  calendarOutline,
  receiptOutline,
  tabletLandscape,
  pricetagOutline,
  statsChart,
  addOutline,
} from "ionicons/icons";

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

  const printDetailCommande = (detailCommande: Commande) => {
    printCommande(detailCommande);
  };

  const extendCommande = (detailCommande: Commande) => {
    navigateToUrl(`/extend-command/${detailCommande.idCommande}`);
  };

  const paidCommande = (detailCommande: Commande) => {
    navigateToUrl(`/pay-command/${detailCommande.idCommande}`);
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
                  Date : {formatDate(detailCommande.isoDateCommande)}
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
                <IonIcon icon={tabletLandscape} slot="start" />
                <IonLabel>Table : {detailCommande.tableNumber}</IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon icon={pricetagOutline} slot="start" />
                <IonLabel>Total : {detailCommande.totalPrice} €</IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon icon={statsChart} slot="start" />
                <IonBadge>
                  {LabelPaymentStatusEnum[detailCommande.paymentStatus]}
                </IonBadge>
              </IonItem>

              {detailCommande.PaymentMethod && (
                <IonItem>
                  <IonIcon
                    icon={
                      detailCommande.PaymentMethod === "CASH"
                        ? cashOutline
                        : cardOutline
                    }
                    slot="start"
                  />
                  <IonLabel>
                    Moyen de paiement :{" "}
                    {detailCommande.PaymentMethod === "CASH"
                      ? "Espèces"
                      : "Carte Bancaire"}
                  </IonLabel>
                </IonItem>
              )}

              <IonList>
                {detailCommande.products.map((product, index) => (
                  <IonItem
                    key={index}
                    lines="full"
                    style={{ marginBottom: "10px" }}
                  >
                    {/* Ajout d'une icône si disponible */}
                    {product.icon && (
                      <div style={{ marginRight: "10px", fontSize: "1.5em" }}>
                        {product.icon}
                      </div>
                    )}
                    <IonLabel>
                      {/* Nom du produit avec quantité en gras */}
                      <IonText
                        style={{
                          fontSize: "1em",
                          color: "var(--ion-color-primary)",
                        }}
                      >
                        <strong>(x{product.quantity})</strong> {product.name}
                      </IonText>
                      {/* Catégorie et prix */}
                      <IonText
                        style={{
                          fontSize: "0.85em",
                          color: "var(--ion-color-medium)",
                          display: "block",
                        }}
                      >
                        {product.category} - {product.price.toFixed(2)}€
                      </IonText>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonList>
            <IonButton
              expand="block"
              className="ion-margin"
              onClick={() => printDetailCommande(detailCommande)}
            >
              <IonIcon icon={addOutline} slot="start" />
              Imprimer la commande
            </IonButton>
            <IonButton
              color="warning"
              expand="block"
              className="ion-margin"
              onClick={() => extendCommande(detailCommande)}
            >
              <IonIcon icon={addOutline} slot="start" />
              Completer ou Modifier la commande
            </IonButton>

            <IonButton
              color="success"
              expand="block"
              className="ion-margin"
              onClick={() => paidCommande(detailCommande)}
            >
              <IonIcon icon={addOutline} slot="start" />
              Régler la commande
            </IonButton>
          </>
        ) : (
          <p>Aucune commande trouvée.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CommandDetailPage;
