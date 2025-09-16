import Image from "next/image"

import dynamic from "next/dynamic";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Map = dynamic(() => import("../../ui/Map"), { ssr: false });

const Location = () => {
    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/location.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <section className="xl:px-20 2xl:px-40">
                <div className="grid md:grid-cols-2 w-full gap-10 p-5 xl:p-10">
                    <div className="grid gap-5">
                        <div className="bg-primary p-5 rounded-md grid gap-2 text-sm xl:text-base">
                            <h1 className="xl:text-xl text-white font-bold">Gerai Panglima</h1>
                            <span className="flex gap-3 text-white">
                                <FaLocationDot size={20} />
                                <p>Jl. Ir. H. Juanda No.55a, Sidodadi, Kec. Samarinda Ulu, Kota Samarinda</p>
                            </span>
                            <span className="flex gap-3 text-white">
                                <FaClock size={20} />
                                <p>07:00 - 22:00</p>
                            </span>
                            <span className="flex gap-3 text-white">
                                <FaCalendar size={20} />
                                <p>Senin, Selasa, Rabu, Kamis, Jumat, Sabtu , Minggu</p>
                            </span>
                        </div>
                        <div className="bg-primary p-5 rounded-md grid gap-2 text-sm xl:text-base">
                            <h1 className="xl:text-xl text-white font-bold">Gerai Panglima Apt Purwanoto</h1>
                            <span className="flex gap-3 text-white">
                                <FaLocationDot size={20} />
                                <p>Jl. Poros Samarinda - Bontang, Sungai Siring, Kec. Samarinda Utara, Kota Samarinda</p>
                            </span>
                            <span className="flex gap-3 text-white">
                                <FaClock size={20} />
                                <p>06:30 - 17:00</p>
                            </span>
                            <span className="flex gap-3 text-white">
                                <FaCalendar size={20} />
                                <p>Senin, Selasa, Rabu, Kamis, Jumat, Sabtu , Minggu</p>
                            </span>
                        </div>
                        <div className="bg-primary p-5 rounded-md grid gap-2 text-sm xl:text-base">
                            <h1 className="xl:text-xl text-white font-bold">Gerai Panglima Bandara Sepinggan</h1>
                            <span className="flex gap-3 text-white">
                                <FaLocationDot size={20} />
                                <p>Sepinggan, Balikpapan Selatan, Kota Balikpapan</p>
                            </span>
                            <span className="flex gap-3 text-white">
                                <FaClock size={20} />
                                <p>06:00 - 19:00</p>
                            </span>
                            <span className="flex gap-3 text-white">
                                <FaCalendar size={20} />
                                <p>Senin, Selasa, Rabu, Kamis, Jumat, Sabtu , Minggu</p>
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-[300px] md:h-full">
                        <Map />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Location
