import newsServices from "@/services/news.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailNews = () => {
    const router = useRouter()
    const { id } = router.query

    const getDetailNews = async () => {
        const res = await newsServices.getNewsById(`${id}`)
        const { data } = res
        return data.data
    }

    const { data: dataNews, isPending: isPendingNews } = useQuery({
        queryKey: ['DetailNews', id],
        queryFn: getDetailNews,
        enabled: router.isReady && !!id,
    })

    return {
        dataNews,
        isPendingNews,
    }
}

export default useDetailNews