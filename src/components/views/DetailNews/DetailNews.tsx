import Image from "next/image"
import useDetailNews from "./useDetailNews"

const DetailNews = () => {
    const { dataNews, isPendingNews } = useDetailNews()
    return (
        <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
            {!isPendingNews && (    
                <article className="p-5 md:p-10 xl:px-60 h-screen">
                    <Image src={`${dataNews?.image}`} width={1000} height={1000} alt="news" className="md:float-left md:w-1/2 xl: mb-3 mr-3" />
                    <h3 className="font-bold text-2xl">{dataNews?.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: `${dataNews?.description}` }}></p>
                </article>
            )}
        </section>
    )
}

export default DetailNews