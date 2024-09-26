export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  icon?: string;
  photo?: string | null;
  quantity?: number;
}

export interface SelectedProducts extends Product {
  quantity: number;
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
  PaymentMethod?: PaymentMethodEnum;
  paidProducts?: ProductPay[];
  paymentMethod?: PaymentMethodEnum;
  totalPricePaid?: number;
}

export interface ProductPay {
  id: string;
  price: number;
  quantity: number;
  paymentMethod?: PaymentMethodEnum;
}

export interface OrderType {
  type: "surplace" | "aemporter";
  location?: "INSIDE" | "OUTSIDE";
}

export enum PaymentMethodEnum {
  CASH = "CASH",
  CB = "CB",
  MOBILE = "MOBILE",
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  ALL = "ALL",
}

export enum LabelPaymentStatusEnum {
  PENDING = "A régler",
  PARTIALLY_PAID = "Partiellement payé",
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

export interface RouteParams {
  id: string;
}

export interface PaymentDetails {
  products: Product[];
  paymentMethod: PaymentMethodEnum;
  totalPrice: number;
}
