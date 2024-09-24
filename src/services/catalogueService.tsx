import axios from "axios";
import { Commande } from "../core/types";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const convertXlsToJson = async (formData: FormData) => {
  try {
    const res = await axios.post(
      `${apiUrl}/v1/catalogues/convert-xls-to-json`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data ?? error.message;
  }
};

export const downloadExempleMenuXls = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/v1/catalogues/download-example-xls`,
      method: "GET",
      responseType: "blob",
    });

    // Create a link element, trigger the download
    const blob = new Blob([response.data], {
      type: "application/vnd.ms-excel",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Exemple_Menu.xlsx"; // Name of the downloaded file
    link.click();
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

export const getCatalogue = async () => {
  try {
    const res = await axios.get(`${apiUrl}/v1/catalogue`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data ?? error.message;
  }
};

export const getCatalogueGrouped = async () => {
  try {
    const res = await axios.get(`${apiUrl}/v1/catalogue/grouped-category`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data ?? error.message;
  }
};
