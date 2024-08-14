import {
  IonAvatar,
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
import { SelectedProducts } from "../../core/types";
import { RootState } from "../../store";
import { setSelectedBasketItem } from "../../store/actions";

const BasketProductsList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );

  const onSelectBasketItem = (selectedBasketItem: SelectedProducts) => {
    dispatch(setSelectedBasketItem(selectedBasketItem));
  };

  return (
    <IonList>
      {selectedProducts.map((item: SelectedProducts) => (
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
                  <IonText color="medium">Quantité: x{item.quantity}</IonText>
                </IonLabel>
              </IonCol>
              <IonCol size="auto" className="ion-text-end">
                <IonText color="primary">
                  <h3 style={{ margin: 0 }}>
                    {(item.price * item.quantity).toFixed(2)}€
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
