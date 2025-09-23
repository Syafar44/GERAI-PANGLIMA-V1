import { TextEditor } from "@/components/common/TextEditor/TextEditor";
import { useEffect, useState } from "react";
import useNews from "./useNews";
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

const News = () => {
    const [content, setContent] = useState("");

    const {
        dataNews,
        isPendingNews,
        handleAddNews,
        control,
        errors,
        preview,
        handleUploadImage,
        handleDeleteImage,

        handleSubmitForm,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile, 

        isPendingMutateAddNews,
        isSuccessMutateAddNews,

        router,
        deleteNews,
    } = useNews(content);

    useEffect(() => {
        if (isSuccessMutateAddNews) {
            window.location.reload();
        }
    }, [isSuccessMutateAddNews])

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
                onSubmit={handleSubmitForm(handleAddNews)}
                className="grid gap-3 max-w-[600px] h-full"
            >
                <p className="text-base font-bold">Judul News</p>
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
                <div>
                    <p className="text-base font-bold pb-2">Detail News</p>
                    <TextEditor onChange={setContent} />
                </div>
                <p className="text-base font-bold">Upload Gambar News</p>
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
                <button
                    type="submit"
                    className="btn bg-primary text-white mt-5 rounded-lg"
                >
                    {isPendingMutateAddNews ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
                </button>
            </form>
            <DataTable
                data={dataNews?.data}
                isPending={isPendingNews}
                page="news"
                deleteData={async (id: string) => { await deleteNews(id); }}
                current={dataNews?.pagination?.current}
                totalPages={dataNews?.pagination?.totalPages}
            />
        </div>
    );
}

export default News;