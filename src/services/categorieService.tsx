import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const getCategories = async () => {
  try {
    const res = await axios.get(`${apiUrl}/v1/categories`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    return error?.response?.data ?? error.message;
  }
};
