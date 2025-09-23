import { ToasterContext } from "@/contexts/ToasterContext";
import useChangeUrl from "@/hooks/useChangeUrl";
import useMediaHandling from "@/hooks/useMediaHandling";
import contentServices from "@/services/content.service";
import { IContent } from "@/types/Content";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    link: yup.string().required("Please input link"),
    image: yup.mixed<FileList | string>().required("Please input image"),
});

const useContent = () => {
    const { setToaster } = useContext(ToasterContext);
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const router = useRouter();

    const {
        handleUploadFile,
        isPendingMutateUploadFile,
        handleDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const getContent = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }
        const res = await contentServices.getAllContent(params);
        const { data } = res;
        return data
    }

    const { data: dataContent, isPending: isPendingContent } = useQuery({
        queryKey: ['Content', currentPage, currentLimit, currentSearch],
        queryFn: getContent,
        enabled: router.isReady && !!currentPage && !!currentLimit,
    })

    const deleteContent = async (id: string) => {
        const res = await contentServices.deleteContent(id)
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

    const addContent = async(payload: IContent) => {
        const res = await contentServices.addContent({
            ...payload,
        })
        return res
    }

    const {
        mutate: mutateAddContent,
        isPending: isPendingMutateAddContent,
        isSuccess: isSuccessMutateAddContent,
    } = useMutation({
        mutationFn: addContent,
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

    const handleAddContent = (payload: IContent) => mutateAddContent(payload)
    
    return {
        dataContent,
        isPendingContent,
        handleAddContent,

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

        isPendingMutateAddContent,
        isSuccessMutateAddContent,

        router,

        deleteContent,
    }
}

export default useContent;