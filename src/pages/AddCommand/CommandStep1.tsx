import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IonBreadcrumb, IonBreadcrumbs, IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton} from '@ionic/react';
import {setOrderType} from '../../store/actions';
import {RootState} from '../../store';
import {OrderType} from "../../core/types";

const CommandStep1: React.FC = () => {
    const dispatch = useDispatch();
    const orderType = useSelector((state: RootState) => state.command.orderType);

    const handleTypeChange = (type: "surplace" | "aemporter") => {
        const newOrderType: OrderType = { type, location: type === "aemporter" ? undefined : orderType?.location };
        dispatch(setOrderType(newOrderType));
    };

    const handleLocationChange = (location: "INSIDE" | "OUTSIDE") => {
        if (orderType?.type === "surplace") {
            dispatch(setOrderType({ ...orderType, location }));
        }
    };

    return (
        <IonPage>
            <IonBreadcrumbs>
                <IonBreadcrumb>Type de Commande</IonBreadcrumb>
            </IonBreadcrumbs>
            <IonContent className="ion-padding">
                <IonSegment value={orderType?.type} onIonChange={e => handleTypeChange(e.detail.value as "surplace" | "aemporter")}>
                    <IonSegmentButton value="surplace">
                        <IonLabel>Sur Place</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="aemporter">
                        <IonLabel>À Emporter</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                {orderType?.type === "surplace" && (
                    <IonSegment value={orderType.location} onIonChange={e => handleLocationChange(e.detail.value as "INSIDE" | "OUTSIDE")}>
                        <IonSegmentButton value="INSIDE">
                            <IonLabel>Intérieur</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="OUTSIDE">
                            <IonLabel>Extérieur</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                )}
            </IonContent>
        </IonPage>
    );
};

export default CommandStep1;
