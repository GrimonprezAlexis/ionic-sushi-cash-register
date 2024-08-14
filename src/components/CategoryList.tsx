import React from "react";
import {StyledListCategory, StyledWrapperCategories} from "../assets/styled/styled-category-list";


interface CategoryListProps {
    categories: string[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
   categories,
   selectedCategory,
   onCategorySelect,
}) => {
    return (
        <StyledWrapperCategories>
            {categories.map((category) => (
                <StyledListCategory
                    key={category}
                    style={{
                        fontWeight: selectedCategory === category ? "bold" : "normal",
                        backgroundColor: selectedCategory === category ? "#f0f0f0" : "white", // Optional: Highlight selected
                    }}
                    onClick={() => onCategorySelect(category)}
                >
                    {category}
                </StyledListCategory>
            ))}
        </StyledWrapperCategories>
    );
};

export default CategoryList;
