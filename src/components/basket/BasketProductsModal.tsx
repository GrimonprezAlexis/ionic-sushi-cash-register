import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setSelectedBasketItem,
  setSelectedProducts,
} from "../../store/actions";
import { SelectedProducts } from "../../core/types";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonText,
} from "@ionic/react";
import { closeOutline, removeCircleOutline } from "ionicons/icons";

interface SelectedProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BasketProductsModal: React.FC<SelectedProductsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );
  const basketItemSelected = useSelector(
    (state: RootState) => state.command.selectedBasketItem
  );

  const handleRemove = () => {
    if (basketItemSelected.quantity > 1) {
      dispatch(
        setSelectedBasketItem({
          ...basketItemSelected,
          quantity: basketItemSelected.quantity - 1,
        })
      );
    } else {
      handleLastItemRemove();
    }
  };

  const handleConfirm = () => {
    const updatedProducts = selectedProducts
      .map((product: SelectedProducts) =>
        product.id === basketItemSelected.id
          ? { ...product, quantity: basketItemSelected.quantity }
          : product
      )
      .filter((product: SelectedProducts) => product.quantity > 0);

    dispatch(setSelectedProducts(updatedProducts));
    onClose();
  };

  const handleLastItemRemove = () => {
    const updatedProducts = selectedProducts.filter(
      (product: SelectedProducts) => product.id !== basketItemSelected.id
    );
    dispatch(setSelectedProducts(updatedProducts));
    onClose();
  };

  const expandedProductList = Array(basketItemSelected.quantity).fill(
    basketItemSelected
  );

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{basketItemSelected.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {expandedProductList.map((item, index) => (
            <IonItem key={index} lines="full">
              <IonLabel>
                <h2>{item.name}</h2>
                <IonText color="medium">{item.price}€</IonText>
              </IonLabel>
              <IonButton
                fill="clear"
                color="danger"
                onClick={handleRemove}
                size="default"
              >
                <IonIcon slot="icon-only" icon={removeCircleOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton expand="block" onClick={handleConfirm} color="success">
          Confirmer
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default BasketProductsModal;
