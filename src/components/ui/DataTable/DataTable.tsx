import useChangeUrl from "@/hooks/useChangeUrl"
import { convertIDR } from "@/utils/currency";
import Image from "next/image"
import { useRouter } from "next/router"
import { CiEdit, CiTrash } from "react-icons/ci"
import Swal from "sweetalert2";

type PropTypes = {
    data: Record<string, unknown>[]
    isPending: boolean
    page: string
    deleteData: (id: string) => Promise<void>
    current: number
    totalPages: number
}

const DataTable = (props: PropTypes) => {
    const router = useRouter()

    const {
        data,
        isPending,
        page,
        deleteData,
        current,
        totalPages,
    } = props

    const {
        handleSearch,
        handleChangePage,
    } = useChangeUrl()

    const handleDeleteData = async (id: string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Hapus Data',
            text: 'Apakah Anda yakin ingin menghapus data ini?',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonText: 'Ya, Hapus',
            buttonsStyling: false,
            customClass: {
                cancelButton: 'bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold py-2 px-4 rounded',
                confirmButton: 'bg-primary text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded mr-3',
            }
        }).then(async (result) => {
            if(result.isConfirmed) {
                await deleteData(`${id}`)
                window.location.reload()
            } else if (result.isDenied) {
                return
            }
        })
    }

    const handleEditData = (id: string) => {
        router.push(`/admin/${page}/${id}`)
    }

    return (
        <div className="border-l border-black/60 p-5 w-4xl">
            <div>
                <input type="text" placeholder={`Cari ${page}`} onChange={(e) => handleSearch(e)} className="input input-bordered w-full mb-5 dark:bg-white dark:border-black"/>
            </div>
            <ul className="list bg-base-100 rounded-box shadow-md dark:bg-white dark:border-black">
                <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">Daftar {page}</li>
                {!isPending ? (
                    <>
                        {data?.map((item) => (
                            <li key={`${item?._id}`} className="list-row">
                                <div>
                                    <Image className="rounded-box" src={`${item?.image}`} alt={`${item?.title}`} width={100} height={100} />
                                </div>
                                <div className="flex">
                                    <div className="w-full">
                                        <h2 className="text-lg">{`${item?.title}`}</h2>
                                        {page === "produk" && <p className="text-sm">{convertIDR(Number(item?.price))}</p>}
                                        {page === "content" && <p className="text-sm">{`${item?.link}`}</p>}
                                        {page === "produk" &&<div className="text-xs uppercase font-semibold opacity-60 py-2">{`${item?.category}`}</div>}
                                        {page === "produk" || page === "news" &&<p className="list-col-wrap text-xs" dangerouslySetInnerHTML={{ __html: `${item?.description}` }}></p>}
                                    </div>
                                    <span>
                                        <button className="btn btn-square btn-ghost">
                                            <CiEdit size={25} onClick={() => handleEditData(`${item?._id}`)}/>
                                        </button>
                                        <button className="btn btn-square btn-ghost">
                                            <CiTrash size={25} onClick={() => handleDeleteData(`${item?._id}`)}/>
                                        </button>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </>
                ): (
                    <div className="flex justify-center items-center p-20 bg-gray-200 dark:bg-white dark:border-black">
                        <p className="text-lg">Sedang memuat data...</p>
                    </div>
                )}
            </ul>
            <div className="join mt-5">
                <button
                    className="join-item btn dark:bg-white dark:text-black border-black"
                    onClick={() => handleChangePage(current - 1)}
                    disabled={current <= 1}
                >
                    «
                </button>

                <button
                    className="join-item btn dark:bg-white dark:text-black border-black"
                    onClick={() => handleChangePage(1)}
                >
                    Page {current}
                </button>

                <button
                    className="join-item btn dark:bg-white dark:text-black border-black"
                    onClick={() => handleChangePage(current + 1)}
                    disabled={current >= totalPages}
                >
                    »
                </button>
            </div>
        </div>
    )
}

export default DataTable