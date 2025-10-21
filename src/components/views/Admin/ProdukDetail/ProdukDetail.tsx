import { useEffect, useState } from "react";
import useProdukDetail from "./useProdukDetail";
import { TextEditor } from "@/components/common/TextEditor/TextEditor";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import InputFile from "@/components/ui/InputFile";
import Image from "next/image";
// import ImageTab from "./ImageTab";

const ProdukDetail = () => {
  const [content, setContent] = useState("");
  
  const {
    dataProduk,
    isPendingDataProduk,
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
  } = useProdukDetail(content);

  useEffect(() => {
    setValue("title", `${dataProduk?.title}`);
    setValue("description", `${dataProduk?.description}`);
    setValue("category", `${dataProduk?.category}`);
    setValue("price", Number(dataProduk?.price));
  }, [dataProduk]);

  useEffect(() => {
    if (isSuccessMutateUpdate) {
      reset();
    }
  }, [isSuccessMutateUpdate]);

  return (
    <section>
      {!isPendingDataProduk && (
        <form
          className=""
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex gap-5">
            <div>
              <Image src={dataProduk?.image} alt="Image" className="!relative rounded-lg w-full mb-2" width={1000} height={1000}/>
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
              <p className="text-base font-bold">Nama Produk</p>
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
              <p className="text-base font-bold">Harga Produk</p>
              <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                      <div className="form-control w-full">
                      <input
                          {...field}
                          type="number"
                          autoComplete="off"
                          className={cn(
                              "input input-bordered w-full dark:bg-white dark:border-black"
                          )}
                      />
                      </div>
                  )}
                />
                <div>
                    <p className="text-base font-bold pb-2">Detail Produk</p>
                    <TextEditor onChange={setContent} defaultValue={`${dataProduk?.description}`} />
                </div>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <div className="form-control mb-2">
                        <label className="label font-semibold pb-2 text-black">Pilih Kategori</label>

                        <select
                            {...field}
                            className={`select select-bordered w-full dark:bg-white dark:border-black`}
                        >
                            <option value="" className="bg-primary text-white">Pilih Kategori</option>
                            <option value="oleh-oleh" className="my-2">Oleh - Oleh</option>
                            <option value="snack-box">Snack Box</option>
                        </select>
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

export default ProdukDetail;
