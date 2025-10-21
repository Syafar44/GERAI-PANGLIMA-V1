import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import produkServices from "@/services/produk.service";
import { IProduk } from "@/types/Produk";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  category: yup.string(),
  title: yup.string().required("Please input title"),
  description: yup.string(),
  price: yup.number().required("Please input price"),
  image: yup.mixed<FileList | string>(),
});

const useDetailProduk = (content: string) => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const getProdukById = async () => {
    const { data } = await produkServices.getProdukById(`${query.id}`);
    return data.data;
  };

  const { data: dataProduk, isPending: isPendingDataProduk, refetch: refetchProduk } = useQuery({
    queryKey: ["Produk"],
    queryFn: getProdukById,
    enabled: isReady,
  });

  const updateProduk = async (payload: IProduk) => {
    const { data } = await produkServices.updateProduk(
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
    mutationFn: (payload: IProduk) => updateProduk(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchProduk();
      setToaster({
        type: "success",
        message: "Success update Produk",
      });
    },
  });

  const handleUpdate = (data: IProduk) => {
    const payload = {
      ...data,
      description: content
    }
    mutateUpdate(payload)
  };

  return {
    dataProduk,
    isPendingDataProduk,
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

export default useDetailProduk;
