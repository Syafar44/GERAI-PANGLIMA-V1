import Image from "next/image"

const Delivery = () => {
    return (
        <div>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/delivery.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <section>
                <div className="flex flex-col md:flex-row items-center justify-center p-10 gap-10">
                    <div className="card bg-base-100 hover:scale-90 transition-all duration-300 ease-in-out">
                        <div className="bg-primary p-10 flex justify-center rounded-t-xl">
                            <Image src="/image/icon/whatsapp.svg" className="w-32" alt="banner" width={1000} height={1000}/>
                        </div>
                        <div className="card-body text-center">
                            <p>Pemesanan Melalui Whatsaap</p>
                            <h2 className="text-xl font-bold">
                                Buka Hpmu sekarang dan Order
                            </h2>
                            <p className="text-primary">Jam Pemesanan 08:00 - 17:00</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 hover:scale-90 transition-all duration-300 ease-in-out">
                        <div className="bg-primary p-10 flex justify-center rounded-t-xl">
                            <Image src="/image/icon/shopee.png" className="w-32" alt="banner" width={1000} height={1000}/>
                        </div>
                        <div className="card-body text-center">
                            <p>Pemesanan Melalui Shopee</p>
                            <h2 className="text-xl font-bold">
                                Buka Hpmu sekarang dan Order
                            </h2>
                            <p className="text-primary">Buka Chat 08:00 - 17:00</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 hover:scale-90 transition-all duration-300 ease-in-out">
                        <div className="bg-primary p-10 flex justify-center rounded-t-xl">
                            <Image src="/image/icon/tiktok.svg" className="w-32" alt="banner" width={1000} height={1000}/>
                        </div>
                        <div className="card-body text-center">
                            <p>Pemesanan Melalui Tiktok</p>
                            <h2 className="text-xl font-bold">
                                Buka Hpmu sekarang dan Order
                            </h2>
                            <p className="text-primary">Buka Chat 08:00 - 17:00</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Delivery