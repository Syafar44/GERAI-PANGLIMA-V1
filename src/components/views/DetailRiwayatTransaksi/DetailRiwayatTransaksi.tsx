import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import {
  FaArrowLeft,
  FaBuildingColumns,
  FaLocationDot,
  FaRegCalendar,
  FaRegClock,
  FaRegTrashCan,
  FaShieldHalved,
} from "react-icons/fa6";
import { HiOutlineReceiptRefund } from "react-icons/hi";

import useOrderHistory from "@/hooks/useOrderHistory";
import { cn } from "@/utils/cn";
import { convertIDR } from "@/utils/currency";
import { formatDateID, formatDateTimeID, ORDER_STATUS } from "@/utils/order";

const DetailRiwayatTransaksi = () => {
  const router = useRouter();
  const { code } = router.query;
  const { isReadyOrders, getOrderByCode, updateOrderStatus, removeOrder } =
    useOrderHistory();

  const order = getOrderByCode(`${code}`);

  const handleCancel = () => {
    if (!order) return;

    Swal.fire({
      title: "Batalkan pesanan?",
      text: `Pesanan ${order.code} akan ditandai sebagai dibatalkan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Batalkan Pesanan",
      cancelButtonText: "Kembali",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-primary text-white font-semibold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) updateOrderStatus(order.code, "batal");
    });
  };

  const handleRemove = () => {
    if (!order) return;

    Swal.fire({
      title: "Hapus dari riwayat?",
      text: "Data transaksi ini akan dihapus dari perangkat ini.",
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
      if (result.isConfirmed) {
        removeOrder(order.code);
        router.push("/riwayat-transaksi");
      }
    });
  };

  if (!isReadyOrders || !router.isReady) {
    return (
      <section className="relative mt-14 flex h-96 items-center justify-center sm:mt-16 lg:mt-20 xl:mt-24">
        <span className="loading loading-ring loading-xl scale-[6] text-primary"></span>
        <Image
          src="/image/icon/logo.png"
          className="absolute w-24"
          alt="logo"
          width={1000}
          height={1000}
        />
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
        <div className="grid justify-items-center gap-4 px-5 py-24 text-center">
          <HiOutlineReceiptRefund size={64} className="text-gray-300" />
          <h1 className="text-2xl font-bold">Transaksi Tidak Ditemukan</h1>
          <p className="text-gray-500">
            Kode <strong>{`${code}`}</strong> tidak ada di perangkat ini.
            Riwayat transaksi tersimpan lokal, jadi tidak muncul bila dibuka
            dari perangkat atau browser lain.
          </p>
          <Link
            href={"/riwayat-transaksi"}
            className="btn bg-primary text-white hover:bg-primary/90"
          >
            Kembali ke Riwayat
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
      <div className="bg-primary px-5 py-6 lg:px-20 2xl:px-60">
        <Link
          href={"/riwayat-transaksi"}
          className="flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <FaArrowLeft size={12} /> Riwayat Transaksi
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          {order.code}
        </h1>
        <p className="text-sm text-white/80">
          Dibuat {formatDateTimeID(order.createdAt)} WITA
        </p>
      </div>

      <div className="grid gap-6 px-5 py-10 lg:grid-cols-3 lg:px-20 2xl:px-60">
        <div className="grid content-start gap-6 lg:col-span-2">
          <div className="grid gap-3 rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-bold">Status Pesanan</h2>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  ORDER_STATUS[order.status].className
                )}
              >
                {ORDER_STATUS[order.status].label}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {order.status === "menunggu" &&
                "Pembayaran kamu sedang diverifikasi. Tunjukkan kode pesanan saat mengambil pesanan di gerai."}
              {order.status === "selesai" &&
                "Pesanan sudah selesai. Terima kasih sudah belanja di Gerai Panglima."}
              {order.status === "batal" && "Pesanan ini telah dibatalkan."}
            </p>
          </div>

          <div className="grid gap-3 rounded-xl border border-gray-200 p-5">
            <h2 className="border-b pb-3 font-bold">Informasi Pemesan</h2>
            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Nama</dt>
                <dd className="text-right font-semibold">
                  {order.customer.name}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Email</dt>
                <dd className="text-right font-semibold break-all">
                  {order.customer.email}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">WhatsApp</dt>
                <dd className="text-right font-semibold">
                  {order.customer.phone}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Instansi</dt>
                <dd className="text-right font-semibold">
                  {order.customer.instansi || "-"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-3 rounded-xl border border-gray-200 p-5">
            <h2 className="border-b pb-3 font-bold">Pengambilan (Takeaway)</h2>
            <span className="flex gap-3 text-sm">
              <FaLocationDot className="mt-1 shrink-0 text-primary" size={16} />
              <span>
                <strong>{order.pickup.outlet}</strong>
                <span className="block text-gray-500">
                  {order.pickup.address}
                </span>
              </span>
            </span>
            <span className="flex items-center gap-3 text-sm">
              <FaRegCalendar className="shrink-0 text-primary" size={16} />
              {formatDateID(order.pickup.date)}
            </span>
            <span className="flex items-center gap-3 text-sm">
              <FaRegClock className="shrink-0 text-primary" size={16} />
              {order.pickup.time} WITA
            </span>
            {order.pickup.note && (
              <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                <strong>Catatan: </strong>
                {order.pickup.note}
              </p>
            )}
          </div>

          <div className="grid gap-3 rounded-xl border border-gray-200 p-5">
            <h2 className="border-b pb-3 font-bold">
              Daftar Produk ({order.totalItem})
            </h2>
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    className="h-12 w-12 rounded-lg object-cover"
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                  <span>
                    {item.title}
                    <span className="block text-xs text-gray-500">
                      {item.qty} x {convertIDR(item.price)}
                    </span>
                  </span>
                </span>
                <span className="font-semibold text-nowrap">
                  {convertIDR(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid content-start gap-4 rounded-xl border border-gray-200 p-5 shadow-sm lg:sticky lg:top-28 lg:h-fit">
          <h2 className="border-b pb-3 font-bold">Pembayaran</h2>
          <div className="flex items-center gap-3 text-sm font-semibold">
            {order.payment === "transfer" ? (
              <>
                <FaBuildingColumns size={18} className="text-primary" />
                Virtual Account Bank BCA
              </>
            ) : (
              <>
                <FaShieldHalved size={18} className="text-primary" />
                QRIS / E-Wallet
              </>
            )}
          </div>
          {order.vaNumber && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
              <p className="text-xs text-gray-500">Nomor Virtual Account</p>
              <p className="font-bold break-all">{order.vaNumber}</p>
            </div>
          )}
          <div className="flex justify-between border-t pt-4">
            <span className="font-bold">Total</span>
            <span className="text-lg font-bold text-primary">
              {convertIDR(order.totalPrice)}
            </span>
          </div>

          {order.status === "menunggu" && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white"
            >
              Batalkan Pesanan
            </button>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary"
          >
            <FaRegTrashCan size={14} /> Hapus dari riwayat
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailRiwayatTransaksi;
