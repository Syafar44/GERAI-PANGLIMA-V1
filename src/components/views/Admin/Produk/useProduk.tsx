import { ToasterContext } from "@/contexts/ToasterContext";
import useChangeUrl from "@/hooks/useChangeUrl";
import useMediaHandling from "@/hooks/useMediaHandling";
import produkServices from "@/services/produk.service";
import { IProduk } from "@/types/Produk";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object().shape({
    category: yup.string(),
    title: yup.string().required("Please input title"),
    description: yup.string(),
    price: yup.number().required("Please input price"),
    tags: yup.array().of(yup.string().required()).min(1, "Please input tag"),
    image: yup.mixed<FileList | string>().required("Please input image"),
});

const useProduk = (content: string) => {
    const { setToaster } = useContext(ToasterContext);
    const [tag, setTag] = useState<string[]>([]);
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const router = useRouter();

    const {
        handleUploadFile,
        isPendingMutateUploadFile,
        handleDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const getProduk = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }
        const res = await produkServices.getAllProduk(params);
        const { data } = res;
        return data
    }

    const { data: dataProduk, isPending: isPendingProduk } = useQuery({
        queryKey: ['produk', currentPage, currentLimit, currentSearch],
        queryFn: getProduk,
        enabled: router.isReady && !!currentPage && !!currentLimit,
    })

    const deleteProduk = async (id: string) => {
        const res = await produkServices.deleteProduk(id)
        return res
    }

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            tags: [],
        }
    });

    const preview = watch("image");
    const fileUrl = getValues("image");

    const handleUploadImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
        if (fileUrl) {
            setValue("image", fileUrl);
        }
        });
    };

    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined));
    };

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileUrl, () => {
            reset();
            onClose();
        });
    };

    const addProduk = async(payload: IProduk) => {
        const res = await produkServices.addProduk({
            ...payload,
            description: `${content}`,
        })
        return res
    }

    const {
        mutate: mutateAddProduk,
        isPending: isPendingMutateAddProduk,
        isSuccess: isSuccessMutateAddProduk,
    } = useMutation({
        mutationFn: addProduk,
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Success add Competency",
            });
        },
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
    })

    const handleAddProduk = (payload: IProduk) => mutateAddProduk(payload)
    
    return {
        dataProduk,
        isPendingProduk,
        handleAddProduk,

        control,
        errors,
        preview,
        fileUrl,
        reset,
        handleUploadImage,
        handleDeleteImage,
        handleOnClose,

        handleSubmitForm,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        tag,
        setTag,

        isPendingMutateAddProduk,
        isSuccessMutateAddProduk,

        router,

        deleteProduk,
    }
}

export default useProduk;