import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import ImportCataloguePage from "./ImportCataloguePage";
import MonCataloguePage from "./MonCataloguePage";

const CataloguePage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<"import" | "view">(
    "import"
  );

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des Catalogues</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* Segment pour basculer entre les vues */}
              <IonSegment
                value={selectedSegment}
                onIonChange={(e) =>
                  setSelectedSegment(e.detail.value as "import" | "view")
                }
              >
                <IonSegmentButton value="import">
                  <IonLabel>Importer un catalogue</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="view">
                  <IonLabel>Mes catalogues</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Affichage conditionnel en fonction du segment sélectionné */}
        {selectedSegment === "import" && <ImportCataloguePage />}

        {selectedSegment === "view" && <MonCataloguePage />}
      </IonContent>
    </IonPage>
  );
};

export default CataloguePage;
