import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IonPage, IonContent, IonBreadcrumbs, IonBreadcrumb, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { RootState } from '../../store';
import {removeFromCart} from "../../store/actions";

const Step2: React.FC = () => {
    const cart = useSelector((state: RootState) => state.command.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    return (
        <IonPage>
            <IonBreadcrumbs>
                <IonBreadcrumb>Type de Commande</IonBreadcrumb>
                <IonBreadcrumb>Panier</IonBreadcrumb>
            </IonBreadcrumbs>
            <IonContent className="ion-padding">
                <IonList>
                    {cart.map(item => (
                        <IonItem key={item.id}>
                            <IonLabel>
                                {item.name} - {item.price}€ x {item.quantity}
                            </IonLabel>
                            <IonButton onClick={() => handleRemoveFromCart(item.id)}>Remove</IonButton>
                        </IonItem>
                    ))}
                </IonList>
                { /* Ajouter ici la liste des produits et les catégories */ }
            </IonContent>
        </IonPage>
    );
};

export default Step2;