import produkServices from "@/services/produk.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailOlehOleh = () => {
    const router = useRouter();
    const { slug } = router.query;

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

    return {
        dataProduk,
        isPendingProduk,
        dataAllProduk,
        isPendingAllProduk,
        randomProduk,
    }
}

export default useDetailOlehOleh;