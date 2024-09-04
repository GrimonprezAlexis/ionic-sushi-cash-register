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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import categoriesData from "../../assets/json/categories.json";
import productsData from "../../assets/json/products.json";
import Basket from "../../components/basket/Basket";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { Commande, Product, RouteParams } from "../../core/types";
import { getCommandeById } from "../../services/commandService";
import { RootState } from "../../store";
import {
  setDetailCommand,
  setIsCommandExtend,
  setSelectedCategory,
  setSelectedProductIds,
  setSelectedProducts,
} from "../../store/actions";

const ExtendCommand: React.FC = () => {
  const dispatch = useDispatch();
  const router = useIonRouter();
  const { id } = useParams<RouteParams>();
  const [loading, setLoading] = useState<boolean>(true);

  const selectedCategory = useSelector(
    (state: RootState) => state.command.selectedCategory
  );
  const selectedProducts = useSelector(
    (state: RootState) => state.command.selectedProducts
  );
  const selectedProductIds = useSelector(
    (state: RootState) => state.command.selectedProductIds
  );
  const detailCommand = useSelector(
    (state: RootState) => state.command.detailCommand
  );

  useEffect(() => {
    const fetchDetailCommand = async () => {
      if (!id) {
        console.error("Error: no ID provided for fetching detail commande");
        return;
      }
      try {
        const { data } = await getCommandeById(id);
        dispatchData(data);
      } catch (error) {
        console.error("Error fetching detail commande", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailCommand();
  }, [id]);

  const dispatchData = (data: Commande) => {
    dispatch(setIsCommandExtend(true));
    dispatch(setDetailCommand(data));
    dispatch(
      setSelectedProductIds([
        ...data.products.map((product) => ({
          id: product.id,
        })),
      ])
    );
    dispatch(setSelectedProducts([...data.products]));
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const navigateToDetailCommand = () => {
    router.push(`/command/list/${id}`);
  };

  const getFilteredProducts = () => {
    return productsData.filter(
      (product) => product.category === selectedCategory
    );
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completer une commande</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonBreadcrumbs>
          <IonBreadcrumb onClick={() => navigateToDetailCommand()}>
            Detail Commande <IonIcon icon={restaurantOutline} slot="start" />
          </IonBreadcrumb>
          <IonBreadcrumb>
            Completer la Commande{" "}
            <IonIcon icon={restaurantOutline} slot="start" />
          </IonBreadcrumb>
        </IonBreadcrumbs>

        <IonItem lines="none" className="ion-margin-top">
          <IonLabel>
            <h2>
              Commandes{" "}
              {detailCommand?.orderType.type === "surplace"
                ? "Sur Place"
                : "À Emporter"}{" "}
              -{" "}
              {detailCommand?.orderType.location === "INSIDE"
                ? "Intérieur"
                : "Extérieur"}
            </h2>
          </IonLabel>
        </IonItem>

        {/* BASKET SECTION */}
        {detailCommand?.products.length !== 0 && <Basket />}

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

export default ExtendCommand;
