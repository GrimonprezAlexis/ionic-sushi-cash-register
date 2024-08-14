import styled from "styled-components";

export const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledListItem = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const StyledProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledProductName = styled.span`
  font-weight: bold;
  color: #333;
`;

export const StyledProductPrice = styled.span`
  font-weight: bold;
  color: #007bff;
  margin-left: 20px;
`;

export const StyledDivider = styled.hr`
  margin-top: 10px;
  border: 0;
  border-top: 1px solid #ddd;
`;
