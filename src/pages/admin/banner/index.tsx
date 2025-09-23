import AdminLayout from "@/components/layouts/AdminLayout";
import Banner from "@/components/views/Admin/Banner";

const BannerPage = () => {
  return (
    <>
        <AdminLayout title="Banner" description="Banner">
            <Banner />
        </AdminLayout>
    </>
  );
};

export default BannerPage;