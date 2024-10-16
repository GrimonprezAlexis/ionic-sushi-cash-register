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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {
  addCircleOutline,
  removeCircleOutline,
  clipboardOutline,
} from "ionicons/icons";
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

const PRESET_AMOUNTS = [5, 10, 20, 50]; // Montants prédéfinis

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

  const [amountGiven, setAmountGiven] = useState<number>(0); // Montant total donné
  const [amountReturned, setAmountReturned] = useState<number>(0); // Montant à rendre
  const [presetClicks, setPresetClicks] = useState<Record<number, number>>({
    5: 0,
    10: 0,
    20: 0,
    50: 0,
  }); // Nombre de fois que chaque montant est sélectionné

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchCommande();
    }
  }, [commande]);

  useEffect(() => {
    calculateAmountReturned();
  }, [amountGiven, totalPrice]);

  const fetchCommande = async () => {
    setLoading(true);
    await handleRequest(
      () => getCommandeById(match.params.id),
      (res) => {
        setLoading(false);
        const { data } = res;
        setCommande(data);
        setPaidProducts(data?.paidProducts);
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching commande", error);
        router.push(`/command/list`);
      }
    );
  };

  const isAlreadyPaidProduct = (productId: string) => {
    return paidProducts?.some(
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

  const calculateAmountReturned = () => {
    const remainingAmount = totalPrice - amountGiven;
    setAmountReturned(remainingAmount < 0 ? Math.abs(remainingAmount) : 0);
  };

  const incrementPreset = (value: number) => {
    const newClicks = { ...presetClicks, [value]: presetClicks[value] + 1 };
    setPresetClicks(newClicks);
    setAmountGiven(amountGiven + value);
  };

  const decrementPreset = (value: number) => {
    if (presetClicks[value] > 0) {
      const newClicks = { ...presetClicks, [value]: presetClicks[value] - 1 };
      setPresetClicks(newClicks);
      setAmountGiven(amountGiven - value);
    }
  };

  const handleFreeInputChange = (e: any) => {
    const inputValue = parseFloat(e.detail.value!);
    setAmountGiven(inputValue);
    // Réinitialiser les clics prédéfinis lors de la saisie manuelle
    setPresetClicks({
      5: 0,
      10: 0,
      20: 0,
      50: 0,
    });
  };

  const handlePaymentMethodChange = (e: PaymentMethodEnum) => {
    setPaymentMethod(e);
  };

  const isSurPaid = () => {
    return paymentMethod === PaymentMethodEnum.CASH && amountGiven > totalPrice;
  };

  const handlePayment = async () => {
    if (!selectedProducts.length) {
      showAlert("Aucun produit sélectionné.", [{ text: "OK" }]);
      return;
    }

    if (
      paymentMethod === PaymentMethodEnum.CASH &&
      amountGiven > totalPrice * 2
    ) {
      showAlert("Le montant donné par le client est trop élevé.", [
        { text: "OK" },
      ]);
      return;
    }

    setLoading(true);
    const paymentDetail: PaymentDetails = {
      products: selectedProducts,
      paymentMethod,
      totalPrice,
      amountGiven,
      amountReturned,
    };

    await handleRequest(
      () => payCommand(match.params.id, paymentDetail),
      (res) => {
        setLoading(false);
        showAlert("Paiement enregistré avec succès !", [
          { text: "OK", handler: () => router.push("/command/list") },
        ]);
      },
      (error) => {
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
                  Détails de la commande
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

              <IonCardContent>
                <IonList>
                  {commande.products.map((product: Product, index: number) => (
                    <IonItem key={index}>
                      <IonCheckbox
                        slot="start"
                        onIonChange={(e) =>
                          handleProductSelection(product, e.detail.checked)
                        }
                        disabled={isAlreadyPaidProduct(product.id)}
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
                  <IonText color="primary">
                    <h4>Mode de paiement :</h4>
                  </IonText>
                </IonCol>
              </IonRow>
              <PaymentMethod
                onPaymentMethodSelect={(e) => handlePaymentMethodChange(e)}
              />

              {/* 
                AMOUNT TO PAY AND REST  
              */}
              {selectedProducts.length > 0 &&
                paymentMethod === PaymentMethodEnum.CASH && (
                  <IonCard>
                    <IonCardContent>
                      <h3>Total à Payer: {totalPrice.toFixed(2)} €</h3>

                      <IonText color="primary">
                        <h4>Sélectionnez les montants :</h4>
                      </IonText>

                      <IonList>
                        {PRESET_AMOUNTS.map((amount) => (
                          <IonItem key={amount}>
                            <IonLabel>{amount}€</IonLabel>
                            <IonButton
                              slot="end"
                              color="danger"
                              fill="clear"
                              onClick={() => decrementPreset(amount)}
                              disabled={presetClicks[amount] === 0}
                            >
                              <IonIcon icon={removeCircleOutline} />
                            </IonButton>
                            <IonBadge slot="end" color="primary">
                              {presetClicks[amount]}
                            </IonBadge>
                            <IonButton
                              slot="end"
                              color="success"
                              fill="clear"
                              onClick={() => incrementPreset(amount)}
                            >
                              <IonIcon icon={addCircleOutline} />
                            </IonButton>
                          </IonItem>
                        ))}
                      </IonList>

                      <IonItem>
                        <IonText color="primary">
                          <h4>Saisir un montants :</h4>
                        </IonText>{" "}
                        <IonInput
                          type="number"
                          placeholder="Entrer montant"
                          onIonChange={handleFreeInputChange}
                          value={amountGiven}
                        />
                      </IonItem>

                      <IonItem>
                        <IonButton color={isSurPaid() ? "warning" : "tertiary"}>
                          <h3 className="ion-text-center">
                            Montant à rendre : {amountReturned.toFixed(2)} €
                          </h3>
                        </IonButton>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                )}
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
