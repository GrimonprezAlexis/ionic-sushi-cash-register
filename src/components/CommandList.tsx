import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Commande } from "../core/types";
import {
  StyledCommandDetail,
  StyledCommandListItem,
  StyledCommandTableNumber,
  StyledCommandType,
  StyledWrapperCommandList,
} from "../assets/styled/styled-command-list";
import { calculateElapsedTime, formatTime } from "../core/utils";

interface CommandListItem {
  commandes: Commande[];
  // selectedCommand: string;
  onCommandSelect: (commande: Commande) => void;
}

const CommandListItem: React.FC<CommandListItem> = ({
  commandes,
  // selectedCommand,
  onCommandSelect,
}) => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <StyledWrapperCommandList>
      {commandes.map((commande) => (
        <StyledCommandListItem
          key={commande.idCommande}
          onClick={() => onCommandSelect(commande)}
        >
          {/* <StyledCommandTitle>
            Commande ID: {commande.idCommande}
          </StyledCommandTitle> */}
          <StyledCommandDetail>
            Date de commande: {formatTime(commande.isoDateCommande)}
          </StyledCommandDetail>
          <StyledCommandDetail>
            Type de commande:{" "}
            <StyledCommandType>{commande.orderType.type}</StyledCommandType>
          </StyledCommandDetail>
          <StyledCommandDetail>
            Numéro de table:{" "}
            <StyledCommandTableNumber>
              {commande.tableNumber}
            </StyledCommandTableNumber>
          </StyledCommandDetail>
          <StyledCommandDetail>État: {commande.etat}</StyledCommandDetail>
          <StyledCommandDetail>
            Temps écoulé depuis la commande:{" "}
            {calculateElapsedTime(commande.isoDateCommande)}
          </StyledCommandDetail>
        </StyledCommandListItem>
      ))}
    </StyledWrapperCommandList>
  );
};

export default CommandListItem;
