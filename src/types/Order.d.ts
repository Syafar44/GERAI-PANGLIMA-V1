import { ICartItem } from "./Cart";

type TPaymentMethod = "transfer" | "qris";
type TOrderStatus = "menunggu" | "selesai" | "batal";

interface IOrderCustomer {
  name: string;
  email: string;
  phone: string;
  instansi?: string;
}

interface IOrderPickup {
  outlet: string;
  address: string;
  date: string;
  time: string;
  note?: string;
}

interface IOrder {
  code: string;
  createdAt: string;
  status: TOrderStatus;
  method: "takeaway";
  payment: TPaymentMethod;
  vaNumber?: string;
  customer: IOrderCustomer;
  pickup: IOrderPickup;
  items: ICartItem[];
  totalItem: number;
  totalPrice: number;
}

export type {
  IOrder,
  IOrderCustomer,
  IOrderPickup,
  TPaymentMethod,
  TOrderStatus,
};
