import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
    return (
        <IonPage id="main-content">
            <IonContent className="ion-padding">Tab 3 the button in the toolbar to open the menu.</IonContent>
            <ExploreContainer name="Tab 3 page" />
        </IonPage>
    );
};

export default Tab3;

