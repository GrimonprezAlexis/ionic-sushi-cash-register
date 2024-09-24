import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonList,
  IonThumbnail,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React, { useState } from "react";
import { getCatalogue } from "../../services/catalogueService";
import { refreshOutline } from "ionicons/icons";

const MonCataloguePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [catalogues, setCatalogues] = useState<any[]>([]);

  const fetchCatalogues = async () => {
    try {
      setShowLoading(true);
      const { data } = await getCatalogue();
      setShowLoading(false);
      setCatalogues(data.products);
    } catch (error) {
      console.error("Error fetching commandes", error);
      setShowLoading(false);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Mon catalogue</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton expand="full" color="secondary" onClick={fetchCatalogues}>
          <IonIcon icon={refreshOutline} slot="start" />
          Rafraîchir les catalogues
        </IonButton>

        {catalogues.length > 0 ? (
          <IonList>
            {catalogues.map((product) => (
              <IonItem key={product.id}>
                {/* <IonThumbnail slot="start">
                  <img src={product.photo} alt={product.name} />
                </IonThumbnail> */}
                <IonLabel>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="9">
                        <h2>
                          {product.icon} {product.name}
                        </h2>
                        <p>Catégorie : {product.category}</p>
                      </IonCol>
                      <IonCol size="3" className="ion-text-right">
                        <h2>{product.price.toFixed(2)} €</h2>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonText>Aucun produit disponible pour le moment.</IonText>
        )}

        <IonLoading isOpen={showLoading} message={"Veuillez patienter..."} />
      </IonCardContent>
    </IonCard>
  );
};

export default MonCataloguePage;
