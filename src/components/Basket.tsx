import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    IonToast,
    useIonRouter,
} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {EtatCommandeEnum, SelectedProducts} from "../core/types";
import SelectedProductsList from "./SelectedProductsList";
import SelectedProductsModal from "./SelectedProductsModal";


interface BasketProps {
    selectedProductIds: number[];
}

const Basket: React.FC<BasketProps> = ({ selectedProductIds }) => {
    const router = useIonRouter();
    const dispatch = useDispatch();
    const orderType = useSelector((state: RootState) => state.command.orderType);
    const selectedProducts = useSelector(
        (state: RootState) => state.command.selectedProducts
    );
    const selectedBasketItem = useSelector(
        (state: RootState) => state.command.selectedBasketItem
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showToast, setShowToast] = useState<{ isOpen: boolean; message: string }>({
        isOpen: false,
        message: "",
    });

    useEffect(() => {
        if (selectedBasketItem) {
            setIsModalOpen(true);
        }
    }, [selectedBasketItem]);

    const calculateTotalPrice = (products: SelectedProducts[]) => {
        const totalPrice = products.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);

        return Math.round(totalPrice * 100) / 100;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const addNewOrder = async () => {
        let body = {
            isoDateCommande: new Date().toISOString(),
            tableNumber: Math.round(Math.random()),
            productsIds: selectedProductIds,
            orderType: orderType,
            etat: EtatCommandeEnum.PENDING,
            totalPrice: calculateTotalPrice(selectedProducts),
        };

        console.log("body", body);


        setShowLoading(false);
        setShowToast({ isOpen: true, message: "Commande ajoutée avec succès" });

        // const res = {};
        // if (!res?.success) {
        //     setShowToast({ isOpen: true, message: `Error: ${res.message}` });
        // } else {
        //     setShowToast({ isOpen: true, message: "Commande ajoutée avec succès" });
        //     router.push("/list-command");
        // }

        // // TODO Gestion des erreurs
        // const request = await addCommande({
        //     ...body,
        //     idCommande: generateUniqueId(),
        // });
        // if (!request.success) return alert(`${request}`);
        // else navigate("/commandes");
    };


    return (
        <IonCard>
            <IonCardContent>
                <SelectedProductsList />

                <IonItem lines="none">
                    <IonLabel>Total ({selectedProducts.length}) :</IonLabel>
                    <IonLabel slot="end">{calculateTotalPrice(selectedProducts)} €</IonLabel>
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
                        onClick={addNewOrder}
                        disabled={selectedProductIds.length === 0}
                        color="primary"
                    >
                        Valider
                    </IonButton>
                </IonCol>

                <IonLoading isOpen={showLoading} message={"Veuillez patienter..."} />
                <IonToast
                    isOpen={showToast.isOpen}
                    message={showToast.message}
                    duration={2000}
                    onDidDismiss={() => setShowToast({ isOpen: false, message: "" })}
                />

            </IonCardContent>


            <IonModal isOpen={isModalOpen}>
                <SelectedProductsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </IonModal>
        </IonCard>
    );
};

export default Basket;
