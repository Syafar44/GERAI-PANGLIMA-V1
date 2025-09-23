import AdminLayout from "@/components/layouts/AdminLayout";
import Content from "@/components/views/Admin/Content";

const ContentPage = () => {
  return (
    <>
        <AdminLayout title="Content" description="Content">
            <Content />
        </AdminLayout>
    </>
  );
};

export default ContentPage;