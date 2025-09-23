import AdminLayout from "@/components/layouts/AdminLayout";
import News from "@/components/views/Admin/News";

const NewsPage = () => {
  return (
    <>
        <AdminLayout title="News" description="News">
            <News />
        </AdminLayout>
    </>
  );
};

export default NewsPage;