import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import useNews from "./useNews";
import { INews } from "@/types/News";
import { IContent } from "@/types/Content";

const News = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { dataNews, isPendingNews, dataContent, isPendingContent } = useNews();

    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/news.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            {(!isPendingNews || !isPendingContent) ? (
                <section className="py-10">
                    <div className="xl:p-20 py-10 flex justify-center"> 
                        <div className="w-full md:w-[80%]">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={isDesktop ? 3 : 1}
                                centeredSlides={true}    
                                loop
                                navigation
                                pagination={{
                                    clickable: true,
                                    bulletClass: "swiper-pagination-bullet custom-bullet",
                                    bulletActiveClass: "swiper-pagination-bullet-active active-bullet",
                                }}

                                className="rounded-xl"
                            >
                            {dataContent?.map((item: IContent) => (
                                <SwiperSlide
                                    key={item?._id}
                                    className="transition-all duration-300 ease-in-out"
                                    >
                                    <Link target="_blank" href={`${item?.link}`}>
                                        <Image
                                            src={`${item?.image}`}
                                            alt={`${item?.title}`}
                                            className="rounded-lg shadow-lg w-[80%] mx-auto md:w-full"
                                            width={1000} height={1000}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="p-10">
                        <h1 className="text-3xl font-bold text-center text-primary pb-5">Berita Kami</h1>
                        <div className="flex flex-wrap justify-center gap-10">
                            {dataNews?.map((item: INews) => (    
                                <Link key={item?._id} href={`/news/${item?._id}`} className="card bg-base-100 w-96 shadow-sm">
                                    <figure>
                                        <Image src={`${item?.image}`} className="w-full" alt="banner" width={1000} height={1000}/>    
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{item?.title}</h2>
                                        <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: `${item?.description}` }}></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            ): (
                <div className="flex justify-center items-center h-96 relative">
                    <span className="loading loading-ring loading-xl scale-[6] text-primary"></span>
                    <Image src="/image/icon/logo.png" className="w-24 absolute" alt="banner" width={1000} height={1000}/>
                </div>
            )}
        </>
    )
}

export default News;