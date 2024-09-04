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
        let backgroundColor = "rgb(58 32 32)"; // Default color

        // If the category is in the basket (selectedCategories array)
        if (selectedCategories.includes(category)) {
          backgroundColor = "rgb(58 77 63)";
        }

        // If the category is the current active one
        if (currentCategory === category) {
          backgroundColor = "blue";
        }

        return (
          <StyledListCategory
            key={category}
            style={{
              fontWeight: currentCategory === category ? "bold" : "normal",
              backgroundColor,
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
