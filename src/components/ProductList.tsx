import React from "react";
import { IonIcon } from "@ionic/react";
import { Product, SelectedProducts } from "../core/types";
import { checkmark } from "ionicons/icons";
import {
  StyledListProduct,
  StyledProductName,
  StyledProductPrice,
  StyledProductSquare,
  StyledStyledProductPriceIcon,
  StyledWrapperProduct,
} from "../assets/styled/styled-product-list";

interface ProductListProps {
  products: Product[];
  selectedProductIds: SelectedProducts[];
  onProductSelect: (product: SelectedProducts) => void;
}

const handleProductClick = (product: Product, onProductSelect: any) => {
  const selectedProduct: SelectedProducts = { ...product, quantity: 1 };
  onProductSelect(selectedProduct);
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProductIds,
  onProductSelect,
}) => {
  return (
    <StyledWrapperProduct>
      {products.map((product) => {
        const isProductSelected = selectedProductIds.some(
          (e: SelectedProducts) => e.id === product.id
        );
        return (
          <StyledListProduct
            key={product.id}
            onClick={() => handleProductClick(product, onProductSelect)}
          >
            <StyledProductSquare>
              <StyledProductName>
                {product.name} - {product.id}
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
