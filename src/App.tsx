import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

// CSS imports
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/palettes/dark.system.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import "./theme/variables.css";

// Component imports
import MenuComponent from "./components/shared/Menu";
import AddCommandStep1 from "./pages/AddCommand/CommandStep1";
import AddCommandStep2 from "./pages/AddCommand/CommandStep2";
import CommandDetailPage from "./pages/CommandDetailPage";
import CommandListPage from "./pages/CommandListPage";
import MainLayout from "./layouts/MainLayout";

// Store import
import store from "./store";
import ErrorPage from "./pages/ErrorPage";

setupIonicReact();

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <MenuComponent />
        <MainLayout>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/command/1" component={AddCommandStep1} />
              <Route exact path="/command/2" component={AddCommandStep2} />
              <Route exact path="/command/list" component={CommandListPage} />
              <Route
                exact
                path="/command/list/:id"
                component={CommandDetailPage}
              />
              <Route exact path="/">
                <Redirect to="/command/1" />
              </Route>
              <Route path="*" component={ErrorPage} />
            </Switch>
          </IonRouterOutlet>
        </MainLayout>
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
