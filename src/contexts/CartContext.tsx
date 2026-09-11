"use client";

import { ICartItem } from "@/types/Cart";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "gerai-panglima-cart";

interface ICartState {
  cart: ICartItem[];
  isReadyCart: boolean;
  totalItem: number;
  totalPrice: number;
  getQty: (id?: string) => number;
  addToCart: (item: Omit<ICartItem, "qty">, qty?: number) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartState>({
  cart: [],
  isReadyCart: false,
  totalItem: 0,
  totalPrice: 0,
  getQty: () => 0,
  addToCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isReadyCart, setIsReadyCart] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {
      setCart([]);
    }
    setIsReadyCart(true);
  }, []);

  useEffect(() => {
    if (!isReadyCart) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isReadyCart]);

  const getQty = (id?: string) =>
    cart.find((item) => item._id === id)?.qty || 0;

  const addToCart = (item: Omit<ICartItem, "qty">, qty: number = 1) => {
    setCart((prev) => {
      const exist = prev.find((produk) => produk._id === item._id);
      if (exist) {
        return prev.map((produk) =>
          produk._id === item._id
            ? { ...produk, qty: produk.qty + qty }
            : produk
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItem = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isReadyCart,
        totalItem,
        totalPrice,
        getQty,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, CartContext, useCart };
export type { ICartState };
