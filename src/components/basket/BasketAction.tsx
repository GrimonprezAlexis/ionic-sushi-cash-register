import {
  IonButton,
  IonCardContent,
  IonCol,
  IonItem,
  IonLabel,
  IonLoading,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Commande,
  EtatCommandeEnum,
  PaymentStatusEnum,
  Product,
  SelectedProducts,
} from "../../core/types";
import { generateUniqueId } from "../../core/utils";
import { addCommande, extendCommandId } from "../../services/commandService";
import { RootState } from "../../store";
import { body } from "ionicons/icons";
import { handleRequest } from "../../core/handlers/handlerRequest";

const BasketAction: React.FC = () => {
  const orderType = useSelector((state: RootState) => state.command.orderType);
  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );
  const isCommandExtend = useSelector(
    (state: RootState) => state.command.isCommandExtend
  );

  const detailCommand = useSelector(
    (state: RootState) => state.command.detailCommand
  );

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  const router = useIonRouter();

  const calculateTotalPrice = (products: SelectedProducts[]) => {
    const totalPrice = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    return Math.round(totalPrice * 100) / 100;
  };

  const shouldUpdateOrder = (
    currentOrder: Commande,
    selectedProducts: SelectedProducts[]
  ) => {
    if (currentOrder.products.length !== selectedProducts.length) return true;

    return currentOrder.products.some((currentProduct) => {
      const selectedProduct = selectedProducts.find(
        (p) => p.id === currentProduct.id
      );
      return (
        !selectedProduct || currentProduct.quantity !== selectedProduct.quantity
      );
    });
  };

  const handleCommandExtend = async () => {
    setLoading(true);

    if (shouldUpdateOrder(detailCommand, selectedProducts)) {
      const res = await extendCommandId(detailCommand.idCommande, {
        extendProducts: selectedProducts,
      });
      stateHandler(res, detailCommand.idCommande);
    }
    setLoading(false);
    setShowToast({ isOpen: true, message: "Aucune modification détectée." });
    router.push(`/command/list/${detailCommand.idCommande}`);
  };

  const handleNewCommand = async () => {
    let body: Commande = {
      idCommande: generateUniqueId(),
      isoDateCommande: new Date().toISOString(),
      tableNumber: Math.round(Math.random()),
      products: selectedProducts,
      orderType: orderType,
      etat: EtatCommandeEnum.CONFIRMED,
      paymentStatus: PaymentStatusEnum.PENDING,
      totalPrice: calculateTotalPrice(selectedProducts),
    };

    console.log("body", body);
    setLoading(true);
    await handleRequest(
      () => addCommande(body), // Requête API
      (res) => {
        // En cas de succès
        setLoading(false);
        console.log("res", res);
        setShowToast({ isOpen: true, message: "Commande ajoutée avec succès" });
        router.push(`/command/list/${body.idCommande}`);
      },
      (error) => {
        // En cas d'erreur
        setLoading(false);
        setShowToast({ isOpen: true, message: `Erreur : ${error}` });
      }
    );
  };

  const stateHandler = (res: any, idCommande: string) => {
    if (res?.success) {
      setShowToast({ isOpen: true, message: "Commande ajoutée avec succès" });
      router.push(`/command/list/${idCommande}`);
    } else if (res.error) {
      setShowToast({ isOpen: true, message: `Erreur : ${res.error}` });
    } else {
      setShowToast({
        isOpen: true,
        message: `Erreur lors de la création de la commande`,
      });
    }
  };

  return (
    <IonCardContent>
      <IonToast
        isOpen={showToast.isOpen}
        message={showToast.message}
        duration={2000}
        onDidDismiss={() => setShowToast({ isOpen: false, message: "" })}
      />

      <IonItem lines="none">
        <IonLabel>Total ({selectedProducts.length}) :</IonLabel>
        <IonLabel slot="end">
          {calculateTotalPrice(selectedProducts)} €
        </IonLabel>
      </IonItem>

      <IonCol size="6">
        <IonButton
          onClick={() => console.log("Imprimer le ticket")}
          disabled={selectedProducts.length === 0}
        >
          Imprimer le ticket
        </IonButton>
      </IonCol>
      <IonCol size="6">
        <IonButton
          onClick={isCommandExtend ? handleCommandExtend : handleNewCommand}
          disabled={selectedProducts.length === 0}
          color="primary"
        >
          Valider
        </IonButton>
      </IonCol>

      <IonLoading isOpen={loading} message={"Veuillez patienter..."} />
    </IonCardContent>
  );
};

export default BasketAction;
