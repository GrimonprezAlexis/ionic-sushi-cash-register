import axios from "axios";
import { Commande, PaymentDetails } from "../core/types";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const addCommande = async (context: Commande) => {
  try {
    const res = await axios.post(`${apiUrl}/v1/commande`, context);
    return res.data;
  } catch (e: any) {
    console.log(e);
    return e?.response?.data ?? e.message;
  }
};

export const getCommandes = async () => {
  try {
    const res = await axios.get(`${apiUrl}/v1/commandes`);
    return res.data;
  } catch (e: any) {
    console.log(e);
    return e?.response?.data ?? e.message;
  }
};

export const getCommandeById = async (id: string) => {
  try {
    const res = await axios.get(`${apiUrl}/v1/commandes/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const extendCommandId = async (id: string, context: any) => {
  try {
    const res = await axios.put(`${apiUrl}/v1/commandes/${id}/extend`, context);
    return res.data;
  } catch (e: any) {
    console.log(e, "Error during extendCommandId");
    return e?.response?.data ?? e.message;
  }
};

export const payCommand = async (
  commandeId: string,
  paymentDetails: PaymentDetails
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/v1/commandes/${commandeId}/pay`,
      paymentDetails
    );
    return response.data;
  } catch (e: any) {
    console.error("Error during payment:", e);
    return e?.response?.data ?? e.message;
  }
};

export const printTestPage = async (context: any) => {
  try {
    const res = await axios.post(`${apiUrl}/v1/print`, context);
    return res.data;
  } catch (e: any) {
    return e && e.response?.data ? e.response.data : e.message;
  }
};

export const printCommande = async (context: any) => {
  try {
    const res = await axios.post(
      `${apiUrl}/v1/commandes/print-ticket`,
      context
    );
    return res.data;
  } catch (e: any) {
    return e && e.response?.data ? e.response.data : e.message;
  }
};
