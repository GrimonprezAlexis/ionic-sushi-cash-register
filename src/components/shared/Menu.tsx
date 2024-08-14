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
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { apps, construct, create, cube, fileTray, power } from "ionicons/icons";
import { useRef, useState } from "react";
import { MenuType } from "@ionic/core";

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
            <IonIcon aria-hidden="true" icon={create} slot="start"></IonIcon>
            <IonLabel>Prendre une commande</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/command/list")}>
            <IonIcon aria-hidden="true" icon={apps} slot="start"></IonIcon>
            <IonRouterLink routerLink="/command/list" color="default">
              <IonLabel>Liste des commandes</IonLabel>
            </IonRouterLink>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/catalogue")}>
            <IonIcon aria-hidden="true" icon={cube} slot="start"></IonIcon>
            <IonRouterLink routerLink="/catalog" color="default">
              <IonLabel>Catalogue des produits</IonLabel>
            </IonRouterLink>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/tab2")}>
            <IonIcon aria-hidden="true" icon={fileTray} slot="start"></IonIcon>
            <IonRouterLink routerLink="/tab3" color="default">
              <IonLabel>Stock</IonLabel>
            </IonRouterLink>
          </IonItem>
          <IonItem button onClick={() => navigateTo("/tab2")}>
            <IonIcon aria-hidden="true" icon={fileTray} slot="start"></IonIcon>
            <IonRouterLink routerLink="/tab3" color="default">
              <IonLabel>Statistiques des ventes</IonLabel>
            </IonRouterLink>
          </IonItem>

          <IonItem button onClick={() => navigateTo("/tab3")}>
            <IonIcon aria-hidden="true" icon={construct} slot="start"></IonIcon>
            <IonRouterLink routerLink="/settings" color="default">
              <IonLabel>Paramètres</IonLabel>
            </IonRouterLink>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter class="ion-text-center">
        <IonItem color="medium" lines="none">
          <IonIcon icon={power} style={{ marginRight: "8px" }} />
          <IonLabel>Déconnexion</IonLabel>
        </IonItem>
      </IonFooter>
    </IonMenu>
  );
};

export default MenuComponent;
