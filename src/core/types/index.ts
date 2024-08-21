export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  icon?: string;
  photo?: string | null;
  quantity?: number;
}

export interface SelectedProductIds {
  id: number;
}

export interface Commande {
  idCommande: string;
  isoDateCommande: string;
  tableNumber: number;
  products: Product[];
  orderType: OrderType;
  etat: EtatCommandeEnum;
  totalPrice: number;
  // TODO
  idClient?: string;
  paymentStatus: PaymentStatusEnum;
  paymentMean?: "CASH" | "CB";
}

export interface OrderType {
  type: "surplace" | "aemporter";
  location?: "INSIDE" | "OUTSIDE";
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  ALL = "ALL",
}

export enum LabelPaymentStatusEnum {
  PENDING = "A régler",
  PAID = "Terminé",
  ALL = "Tout",
}

export enum EtatCommandeEnum {
  CONFIRMED = "CONFIRMED",
  SERVED = "SERVED",
}

export enum LabelEtatCommandeEnum {
  CONFIRMED = "Commande confirmé",
  SERVED = "Commande servie",
}
