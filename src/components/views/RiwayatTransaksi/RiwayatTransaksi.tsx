import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

import { FaArrowRight, FaRegTrashCan } from "react-icons/fa6";
import { HiOutlineReceiptRefund } from "react-icons/hi";

import useOrderHistory from "@/hooks/useOrderHistory";
import { cn } from "@/utils/cn";
import { convertIDR } from "@/utils/currency";
import { formatDateID, formatDateTimeID, ORDER_STATUS } from "@/utils/order";

const RiwayatTransaksi = () => {
  const { orders, isReadyOrders, clearOrders } = useOrderHistory();

  const handleClear = () => {
    Swal.fire({
      title: "Hapus semua riwayat?",
      text: "Riwayat transaksi hanya tersimpan di perangkat ini dan tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-primary text-white font-semibold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) clearOrders();
    });
  };

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
      <div className="bg-primary px-5 py-6 lg:px-20 2xl:px-60">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <HiOutlineReceiptRefund size={32} /> Riwayat Transaksi
        </h1>
        <p className="mt-1 text-sm text-white/80">
          Riwayat pesanan tersimpan di perangkat ini.
        </p>
      </div>

      {!isReadyOrders ? (
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
      ) : orders.length === 0 ? (
        <div className="grid justify-items-center gap-4 px-5 py-24 text-center">
          <HiOutlineReceiptRefund size={64} className="text-gray-300" />
          <p className="text-gray-500">Belum ada transaksi di perangkat ini.</p>
          <Link
            href={"/menu-kami/oleh-oleh"}
            className="btn bg-primary text-white hover:bg-primary/90"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 px-5 py-10 lg:px-20 2xl:px-60">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {orders.length} transaksi tersimpan
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <FaRegTrashCan size={14} /> Hapus semua riwayat
            </button>
          </div>

          {orders.map((order) => (
            <div
              key={order.code}
              className="grid gap-4 rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div className="grid">
                  <span className="font-bold text-primary">{order.code}</span>
                  <span className="text-xs text-gray-500">
                    {formatDateTimeID(order.createdAt)} WITA
                  </span>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    ORDER_STATUS[order.status].className
                  )}
                >
                  {ORDER_STATUS[order.status].label}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {order.items.slice(0, 3).map((item) => (
                  <Image
                    key={item._id}
                    src={item.image}
                    className="h-14 w-14 rounded-lg object-cover"
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                ))}
                {order.items.length > 3 && (
                  <span className="text-sm text-gray-500">
                    +{order.items.length - 3} produk lain
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="grid text-sm text-gray-500">
                  <span>
                    {order.totalItem} item • Takeaway • {order.pickup.outlet}
                  </span>
                  <span>
                    Ambil {formatDateID(order.pickup.date)} pukul{" "}
                    {order.pickup.time} WITA
                  </span>
                  <span className="mt-1 text-lg font-bold text-primary">
                    {convertIDR(order.totalPrice)}
                  </span>
                </div>
                <Link
                  href={`/riwayat-transaksi/${order.code}`}
                  className="btn btn-sm bg-primary text-white hover:bg-primary/90"
                >
                  Lihat Detail <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RiwayatTransaksi;
