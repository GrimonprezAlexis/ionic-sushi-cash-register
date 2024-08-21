import { IonCard, IonCardContent, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import BasketAction from "./BasketAction";
import BasketProductsList from "./BasketProductsList";
import BasketProductsModal from "./BasketProductsModal";

const Basket: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedBasketItem = useSelector(
    (state: RootState) => state.command.selectedBasketItem
  );
  useEffect(() => {
    if (selectedBasketItem) {
      setIsModalOpen(true);
    }
  }, [selectedBasketItem]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <IonCard>
      <IonCardContent>
        <BasketProductsList />
        <BasketAction />
      </IonCardContent>
      <IonModal isOpen={isModalOpen}>
        <BasketProductsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </IonModal>
    </IonCard>
  );
};

export default Basket;
