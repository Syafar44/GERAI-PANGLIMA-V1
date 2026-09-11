import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBuildingColumns,
  FaCircleCheck,
  FaLocationDot,
  FaLock,
  FaRegCalendar,
  FaRegClock,
  FaRegNoteSticky,
  FaShieldHalved,
} from "react-icons/fa6";
import {
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineUser,
} from "react-icons/hi";

import { GERAI_PICKUP } from "@/constants/gerai.constants";
import { PAYMENT_METHODS, PICKUP_HOURS } from "@/constants/payment.constants";
import { cn } from "@/utils/cn";
import { convertIDR } from "@/utils/currency";
import { formatDateID, getTodayISO } from "@/utils/order";

import ModalPembayaran from "./ModalPembayaran";
import Stepper from "./Stepper";
import usePembayaran from "./usePembayaran";

const Pembayaran = () => {
  const {
    cart,
    isReadyCart,
    totalItem,
    totalPrice,
    step,
    payment,
    setPayment,
    isOpenModal,
    vaNumber,
    orderCode,
    successOrder,
    formCustomer,
    formPickup,
    handleNextCustomer,
    handleNextPickup,
    handleBack,
    handleOpenPayment,
    handleCloseModal,
    handleConfirmPayment,
  } = usePembayaran();

  const customer = formCustomer.getValues();
  const pickup = formPickup.getValues();
  const errorsCustomer = formCustomer.formState.errors;
  const errorsPickup = formPickup.formState.errors;

  if (!isReadyCart) {
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

  if (successOrder) {
    return (
      <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
        <div className="mx-auto grid max-w-xl justify-items-center gap-4 px-5 py-20 text-center">
          <FaCircleCheck size={72} className="text-accent" />
          <h1 className="text-2xl font-bold md:text-3xl">
            Pesanan Berhasil Dibuat
          </h1>
          <p className="text-gray-500">
            Terima kasih, {successOrder.customer.name}. Pembayaran kamu sedang
            kami verifikasi. Tunjukkan kode pesanan di bawah saat mengambil
            pesanan di gerai.
          </p>
          <div className="w-full rounded-xl border border-dashed border-primary bg-primary/5 p-5">
            <p className="text-sm text-gray-500">Kode Pesanan</p>
            <p className="text-2xl font-bold text-primary">
              {successOrder.code}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Ambil pada {formatDateID(successOrder.pickup.date)} pukul{" "}
              {successOrder.pickup.time} • {successOrder.pickup.outlet}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/riwayat-transaksi/${successOrder.code}`}
              className="btn bg-primary text-white hover:bg-primary/90"
            >
              Lihat Detail Transaksi
            </Link>
            <Link
              href={"/menu-kami/oleh-oleh"}
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white"
            >
              Belanja Lagi
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="mt-14 sm:mt-16 lg:mt-20 xl:mt-24">
        <div className="grid justify-items-center gap-4 px-5 py-24 text-center">
          <HiOutlineShoppingBag size={64} className="text-gray-300" />
          <h1 className="text-2xl font-bold">Belum Ada Pesanan</h1>
          <p className="text-gray-500">
            Keranjang kamu kosong, pilih produk dulu sebelum ke pembayaran.
          </p>
          <Link
            href={"/menu-kami/oleh-oleh"}
            className="btn bg-primary text-white hover:bg-primary/90"
          >
            Lihat Menu Kami
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14 bg-gray-50 sm:mt-16 lg:mt-20 xl:mt-24">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="grid justify-items-center gap-2 text-center">
          <h1 className="text-2xl font-bold md:text-3xl">
            Selesaikan Pesanan Anda
          </h1>
          <p className="text-gray-500">
            Isi formulir di bawah ini untuk mengatur jadwal pengambilan pesanan.
          </p>
        </div>

        <div className="py-10">
          <Stepper current={step} />
        </div>

        {/* Step 1 - Info Pemesan */}
        {step === 1 && (
          <form
            onSubmit={handleNextCustomer}
            className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="flex items-center gap-3 text-xl font-bold">
              <HiOutlineUser size={24} className="text-primary" /> Informasi
              Pemesan
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Controller
                name="name"
                control={formCustomer.control}
                render={({ field }) => (
                  <div className="form-control w-full">
                    <label className="mb-1 block text-sm font-semibold">
                      Nama Lengkap
                    </label>
                    <input
                      {...field}
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className={cn(
                        "input input-bordered w-full",
                        errorsCustomer.name ? "input-error" : ""
                      )}
                    />
                    {errorsCustomer.name && (
                      <span className="mt-1 text-xs text-error">
                        {errorsCustomer.name.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="email"
                control={formCustomer.control}
                render={({ field }) => (
                  <div className="form-control w-full">
                    <label className="mb-1 block text-sm font-semibold">
                      Email
                    </label>
                    <input
                      {...field}
                      type="email"
                      placeholder="contoh@email.com"
                      className={cn(
                        "input input-bordered w-full",
                        errorsCustomer.email ? "input-error" : ""
                      )}
                    />
                    {errorsCustomer.email && (
                      <span className="mt-1 text-xs text-error">
                        {errorsCustomer.email.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="phone"
                control={formCustomer.control}
                render={({ field }) => (
                  <div className="form-control w-full">
                    <label className="mb-1 block text-sm font-semibold">
                      Nomor WhatsApp
                    </label>
                    <input
                      {...field}
                      type="tel"
                      inputMode="numeric"
                      placeholder="08xxxxxxxxxx"
                      className={cn(
                        "input input-bordered w-full",
                        errorsCustomer.phone ? "input-error" : ""
                      )}
                    />
                    {errorsCustomer.phone && (
                      <span className="mt-1 text-xs text-error">
                        {errorsCustomer.phone.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="instansi"
                control={formCustomer.control}
                render={({ field }) => (
                  <div className="form-control w-full">
                    <label className="mb-1 block text-sm font-semibold">
                      Instansi / Perusahaan
                    </label>
                    <input
                      {...field}
                      type="text"
                      placeholder="Nama Instansi (Opsional)"
                      className="input input-bordered w-full"
                    />
                  </div>
                )}
              />
            </div>

            <div className="flex justify-between">
              <Link
                href={"/keranjang"}
                className="btn btn-outline border-gray-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaArrowLeft size={14} /> Keranjang
              </Link>
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary/90"
              >
                Selanjutnya <FaArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2 - Detail Pengambilan */}
        {step === 2 && (
          <form
            onSubmit={handleNextPickup}
            className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="flex items-center gap-3 text-xl font-bold">
              <HiOutlineShoppingBag size={24} className="text-primary" /> Detail
              Pengambilan
            </h2>

            <div className="grid gap-5">
              <div className="form-control w-full">
                <label className="mb-1 block text-sm font-semibold">
                  Metode Pemesanan
                </label>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600">
                  <span className="flex items-center gap-3">
                    <HiOutlineShoppingBag size={20} /> Takeaway
                  </span>
                  <FaLock size={14} />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="mb-1 block text-sm font-semibold">
                  Lokasi Pengambilan
                </label>
                <div className="grid gap-1 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600">
                  <span className="flex items-center gap-3 font-semibold">
                    <FaLocationDot size={16} /> {GERAI_PICKUP.name}
                  </span>
                  <span className="pl-7 text-sm">{GERAI_PICKUP.address}</span>
                  <span className="pl-7 text-sm">
                    Buka {GERAI_PICKUP.open}
                  </span>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Controller
                  name="date"
                  control={formPickup.control}
                  render={({ field }) => (
                    <div className="form-control w-full">
                      <label className="mb-1 flex items-center gap-2 text-sm font-semibold">
                        <FaRegCalendar size={14} /> Tanggal Pengambilan
                      </label>
                      <input
                        {...field}
                        type="date"
                        min={getTodayISO()}
                        className={cn(
                          "input input-bordered w-full",
                          errorsPickup.date ? "input-error" : ""
                        )}
                      />
                      {errorsPickup.date && (
                        <span className="mt-1 text-xs text-error">
                          {errorsPickup.date.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="time"
                  control={formPickup.control}
                  render={({ field }) => (
                    <div className="form-control w-full">
                      <label className="mb-1 flex items-center gap-2 text-sm font-semibold">
                        <FaRegClock size={14} /> Jam Pengambilan
                      </label>
                      <select
                        {...field}
                        className={cn(
                          "select select-bordered w-full",
                          errorsPickup.time ? "select-error" : ""
                        )}
                      >
                        <option value="">Pilih jam</option>
                        {PICKUP_HOURS.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour} WITA
                          </option>
                        ))}
                      </select>
                      {errorsPickup.time && (
                        <span className="mt-1 text-xs text-error">
                          {errorsPickup.time.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>

              <Controller
                name="note"
                control={formPickup.control}
                render={({ field }) => (
                  <div className="form-control w-full">
                    <label className="mb-1 flex items-center gap-2 text-sm font-semibold">
                      <FaRegNoteSticky size={14} /> Catatan Tambahan
                    </label>
                    <textarea
                      {...field}
                      rows={4}
                      placeholder="Contoh: tolong dipisah bungkusnya, pesanan untuk oleh-oleh..."
                      className="textarea textarea-bordered w-full"
                    />
                  </div>
                )}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline border-gray-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaArrowLeft size={14} /> Kembali
              </button>
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary/90"
              >
                Selanjutnya <FaArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3 - Ringkasan & Pembayaran */}
        {step === 3 && (
          <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="flex items-center gap-3 text-xl font-bold">
              <HiOutlineCreditCard size={24} className="text-primary" />{" "}
              Ringkasan &amp; Pembayaran
            </h2>

            <div className="grid gap-4 rounded-xl border border-gray-200 p-5">
              <h3 className="border-b pb-3 font-bold">Detail Pesanan</h3>
              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Pemesan</dt>
                  <dd className="text-right font-semibold">{customer.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">WhatsApp</dt>
                  <dd className="text-right font-semibold">{customer.phone}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Instansi</dt>
                  <dd className="text-right font-semibold">
                    {customer.instansi || "-"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Metode</dt>
                  <dd className="text-right font-semibold">Takeaway</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Lokasi</dt>
                  <dd className="text-right font-semibold">
                    {GERAI_PICKUP.name}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Jadwal Ambil</dt>
                  <dd className="text-right font-semibold">
                    {formatDateID(pickup.date)} • {pickup.time} WITA
                  </dd>
                </div>
              </dl>

              <div className="grid gap-3 border-t pt-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        className="h-10 w-10 rounded object-cover"
                        alt={item.title}
                        width={80}
                        height={80}
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

              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-bold">Total ({totalItem} item)</span>
                <span className="text-xl font-bold text-primary">
                  {convertIDR(totalPrice)}
                </span>
              </div>
            </div>

            <div className="grid gap-3">
              <p className="text-sm font-semibold">Metode Pembayaran</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {PAYMENT_METHODS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPayment(item.key)}
                    className={cn(
                      "grid justify-items-center gap-2 rounded-xl border-2 p-5 transition duration-200",
                      payment === item.key
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    )}
                  >
                    {item.key === "transfer" ? (
                      <FaBuildingColumns
                        size={24}
                        className={
                          payment === item.key ? "text-primary" : "text-gray-400"
                        }
                      />
                    ) : (
                      <FaShieldHalved
                        size={24}
                        className={
                          payment === item.key ? "text-primary" : "text-gray-400"
                        }
                      />
                    )}
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline border-gray-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white"
              >
                <FaArrowLeft size={14} /> Kembali
              </button>
              <button
                type="button"
                onClick={handleOpenPayment}
                className="btn bg-primary text-white hover:bg-primary/90"
              >
                Bayar Sekarang <FaCircleCheck size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <ModalPembayaran
        isOpen={isOpenModal}
        payment={payment}
        totalPrice={totalPrice}
        vaNumber={vaNumber}
        orderCode={orderCode}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPayment}
      />
    </section>
  );
};

export default Pembayaran;
