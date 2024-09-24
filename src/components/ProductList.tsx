import React from "react";
import { IonIcon } from "@ionic/react";
import { Product, SelectedProductIds } from "../core/types";
import { checkmark } from "ionicons/icons";
import {
  StyledListProduct,
  StyledProductName,
  StyledProductPrice,
  StyledProductSquare,
  StyledStyledProductPriceIcon,
  StyledWrapperProduct,
} from "../assets/styled/styled-product-list";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setSelectedProductIds } from "../store/actions";

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductSelect,
}) => {
  const selectedProductIds = useSelector(
    (state: RootState) => state.command.selectedProductIds
  );

  const handleProductClick = (product: Product, onProductSelect: any) => {
    const existingProduct = selectedProductIds.some(
      (x: SelectedProductIds) => x.id === product.id
    );
    if (!existingProduct) onProductSelect({ ...product, quantity: 1 });
  };

  return (
    <StyledWrapperProduct>
      {products.map((product) => {
        const isProductSelected = selectedProductIds.some(
          (e: SelectedProductIds) => {
            return e.id === product.id;
          }
        );

        return (
          <StyledListProduct
            key={product.id}
            onClick={() => handleProductClick(product, onProductSelect)}
          >
            <StyledProductSquare>
              <StyledProductName>
                {product.name} - {product.category}
              </StyledProductName>
              <StyledStyledProductPriceIcon>
                <StyledProductPrice>
                  {product.price.toFixed(2)}€
                </StyledProductPrice>
                <span>{product?.icon}</span>
                {isProductSelected && <IonIcon icon={checkmark} slot="end" />}
              </StyledStyledProductPriceIcon>
            </StyledProductSquare>
          </StyledListProduct>
        );
      })}
    </StyledWrapperProduct>
  );
};

export default ProductList;
