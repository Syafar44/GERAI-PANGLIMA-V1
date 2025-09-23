import { useEffect} from "react";
import useBanner from "./useBanner";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import InputFile from "@/components/ui/InputFile";
import useChangeUrl from "@/hooks/useChangeUrl";
import DataTable from "@/components/ui/DataTable";

const Banner = () => {

    const {
        dataBanner,
        isPendingBanner,
        handleAddBanner,
        control,
        errors,
        preview,
        handleUploadImage,
        handleDeleteImage,

        handleSubmitForm,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile, 

        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,

        router,
        deleteBanner,
    } = useBanner();

    useEffect(() => {
        if (isSuccessMutateAddBanner) {
            window.location.reload();
        }
    }, [isSuccessMutateAddBanner])

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
                onSubmit={handleSubmitForm(handleAddBanner)}
                className="grid gap-3 min-w-[600px] max-w-[600px] h-full"
            >
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
                <p className="text-base font-bold">Upload Gambar Banner</p>
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
                    {isPendingMutateAddBanner ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
                </button>
            </form>
            <DataTable
                data={dataBanner?.data}
                isPending={isPendingBanner}
                page="banner"
                deleteData={async (id: string) => { await deleteBanner(id); }}
                current={dataBanner?.pagination?.current}
                totalPages={dataBanner?.pagination?.totalPages}
            />
        </div>
    );
}

export default Banner;