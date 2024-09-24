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
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";
import React, { useState } from "react";
import {
  getCatalogue,
  getCatalogueGrouped,
} from "../../services/catalogueService";
import {
  refreshOutline,
  chevronDownOutline,
  chevronUpOutline,
} from "ionicons/icons";
import { Product } from "../../core/types";

const MonCataloguePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [catalogueData, setCatalogueData] = useState<any>({}); // To store grouped categories
  const [openAccordions, setOpenAccordions] = useState<string[]>([]); // Track opened accordions

  const fetchCatalogues = async () => {
    try {
      setShowLoading(true);
      const { data } = await getCatalogueGrouped();
      setShowLoading(false);
      setCatalogueData(data.catalogue); // Store the grouped categories data
      // Open all categories by default
      setOpenAccordions(Object.keys(data.catalogue));
    } catch (error) {
      console.error("Error fetching catalogues", error);
      setShowLoading(false);
    }
  };

  const toggleAccordion = (category: string) => {
    if (openAccordions.includes(category)) {
      setOpenAccordions(openAccordions.filter((c) => c !== category));
    } else {
      setOpenAccordions([...openAccordions, category]);
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

        {Object.keys(catalogueData).length > 0 ? (
          <IonAccordionGroup>
            {Object.entries(catalogueData).map(([category, products]: any) => (
              <IonAccordion key={category} value={category}>
                <IonItem
                  slot="header"
                  color="light"
                  onClick={() => toggleAccordion(category)}
                >
                  <IonLabel>{category}</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonList>
                    {products.map((product: Product) => (
                      <IonItem key={product.id || "🍣"}>
                        <span>{product?.icon}</span>
                        <IonLabel>
                          <IonGrid>
                            <IonRow>
                              <IonCol size="9">
                                <h3>{product.name}</h3>
                                <p>Prix : {product.price.toFixed(2)} €</p>
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
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        ) : (
          <IonText>Aucun produit disponible pour le moment.</IonText>
        )}

        <IonLoading isOpen={showLoading} message={"Veuillez patienter..."} />
      </IonCardContent>
    </IonCard>
  );
};

export default MonCataloguePage;
