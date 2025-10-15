import { useEffect} from "react";
import useContent from "./useContent";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import InputFile from "@/components/ui/InputFile";
import useChangeUrl from "@/hooks/useChangeUrl";
import DataTable from "@/components/ui/DataTable";

const Content = () => {

    const {
        dataContent,
        isPendingContent,
        handleAddContent,
        control,
        errors,
        preview,
        handleUploadImage,
        handleDeleteImage,

        handleSubmitForm,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile, 

        isPendingMutateAddContent,
        isSuccessMutateAddContent,

        router,
        deleteContent,
    } = useContent();

    useEffect(() => {
        if (isSuccessMutateAddContent) {
            window.location.reload();
        }
    }, [isSuccessMutateAddContent])

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
                onSubmit={handleSubmitForm(handleAddContent)}
                className="grid gap-3 min-w-[600px] max-w-[600px] h-full"
            >
                <p className="text-base font-bold">Nama Content</p>
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
                                "input input-bordered w-full dark:bg-white dark:border-black",
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
                <p className="text-base font-bold">Link Content</p>
                <Controller
                    name="link"
                    control={control}
                    render={({ field }) => (
                        <div className="form-control w-full">
                        <input
                            {...field}
                            type="text"
                            autoComplete="off"
                            className={cn(
                                "input input-bordered w-full dark:bg-white dark:border-black",
                                errors.link ? "input-error" : ""
                            )}
                        />
                        {errors.link && (
                            <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.link.message as string}
                            </span>
                            </label>
                        )}
                        </div>
                    )}
                />
                <p className="text-base font-bold">Upload Gambar Content</p>
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
                    {isPendingMutateAddContent ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
                </button>
            </form>
            <DataTable
                data={dataContent?.data}
                isPending={isPendingContent}
                page="content"
                deleteData={async (id: string) => { await deleteContent(id); }}
                current={dataContent?.pagination?.current}
                totalPages={dataContent?.pagination?.totalPages}
            />
        </div>
    );
}

export default Content;