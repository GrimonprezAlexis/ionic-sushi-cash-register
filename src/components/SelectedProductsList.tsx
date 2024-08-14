import React from "react";
import {
    StyledDivider,
    StyledListContainer,
    StyledListItem,
    StyledProductInfo
} from "../assets/styled/styled-selected-product-list";
import {StyledProductName, StyledProductPrice} from "../assets/styled/styled-product-list";
import {setSelectedBasketItem} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {SelectedProducts} from "../core/types";


const SelectedProductsList: React.FC = () => {
    const dispatch = useDispatch();
    const selectedProducts = useSelector(
        (state: RootState) => state.command.selectedProducts
    );

    const onSelectBasketItem = (selectedBasketItem: SelectedProducts) => {
        dispatch(setSelectedBasketItem(selectedBasketItem));
    };

    return (
        <StyledListContainer>
            {selectedProducts.map((item: SelectedProducts) => (
                <StyledListItem key={item?.id} onClick={() => onSelectBasketItem(item)}>
                    <StyledProductInfo>
                        <StyledProductName>
                            {item.name} (x{item.quantity})
                        </StyledProductName>
                        <StyledProductPrice>
                            {item.price * item.quantity}€
                        </StyledProductPrice>
                    </StyledProductInfo>
                    <StyledDivider />
                </StyledListItem>
            ))}
        </StyledListContainer>
    );
};

export default SelectedProductsList;
