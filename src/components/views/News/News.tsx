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

const News = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { dataNews, isPendingNews } = useNews();

    console.log(dataNews)

    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/news.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <section>
                <div className="xl:p-20 py-10 flex justify-center">
                    <div className="w-full md:w-[80%]">
                        <h1 className="text-3xl font-bold text-center text-primary pb-5">Promosi Kami</h1>
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
                        {[
                            "/image/poster1.jpg",
                            "/image/poster1.jpg",
                            "/image/poster1.jpg",
                            "/image/poster1.jpg",
                            "/image/poster1.jpg",
                        ].map((src, i) => (
                            <SwiperSlide
                                key={i}
                                className="transition-all duration-300 ease-in-out"
                                >
                                <Image
                                    src={src}
                                    alt={`Slide ${i}`}
                                    className="rounded-lg shadow-lg w-[80%] mx-auto md:w-full"
                                    width={1000} height={1000}
                                />
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </div>
                <div className="p-10">
                    <h1 className="text-3xl font-bold text-center text-primary pb-5">Berita Kami</h1>
                    {!isPendingNews && (
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
                    )}
                </div>
            </section>
        </>
    )
}

export default News;