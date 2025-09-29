import { TextEditor } from "@/components/common/TextEditor/TextEditor";
import { useEffect, useState } from "react";
import useProduk from "./useProduk";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import InputFile from "@/components/ui/InputFile";
import useChangeUrl from "@/hooks/useChangeUrl";
import DataTable from "@/components/ui/DataTable";

export const tags_list = [
    {
        key: "khas-gerai",
        label: "Khas Gerai Panglima",
    },
    {
        key: "khas-banjar",
        label: "Khas Banjar",
    },
]

const Produk = () => {
    const [content, setContent] = useState("");

    const {
        dataProduk,
        isPendingProduk,
        handleAddProduk,
        control,
        errors,
        preview,
        handleUploadImage,
        handleDeleteImage,

        handleSubmitForm,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile, 

        tag,
        setTag,

        isPendingMutateAddProduk,
        isSuccessMutateAddProduk,

        router,
        deleteProduk,
    } = useProduk(content);

    useEffect(() => {
        if (isSuccessMutateAddProduk) {
            window.location.reload();
        }
    }, [isSuccessMutateAddProduk])

    const {
        setUrl,
    } = useChangeUrl()
    
    useEffect(() => {
        if (router.isReady) {
            setUrl();
        }
    }, [router.isReady]);

    return (
        <div className="flex gap-10">
            <form 
                onSubmit={handleSubmitForm(handleAddProduk)}
                className="grid gap-3 max-w-[600px] h-full"
            >
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
                                "input input-bordered w-full",
                                errors.title ? "input-error" : ""
                            )}
                        />
                        {errors.title && (
                            <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.title.message as string}
                            </span>
                            </label>
                        )}
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
                                "input input-bordered w-full",
                                errors.price ? "input-error" : ""
                            )}
                        />
                        {errors.price && (
                            <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.price.message as string}
                            </span>
                            </label>
                        )}
                        </div>
                    )}
                />
                <div>
                    <p className="text-base font-bold pb-2">Detail Produk</p>
                    <TextEditor onChange={setContent} />
                </div>
                <p className="text-base font-bold">Upload Gambar Produk</p>
                <Controller
                        name="image"
                        control={control}
                        render={({ field: { onChange, ...field } }) => (
                        <InputFile
                            {...field}
                            onDelete={() => handleDeleteImage(onChange)}
                            onUpload={(files) => handleUploadImage(files, onChange)}
                            isUploading={isPendingMutateUploadFile}
                            isDeleting={isPendingMutateDeleteFile}
                            isInvalid={errors.image !== undefined}
                            errorMessage={errors.image?.message}
                            isDropable
                            preview={typeof preview === "string" ? preview : ""}
                        />
                    )}
                />
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <div className="form-control mb-2">
                        <label className="label font-semibold pb-2 text-black">Pilih Kategori</label>

                        <select
                            {...field}
                            className={`select select-bordered w-full ${
                            errors.category ? "select-error" : ""
                            }`}
                        >
                            <option value="" className="bg-primary text-white">Pilih Kategori</option>
                            <option value="oleh-oleh" className="my-2">Oleh - Oleh</option>
                            <option value="snack-box">Snack Box</option>
                        </select>

                        {errors.category && (
                            <span className="text-sm text-red-500 mt-1">
                            {errors.category.message}
                            </span>
                        )}
                        </div>
                    )}
                />
                    
                <button
                    type="submit"
                    className="btn bg-primary text-white mt-5 rounded-lg"
                >
                    {isPendingMutateAddProduk ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
                </button>
            </form>
            <DataTable
                data={dataProduk?.data}
                isPending={isPendingProduk}
                page="produk"
                deleteData={async (id: string) => { await deleteProduk(id); }}
                current={dataProduk?.pagination?.current}
                totalPages={dataProduk?.pagination?.totalPages}
            />
        </div>
    );
}

export default Produk;