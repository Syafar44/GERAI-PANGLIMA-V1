import bannerServices from "@/services/banner.service"
import contentServices from "@/services/content.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDashboard = () => {
    const router = useRouter()
    
    const getBanner = async() => {
        const res = await bannerServices.getAllBanner()
        const { data } = res
        return data.data
    }

    const { data: dataBanner, isPending: isPendingBanner } = useQuery({
        queryKey: ['Banner'],
        queryFn: getBanner,
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
        dataBanner,
        isPendingBanner,
        dataContent,
        isPendingContent,
    }
}

export default useDashboard