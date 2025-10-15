import Image from "next/image"
import Link from "next/link"
import useOlehOleh from "./useOleh-Oleh";
import { IProduk } from "@/types/Produk";
import { convertIDR } from "@/utils/currency";
import { useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";

const OlehOleh = () => {

    const { dataProduk, isPendingProduk, router } = useOlehOleh();

    const produk = dataProduk?.data || []

    const { setUrl, handleSearch } = useChangeUrl()

    useEffect(() => {
        if (router.isReady) {
            setUrl();
        }
    }, [router.isReady])

    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/banner2.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <div className="flex justify-center md:justify-end bg-primary p-2 md:px-5 lg:px-10 xl:px-40 @xl:px-60">
                <label className="input dark:text-white">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" className="grow dark:text-white" placeholder="Search" onChange={handleSearch} />
                </label>
            </div>
            <section>
                {!isPendingProduk ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:px-20 xl:px-32 2xl:px-60 py-10">
                        {produk.map((item: IProduk) => (    
                            <Link key={item?._id} href={`/menu-kami/oleh-oleh/${item?.slug}`} className="p-20 text-center flex flex-col justify-between items-center gap-2 hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                                <Image src={`${item?.image}`} className="w-full" alt="banner" width={1000} height={1000}/>
                                <p className="text-xl text-nowrap">{item?.title}</p>
                                <span className="text-lg text-nowrap text-primary">{convertIDR(item?.price || 0)}</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-96 relative">
                        <span className="loading loading-ring loading-xl scale-[6] text-primary"></span>
                        <Image src="/image/icon/logo.png" className="w-24 absolute" alt="banner" width={1000} height={1000}/>
                    </div>
                )}
            </section>
        </>
    )
}

export default OlehOleh