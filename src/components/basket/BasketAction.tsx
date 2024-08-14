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
import { useDispatch, useSelector } from "react-redux";
import { Commande, EtatCommandeEnum, SelectedProducts } from "../../core/types";
import { generateUniqueId } from "../../core/utils";
import { addCommande } from "../../services/commandService";
import { RootState } from "../../store";

const BasketAction: React.FC = () => {
  const orderType = useSelector((state: RootState) => state.command.orderType);
  const selectedProductIds = useSelector(
    (state: RootState) => state.command.selectedProductIds
  );
  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );

  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  const router = useIonRouter();
  const dispatch = useDispatch();

  const calculateTotalPrice = (products: SelectedProducts[]) => {
    const totalPrice = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return Math.round(totalPrice * 100) / 100;
  };

  const handleNewCommand = async () => {
    let body: Commande = {
      idCommande: generateUniqueId(),
      isoDateCommande: new Date().toISOString(),
      tableNumber: Math.round(Math.random()),
      products: selectedProducts,
      productsIds: selectedProductIds,
      orderType: orderType,
      etat: EtatCommandeEnum.PENDING,
      totalPrice: calculateTotalPrice(selectedProducts),
    };

    console.log("body", body);
    setShowLoading(true);
    const res = await addCommande(body);
    setShowLoading(false);

    console.log("res", res);

    if (res?.success) {
      setShowToast({ isOpen: true, message: "Commande ajoutée avec succès" });
      router.push("/command/list");
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
          disabled={selectedProductIds.length === 0}
        >
          Imprimer le ticket
        </IonButton>
      </IonCol>
      <IonCol size="6">
        <IonButton
          onClick={handleNewCommand}
          disabled={selectedProductIds.length === 0}
          color="primary"
        >
          Valider
        </IonButton>
      </IonCol>

      <IonLoading isOpen={showLoading} message={"Veuillez patienter..."} />
    </IonCardContent>
  );
};

export default BasketAction;
