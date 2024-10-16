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
  IonSearchbar,
  useIonRouter,
  IonInput,
  IonDatetime,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  clipboardOutline,
  clipboardSharp,
  hourglassOutline,
  listOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import CommandList from "../components/CommandList";
import { Commande, PaymentStatusEnum } from "../core/types";
import { getCommandes } from "../services/commandService";
import CommandListTotal from "../components/CommandListTotal";

const CommandListPage: React.FC = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]);
  const [paymentStatus, setPaymenStatus] = useState<PaymentStatusEnum>(
    PaymentStatusEnum.ALL
  );
  const [searchText, setSearchText] = useState<string>("");

  const router = useIonRouter();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current || !commandes) {
      isMounted.current = true;
      getAllCommandes();
    }
  }, []);

  const getAllCommandes = async () => {
    try {
      setLoading(true);
      const { data } = await getCommandes();

      // Transform the Firebase object into an array
      const commandesArray = Object.keys(data).map((key) => ({
        id: key, // Firebase unique ID
        ...data[key], // Spread the properties from the data object
      }));

      const sortedData = commandesArray.sort((a: Commande, b: Commande) => {
        return (
          new Date(b.isoDateCommande).getTime() -
          new Date(a.isoDateCommande).getTime()
        );
      });
      setLoading(false);
      setCommandes(sortedData);
      setFilteredCommandes(sortedData); // Initialize with all commandes
    } catch (error) {
      console.error("Error fetching commandes", error);
      setLoading(false);
    }
  };

  const handleCommandSelect = (commande: Commande) => {
    history.push(`/command/list/${commande.idCommande}`);
  };

  const handleCommandTypeChange = (value: PaymentStatusEnum) => {
    setPaymenStatus(value);
    filterCommandes(searchText, value);
  };

  const filterCommandes = (searchText: string, status: PaymentStatusEnum) => {
    const filtered = commandes.filter((x) => {
      const matchesDate = x.isoDateCommande.includes(searchText);
      const matchesStatus =
        status === PaymentStatusEnum.ALL || x.paymentStatus === status;
      return matchesDate && matchesStatus;
    });
    setFilteredCommandes(filtered);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    filterCommandes(text, paymentStatus);
  };

  const sumTotalPrice = () => {
    return filteredCommandes.reduce((total, commande) => {
      {
        return total + commande.totalPrice;
      }
      return total;
    }, 0);
  };

  const countCommandByType = (paymentStatus: PaymentStatusEnum) => {
    if (paymentStatus === PaymentStatusEnum.ALL)
      return filteredCommandes.length;
    return filteredCommandes.filter((x) => x.paymentStatus === paymentStatus)
      .length;
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol>
              <IonBreadcrumbs>
                <IonBreadcrumb>
                  Liste des commandes{" "}
                  <IonIcon icon={clipboardOutline} slot="start" />
                </IonBreadcrumb>
                <IonBreadcrumb>
                  {filteredCommandes.length} commandes
                </IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonRow className="ion-margin-top">
          <IonCol>
            <IonLabel className="ion-margin">Type de commande</IonLabel>

            <IonRow>
              <IonCol>
                <IonSearchbar
                  placeholder="Rechercher une commande"
                  value={searchText}
                  onIonInput={(e) => handleSearchChange(e.detail.value!)}
                />
              </IonCol>
            </IonRow>

            <IonSegment
              value={paymentStatus}
              onIonChange={(e) =>
                handleCommandTypeChange(e.detail.value as PaymentStatusEnum)
              }
            >
              <IonSegmentButton value={PaymentStatusEnum.PENDING}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IonIcon
                    icon={hourglassOutline}
                    style={{ marginRight: "8px", color: "#000" }}
                  />
                  <IonLabel>
                    En attente ({countCommandByType(PaymentStatusEnum.PENDING)})
                  </IonLabel>
                </div>
              </IonSegmentButton>

              <IonSegmentButton value={PaymentStatusEnum.ALL}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IonIcon
                    icon={listOutline}
                    style={{ marginRight: "8px", color: "#000" }}
                  />
                  <IonLabel>
                    Tout afficher ({countCommandByType(PaymentStatusEnum.ALL)})
                  </IonLabel>
                </div>
              </IonSegmentButton>

              <IonSegmentButton value={PaymentStatusEnum.PAID}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IonIcon
                    icon={checkmarkCircleOutline}
                    style={{ marginRight: "8px", color: "#000" }}
                  />
                  <IonLabel>
                    Payé ({countCommandByType(PaymentStatusEnum.PAID)})
                  </IonLabel>
                </div>
              </IonSegmentButton>
            </IonSegment>
          </IonCol>
        </IonRow>

        <CommandList
          commandes={filteredCommandes}
          onCommandSelect={handleCommandSelect}
        />

        <IonContent>
          {/* Autres éléments de la page */}

          <div className="ion-margin-top">
            <CommandListTotal totalRevenue={sumTotalPrice()} />
          </div>
        </IonContent>
      </IonContent>
      <IonLoading isOpen={loading} message={"Veuillez patienter..."} />
    </IonPage>
  );
};

export default CommandListPage;
