import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setSelectedBasketItem,
  setSelectedProducts,
} from "../../store/actions";
import { Product } from "../../core/types";

const BasketProductsList: React.FC = () => {
  const dispatch = useDispatch();

  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );
  const onSelectBasketItem = (selectedBasketItem: Product) => {
    dispatch(setSelectedBasketItem(selectedBasketItem));
  };

  const handleQuantityChange = (
    product: Product,
    operation: "increment" | "decrement"
  ) => {
    const updatedProducts = selectedProducts.map((item: Product) =>
      item.id === product.id
        ? {
            ...item,
            quantity:
              operation === "increment"
                ? item.quantity! + 1
                : item.quantity! - 1,
          }
        : item
    );
    dispatch(setSelectedProducts(updatedProducts));
  };

  return (
    <IonList>
      {selectedProducts.map((item: Product) => (
        <IonItem key={item.id} onClick={() => onSelectBasketItem(item)} button>
          <IonGrid>
            <IonRow className="ion-align-items-center ion-no-padding">
              <IonCol size="auto">
                <IonAvatar style={{ width: "40px", height: "40px" }}>
                  {/* Assuming you have an image associated with each product */}
                  <img
                    src={"https://ionicframework.com/docs/img/demos/avatar.svg"}
                    alt={item.name}
                  />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonLabel>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <IonText color="medium">
                    Quantité:
                    <IonButton
                      size="small"
                      fill="clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item, "decrement");
                      }}
                    >
                      -
                    </IonButton>
                    {item.quantity}
                    <IonButton
                      size="small"
                      fill="clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item, "increment");
                      }}
                    >
                      +
                    </IonButton>
                  </IonText>
                </IonLabel>
              </IonCol>
              <IonCol size="auto" className="ion-text-end">
                <IonText color="primary">
                  <h3 style={{ margin: 0 }}>
                    {(item.price * item.quantity!).toFixed(2)}€
                  </h3>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      ))}
    </IonList>
  );
};

export default BasketProductsList;
