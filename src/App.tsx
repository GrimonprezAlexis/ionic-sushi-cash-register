import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonButtons, IonContent, IonHeader,
  IonIcon,
  IonLabel, IonMenuButton, IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs, IonTitle, IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import MenuComponent from "./components/shared/Menu";
import AddCommandStep1 from "./pages/AddCommand/CommandStep1";
import store from "./store";
import {Provider} from "react-redux";
import AddCommandStep2 from "./pages/AddCommand/CommandStep2";

setupIonicReact();

const App: React.FC = () => (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>

          {/*Menu Content*/}
          <MenuComponent />

          {/* Main Content */}
          <IonPage id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonTabs>

                {/*Routing*/}
                <IonRouterOutlet>
                  <Route exact path="/command/1">
                    <AddCommandStep1 />
                  </Route>
                  <Route exact path="/command/2">
                    <AddCommandStep2 />
                  </Route>

                  <Route exact path="/">
                    <Redirect to="/command/1" />
                  </Route>
                </IonRouterOutlet>
                {/*End Routing*/}

                {/*Tabs*/}
                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/commande">
                    <IonIcon aria-hidden="true" icon={triangle} />
                    <IonLabel>Tab 1</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon aria-hidden="true" icon={ellipse} />
                    <IonLabel>Tab 2</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon aria-hidden="true" icon={square} />
                    <IonLabel>Tab 3</IonLabel>
                  </IonTabButton>
                </IonTabBar>
                {/*End Tabs*/}
              </IonTabs>
            </IonContent>
          </IonPage>
        </IonReactRouter>
      </IonApp>
    </Provider>
);

export default App;
