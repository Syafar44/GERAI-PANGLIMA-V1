import Image from "next/image"
import Link from "next/link"

const Menu = () => {
    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/banner1.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <section>
                <div className="grid md:grid-cols-2 sm:px-20 xl:px-32 2xl:px-60 py-10">
                    <Link href={"/menu-kami/oleh-oleh"} className="p-20 text-center hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                        <Image src="/image/produk/rotidurian.png" className="w-full" alt="banner" width={1000} height={1000}/>
                        <p className="text-4xl text-primary">Oleh - Oleh</p>
                    </Link>
                    <Link href={"/menu-kami/snack-box"} className="p-20 text-center hover:bg-secondary/10 hover:scale-105 duration-200 rounded">
                        <Image src="/image/produk/rotidurian.png" className="w-full" alt="banner" width={1000} height={1000}/>
                        <p className="text-4xl text-primary">Snack Bok</p>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Menu