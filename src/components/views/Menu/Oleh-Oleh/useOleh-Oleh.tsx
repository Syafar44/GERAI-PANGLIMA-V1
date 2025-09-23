import useChangeUrl from "@/hooks/useChangeUrl";
import produkServices from "@/services/produk.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useOlehOleh = () => {

    const router = useRouter();
    const { currentPage, currentLimit, currentSearch } = useChangeUrl();

    const getProduk = async () => {
        let params = `category=oleh-oleh&limit=999&page=${currentPage}`
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }
        const res = await produkServices.getAllProduk(params);
            const { data } = res;
        return data
    }

    const { data: dataProduk, isPending: isPendingProduk } = useQuery({
        queryKey: ['OlehOleh', currentPage, currentLimit, currentSearch],
        queryFn: getProduk,
        enabled: router.isReady && !!currentPage && !!currentLimit,
    })

    return {
        dataProduk,
        isPendingProduk,

        router,
    }
}

export default useOlehOleh;