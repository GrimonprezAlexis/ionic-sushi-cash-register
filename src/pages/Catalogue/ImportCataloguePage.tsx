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
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
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
  const [showModal, setShowModal] = useState<boolean>(false);

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
    setShowModal(false);
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
    } finally {
      setShowModal(false); // Ferme la modal après l'importation
    }
  };

  const downloadExampleFile = async () => {
    const result = await downloadExempleMenuXls();
    return result;
  };

  // Ouvrir la modal de confirmation
  const confirmUpload = () => {
    if (!file) {
      setStatusMessage("Veuillez sélectionner un fichier avant de continuer.");
      return;
    }
    setShowModal(true); // Affiche la modal
  };

  return (
    <>
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
            onClick={confirmUpload} // Appelle la modal de confirmation
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

      {/* Modal de confirmation */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirmation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>
            <p>
              Êtes-vous sûr de vouloir importer ce catalogue ? Cela remplacera
              le menu actuel.
            </p>
          </IonText>
          <IonButton
            expand="full"
            color="danger"
            onClick={handleUpload} // Procéder à l'importation si confirmé
            style={{ marginTop: "16px" }}
          >
            Confirmer et importer
          </IonButton>
          <IonButton
            expand="full"
            color="medium"
            onClick={() => setShowModal(false)} // Fermer la modal si annulé
            style={{ marginTop: "8px" }}
          >
            Annuler
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ImportCataloguePage;
