import Image from "next/image"
import Link from "next/link"

const OlehOleh = () => {
    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/banner2.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:px-20 xl:px-32 2xl:px-60 py-10">
                    <Link href={"/menu-kami/oleh-oleh/roti-durian-panglima"} className="p-20 text-center flex flex-col items-center gap-2 hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                        <Image src="/image/produk/rotidurian.png" className="w-full" alt="banner" width={1000} height={1000}/>
                        <p className="text-xl text-nowrap">Roti Durian Panglima</p>
                        <span className="text-lg text-nowrap text-primary">Rp39.000</span>
                    </Link>
                    <Link href={"/menu-kami/oleh-oleh/roti-durian-panglima"} className="p-20 text-center flex flex-col items-center gap-2 hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                        <Image src="/image/produk/rotidurian.png" className="w-full" alt="banner" width={1000} height={1000}/>
                        <p className="text-xl text-nowrap">Roti Durian Keju Panglima</p>
                        <span className="text-lg text-nowrap text-primary">Rp39.000</span>
                    </Link>
                    <Link href={"/menu-kami/oleh-oleh/roti-durian-panglima"} className="p-20 text-center flex flex-col items-center gap-2 hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                        <Image src="/image/produk/rotidurian.png" className="w-full" alt="banner" width={1000} height={1000}/>
                        <p className="text-xl text-nowrap">Roti Durian Panglima</p>
                        <span className="text-lg text-nowrap text-primary">Rp39.000</span>
                    </Link>
                    <Link href={"/menu-kami/oleh-oleh/roti-durian-panglima"} className="p-20 text-center flex flex-col items-center gap-2 hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                        <Image src="/image/produk/rotidurian.png" className="w-full" alt="banner" width={1000} height={1000}/>
                        <p className="text-xl text-nowrap">Roti Durian Keju Panglima</p>
                        <span className="text-lg text-nowrap text-primary">Rp39.000</span>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default OlehOleh