import axios from "axios";
import { Commande } from "../core/types";

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

export const getCommandeById = async (id: string) => {
  try {
    const res = await axios.get(`${apiUrl}/v1/commande/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
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
    const res = await axios.post(`${apiUrl}/v1/commande/print-ticket`, context);
    return res.data;
  } catch (e: any) {
    return e && e.response?.data ? e.response.data : e.message;
  }
};
