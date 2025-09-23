import { ToasterContext } from "@/contexts/ToasterContext";
import useChangeUrl from "@/hooks/useChangeUrl";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    image: yup.mixed<FileList | string>().required("Please input image"),
});

const useBanner = () => {
    const { setToaster } = useContext(ToasterContext);
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const router = useRouter();

    const {
        handleUploadFile,
        isPendingMutateUploadFile,
        handleDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const getBanner = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }
        const res = await bannerServices.getAllBanner(params);
        const { data } = res;
        return data
    }

    const { data: dataBanner, isPending: isPendingBanner } = useQuery({
        queryKey: ['Banner', currentPage, currentLimit, currentSearch],
        queryFn: getBanner,
        enabled: router.isReady && !!currentPage && !!currentLimit,
    })

    const deleteBanner = async (id: string) => {
        const res = await bannerServices.deleteBanner(id)
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

    const addBanner = async(payload: IBanner) => {
        const res = await bannerServices.addBanner({
            ...payload,
        })
        return res
    }

    const {
        mutate: mutateAddBanner,
        isPending: isPendingMutateAddBanner,
        isSuccess: isSuccessMutateAddBanner,
    } = useMutation({
        mutationFn: addBanner,
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

    const handleAddBanner = (payload: IBanner) => mutateAddBanner(payload)
    
    return {
        dataBanner,
        isPendingBanner,
        handleAddBanner,

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

        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,

        router,

        deleteBanner,
    }
}

export default useBanner;