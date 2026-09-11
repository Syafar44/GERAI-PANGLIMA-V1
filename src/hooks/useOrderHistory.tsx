"use client";

import { IOrder, TOrderStatus } from "@/types/Order";
import { useEffect, useState } from "react";

const STORAGE_KEY = "gerai-panglima-orders";

const readStorage = (): IOrder[] => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as IOrder[]) : [];
  } catch {
    return [];
  }
};

const useOrderHistory = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isReadyOrders, setIsReadyOrders] = useState(false);

  useEffect(() => {
    setOrders(readStorage());
    setIsReadyOrders(true);
  }, []);

  // selalu baca ulang storage sebelum menulis supaya tidak menimpa
  // riwayat yang dibuat dari halaman/tab lain
  const persist = (next: IOrder[]) => {
    setOrders(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage penuh / diblokir, riwayat cukup tampil di sesi ini
    }
  };

  const addOrder = (order: IOrder) => persist([order, ...readStorage()]);

  const getOrderByCode = (code?: string) =>
    orders.find((order) => order.code === code);

  const updateOrderStatus = (code: string, status: TOrderStatus) =>
    persist(
      readStorage().map((order) =>
        order.code === code ? { ...order, status } : order
      )
    );

  const removeOrder = (code: string) =>
    persist(readStorage().filter((order) => order.code !== code));

  const clearOrders = () => persist([]);

  return {
    orders,
    isReadyOrders,
    addOrder,
    getOrderByCode,
    updateOrderStatus,
    removeOrder,
    clearOrders,
  };
};

export default useOrderHistory;
