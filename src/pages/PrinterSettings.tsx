import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonToast,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  addOutline,
  bluetoothOutline,
  restaurantOutline,
  wifiOutline,
} from "ionicons/icons";
import printerImage from "../assets/images/printer.png";
import { printTestPage } from "../services/commandService";

const PrinterSettings: React.FC = () => {
  const [view, setView] = useState<"list" | "new">("list");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [printers, setPrinters] = useState<string[]>([]);
  const [printerType, setPrinterType] = useState<"WIFI" | "BLUETOOTH" | "USB">(
    "WIFI"
  );

  const handlePrintTest = async (printerIP: string) => {
    try {
      const { data } = await printTestPage({ printerIP });
      setShowToast(true);
      setToastMessage(data.message);
    } catch (error) {
      console.error("Error print page", error);
      setShowToast(false);
      setToastMessage("Erreur d'impression");
    }
  };

  const handlePrinterType = (printerType: "WIFI" | "BLUETOOTH" | "USB") => {
    setPrinterType(printerType);
    if (printerType !== "WIFI") {
      setToastMessage("WIP: Only WIFI for this moment");
      setShowToast(true);
      return;
    }
  };

  // Function to scan network for printers (simplified for demonstration)
  const scanNetworkForPrinters = async () => {
    setSearching(true);
    setError(null);
    const detectedPrinters: string[] = [];

    const baseIP = "192.168.1."; // Adjust this base IP according to your network
    const fetchPromises = [];

    for (let i = 1; i <= 254; i++) {
      const ip = `${baseIP}${i}`;
      fetchPromises.push(
        fetch(
          `http://${ip}/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000`,
          { mode: "no-cors" }
        )
          .then((response) => {
            if (response.ok || response.type === "opaque") {
              detectedPrinters.push(ip);
            }
          })
          .catch(() => {
            // Ignore errors
          })
      );
    }

    await Promise.all(fetchPromises);
    setSearching(false);
    if (detectedPrinters.length > 0) {
      setPrinters(detectedPrinters);
    } else {
      setError("No printers found on the network.");
    }
  };

  const NewPrinterView = () => (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Nouvelle imprimante</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonRow className="ion-margin-top">
        <IonCol>
          <IonLabel>Type d'imprimante</IonLabel>
          <IonSegment
            value={printerType}
            onIonChange={(e) =>
              handlePrinterType(e.target.value as "WIFI" | "BLUETOOTH" | "USB")
            }
          >
            <IonSegmentButton value="WIFI">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonIcon
                  icon={wifiOutline}
                  style={{ marginRight: "8px", color: "#000" }}
                />
                <IonLabel>Wifi</IonLabel>
              </div>
            </IonSegmentButton>

            <IonSegmentButton value="BLUETOOTH">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonIcon
                  icon={bluetoothOutline}
                  style={{ marginRight: "8px", color: "#000" }}
                />
                <IonLabel>Bluetooth</IonLabel>
              </div>
            </IonSegmentButton>

            <IonSegmentButton value="USB">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonIcon
                  icon={restaurantOutline}
                  style={{ marginRight: "8px", color: "#000" }}
                />
                <IonLabel>USB</IonLabel>
              </div>
            </IonSegmentButton>
          </IonSegment>
        </IonCol>
      </IonRow>

      <IonContent>
        <IonList>
          {searching && (
            <IonItem lines="none">
              <IonSpinner slot="start" />
              <IonLabel color="medium">Recherche en cours...</IonLabel>
            </IonItem>
          )}
          {!searching && printers.length > 0 && (
            <>
              {printers.map((printer, index) => (
                <IonItem key={index}>
                  <IonLabel>Imprimante trouvée à {printer}</IonLabel>
                  <IonButton
                    slot="end"
                    color="primary"
                    onClick={() => handlePrintTest(printer)}
                  >
                    Imprimer une page de test
                  </IonButton>
                </IonItem>
              ))}
            </>
          )}
          {!searching && printers.length === 0 && (
            <IonItem lines="none">
              <IonLabel color="medium">
                {error ? error : "Aucune imprimante détectée."}
              </IonLabel>
            </IonItem>
          )}
          {!searching && (
            <IonButton
              expand="block"
              className="ion-margin"
              disabled={printerType !== "WIFI"}
              onClick={scanNetworkForPrinters}
            >
              Rechercher une imprimante
            </IonButton>
          )}
        </IonList>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
      />
    </>
  );

  const PrinterListView = () => (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Imprimantes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-text-center ion-padding">
          <img src={printerImage} alt="Imprimantes" style={{ width: "15%" }} />;
          <h2>Imprimez vos tickets de caisse</h2>
          <p>Partout dans votre boutique</p>
        </div>
        <IonButton
          expand="block"
          className="ion-margin"
          onClick={() => setView("new")}
        >
          <IonIcon icon={addOutline} slot="start" />
          Connecter une imprimante
        </IonButton>
      </IonContent>
    </>
  );

  return (
    <IonPage>
      {view === "list" ? <PrinterListView /> : <NewPrinterView />}
    </IonPage>
  );
};

export default PrinterSettings;
