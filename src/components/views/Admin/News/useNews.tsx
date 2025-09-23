import { ToasterContext } from "@/contexts/ToasterContext";
import useChangeUrl from "@/hooks/useChangeUrl";
import useMediaHandling from "@/hooks/useMediaHandling";
import newsServices from "@/services/news.service";
import { INews } from "@/types/News";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    description: yup.string(),
    image: yup.mixed<FileList | string>().required("Please input image"),
});

const useNews = (content: string) => {
    const { setToaster } = useContext(ToasterContext);
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const router = useRouter();

    const {
        handleUploadFile,
        isPendingMutateUploadFile,
        handleDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const getNews = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }
        const res = await newsServices.getAllNews(params);
        const { data } = res;
        return data
    }

    const { data: dataNews, isPending: isPendingNews } = useQuery({
        queryKey: ['News', currentPage, currentLimit, currentSearch],
        queryFn: getNews,
        enabled: router.isReady && !!currentPage && !!currentLimit,
    })

    const deleteNews = async (id: string) => {
        const res = await newsServices.deleteNews(id)
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

    const addNews = async(payload: INews) => {
        const res = await newsServices.addNews({
            ...payload,
            description: `${content}`,
        })
        return res
    }

    const {
        mutate: mutateAddNews,
        isPending: isPendingMutateAddNews,
        isSuccess: isSuccessMutateAddNews,
    } = useMutation({
        mutationFn: addNews,
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

    const handleAddNews = (payload: INews) => mutateAddNews(payload)
    
    return {
        dataNews,
        isPendingNews,
        handleAddNews,

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
        isPendingMutateAddNews,
        isSuccessMutateAddNews,

        router,

        deleteNews,
    }
}

export default useNews;