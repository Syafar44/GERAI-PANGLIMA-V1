import Image from "next/image"
import Link from "next/link"
import useSnackBox from "./useSnack-Box";
import { IProduk } from "@/types/Produk";
import { convertIDR } from "@/utils/currency";
import { useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";

const SnackBox = () => {

    const { dataProduk, isPendingProduk, router } = useSnackBox();

    const produk = dataProduk?.data || []

    const { setUrl } = useChangeUrl()

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
                ): (
                    <div className="flex justify-center items-center h-96 relative">
                        <span className="loading loading-ring loading-xl scale-[6] text-primary"></span>
                        <Image src="/image/icon/logo.png" className="w-24 absolute" alt="banner" width={1000} height={1000}/>
                    </div>
                )}
            </section>
        </>
    )
}

export default SnackBox