import Image from "next/image";

const Contact = () => {
    return (
        <>
            <div className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
                <Image src="/image/main/contact.png" className="w-full" alt="banner" width={1000} height={1000}/>
            </div>
            <div className="flex flex-col md:flex-row justify-center p-5">
                <div className="w-full md:w-2/4 lg:w-2/5 xl:w-2/6 2xl:w-1/4 shadow-xl border-t border-gray-200">
                    <Image src="/image/gerai.jpg" className="w-full" alt="banner" width={1000} height={1000}/>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/5 xl:w-2/6 2xl:w-1/4 shadow-xl border-t border-r border-gray-200">
                    <h2 className="bg-primary text-center w-full mt-5 py-2 text-white font-semibold">Informasi Kontak</h2>
                    <div className="p-5 text-center grid gap-2">
                        <p>Jika Anda memiliki pertanyaan atau saran mengenai Syarat dan Ketentuan ini, Anda dapat menghubungi kami melalui email:</p>
                        <p className="text-primary">rotidurianpanglima@gmail.com</p>
                        <p className="">atau kunjungi kami di alamat berikut:</p>
                        <p className="">Jl. Ir. H. Juanda No.55a, Sidodadi, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur</p>
                        <span className="border-y p-0.5 mt-2"></span>
                        <h3>Layanan Pengaduan</h3>
                        <p>
                            Untuk pertanyaan atau masukan terkait layanan pengaduan, silakan hubungi kami melalui:
                        </p>
                        <span className="text-green-500">WhatsApp: <p className="text-primary">0822-2000-2237</p></span>
                        <span className="border-y p-0.5 mt-2"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;