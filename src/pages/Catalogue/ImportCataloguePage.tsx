import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import {
  convertXlsToJson,
  downloadExempleMenuXls,
} from "../../services/catalogueService";

const ImportCataloguePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [catalogues, setCatalogues] = useState<any[]>([]);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setFile(selectedFile);
      setStatusMessage(""); // Réinitialiser les messages
    } else {
      setStatusMessage("Veuillez sélectionner un fichier XLS ou XLSX valide.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatusMessage("Veuillez d'abord sélectionner un fichier.");
      return;
    }

    try {
      setProgress(0.33);
      setStatusMessage("Étape 1: Conversion du fichier XLS/XLSX en CSV...");

      const formData = new FormData();
      formData.append("filePath", file); // Append the file under the 'filePath' key
      const result = await convertXlsToJson(formData);
      if (result?.success) {
        setProgress(0.66);
        setProgress(1);
        setStatusMessage("Conversion terminée avec succès !");
        console.log("JSON Output:", result);
      } else {
        setStatusMessage("Erreur lors du processus de conversion.");
      }
    } catch (error) {
      setStatusMessage("Erreur lors du processus de conversion.");
    }
  };

  const downloadExampleFile = async () => {
    const result = await downloadExempleMenuXls();
    return result;
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Convertir un fichier XLS/XLSX</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel>Choisissez un fichier :</IonLabel>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            style={{ marginLeft: "16px" }}
          />
        </IonItem>

        <IonButton
          expand="full"
          color="primary"
          onClick={handleUpload}
          style={{ marginTop: "16px" }}
        >
          Importer mon catalogue
        </IonButton>

        {statusMessage && (
          <IonText color="primary" style={{ marginTop: "16px" }}>
            <p>{statusMessage}</p>
          </IonText>
        )}

        {progress > 0 && (
          <IonProgressBar value={progress} style={{ marginTop: "16px" }} />
        )}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Besoin d'un modèle ?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>
                Téléchargez un fichier XLS d'exemple pour voir le format
                attendu.
              </p>
            </IonText>
            <IonButton
              expand="full"
              color="secondary"
              onClick={downloadExampleFile}
            >
              Télécharger l'exemple
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonCardContent>
    </IonCard>
  );
};

export default ImportCataloguePage;
