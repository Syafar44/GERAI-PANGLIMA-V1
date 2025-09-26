import newsServices from "@/services/news.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useNews = () => {
    const router = useRouter()

    const getNews = async () => {
        const res = await newsServices.getAllNews()
        const { data } = res
        return data.data
    }

    const { data: dataNews, isPending: isPendingNews } = useQuery({
        queryKey: ['News'],
        queryFn: getNews,
        enabled: router.isReady,
    })

    return { 
        dataNews,
        isPendingNews
    }
}

export default useNews
