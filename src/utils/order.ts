import { BANK_VA_PREFIX } from "@/constants/payment.constants";
import { TOrderStatus } from "@/types/Order";

/** GP-20260911-4F2A */
const generateOrderCode = () => {
  const now = new Date();
  const date = [
    now.getFullYear(),
    `${now.getMonth() + 1}`.padStart(2, "0"),
    `${now.getDate()}`.padStart(2, "0"),
  ].join("");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GP-${date}-${random}`;
};

/** Nomor virtual account dummy: prefix bank + 12 digit dari nomor HP & waktu order */
const generateVaNumber = (phone: string) => {
  const digitPhone = phone.replace(/\D/g, "").slice(-6).padStart(6, "0");
  const digitTime = `${Date.now()}`.slice(-6);
  return `${BANK_VA_PREFIX}${digitPhone}${digitTime}`;
};

/** 11 September 2026 */
const formatDateID = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/** 11 September 2026, 14:30 */
const formatDateTimeID = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/** tanggal hari ini (waktu lokal) untuk atribut min input date */
const getTodayISO = () => {
  const now = new Date();
  return [
    now.getFullYear(),
    `${now.getMonth() + 1}`.padStart(2, "0"),
    `${now.getDate()}`.padStart(2, "0"),
  ].join("-");
};

const ORDER_STATUS: Record<TOrderStatus, { label: string; className: string }> =
  {
    menunggu: {
      label: "Menunggu Konfirmasi",
      className: "bg-secondary/20 text-secondary-dark",
    },
    selesai: {
      label: "Selesai",
      className: "bg-accent/15 text-accent",
    },
    batal: {
      label: "Dibatalkan",
      className: "bg-gray-200 text-gray-500",
    },
  };

export {
  generateOrderCode,
  generateVaNumber,
  formatDateID,
  formatDateTimeID,
  getTodayISO,
  ORDER_STATUS,
};
