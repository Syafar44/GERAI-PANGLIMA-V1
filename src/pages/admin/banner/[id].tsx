import AdminLayout from "@/components/layouts/AdminLayout";
import BannerDetail from "@/components/views/Admin/BannerDetail";

const BannerPage = () => {
  return (
    <>
        <AdminLayout title="Banner" description="Banner">
            <BannerDetail />
        </AdminLayout>
    </>
  );
};

export default BannerPage;