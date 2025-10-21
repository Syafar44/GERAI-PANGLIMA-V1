import AdminLayout from "@/components/layouts/AdminLayout";
import NewsDetail from "@/components/views/Admin/NewsDetail";

const NewsPage = () => {
  return (
    <>
        <AdminLayout title="News" description="News">
            <NewsDetail />
        </AdminLayout>
    </>
  );
};

export default NewsPage;