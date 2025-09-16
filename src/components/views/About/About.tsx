import Image from "next/image"

const About = () => {
    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/about.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <section className="py-10 px-5 md:px-20 lg:px-40 xl:px-80 flex justify-center">
                <div className="text-2xl grid gap-10">
                    <div>
                        <h2 className="text-4xl font-extrabold text-primary">Visi Kami</h2>
                        <p>Menginspirasi Indonesia! Menjadi Perusahaan Syariah Kelas Dunia
                        Yang Dicintai, Berperan Dalam Peradaban Mulia, Dan Bermanfaat
                        Bagi Semua.</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold text-primary">Misi Kami</h2>
                        <ul className="list-disc list-inside grid gap-2">
                            <li>
                                Mengelola perusahaan Murni sesuai Syariat Islam oleh individu
                                yang Saleh dengan standart Kelas Dunia.
                            </li>
                            <li>
                                Menyediakan produk yang halal, berkualitas dan memberi nilai
                                yang terbaik bagi pelanggan.
                            </li>
                            <li>
                                Menyebar manfaat serta berperan nyata dalam peradaban mulia.
                            </li>
                            <li>
                                Bertumbuh dengan Cepat dan Berkesinambungan sehingga dapat
                                Semakin Bermanfaat Bagi Semua.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold text-primary pb-5">Value</h2>
                        <ul className="grid gap-2">
                            <li>
                                Syar&apos;i
                            </li>
                            <li>
                                Profesional
                            </li>
                            <li>
                                Customer Centric
                            </li>
                            <li>
                                Innovation
                            </li>
                            <li>
                                Helpful
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About