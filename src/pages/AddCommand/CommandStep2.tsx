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
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { restaurantOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import categoriesData from "../../assets/json/categories.json";
// import productsData from "../../assets/json/products.json";
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
import { getCatalogue } from "../../services/catalogueService";
import { getCategories } from "../../services/categorieService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const AddCommandStep2: React.FC = () => {
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Manage error state

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<string[]>([]);

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

  const didFetchData = useRef({
    catalogues: true,
    categories: true,
  });

  useEffect(() => {
    if (!orderType) navigateToUrl("/command/1");
    if (productsData.length === 0 || didFetchData.current.categories) {
      didFetchData.current.categories = false;
      fetchCatalogues();
    }
    if (categoriesData.length === 0 || didFetchData.current.catalogues) {
      didFetchData.current.catalogues = false;
      fetchCategories();
    }
  }, [productsData.length, categoriesData.length, selectedProductIds]);

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

  const fetchCatalogues = async () => {
    try {
      setLoading(true);
      const { data } = await getCatalogue();
      setLoading(false);
      setProductsData(data.products);
    } catch (error) {
      setError("Error fetching catalogue. Please try again."); // Set the error message
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getCategories();
      setLoading(false);
      setCategoriesData(data.categories);
    } catch (error) {
      console.error("Error fetching categories", error);
      setLoading(false);
    }
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

  const handleCloseError = () => setError(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Passer une commande</IonTitle>
        </IonToolbar>
      </IonHeader>

      {error && (
        <ErrorMessage
          showError={!!error}
          errorMessage={error}
          onClose={handleCloseError}
        />
      )}

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
        <IonLoading isOpen={loading} message={"Veuillez patienter..."} />
      </IonContent>
    </IonPage>
  );
};

export default AddCommandStep2;
