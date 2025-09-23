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

    return {
        dataProduk,
        isPendingProduk,
    }
}

export default useDetailOlehOleh;