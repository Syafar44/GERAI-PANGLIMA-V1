import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";
import { useState } from "react";

type TMetode = "takeaway" | "delivery";

const useKeranjang = () => {
    const router = useRouter();
    const {
        cart,
        isReadyCart,
        totalItem,
        totalPrice,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
    } = useCart();

    const [metode, setMetode] = useState<TMetode>("takeaway");

    const handleCheckout = () => {
        if (cart.length === 0) return;
        router.push("/keranjang/pembayaran");
    };

    return {
        cart,
        isReadyCart,
        totalItem,
        totalPrice,
        metode,
        setMetode,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        handleCheckout,
    };
};

export default useKeranjang;
export type { TMetode };
