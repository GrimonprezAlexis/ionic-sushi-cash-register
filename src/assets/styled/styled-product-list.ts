/*
-------------
PRODUCTS
-------------
*/
import styled from "styled-components";
const boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

export const StyledWrapperProduct = styled.ul`
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
`;

export const StyledListProduct = styled.li`
  list-style: none;
  width: 40%;
  min-width: 30%;
`;

export const StyledProductSquare = styled.div`
  border: 2px solid;
  border-color: #9b9b9b;
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${boxShadow};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StyledProductName = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

export const StyledProductPrice = styled.span`
  font-size: 12px;
`;

export const StyledStyledProductPriceIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
