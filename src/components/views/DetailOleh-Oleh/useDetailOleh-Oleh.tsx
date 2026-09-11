import { useCart } from "@/contexts/CartContext";
import produkServices from "@/services/produk.service";
import { IProduk } from "@/types/Produk";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailOlehOleh = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { getQty, addToCart, increaseQty, decreaseQty } = useCart();

    const getProdukBySlug = async () => {
        const res = await produkServices.getProdukBySlug(`${slug}`)
        const { data } = res
        return data.data
    }

    const { data: dataProduk, isPending: isPendingProduk } = useQuery({
        queryKey: ['produk', slug],
        queryFn: getProdukBySlug,
        enabled: router.isReady
    })

    const getProduk = async () => {
        const params = `category=oleh-oleh&limit=999`
        const res = await produkServices.getAllProduk(params);
            const { data } = res;
        return data.data
    }

    const { data: dataAllProduk, isPending: isPendingAllProduk } = useQuery({
        queryKey: ['All-OllehOleh'],
        queryFn: getProduk,
        enabled: router.isReady,
    })

    const randomProduk = dataAllProduk
        ?.sort(() => Math.random() - 0.5)
        .slice(0, 4);

    const qtyProduk = getQty(dataProduk?._id);

    const handleAddToCart = () => {
        const produk = dataProduk as IProduk;
        if (!produk?._id) return;

        addToCart({
            _id: produk._id,
            title: `${produk.title}`,
            slug: `${produk.slug}`,
            category: `${produk.category}`,
            image: `${produk.image}`,
            price: Number(produk.price) || 0,
        });
    };

    const handleIncreaseQty = () => {
        if (dataProduk?._id) increaseQty(dataProduk._id);
    };

    const handleDecreaseQty = () => {
        if (dataProduk?._id) decreaseQty(dataProduk._id);
    };

    return {
        dataProduk,
        isPendingProduk,
        dataAllProduk,
        isPendingAllProduk,
        randomProduk,
        qtyProduk,
        handleAddToCart,
        handleIncreaseQty,
        handleDecreaseQty,
    }
}

export default useDetailOlehOleh;