import QrisCode from "@/components/ui/QrisCode";
import { PAYMENT_METHODS } from "@/constants/payment.constants";
import { TPaymentMethod } from "@/types/Order";
import { convertIDR } from "@/utils/currency";
import { useEffect, useState } from "react";
import { FaBuildingColumns, FaCheck, FaRegCopy, FaShieldHalved } from "react-icons/fa6";

type PropTypes = {
  isOpen: boolean;
  payment: TPaymentMethod;
  totalPrice: number;
  vaNumber: string;
  orderCode: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalPembayaran = (props: PropTypes) => {
  const {
    isOpen,
    payment,
    totalPrice,
    vaNumber,
    orderCode,
    onClose,
    onConfirm,
  } = props;

  const [isCopied, setIsCopied] = useState(false);
  const method = PAYMENT_METHODS.find((item) => item.key === payment);

  useEffect(() => {
    if (!isOpen) return;

    setIsCopied(false);
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vaNumber);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Detail pembayaran"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid justify-items-center gap-1 bg-gray-50 px-6 py-6">
          <p className="text-sm text-gray-500">Total Pembayaran</p>
          <p className="text-3xl font-bold text-gray-900">
            {convertIDR(totalPrice)}
          </p>
          <p className="text-xs text-gray-400">Kode pesanan: {orderCode}</p>
        </div>

        <div className="grid gap-4 px-6 py-6">
          <div className="flex items-center justify-center gap-2 border-b pb-4 font-bold text-gray-800">
            {payment === "transfer" ? (
              <FaBuildingColumns size={20} className="text-primary" />
            ) : (
              <FaShieldHalved size={20} className="text-primary" />
            )}
            {method?.title}
          </div>

          <p className="text-center text-sm text-gray-500">{method?.hint}</p>

          {payment === "transfer" ? (
            <div className="grid gap-2">
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-4 text-center">
                <p className="text-xl font-bold break-all text-gray-900 sm:text-2xl">
                  {vaNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="mx-auto flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {isCopied ? <FaCheck size={12} /> : <FaRegCopy size={12} />}
                {isCopied ? "Nomor tersalin" : "Salin nomor"}
              </button>
              <p className="text-center text-xs text-gray-400">
                Berlaku selama 24 Jam.
              </p>
            </div>
          ) : (
            <div className="grid justify-items-center gap-2">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <QrisCode value={orderCode} className="h-48 w-48" />
              </div>
              <p className="text-center text-xs text-gray-400">
                Berlaku selama 24 Jam.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onConfirm}
            className="btn w-full bg-primary text-white hover:bg-primary/90"
          >
            Saya Sudah Bayar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-center text-sm text-gray-500 hover:text-primary"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPembayaran;
