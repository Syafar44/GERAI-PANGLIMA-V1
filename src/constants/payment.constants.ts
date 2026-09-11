import { TPaymentMethod } from "@/types/Order";

const PAYMENT_METHODS: {
  key: TPaymentMethod;
  label: string;
  title: string;
  hint: string;
}[] = [
  {
    key: "transfer",
    label: "Transfer Bank",
    title: "Virtual Account Bank BCA",
    hint: "Nomor Virtual Account Anda:",
  },
  {
    key: "qris",
    label: "QRIS / E-Wallet",
    title: "Scan QRIS",
    hint: "Pindai QR Code di bawah dengan M-Banking / E-Wallet Anda:",
  },
];

const BANK_VA_PREFIX = "8808";

const PICKUP_HOURS = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export { PAYMENT_METHODS, BANK_VA_PREFIX, PICKUP_HOURS };
