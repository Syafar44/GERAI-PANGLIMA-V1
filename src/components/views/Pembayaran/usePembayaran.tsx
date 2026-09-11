import { GERAI_PICKUP } from "@/constants/gerai.constants";
import { useCart } from "@/contexts/CartContext";
import useOrderHistory from "@/hooks/useOrderHistory";
import { IOrder, IOrderCustomer, IOrderPickup, TPaymentMethod } from "@/types/Order";
import { generateOrderCode, generateVaNumber } from "@/utils/order";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const customerSchema = yup.object().shape({
    name: yup.string().required("Nama lengkap wajib diisi"),
    email: yup
        .string()
        .email("Format email tidak valid")
        .required("Email wajib diisi"),
    phone: yup
        .string()
        .required("Nomor WhatsApp wajib diisi")
        .matches(/^08\d{8,12}$/, "Gunakan format 08xxxxxxxxxx"),
    instansi: yup.string().default(""),
});

const pickupSchema = yup.object().shape({
    date: yup.string().required("Tanggal pengambilan wajib diisi"),
    time: yup.string().required("Jam pengambilan wajib dipilih"),
    note: yup.string().default(""),
});

const usePembayaran = () => {
    const { cart, isReadyCart, totalItem, totalPrice, clearCart } = useCart();
    const { addOrder } = useOrderHistory();

    const [step, setStep] = useState<number>(1);
    const [payment, setPayment] = useState<TPaymentMethod>("transfer");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [vaNumber, setVaNumber] = useState("");
    const [orderCode, setOrderCode] = useState("");
    const [successOrder, setSuccessOrder] = useState<IOrder | null>(null);

    const formCustomer = useForm({
        resolver: yupResolver(customerSchema),
        defaultValues: { name: "", email: "", phone: "", instansi: "" },
    });

    const formPickup = useForm({
        resolver: yupResolver(pickupSchema),
        defaultValues: { date: "", time: "", note: "" },
    });

    const handleNextCustomer = formCustomer.handleSubmit(() => setStep(2));
    const handleNextPickup = formPickup.handleSubmit(() => setStep(3));
    const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

    const handleOpenPayment = () => {
        if (cart.length === 0) return;

        const { phone } = formCustomer.getValues();
        setOrderCode(generateOrderCode());
        setVaNumber(generateVaNumber(`${phone}`));
        setIsOpenModal(true);
    };

    const handleCloseModal = () => setIsOpenModal(false);

    const handleConfirmPayment = () => {
        const customer = formCustomer.getValues() as IOrderCustomer;
        const pickupForm = formPickup.getValues();

        const pickup: IOrderPickup = {
            outlet: GERAI_PICKUP.name,
            address: GERAI_PICKUP.address,
            date: pickupForm.date,
            time: pickupForm.time,
            note: pickupForm.note,
        };

        const order: IOrder = {
            code: orderCode,
            createdAt: new Date().toISOString(),
            status: "menunggu",
            method: "takeaway",
            payment,
            vaNumber: payment === "transfer" ? vaNumber : undefined,
            customer,
            pickup,
            items: cart,
            totalItem,
            totalPrice,
        };

        addOrder(order);
        clearCart();
        setSuccessOrder(order);
        setIsOpenModal(false);
    };

    return {
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
    };
};

export default usePembayaran;
