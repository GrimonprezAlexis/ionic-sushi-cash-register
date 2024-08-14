import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import categoriesData from "../../assets/json/categories.json";
import productsData from "../../assets/json/products.json";
import Basket from "../../components/basket/Basket";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { SelectedProducts } from "../../core/types";
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
    updateCurrentProducts();
    if (!orderType) router.push("/command/1");
  }, [selectedProductIds]);

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleProductSelect = (product: SelectedProducts) => {
    const existingProduct = selectedProductIds.find(
      (item: SelectedProducts) => item.id === product.id
    );

    let updatedProductIds;
    if (existingProduct) {
      updatedProductIds = selectedProductIds.map((item: SelectedProducts) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedProductIds = [
        ...selectedProductIds,
        { id: product.id, quantity: 1 },
      ];
    }

    dispatch(setSelectedProductIds(updatedProductIds));
  };

  const updateCurrentProducts = () => {
    const filteredProductsByIds = productsData
      .filter((product) =>
        selectedProductIds.some(
          (item: SelectedProducts) => item.id === product.id
        )
      )
      .map((product) => ({
        ...product,
        quantity: selectedProductIds.find(
          (item: SelectedProducts) => item.id === product.id
        ).quantity,
      }));

    dispatch(setSelectedProducts(filteredProductsByIds));
  };

  const getFilteredProducts = () => {
    return productsData.filter(
      (product) => product.category === selectedCategory
    );
  };

  const navigateToStep = (step: number) => {
    router.push(`/command/${step}`);
  };

  return (
    <IonPage>
      <IonBreadcrumbs>
        <IonBreadcrumb onClick={() => navigateToStep(1)}>
          Type de Commande
        </IonBreadcrumb>
        <IonBreadcrumb onClick={() => navigateToStep(2)}>Panier</IonBreadcrumb>
      </IonBreadcrumbs>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            Commandes{" "}
            {orderType?.type === "surplace" ? "sur Place" : "à Emporter"} -{" "}
            {orderType?.location === "INSIDE" ? "Intérieur" : "Extérieur"}
          </IonLabel>
        </IonItem>

        {/* COMMAND CLIENT */}
        {selectedProducts.length !== 0 && (
          <Basket selectedProductIds={selectedProductIds} />
        )}

        {/* PRODUCTS LISTS */}
        <IonLabel className="ion-margin-top">
          <h2>Liste des produits</h2>
        </IonLabel>
        <IonList>
          <ProductList
            products={getFilteredProducts()}
            onProductSelect={handleProductSelect}
            selectedProductIds={selectedProductIds}
          />
        </IonList>

        {/* CATEGORIES LISTS */}
        <IonLabel className="ion-margin-top">
          <h2>Categories Listes</h2>
        </IonLabel>
        <IonList>
          <CategoryList
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep2;
