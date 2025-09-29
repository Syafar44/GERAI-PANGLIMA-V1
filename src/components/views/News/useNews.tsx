import contentServices from "@/services/content.service"
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

    const getContent = async() => {
        const res = await contentServices.getAllContent()
        const { data } = res
        return data.data
    }

    const { data: dataContent, isPending: isPendingContent } = useQuery({
        queryKey: ['Content'],
        queryFn: getContent,
        enabled: router.isReady,
    })

    return { 
        dataNews,
        isPendingNews,
        dataContent,
        isPendingContent
    }
}

export default useNews
