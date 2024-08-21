import React, { useState } from "react";
import {
  IonSearchbar,
  IonItem,
  IonLabel,
  IonDatetime,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { funnelOutline } from "ionicons/icons";

interface CommandListSearchBarProps {
  onSearchTextChange: (searchText: string) => void;
  onDateFilterChange: (selectedDate: string) => void;
}

const CommandListSearchBar: React.FC<CommandListSearchBarProps> = ({
  onSearchTextChange,
  onDateFilterChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  const handleSearchTextChange = (e: CustomEvent) => {
    const value = e.detail.value as string;
    setSearchText(value);
    onSearchTextChange(value);
  };

  const handleDateChange = (e: CustomEvent) => {
    const value = e.detail.value as string;
    setSelectedDate(value);
    onDateFilterChange(value);
  };

  return (
    <div style={{ padding: "10px" }}>
      <IonSearchbar
        value={searchText}
        onIonInput={handleSearchTextChange}
        placeholder="Rechercher par nom de produit..."
        showCancelButton="focus"
        animated
      ></IonSearchbar>

      <IonItem>
        <IonLabel>Date de commande</IonLabel>
        <IonDatetime
          displayFormat="YYYY-MM-DD"
          value={selectedDate}
          onIonChange={handleDateChange}
          placeholder="Filtrer par date"
        ></IonDatetime>
        <IonButton
          fill="clear"
          color="primary"
          onClick={() => setSelectedDate(undefined)}
        >
          <IonIcon slot="icon-only" icon={funnelOutline} />
        </IonButton>
      </IonItem>
    </div>
  );
};

export default CommandListSearchBar;
