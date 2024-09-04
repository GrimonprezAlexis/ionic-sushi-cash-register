import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { restaurantOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import categoriesData from "../../assets/json/categories.json";
import productsData from "../../assets/json/products.json";
import Basket from "../../components/basket/Basket";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { Product } from "../../core/types";
import { RootState } from "../../store";
import {
  setSelectedCategory,
  setSelectedProductIds,
  setSelectedProducts,
} from "../../store/actions";

const AddCommandStep2: React.FC = () => {
  const dispatch = useDispatch();
  const router = useIonRouter();

  const orderType = useSelector((state: RootState) => state.command.orderType);

  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );
  const selectedProductIds = useSelector(
    (state: RootState) => state.command.selectedProductIds
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.command.selectedCategory
  );

  useEffect(() => {
    if (!orderType) navigateToUrl("/command/1");
  }, [selectedProductIds]);

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleProductSelect = (product: Product) => {
    console.log("product", product);

    dispatch(
      setSelectedProductIds([
        ...selectedProductIds,
        {
          id: product.id,
        },
      ])
    );
    dispatch(setSelectedProducts([...selectedProducts, product]));
  };

  const getFilteredProducts = () => {
    return productsData.filter(
      (product) => product.category === selectedCategory
    );
  };

  const navigateToUrl = (url: string) => {
    router.push(url);
  };

  const navigateToCommandStep = (step: number) => {
    router.push(`/command/${step}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Passer une commande</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonBreadcrumbs>
          <IonBreadcrumb onClick={() => navigateToCommandStep(1)}>
            Commande <IonIcon icon={restaurantOutline} slot="start" />
          </IonBreadcrumb>
          <IonBreadcrumb onClick={() => navigateToCommandStep(2)}>
            Étape 2
          </IonBreadcrumb>
        </IonBreadcrumbs>

        <IonItem lines="none" className="ion-margin-top">
          <IonLabel>
            <h2>
              Commandes{" "}
              {orderType?.type === "surplace" ? "Sur Place" : "À Emporter"} -{" "}
              {orderType?.location === "INSIDE" ? "Intérieur" : "Extérieur"}
            </h2>
          </IonLabel>
        </IonItem>

        {/* BASKET SECTION */}
        {selectedProducts.length !== 0 && <Basket />}

        {/* PRODUCT & CATEGORY SELECTION */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonLabel className="ion-margin-top">
                <h2>Liste des produits</h2>
              </IonLabel>
              <IonList>
                <ProductList
                  products={getFilteredProducts()}
                  onProductSelect={handleProductSelect}
                />
              </IonList>
            </IonCol>
            <IonCol size="12" size-md="6">
              <IonLabel className="ion-margin-top">
                <h2>Catégories</h2>
              </IonLabel>
              <IonList>
                <CategoryList
                  categories={categoriesData}
                  selectedCategories={
                    selectedProducts.map(
                      (product: Product) => product.category
                    ) || []
                  } // Map the categories from the basket
                  currentCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                />
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep2;
