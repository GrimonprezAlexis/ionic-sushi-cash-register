import {
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
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
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { clipboardOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import PaymentMethod from "../../components/PaidCommand/PaymentMethod";
import "../../core/css/paidCommand.css";
import {
  Commande,
  PaymentDetails,
  PaymentMethodEnum,
  Product,
  ProductPay,
} from "../../core/types";
import { getCommandeById, payCommand } from "../../services/commandService";
import { handleRequest } from "../../core/handlers/handlerRequest";

interface PayCommandProps extends RouteComponentProps<{ id: string }> {}

const PayCommandPage: React.FC<PayCommandProps> = ({ match }) => {
  const [commande, setCommande] = useState<Commande | null>(null);
  const [paidProducts, setPaidProducts] = useState<ProductPay[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(
    PaymentMethodEnum.CASH
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert] = useIonAlert();
  const router = useIonRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchCommande();
    }
  }, [commande]);

  const fetchCommande = async () => {
    setLoading(true);
    await handleRequest(
      () => getCommandeById(match.params.id), // Requête API
      (res) => {
        setLoading(false);
        const { data } = res;
        console.log("res fetchCommande", res);
        setCommande(data);
        setPaidProducts(data.paidProducts);
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching commande", error);
        router.push(`/command/list`);
      }
    );
  };

  const isAlreadyPaidProduct = (productId: string) => {
    return paidProducts.some(
      (paidProduct: ProductPay) => paidProduct.id === productId
    );
  };

  const handleProductSelection = (product: Product, isSelected: boolean) => {
    let updatedProducts = [...selectedProducts];

    if (isSelected) {
      updatedProducts.push(product);
    } else {
      updatedProducts = updatedProducts.filter((p) => p.id !== product.id);
    }

    setSelectedProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const updateTotalPrice = (products: Product[]) => {
    const total = products.reduce(
      (sum, product) => sum + product.price * product.quantity!,
      0
    );
    setTotalPrice(total);
  };

  const handlePayment = async () => {
    if (!selectedProducts.length) {
      showAlert("Aucun produit sélectionné.", [{ text: "OK" }]);
      return;
    }
    setLoading(true);
    const paymentDetail: PaymentDetails = {
      products: selectedProducts,
      paymentMethod,
      totalPrice,
    };
    await handleRequest(
      () => payCommand(match.params.id, paymentDetail), // Requête API
      (res) => {
        // En cas de succès
        setLoading(false);
        console.log("res", res);
        showAlert("Paiement enregistré avec succès !", [
          { text: "OK", handler: () => router.push("/command/list") },
        ]);
        if (res.data.restToPay === 0) {
          router.push(`/command/list/${res.data.id}`);
        }
      },
      (error) => {
        // En cas d'erreur
        setLoading(false);
        showAlert("Erreur de paiement !", [
          { text: "KO", handler: () => router.push("/command/list") },
        ]);
      }
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Paiement</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol>
              <IonBreadcrumbs>
                <IonBreadcrumb href={`/command/list/${match.params.id}`}>
                  Details de la commande{" "}
                  <IonIcon icon={clipboardOutline} slot="start" />
                </IonBreadcrumb>
                <IonBreadcrumb active>
                  Paiement
                  <IonIcon icon={clipboardOutline} slot="start" />
                </IonBreadcrumb>
              </IonBreadcrumbs>
            </IonCol>
          </IonRow>
        </IonGrid>

        {commande && (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">
                  - Commande #{commande.idCommande}
                </IonCardTitle>
              </IonCardHeader>

              {/* DETAILS COMMANDES */}
              <IonCardContent>
                <IonList>
                  {commande.products.map((product: Product) => (
                    <IonItem
                      key={product.id}
                      className={
                        isAlreadyPaidProduct(product.id)
                          ? "is-already-paid-product"
                          : ""
                      }
                    >
                      <IonCheckbox
                        slot="start"
                        onIonChange={(e) =>
                          handleProductSelection(product, e.detail.checked)
                        }
                      />
                      <IonLabel>
                        <h2>
                          {product.name}{" "}
                          <IonBadge color="light">x{product.quantity}</IonBadge>
                        </h2>
                        <p>{product.price.toFixed(2)} €</p>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText color="medium">
                    <h3 className="ion-text-center">
                      Total sélectionné : {totalPrice.toFixed(2)} €
                    </h3>
                  </IonText>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonText color="primary">
                    <h4>Mode de paiement :</h4>
                  </IonText>
                </IonCol>
              </IonRow>

              {/* MOYEN DE PAIEMENT */}
              <PaymentMethod onPaymentMethodSelect={setPaymentMethod} />
            </IonGrid>
          </>
        )}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="full"
            color="success"
            onClick={handlePayment}
            disabled={!selectedProducts.length}
          >
            Valider le paiement ({totalPrice.toFixed(2)} €)
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PayCommandPage;
