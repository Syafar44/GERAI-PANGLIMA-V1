import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input title"),
  image: yup.mixed<FileList | string>(),
});

const useDetailBanner = (content: string) => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const getBannerById = async () => {
    const { data } = await bannerServices.getBannerById(`${query.id}`);
    return data.data;
  };

  const { data: dataBanner, isPending: isPendingDataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["Banner"],
    queryFn: getBannerById,
    enabled: isReady,
  });

  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerServices.updateBanner(
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
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchBanner();
      setToaster({
        type: "success",
        message: "Success update Banner",
      });
    },
  });

  const handleUpdate = (data: IBanner) => {
    const payload = {
      ...data,
      description: content
    }
    mutateUpdate(payload)
  };

  return {
    dataBanner,
    isPendingDataBanner,
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

export default useDetailBanner;
