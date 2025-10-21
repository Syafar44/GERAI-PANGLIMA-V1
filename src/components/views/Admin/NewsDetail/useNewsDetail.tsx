import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import newsServices from "@/services/news.service";
import { INews } from "@/types/News";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input title"),
  description: yup.string(),
  image: yup.mixed<FileList | string>(),
});

const useDetailNews = (content: string) => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const getNewsById = async () => {
    const { data } = await newsServices.getNewsById(`${query.id}`);
    return data.data;
  };

  const { data: dataNews, isPending: isPendingDataNews, refetch: refetchNews } = useQuery({
    queryKey: ["News"],
    queryFn: getNewsById,
    enabled: isReady,
  });

  const updateNews = async (payload: INews) => {
    const { data } = await newsServices.updateNews(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
      control,
      handleSubmit,
      formState: { errors: errorsUpdateInfo },
      reset,
      watch,
      getValues,
      setValue,
    } = useForm({
      resolver: yupResolver(schemaUpdateInfo),
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

  const {
    mutate: mutateUpdate,
    isPending: isPendingMutateUpdate,
    isSuccess: isSuccessMutateUpdate,
  } = useMutation({
    mutationFn: (payload: INews) => updateNews(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchNews();
      setToaster({
        type: "success",
        message: "Success update News",
      });
    },
  });

  const handleUpdate = (data: INews) => {
    const payload = {
      ...data,
      description: content
    }
    mutateUpdate(payload)
  };

  return {
    dataNews,
    isPendingDataNews,
    handleUpdate,
    isPendingMutateUpdate,
    isSuccessMutateUpdate,
    control,
    handleSubmit,
    errorsUpdateInfo,
    reset,
    setValue,
    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
  };
};

export default useDetailNews;
