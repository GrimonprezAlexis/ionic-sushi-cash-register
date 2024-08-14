import styled from "styled-components";

/*
-------------
COMMANDES
-------------
*/
export const StyledWrapperCommandList = styled.ul`
  display: flex;
  gap: 3rem;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;
`;

export const StyledCommandListItem = styled.li`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

export const StyledCommandTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const StyledCommandDetail = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const StyledCommandType = styled.span`
  font-weight: bold;
`;

export const StyledCommandTableNumber = styled.span`
  margin-left: 10px;
`;
