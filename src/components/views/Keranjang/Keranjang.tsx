import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { FaCalendar, FaClock } from "react-icons/fa";
import {
  FaLocationDot,
  FaLock,
  FaMinus,
  FaPlus,
  FaRegTrashCan,
  FaTruck,
} from "react-icons/fa6";
import { HiOutlineShoppingBag, HiOutlineShoppingCart } from "react-icons/hi";

import { GERAI_PICKUP } from "@/constants/gerai.constants";
import { convertIDR } from "@/utils/currency";
import { cn } from "@/utils/cn";
import useKeranjang from "./useKeranjang";

const MapLock = dynamic(() => import("../../ui/MapLock"), { ssr: false });

const Keranjang = () => {
  const {
    cart,
    isReadyCart,
    totalItem,
    totalPrice,
    metode,
    setMetode,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    handleCheckout,
  } = useKeranjang();

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
      <div className="bg-primary px-5 py-6 lg:px-20 2xl:px-60">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <HiOutlineShoppingCart size={32} /> Keranjang
        </h1>
        <p className="mt-1 text-sm text-white/80">
          Periksa pesanan kamu sebelum lanjut ke pembayaran.{" "}
          <Link href={"/riwayat-transaksi"} className="underline">
            Lihat riwayat transaksi
          </Link>
        </p>
      </div>

      {!isReadyCart ? (
        <div className="relative flex h-96 items-center justify-center">
          <span className="loading loading-ring loading-xl scale-[6] text-primary"></span>
          <Image
            src="/image/icon/logo.png"
            className="absolute w-24"
            alt="logo"
            width={1000}
            height={1000}
          />
        </div>
      ) : (
        <div className="grid gap-8 px-5 py-10 lg:grid-cols-3 lg:px-20 2xl:px-60">
          <div className="grid content-start gap-8 lg:col-span-2">
            {/* Metode pengambilan */}
            <div className="grid gap-3">
              <h2 className="border-b border-primary pb-2 font-bold">
                Metode Pemesanan
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMetode("takeaway")}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition duration-200",
                    metode === "takeaway"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  <span
                    className={cn(
                      "rounded-lg p-3",
                      metode === "takeaway"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    <HiOutlineShoppingBag size={24} />
                  </span>
                  <span className="grid">
                    <span className="font-bold">Takeaway</span>
                    <span className="text-sm text-gray-500">
                      Ambil pesanan langsung di gerai
                    </span>
                  </span>
                </button>

                <div
                  aria-disabled
                  title="Metode delivery belum tersedia"
                  className="flex cursor-not-allowed items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-100 p-4 text-left opacity-70"
                >
                  <span className="rounded-lg bg-gray-300 p-3 text-gray-600">
                    <FaTruck size={24} />
                  </span>
                  <span className="grid">
                    <span className="flex items-center gap-2 font-bold text-gray-600">
                      Delivery <FaLock size={14} />
                    </span>
                    <span className="text-sm text-gray-500">
                      Segera hadir, belum tersedia
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Alamat gerai + maps terkunci */}
            <div className="grid gap-3">
              <h2 className="border-b border-primary pb-2 font-bold">
                Alamat Pengambilan
              </h2>
              <div className="grid gap-5 overflow-hidden rounded-xl border border-gray-200 p-4 md:grid-cols-2">
                <div className="grid content-start gap-2 text-sm xl:text-base">
                  <h3 className="text-lg font-bold text-primary">
                    {GERAI_PICKUP.name}
                  </h3>
                  <span className="flex gap-3">
                    <FaLocationDot className="mt-1 shrink-0 text-primary" size={18} />
                    <p>{GERAI_PICKUP.address}</p>
                  </span>
                  <span className="flex gap-3">
                    <FaClock className="mt-1 shrink-0 text-primary" size={18} />
                    <p>{GERAI_PICKUP.open}</p>
                  </span>
                  <span className="flex gap-3">
                    <FaCalendar className="mt-1 shrink-0 text-primary" size={18} />
                    <p>{GERAI_PICKUP.day}</p>
                  </span>
                  <Link
                    href={GERAI_PICKUP.mapsUrl}
                    target="_blank"
                    className="mt-2 w-fit text-sm text-primary underline"
                  >
                    Buka di Google Maps
                  </Link>
                </div>
                <div className="h-[220px] w-full md:h-[260px]">
                  <MapLock
                    name={GERAI_PICKUP.name}
                    coords={GERAI_PICKUP.coords}
                  />
                </div>
              </div>
            </div>

            {/* List produk */}
            <div className="grid gap-3">
              <div className="flex items-center justify-between border-b border-primary pb-2">
                <h2 className="font-bold">Daftar Produk ({totalItem})</h2>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm text-primary hover:underline"
                  >
                    Kosongkan keranjang
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="grid justify-items-center gap-4 rounded-xl border border-dashed border-gray-300 py-14 text-center">
                  <HiOutlineShoppingCart size={56} className="text-gray-300" />
                  <p className="text-gray-500">Keranjang kamu masih kosong.</p>
                  <Link
                    href={"/menu-kami/oleh-oleh"}
                    className="btn bg-primary text-white hover:bg-primary/90"
                  >
                    Lihat Menu Kami
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                    >
                      <Link
                        href={`/menu-kami/${item.category}/${item.slug}`}
                        className="shrink-0"
                      >
                        <Image
                          src={item.image}
                          className="h-[100px] w-[100px] rounded-lg object-cover"
                          alt={item.title}
                          width={200}
                          height={200}
                        />
                      </Link>
                      <div className="grid w-full gap-1">
                        <Link
                          href={`/menu-kami/${item.category}/${item.slug}`}
                          className="font-bold hover:text-primary"
                        >
                          {item.title}
                        </Link>
                        <span className="text-primary">
                          {convertIDR(item.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Subtotal: {convertIDR(item.price * item.qty)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 rounded-lg border border-primary p-1">
                          <button
                            type="button"
                            aria-label={`Kurangi ${item.title}`}
                            onClick={() => decreaseQty(item._id)}
                            className="btn btn-sm btn-circle border-none bg-primary/10 text-primary hover:bg-primary hover:text-white"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-6 text-center font-bold">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Tambah ${item.title}`}
                            onClick={() => increaseQty(item._id)}
                            className="btn btn-sm btn-circle border-none bg-primary/10 text-primary hover:bg-primary hover:text-white"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={`Hapus ${item.title}`}
                          onClick={() => removeFromCart(item._id)}
                          className="btn btn-sm btn-circle border-none bg-transparent text-gray-400 hover:bg-primary/10 hover:text-primary"
                        >
                          <FaRegTrashCan size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ringkasan */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="grid gap-4 rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="border-b border-primary pb-2 font-bold">
                Ringkasan Pesanan
              </h2>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Metode</span>
                <span className="font-semibold capitalize">{metode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Jumlah produk</span>
                <span className="font-semibold">{totalItem} item</span>
              </div>
              <div className="flex justify-between border-t border-dashed pt-4">
                <span className="font-bold">Total</span>
                <span className="text-lg font-bold text-primary">
                  {convertIDR(totalPrice)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="btn bg-primary text-white hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400"
              >
                Lanjut ke Pembayaran
              </button>
              <Link
                href={"/menu-kami/oleh-oleh"}
                className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white"
              >
                Tambah Produk Lain
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Keranjang;
