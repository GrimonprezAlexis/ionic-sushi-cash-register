import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline, removeCircleOutline } from "ionicons/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setSelectedBasketItem,
  setSelectedProductIds,
  setSelectedProducts,
} from "../../store/actions";
import { Product, SelectedProductIds } from "../../core/types";

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
  const selectedProductIds = useSelector(
    (state: RootState) => state.command.selectedProductIds
  );
  const selectedBasketItem = useSelector(
    (state: RootState) => state.command.selectedBasketItem
  );

  const handleRemove = () => {
    if (selectedBasketItem.quantity > 1) {
      dispatch(
        setSelectedBasketItem({
          ...selectedBasketItem,
          quantity: selectedBasketItem.quantity - 1,
        })
      );
    } else {
      handleLastItemRemove();
    }
  };

  const handleConfirm = () => {
    const updatedProducts = selectedProducts
      .map((product: Product) =>
        product.id === selectedBasketItem.id
          ? { ...product, quantity: selectedBasketItem.quantity }
          : product
      )
      .filter((product: Product) => product.quantity! > 0);

    dispatch(setSelectedProducts(updatedProducts));
  };

  const handleLastItemRemove = () => {
    const updatedProducts = selectedProducts.filter(
      (product: Product) => product.id !== selectedBasketItem.id
    );
    dispatch(setSelectedProducts(updatedProducts));
    dispatch(
      setSelectedProductIds(
        selectedProductIds.filter(
          (x: SelectedProductIds) => x.id !== selectedBasketItem.id
        )
      )
    );
    dispatch(setSelectedBasketItem(null));
    handleOnClose();
  };

  const handleOnClose = () => {
    dispatch(setSelectedBasketItem(null));
    onClose();
  };

  const expandedProductList = Array(selectedBasketItem?.quantity).fill(
    selectedBasketItem
  );

  return (
    isOpen && (
      <IonModal isOpen={isOpen} onDidDismiss={handleOnClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selectedBasketItem.name}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleOnClose}>
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
    )
  );
};

export default BasketProductsModal;
