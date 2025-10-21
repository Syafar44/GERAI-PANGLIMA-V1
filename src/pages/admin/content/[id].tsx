import AdminLayout from "@/components/layouts/AdminLayout";
import ContentDetail from "@/components/views/Admin/ContentDetail";

const ContentPage = () => {
  return (
    <>
        <AdminLayout title="Content" description="Content">
            <ContentDetail />
        </AdminLayout>
    </>
  );
};

export default ContentPage;