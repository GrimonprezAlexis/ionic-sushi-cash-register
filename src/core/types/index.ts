export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  icon?: string;
  photo?: string | null;
}

export interface SelectedProducts extends Product {
  quantity: number;
}

export interface Commande {
  idCommande: string;
  isoDateCommande: string;
  tableNumber: number;
  products: Product[];
  productsIds: number[];
  orderType: OrderType;
  etat: EtatCommandeEnum;
  totalPrice: number;
  // TODO
  idClient?: string;
  paymentMean?: "CASH" | "CB";
}

export interface OrderType {
  type: "surplace" | "aemporter";
  location?: "INSIDE" | "OUTSIDE";
}

export enum EtatCommandeEnum {
  PENDING = "PENDING",
  SERVIE = "SERVIE",
  VALIDER = "VALIDER",
}
