import { MenuType } from "@ionic/core";
import {
  IonAvatar,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  clipboardOutline,
  cubeOutline,
  layersOutline,
  logOutOutline, printOutline,
  restaurantOutline,
  settingsOutline,
  statsChartOutline,
} from "ionicons/icons";
import { useRef, useState } from "react";

const MenuComponent: React.FC = () => {
  const [menuType, setMenuType] = useState<MenuType>("overlay");
  const menuRef = useRef<HTMLIonMenuElement | null>(null);
  const router = useIonRouter();
  const navigateTo = (path: string) => {
    router.push(path);
    if (menuRef.current) {
      if ("close" in menuRef.current) {
        menuRef.current.close().then((r) => console.log("menu closed"));
      }
    }
  };

  return (
    <IonMenu
      ref={menuRef}
      side="start"
      type={menuType}
      contentId="main-content"
    >
      <IonHeader>
        <IonToolbar>
          <IonItem color="medium">
            <IonAvatar slot="start">
              <img
                src="https://avatars.githubusercontent.com/u/78658625?v=4"
                alt=""
              />
            </IonAvatar>
            <IonLabel color="light">
              <h2>Gérant</h2>
              <p>Alexis</p>
            </IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem button onClick={() => navigateTo("/command/1")}>
            <IonIcon
              aria-hidden="true"
              icon={restaurantOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>Prendre une commande</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/command/list")}>
            <IonIcon
              aria-hidden="true"
              icon={clipboardOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>Commandes</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/catalogue")}>
            <IonIcon
              aria-hidden="true"
              icon={cubeOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>Catalogue des produits</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/stock")}>
            <IonIcon
              aria-hidden="true"
              icon={layersOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>Gestion des stocks</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/stats")}>
            <IonIcon
              aria-hidden="true"
              icon={statsChartOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>Statistiques des ventes</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/settings")}>
            <IonIcon
                aria-hidden="true"
                icon={settingsOutline}
                slot="start"
            ></IonIcon>
            <IonLabel>Paramètres</IonLabel>
          </IonItem>

          <IonItem button onClick={() => navigateTo("/printer-settings")}>
            <IonIcon
                aria-hidden="true"
                icon={printOutline}
                slot="start"
            ></IonIcon>
            <IonLabel>Paramètres d'imprimante</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter class="ion-text-center">
        <IonItem
          color="medium"
          lines="none"
          button
          onClick={() => navigateTo("/logout")}
        >
          <IonIcon icon={logOutOutline} slot="start" />
          <IonLabel>Déconnexion</IonLabel>
        </IonItem>
      </IonFooter>
    </IonMenu>
  );
};

export default MenuComponent;
