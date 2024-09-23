import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";

const MonCataloguePage: React.FC = () => {
  const [catalogues, setCatalogues] = useState<any[]>([]);

  const fetchCatalogues = async () => {
    const dummyCatalogues = [
      { id: 1, name: "Catalogue 1", items: 50 },
      { id: 2, name: "Catalogue 2", items: 30 },
    ];
    setCatalogues(dummyCatalogues);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Mes catalogues</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton expand="full" color="secondary" onClick={fetchCatalogues}>
          Rafraîchir les catalogues
        </IonButton>

        {catalogues.length > 0 ? (
          catalogues.map((catalogue) => (
            <IonItem key={catalogue.id}>
              <IonLabel>
                <h2>{catalogue.name}</h2>
                <p>{catalogue.items} produits</p>
              </IonLabel>
            </IonItem>
          ))
        ) : (
          <IonText>Aucun catalogue disponible pour le moment.</IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default MonCataloguePage;
