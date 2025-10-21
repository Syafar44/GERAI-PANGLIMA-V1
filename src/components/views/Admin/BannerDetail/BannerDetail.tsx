import { useEffect, useState } from "react";
import useBannerDetail from "./useBannerDetail";
import { TextEditor } from "@/components/common/TextEditor/TextEditor";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import InputFile from "@/components/ui/InputFile";
import Image from "next/image";
// import ImageTab from "./ImageTab";

const BannerDetail = () => {
  const [content, setContent] = useState("");
  
  const {
    dataBanner,
    isPendingDataBanner,
    handleUpdate,
    isPendingMutateUpdate,
    isSuccessMutateUpdate,
    control,
    handleSubmit,
    reset,
    setValue,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    preview,
  } = useBannerDetail(content);

  useEffect(() => {
    setValue("title", `${dataBanner?.title}`);
  }, [dataBanner]);

  useEffect(() => {
    if (isSuccessMutateUpdate) {
      reset();
    }
  }, [isSuccessMutateUpdate]);

  return (
    <section>
      {!isPendingDataBanner && (
        <form
          className=""
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex gap-5">
            <div>
              <Image src={dataBanner?.image} alt="Image" className="!relative rounded-lg w-full mb-2" width={1000} height={1000}/>
              <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <InputFile
                      {...field}
                      onDelete={() => handleDeleteImage(onChange)}
                      onUpload={(files) => handleUploadImage(files, onChange)}
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isDropable
                      label={
                        <p className="mb-2 text-sm font-medium text-default-700">
                          Upload Gambar Baru
                        </p>
                      }
                      preview={typeof preview === "string" ? preview : ""}
                    />
                  )}
                />
            </div>
            <div>
              <p className="text-base font-bold">Nama Banner</p>
              <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                      <div className="form-control w-full">
                      <input
                          {...field}
                          type="text"
                          autoComplete="off"
                          className={cn(
                              "input input-bordered w-full dark:bg-white dark:border-black"
                          )}
                      />
                      </div>
                  )}
              />
            </div>
          </div>
              <button
                  type="submit"
                  className="btn bg-primary text-white mt-5 rounded-lg w-full"
              >
                  {isPendingMutateUpdate ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
              </button>
        </form>
      )}
    </section>
  );
};

export default BannerDetail;
