import AdminLayout from "@/components/layouts/AdminLayout";
import ProdukDetail from "@/components/views/Admin/ProdukDetail";

const ProdukPage = () => {
  return (
    <>
        <AdminLayout title="Produk" description="Produk">
            <ProdukDetail />
        </AdminLayout>
    </>
  );
};

export default ProdukPage;