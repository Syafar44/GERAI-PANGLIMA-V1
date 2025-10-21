import Image from "next/image"
import Link from "next/link"
import useDetailOlehOleh from "./useDetailOleh-Oleh";
import { convertIDR } from "@/utils/currency";
import { IProduk } from "@/types/Produk";

const DetailOlehOleh = () => {
    const { 
        dataProduk, 
        isPendingProduk,
        isPendingAllProduk,
        randomProduk,
    } = useDetailOlehOleh();

    return (
        <>
            <div>
                <Image src="/image/banner2.jpg" className="w-full mt-14 md:mt-0 md:h-[600px] object-center object-cover" alt="banner" width={1000} height={1000}/>
            </div>
            {!isPendingProduk ? (
                <section className="mx-5 lg:mx-20 2xl:mx-80 py-10 grid gap-10">
                    <div className="flex flex-col items-center md:flex-row gap-5 md:gap-20">
                        <Image src={`${dataProduk?.image}`} className="w-[250px] md:w-[500px] rounded-xl" alt="banner" width={1000} height={1000}/>
                        <div className="w-full md:w-[800px] flex flex-col gap-5">
                            <h1 className="text-xl md:text-3xl font-bold">{dataProduk?.title}</h1>
                            <span className="text-lg md:text-xl text-primary">{convertIDR(dataProduk?.price)}</span>
                            <button className="btn w-[200px] bg-primary text-white">
                                <Link href={"/delivery"}>
                                    Pesan Sekarang
                                </Link>
                            </button>
                            <p className="capitalize"><strong className="pr-2">Kategori:</strong>{dataProduk?.category}</p>
                        </div>
                    </div>
                    <div className="grid pr-5">
                        <h2 className="font-bold mb-5 border-b border-primary">Deskripsi</h2>
                        <p dangerouslySetInnerHTML={{ __html: `${dataProduk?.description}` }}></p>
                    </div>
                    <div className="grid">
                        <h2 className="font-bold mb-5 border-b border-primary">Produk Lainnya</h2>
                        {!isPendingAllProduk && (
                            <div className="grid md:grid-cols-2 xl:grid-cols-4">
                                {randomProduk?.map((item: IProduk) => (    
                                    <Link key={item._id} href={"/menu-kami/oleh-oleh/roti-durian-panglima"} className="p-20 text-center flex flex-col items-center justify-between gap-2 hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                                        <Image src={`${item.image}`} className="w-full rounded-xl" alt={`${item.title}`} width={1000} height={1000}/>
                                        <p className="text-xl text-nowrap">{item.title}</p>
                                        <span className="text-lg text-nowrap text-primary">{convertIDR(Number(item.price))}</span>
                                    </Link>
                                ))}
                            </div>
                        ) }
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

export default DetailOlehOleh