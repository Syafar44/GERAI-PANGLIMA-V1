import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import contentServices from "@/services/content.service";
import { IContent } from "@/types/Content";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input title"),
  link: yup.string().required("Please input link"),
  image: yup.mixed<FileList | string>(),
});

const useDetailContent = (content: string) => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const getContentById = async () => {
    const { data } = await contentServices.getContentById(`${query.id}`);
    return data.data;
  };

  const { data: dataContent, isPending: isPendingDataContent, refetch: refetchContent } = useQuery({
    queryKey: ["Content"],
    queryFn: getContentById,
    enabled: isReady,
  });

  const updateContent = async (payload: IContent) => {
    const { data } = await contentServices.updateContent(
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
    mutationFn: (payload: IContent) => updateContent(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchContent();
      setToaster({
        type: "success",
        message: "Success update Content",
      });
    },
  });

  const handleUpdate = (data: IContent) => {
    const payload = {
      ...data,
      description: content
    }
    mutateUpdate(payload)
  };

  return {
    dataContent,
    isPendingDataContent,
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

export default useDetailContent;
