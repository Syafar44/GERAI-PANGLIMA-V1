import AdminLayout from "@/components/layouts/AdminLayout";
import Produk from "@/components/views/Admin/Produk";

const ProdukPage = () => {
  return (
    <>
        <AdminLayout title="Produk" description="Produk">
            <Produk />
        </AdminLayout>
    </>
  );
};

export default ProdukPage;