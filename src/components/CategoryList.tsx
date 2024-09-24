import React from "react";
import {
  StyledListCategory,
  StyledWrapperCategories,
} from "../assets/styled/styled-category-list";

interface CategoryListProps {
  categories: string[];
  selectedCategories: string[]; // Accept multiple selected categories
  currentCategory: string; // Currently active category
  onCategorySelect: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategories,
  currentCategory,
  onCategorySelect,
}) => {
  return (
    <StyledWrapperCategories>
      {categories.map((category) => {
        // Default styles
        let backgroundColor = "var(--ion-color-light)";
        let textColor = "var(--ion-color-dark)";
        let border = "1px solid var(--ion-color-medium)";

        // Category selected
        if (selectedCategories.includes(category)) {
          backgroundColor = "var(--ion-color-primary)";
          textColor = "var(--ion-color-light)";
        }

        // Category currently active
        if (currentCategory === category) {
          backgroundColor = "var(--ion-color-primary-shade)";
          textColor = "var(--ion-color-light)";
          border = "2px solid var(--ion-color-primary)";
        }

        return (
          <StyledListCategory
            key={category}
            style={{
              fontWeight: currentCategory === category ? "bold" : "normal",
              backgroundColor,
              color: textColor,
              border,
              transition:
                "background-color 0.3s ease, color 0.3s ease, border 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </StyledListCategory>
        );
      })}
    </StyledWrapperCategories>
  );
};

export default CategoryList;
