import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Dashboard = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div>
            <div className="w-full mt-20 md:mt-0">
                <section className="flex justify-center">
                    <div className="w-full">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            centeredSlides={true}    
                            loop
                            navigation
                            pagination={{
                                clickable: true,
                                bulletClass: "swiper-pagination-bullet custom-bullet",
                                bulletActiveClass: "swiper-pagination-bullet-active active-bullet",
                            }}

                            className="rounded-xl w-full"
                        >
                        {[
                            "/image/banner1.jpg",
                            "/image/banner2.jpg",
                        ].map((src, i) => (
                            <SwiperSlide
                                key={i}
                                className="transition-all duration-300 ease-in-out"
                                >
                                <Image
                                    src={src}
                                    alt={`Slide ${i}`}
                                    className="rounded-lg shadow-lg w-full"
                                    width={1000} height={1000}
                                />
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </section>
            </div>
            <section className="flex flex-col gap-5 px-5 md:px-10 2xl:px-80 py-10 md:flex-row md:gap-10 justify-between w-full">
                <iframe
                    className="w-full h-[220px] md:h-[250px] 2xl:h-[400px] rounded-sm"
                    src="https://www.youtube.com/embed/PmC4LVc7nKM">
                </iframe>
                <iframe
                    className="w-full h-[220px] md:h-[250px] 2xl:h-[400px] rounded-sm"
                    src="https://www.youtube.com/embed/ULyhyA0DUYU">
                </iframe>
            </section>
            <div className="py-5 w-full bg-primary">
                <h1 className="text-xl md:text-3xl 2xl:text-5xl font-bold text-center text-white italic">
                    #GERAIPANGLIMA
                </h1>
            </div>
            <section className="xl:p-20 py-10 flex justify-center">
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
            </section>
        </div>
    )
}

export default Dashboard