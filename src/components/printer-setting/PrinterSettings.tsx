import React, { useState } from 'react';
import printerImage from '../../assets/images/printer.png';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonButton,
    IonIcon,
    IonBackButton,
    IonButtons,
} from '@ionic/react';
import { addOutline, printOutline, arrowBack } from 'ionicons/icons';

const PrinterSettings: React.FC = () => {
    const [view, setView] = useState<'list' | 'new'>('list');
    const [printerUse, setPrinterUse] = useState('encaissements');

    const NewPrinterView = () => (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Nouvelle imprimante</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>Nouvelle imprimante</IonLabel>
                        <IonLabel slot="end" color="medium">Détectée</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel color="medium">Adresse IP de l'imprimante</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>UTILISATION DE L'IMPRIMANTE</IonLabel>
                    </IonItem>
                    <IonRadioGroup value={printerUse} onIonChange={e => setPrinterUse(e.detail.value)}>
                        <IonItem>
                            <IonLabel>Les encaissements</IonLabel>
                            <IonRadio slot="start" value="encaissements" />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Les commandes</IonLabel>
                            <IonRadio slot="start" value="commandes" />
                        </IonItem>
                    </IonRadioGroup>
                </IonList>
                <IonButton expand="block" className="ion-margin">Faire un test d'impression</IonButton>
                <IonButton expand="block" className="ion-margin">Tester le tiroir caisse</IonButton>
                <IonButton expand="block" className="ion-margin" color="primary">Connecter cette imprimante</IonButton>
            </IonContent>
        </>
    );

    const PrinterListView = () => (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Imprimantes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="ion-text-center ion-padding">
                    <img src={printerImage} alt="Imprimantes" style={{ width: '15%' }} />
                    <h2>Imprimez vos tickets de caisse</h2>
                    <p>Partout dans votre boutique</p>
                </div>
                <IonButton expand="block" className="ion-margin" onClick={() => setView('new')}>
                    <IonIcon icon={addOutline} slot="start" />
                    Connecter une imprimante
                </IonButton>
                <div className="ion-text-center ion-padding">
                    <p>Vous avez reçu votre imprimante ?</p>
                </div>
            </IonContent>
        </>
    );

    return (
        <IonPage>
            {view === 'list' ? <PrinterListView /> : <NewPrinterView />}
        </IonPage>
    );
};

export default PrinterSettings;